---
title: OpenStack-Cinder简介
tags:
  - Cinder
  - Development
  - OpenStack
categories:
  - Operations
  - OpenStack
toc: true
cover: '/assets/images/imgs20190625084547.webp'
abbrlink: 4c004735
date: 2017-11-08 10:18:51
---

## 简介

**Cinder是一个OpenStack的组件，提供块存储服务。主要功能为**：

* 基于组件的架构
* 高可用
* 容错
* 可回滚
* 开源，标准

<!-- more -->

**Cinder组件主要包括如下组件**：

- **API service**：Cinder-api 是主要服务接口, 负责接受和处理外界的API请求，并将请求放入RabbitMQ队列，交由后端执行。
  Cinder目前提供Volume API V2
- **Scheduler service**: 处理任务队列的任务，并根据预定策略选择合适的Volume Service节点来执行任务。目前版本的cinder仅仅提供了一个Simple
  Scheduler, 该调度器选择卷数量最少的一个活跃节点来创建卷。
- **Volume service**: 该服务运行在存储节点上，管理存储空间，塔处理cinder数据库的维护状态的读写请求，通过消息队列和直接在块存储设备或软件上与其他进程交互。每个存储节点都有一个Volume
  Service，若干个这样的存储节点联合起来可以构成一个存储资源池。
- **cinder-backup** – Provides a means to back up a Cinder Volume to various backup targets.
- 为了支持不同类型和型号的存储，当前版本的Cinder为Volume
  Service如下drivers。当然在Cinder的blueprints当中还有一些其它的drivers，以后的版本可能会添加进来。
    - **本地存储** ： *LVM, Sheepdog*
    - **网络存储** ： *NFS, RBD (RADOS)*
    - **IBM** : *XIV, Storwize V7000， SVC storage systems*
    - **Netapp** : *NFS存储；ISCSI存储则需要OnCommand 5.0和Data ONTAP 7-mode storage systems with installed iSCSI
      licenses*
    - **EMC** : *VNX, VMAX/VMAXe*
    - **Solidfire** : *Solidfire cluster*

## Cinder 架构

![](/assets/images/imgs-OpenStack块存储组件简介-2019-6-25-11-2-10.webp)

* **Cinder-api**

  Cinder-api是cinder服务的endpoint，提供rest接口，负责处理client请求，并将请求发送至对应的Message Queue。

* **Cinder-scheduler**

  负责cinder请求调度，其核心部分就是scheduler_driver, 作为scheduler
  manager的driver，负责具体的调度处理，grizzly版本的cinder-scheduler部分提供了三个scheduler driver分别是：

    * ChanceScheduler： 随机选取cinder-volume service创建cinder volume
    * SimpleScheduler： 根据availability zone 和 cinder-volume service的capacity进行选择
    * FilterScheduler： 可以选择具体的filter规则，满足filter规则的cinder-volume service将会通过筛选，创建cinder volume
    * CapacityWeigher：cinder-vloume service 的可用Capacity越多，weight之越大。

> 默认Cinder-Scheduler使用FilterScheduler作为调度volume service的driver。
>
> FilterScheduler主要机制是filter 和weighting。
>
> Filter即cinder-scheduler分析用户创建volume请求，删选cinder-volume service
>
> 目前Cinder-scheduler支持的filter包括：
>
> * CapabilitiesFilter：根据用户创建的volume type类型筛选cinder-volume service
>
> * RetryFilter：过滤创建volume失败的cinder-volume service，在reschedule阶段起作用。
>
> * CapacityFilter：过滤可用容量不足以满足用户请求的cinder-volume service
>
> * JsonFilter：支持Json语法自定义filter规则，选择cinder-volume service
>
> * AvailabilityZoneFilter：根据cinder-volume属性AvailabilityZone选择指定Zone的cinder-volume service。 Cinder-volume
    service的AvailabilityZone是通过配置文件storage_availability_zone进行指定。
>
> 使用cinder service-list可以查看cinder service所在的AvailabilityZone
>
> Weighing即根据cinder-volume service的可用资源等情况赋予权重，目前支持的Weigher：


cinder-volume支持的后端驱动可见：https://wiki.openstack.org/wiki/CinderSupportMatrix

## Cinder创建卷的过程

### 整体流程

创建卷涉及的答题步骤主要有以下几步：

1. Client发送请求，通过RESTFUL接口访问cinder-api。
2. Api解析响应请求，api解析由Client发送来的请求，并通过rpc进一步调用cinder-scheduler。
3. Scheduler对资源进行调度，scheduler选择合适的节点进行。
4. Volume调用Driver创建卷，volume通过指定Driver进行卷的创建。

### 代码详解

Cinder创建卷的过程是整个Cinder过程中代码覆盖量最高的，点击上图或者下载可以查改高清图。从上图可以看出，创建卷的主要过程分为Api、Scheduler、Volume三个阶段。

####Cinder-Api过程

1. **cinder\api\v2\volumes.py**

   *VolumeController. create*函数对创建请求进行响应，首先函数对**volume_type**、**metadata**、**snapshot**等信息进行检查，然后调用
   *Volume API*的*create*进行创建。

   ```python
       @wsgi.response(http_client.ACCEPTED)
       def create(self, req, body):
           """Creates a new volume."""
           self.assert_valid_body(body, 'volume')

           LOG.debug('Create volume request body: %s', body)
           context = req.environ['cinder.context']
           volume = body['volume']

           # Check up front for legacy replication parameters to quick fail
           source_replica = volume.get('source_replica')

           if source_replica:
               msg = _("Creating a volume from a replica source was part of the "
                       "replication v1 implementation which is no longer "
                       "available.")
               raise exception.InvalidInput(reason=msg)

           kwargs = {}
           self.validate_name_and_description(volume)

           # NOTE(thingee): v2 API allows name instead of display_name
           if 'name' in volume:
               volume['display_name'] = volume.pop('name')

           # NOTE(thingee): v2 API allows description instead of
           #                display_description
           if 'description' in volume:
               volume['display_description'] = volume.pop('description')

           if 'image_id' in volume:
               volume['imageRef'] = volume.pop('image_id')

           req_volume_type = volume.get('volume_type', None)
           if req_volume_type:
               # Not found exception will be handled at the wsgi level
               kwargs['volume_type'] = (
                   objects.VolumeType.get_by_name_or_id(context, req_volume_type))

           kwargs['metadata'] = volume.get('metadata', None)

           snapshot_id = volume.get('snapshot_id')
           if snapshot_id is not None:
               if not uuidutils.is_uuid_like(snapshot_id):
                   msg = _("Snapshot ID must be in UUID form.")
                   raise exc.HTTPBadRequest(explanation=msg)
               # Not found exception will be handled at the wsgi level
               kwargs['snapshot'] = self.volume_api.get_snapshot(context,
                                                                 snapshot_id)
           else:
               kwargs['snapshot'] = None

           source_volid = volume.get('source_volid')
           if source_volid is not None:
               if not uuidutils.is_uuid_like(source_volid):
                   msg = _("Source volume ID '%s' must be a "
                           "valid UUID.") % source_volid
                   raise exc.HTTPBadRequest(explanation=msg)
               # Not found exception will be handled at the wsgi level
               kwargs['source_volume'] = \
                   self.volume_api.get_volume(context,
                                              source_volid)
           else:
               kwargs['source_volume'] = None

           kwargs['group'] = None
           kwargs['consistencygroup'] = None
           consistencygroup_id = volume.get('consistencygroup_id')
           if consistencygroup_id is not None:
               if not uuidutils.is_uuid_like(consistencygroup_id):
                   msg = _("Consistency group ID '%s' must be a "
                           "valid UUID.") % consistencygroup_id
                   raise exc.HTTPBadRequest(explanation=msg)
               # Not found exception will be handled at the wsgi level
               kwargs['group'] = self.group_api.get(context, consistencygroup_id)

           size = volume.get('size', None)
           if size is None and kwargs['snapshot'] is not None:
               size = kwargs['snapshot']['volume_size']
           elif size is None and kwargs['source_volume'] is not None:
               size = kwargs['source_volume']['size']

           LOG.info("Create volume of %s GB", size)

           if self.ext_mgr.is_loaded('os-image-create'):
               image_ref = volume.get('imageRef')
               if image_ref is not None:
                   image_uuid = self._image_uuid_from_ref(image_ref, context)
                   kwargs['image_id'] = image_uuid

           kwargs['availability_zone'] = volume.get('availability_zone', None)
           kwargs['scheduler_hints'] = volume.get('scheduler_hints', None)
           kwargs['multiattach'] = utils.get_bool_param('multiattach', volume)

           new_volume = self.volume_api.create(context,
                                               size,
                                               volume.get('display_name'),
                                               volume.get('display_description'),
                                               **kwargs)

           retval = self._view_builder.detail(req, new_volume)

           return retval
   ```

2. **cinder\volume\api.py**

   API.create函数对source_volume、volume_type等参数进行进一步检查，并调用cinder.volume.flows.api.get_flow来创建。

   ```python
           context.authorize(vol_policy.CREATE_FROM_IMAGE_POLICY)

           # Check up front for legacy replication parameters to quick fail
           if source_replica:
               msg = _("Creating a volume from a replica source was part of the "
                       "replication v1 implementation which is no longer "
                       "available.")
               raise exception.InvalidInput(reason=msg)

           # NOTE(jdg): we can have a create without size if we're
           # doing a create from snap or volume.  Currently
           # the taskflow api will handle this and pull in the
           # size from the source.

           # NOTE(jdg): cinderclient sends in a string representation
           # of the size value.  BUT there is a possibility that somebody
           # could call the API directly so the is_int_like check
           # handles both cases (string representation of true float or int).
           if size and (not strutils.is_int_like(size) or int(size) <= 0):
               msg = _('Invalid volume size provided for create request: %s '
                       '(size argument must be an integer (or string '
                       'representation of an integer) and greater '
                       'than zero).') % size
               raise exception.InvalidInput(reason=msg)

           if consistencygroup and (not cgsnapshot and not source_cg):
               if not volume_type:
                   msg = _("volume_type must be provided when creating "
                           "a volume in a consistency group.")
                   raise exception.InvalidInput(reason=msg)
               cg_voltypeids = consistencygroup.volume_type_id
               if volume_type.id not in cg_voltypeids:
                   msg = _("Invalid volume_type provided: %s (requested "
                           "type must be supported by this consistency "
                           "group).") % volume_type
                   raise exception.InvalidInput(reason=msg)

           if group and (not group_snapshot and not source_group):
               if not volume_type:
                   msg = _("volume_type must be provided when creating "
                           "a volume in a group.")
                   raise exception.InvalidInput(reason=msg)
               vol_type_ids = [v_type.id for v_type in group.volume_types]
               if volume_type.id not in vol_type_ids:
                   msg = _("Invalid volume_type provided: %s (requested "
                           "type must be supported by this "
                           "group).") % volume_type
                   raise exception.InvalidInput(reason=msg)

           if source_volume and volume_type:
               if volume_type.id != source_volume.volume_type_id:
                   if not self._retype_is_possible(
                           context,
                           source_volume.volume_type,
                           volume_type):
                       msg = _("Invalid volume_type provided: %s (requested type "
                               "is not compatible; either match source volume, "
                               "or omit type argument).") % volume_type.id
                       raise exception.InvalidInput(reason=msg)

           if snapshot and volume_type:
               if volume_type.id != snapshot.volume_type_id:
                   if not self._retype_is_possible(context,
                                                   snapshot.volume.volume_type,
                                                   volume_type):
                       msg = _("Invalid volume_type provided: %s (requested "
                               "type is not compatible; recommend omitting "
                               "the type argument).") % volume_type.id
                       raise exception.InvalidInput(reason=msg)

           # Determine the valid availability zones that the volume could be
           # created in (a task in the flow will/can use this information to
           # ensure that the availability zone requested is valid).
           raw_zones = self.list_availability_zones(enable_cache=True)
           availability_zones = set([az['name'] for az in raw_zones])
           if CONF.storage_availability_zone:
               availability_zones.add(CONF.storage_availability_zone)

           utils.check_metadata_properties(metadata)

           create_what = {
               'context': context,
               'raw_size': size,
               'name': name,
               'description': description,
               'snapshot': snapshot,
               'image_id': image_id,
               'raw_volume_type': volume_type,
               'metadata': metadata or {},
               'raw_availability_zone': availability_zone,
               'source_volume': source_volume,
               'scheduler_hints': scheduler_hints,
               'key_manager': self.key_manager,
               'optional_args': {'is_quota_committed': False},
               'consistencygroup': consistencygroup,
               'cgsnapshot': cgsnapshot,
               'multiattach': multiattach,
               'group': group,
               'group_snapshot': group_snapshot,
               'source_group': source_group,
           }
           try:
               sched_rpcapi = (self.scheduler_rpcapi if (
                               not cgsnapshot and not source_cg and
                               not group_snapshot and not source_group)
                               else None)
               volume_rpcapi = (self.volume_rpcapi if (
                                not cgsnapshot and not source_cg and
                                not group_snapshot and not source_group)
                                else None)
               flow_engine = create_volume.get_flow(self.db,
                                                    self.image_service,
                                                    availability_zones,
                                                    create_what,
                                                    sched_rpcapi,
                                                    volume_rpcapi)
           except Exception:
               msg = _('Failed to create api volume flow.')
               LOG.exception(msg)
               raise exception.CinderException(msg)

           # Attaching this listener will capture all of the notifications that
           # taskflow sends out and redirect them to a more useful log for
           # cinders debugging (or error reporting) usage.
           with flow_utils.DynamicLogListener(flow_engine, logger=LOG):
               try:
                   flow_engine.run()
                   vref = flow_engine.storage.fetch('volume')
                   # NOTE(tommylikehu): If the target az is not hit,
                   # refresh the az cache immediately.
                   if flow_engine.storage.fetch('refresh_az'):
                       self.list_availability_zones(enable_cache=True,
                                                    refresh_cache=True)
                   LOG.info("Create volume request issued successfully.",
                            resource=vref)
                   return vref
               except exception.InvalidAvailabilityZone:
                   with excutils.save_and_reraise_exception():
                       self.list_availability_zones(enable_cache=True,
                                                    refresh_cache=True)
   ```

3. **cinder\volume\flows\api\create_volume.py**

   get_flow函数检查Quata，最后创建*EntryCreateTask*及*VolumeCastTask*等任务，

   其中*EntryCreateTask*会将卷的创建过程写入数据库，此时卷的状态为”creating”。

   *VolumeCastTask.excute*函数会调用VoumeCastTask._cast_create_volume_

   *VolumeCastTask.cast_create_volume*函数，如果未传入host，则会经过调度进行创建卷，通过*scheduler_rpcapi.create_volume*
   创建卷；如果未传入host则直接交由Volume Manager去创建卷。

```python
def get_flow(db_api, image_service_api, availability_zones, create_what,
             scheduler_rpcapi=None, volume_rpcapi=None):
    """Constructs and returns the api entrypoint flow.

    This flow will do the following:

    1. Inject keys & values for dependent tasks.
    2. Extracts and validates the input keys & values.
    3. Reserves the quota (reverts quota on any failures).
    4. Creates the database entry.
    5. Commits the quota.
    6. Casts to volume manager or scheduler for further processing.
    """

    flow_name = ACTION.replace(":", "_") + "_api"
    api_flow = linear_flow.Flow(flow_name)

    api_flow.add(ExtractVolumeRequestTask(
        image_service_api,
        availability_zones,
        rebind={'size': 'raw_size',
                'availability_zone': 'raw_availability_zone',
                'volume_type': 'raw_volume_type'}))
    api_flow.add(QuotaReserveTask(),
                 EntryCreateTask(),
                 QuotaCommitTask())

    if scheduler_rpcapi and volume_rpcapi:
        # This will cast it out to either the scheduler or volume manager via
        # the rpc apis provided.
        api_flow.add(VolumeCastTask(scheduler_rpcapi, volume_rpcapi, db_api))

    # Now load (but do not run) the flow using the provided initial data.
    return taskflow.engines.load(api_flow, store=create_what)
```

#### Cinder-Scheduler过程

1. **cinder\scheduler\rpcapi.py（此步还属于cinder-api）**

```python
    def create_volume(self, ctxt, volume, snapshot_id=None, image_id=None,
                      request_spec=None, filter_properties=None):
        volume.create_worker()
        cctxt = self._get_cctxt()
        msg_args = {'snapshot_id': snapshot_id, 'image_id': image_id,
                    'request_spec': request_spec,
                    'filter_properties': filter_properties, 'volume': volume}
        return cctxt.cast(ctxt, 'create_volume', **msg_args)
```

SchedulerAPI.create_volume函数会通过消息异步调用SchedulerManager.create_volume函数。

2. **cinder\scheduler\manager.py**

 ```python
    @objects.Volume.set_workers
    def create_volume(self, context, volume, snapshot_id=None, image_id=None,
                      request_spec=None, filter_properties=None):
        self._wait_for_scheduler()

        try:
            flow_engine = create_volume.get_flow(context,
                                                 self.driver,
                                                 request_spec,
                                                 filter_properties,
                                                 volume,
                                                 snapshot_id,
                                                 image_id)
        except Exception:
            msg = _("Failed to create scheduler manager volume flow")
            LOG.exception(msg)
            raise exception.CinderException(msg)

        with flow_utils.DynamicLogListener(flow_engine, logger=LOG):
            flow_engine.run()
 ```

SchedulerManager.create_volume函数，使用自己的flow来创建volume，其中还传入了Driver。

3. **cinder\scheduler\flows\create_volume.py**

```python
    def execute(self, context, request_spec, filter_properties, volume):
        try:
            self.driver_api.schedule_create_volume(context, request_spec,
                                                   filter_properties)
        except Exception as e:
            self.message_api.create(
                context,
                message_field.Action.SCHEDULE_ALLOCATE_VOLUME,
                resource_uuid=request_spec['volume_id'],
                exception=e)
            # An error happened, notify on the scheduler queue and log that
            # this happened and set the volume to errored out and reraise the
            # error *if* exception caught isn't NoValidBackend. Otherwise *do
            # not* reraise (since what's the point?)
            with excutils.save_and_reraise_exception(
                    reraise=not isinstance(e, exception.NoValidBackend)):
                try:
                    self._handle_failure(context, request_spec, e)
                finally:
                    common.error_out(volume, reason=e)
```

get_flow函数，创建ScheduleCreateVolumeTask

ScheduleCreateVolumeTask.execute函数，会调用driver_api.schedule_create_volume

4. **cinder\scheduler\filter_scheduler.py**

```python
    def schedule_create_volume(self, context, request_spec, filter_properties):
        backend = self._schedule(context, request_spec, filter_properties)

        if not backend:
            raise exception.NoValidBackend(reason=_("No weighed backends "
                                                    "available"))

        backend = backend.obj
        volume_id = request_spec['volume_id']

        updated_volume = driver.volume_update_db(context, volume_id,
                                                 backend.host,
                                                 backend.cluster_name)
        self._post_select_populate_filter_properties(filter_properties,
                                                     backend)

        # context is not serializable
        filter_properties.pop('context', None)

        self.volume_rpcapi.create_volume(context, updated_volume, request_spec,
                                         filter_properties,
                                         allow_reschedule=True)
```

FilterScheduler. schedule_create_volume函数，更新数据库，最后通过消息队列请求调用volume_rpcapi.create_volume。

#### Cinder-Volume过程

1. **/cinder/volume/rpcapi.py（此步还属于cinder-scheduler）**

```python
    def create_volume(self, ctxt, volume, request_spec, filter_properties,
                      allow_reschedule=True):
        cctxt = self._get_cctxt(volume.service_topic_queue)
        cctxt.cast(ctxt, 'create_volume',
                   request_spec=request_spec,
                   filter_properties=filter_properties,
                   allow_reschedule=allow_reschedule,
                   volume=volume)
```

VolumeAPI.create_volume会通过消息队列远程调用VolumeManager.create_volume

2. **/cinder/volume/manager.py**

```python
        def _run_flow():
            # This code executes create volume flow. If something goes wrong,
            # flow reverts all job that was done and reraises an exception.
            # Otherwise, all data that was generated by flow becomes available
            # in flow engine's storage.
            with flow_utils.DynamicLogListener(flow_engine, logger=LOG):
                flow_engine.run()
```

​ VolumeManager函数也使用flow来创建volume，执行CreateVolumeFromSpecTask这个任务

3. **/cinder/volume/flows/manager/create_volume.py**

```python
    def execute(self, context, volume, volume_spec):

        new_status = self.status_translation.get(volume_spec.get('status'),
                                                 'available')
        update = {
            'status': new_status,
            'launched_at': timeutils.utcnow(),
        }
        try:
            # TODO(harlowja): is it acceptable to only log if this fails??
            # or are there other side-effects that this will cause if the
            # status isn't updated correctly (aka it will likely be stuck in
            # 'creating' if this fails)??
            volume.update(update)
            volume.save()
            # Now use the parent to notify.
            super(CreateVolumeOnFinishTask, self).execute(context, volume)
        except exception.CinderException:
            LOG.exception("Failed updating volume %(volume_id)s with "
                          "%(update)s", {'volume_id': volume.id,
                                         'update': update})
        # Even if the update fails, the volume is ready.
        LOG.info("Volume %(volume_name)s (%(volume_id)s): "
                 "created successfully",
                 {'volume_name': volume_spec['volume_name'],
                  'volume_id': volume.id})
```

​ CreateVolumeFromSpecTask.excute，这个函数会根据创建的不同类别，去创建卷，例如调用create_raw_volume，最终会调用具体的driver进行卷的创建。

​ 在完成创卷后，CreateVolumeOnFinishTask这个任务，启动更新数据库，将卷更新为available状态。

​ 我们可以看到在创建卷的过程中盘的状态会从“creating”状态变为“available”状态。


