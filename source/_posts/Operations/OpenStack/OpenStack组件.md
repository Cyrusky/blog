---
title: OpenStack组件介绍
tags:
  - OpenStack
  - Develop
categories:
  - Operations
  - OpenStack
toc: true
cover: '/assets/images/imgs20190625084623.webp'
abbrlink: 85ee5d93
date: 2018-07-10 15:55:59
---

# KeyStone (OpenStack Identity Service)

Keystone(OpenStackIdentity Service)是OpenStack框架中，负责身份验证、服务规则和服务 令牌的功能，它实现了OpenStack的Identity
API。

<!-- more -->

Keystone可以分解为两个核心功能，单点登录和服务发现。Keystone类似一个服务总线，或者说是
整个Openstack框架的注册表，其他服务通过Keystone来注册其服务的Endpoint(服务访问的 URL)
，任何服务之间相互的调用，都需要经过Keystone的身份验证，以获得目标服务的Endpoint 来找到目标服务。

## keystone组件基本概念

> * `User `
> * `Tenant`
> * `Role`
> * `Service`(`nova`,`glance`,`swift`等服务需要在`keystone`上注册) `Endpoint`(`service`暴露出来的访问地址)
> * `Token`(访问资源的令牌，具有时效性)

## keystone在创建vm访问流程示例

![](/assets/images/imgs-OpenStack组件-2019-6-25-11-2-18.webp)

## keystone常用命令介绍

* 查看`Tenant/Project`列表

  ```shell
  $ keystone tenant-list
  ```

* 创建一个`租户`，指定名字 `$TenantName`

* ```shell
  $ keystone tenant-create --name $TenantName
  ```

* 删除一个`tanant`，需指定`tenant id`

* ```shell
  $ keystone tenant-delete $TenantName
  ```

* 列出所有角色

* ```shell
  $ keystone role-list
  ```

* 创建角色，角色名为`$RoleName`

* ```shell
  $ keystone role-create --name $RoleName
  ```

* 将指定用户`$UserName`以指定的角色`$RoleName`(通过`$ keystone role-list`获得)， 加入指定`$ TenantName` (
  通过`keystone tenant-list`获得)

  ```shell
  $ keystone user-role-add --user $UserName --role $RoleName --tenant $TenantName 
  ```

* 创建某一个`tenant`下的用户

* ```shell
  # 使用tenant_id keystone tenant-list 查看tenant_id
  keystone user-create --name $UserName --tenant $TenantID --pass $PassWrod --emai $UserEmail
  ```

* 查看用户列表

* ```shell
  $ keystone user-list
  ```

* 获取用户详细信息，需要先获取`user_id`，然后指定`tenant_id`

* ```shell
  $ keystone user-get $UserID 
  ```

* 更新用户名密码

* ```Shell
  $ keystone user-password-update --pass $NewPassword $UserName 
  ```

* 查看服务注册信息

* ```shell
  $ keystone service-list
  ```

* 查看服务访问路径

  ```shell
  $ keystone endpoint-list 
  ```

## keystone服务及日志

启动`KeyStone`服务

```shell
$ systemctl status openstack-keystone
```

`keystone`日志存放位置

```shell
/var/log/keystone/keystone.log
```

# nova(OpenStack Compute Service)

## 组件基本概念介绍

> `server`(`instance`)
>
> `Flavor`
>
> `Image`
>
> `rebuild`: remove all data on the server and replace it with the specified image.the server id and ip address remain
> the same
>
> `resize`: converts an existing server to a different flavor

## nova相关服务介绍

* ***nova-api***: 负责接受和响应终端用户有关虚拟机和云硬盘的请求，`nova-api`是整个`nova`的入口。它
  接受用户请求，将指令发送至消息队列，由相应的服务执行相关的指令消息。
* ***nova-conductor***: 提供数据库访问和其他`Openstack`服务方法，处理不同版本的服务的兼容性问题，
  同时处理需要长时间处理的情况，如`instance`在线迁移等。
* ***nova-scheduler***: 通过追踪资源使用情况，提供完成`request`的最佳的`host`。*( This service provides compute request
  scheduling by tracking available resources, and finding the host that can best fulfill the request)*
* ***nova-compute***: 是主要的执行守护进程，职责是基于各种虚拟化技术`Hyperivisor`实现创建和终止 虚拟机。`nova-compute`
  有两个工作，接受消息队列中的执行指令，并执行相关指令，如部署虚拟机。 维护数据库相关模型的状态数据。

## `Nova`架构

![](/assets/images/imgs-OpenStack组件-2019-6-25-11-2-24.webp)

## 虚拟机创建过程

`nova-api`对外统一提供标准化接口，各子模块，如计算资源，存储资源和网络资源子模块通过相应的`API`接口服务对外提供服务。

> [参考资料](https://blog.csdn.net/u010305706/article/details/52206175)

![](/assets/images/imgs-OpenStack组件-2019-6-25-11-2-35.webp)


> 1. **Dashboard** or **CLI** gets the user credential and does the REST call to **Keystone** for authentication.
> 2. **Keystone** authenticate the credentials and generate & send back auth-token which will be used for sending
     request to other Components through REST-call.
> 3. **Dashboard** or **CLI** convert the new instance request specified in ‘launch instance’ or ‘nova-boot’ form to
     REST API request and send it to **nova-api.**
> 4. **nova-api** receive the request and sends the request for validation auth-token and access permission to *
     *keystone**.
> 5. **Keystone** validates the token and sends updated auth headers with roles and permissions.
> 6. **nova-api** interacts with **nova-database**.
> 7. Creates initial db entry for new instance.
> 8. **nova-api** sends the *rpc.call* request to **nova-scheduler** excepting to get updated instance entry with host
     ID specified.
> 9. **nova-scheduler** picks the request from the **queue**.
> 10. **nova-scheduler** interacts with **nova-database** to find an appropriate host via filtering and weighing.
> 11. Returns the updated instance entry with appropriate host ID after filtering and weighing.
> 12. **nova-scheduler** sends the *rpc.cast* request to **nova-compute** for ‘launching instance’ on appropriate host .
> 13. **nova-compute** picks the request from the **queue**.
> 14. **nova-compute** send the *rpc.call* request to **nova-conductor** to fetch the instance information such as host
      ID and flavor( Ram , CPU ,Disk).
> 15. **nova-conductor** picks the request from the **queue**.
> 16. **nova-conductor** interacts with **nova-database.**
> 17. Return the instance information.
> 18. **nova-compute** picks the instance information from the **queue**.
> 19. **nova-compute** does the REST call by passing auth-token to **glance-api**  to get the Image URI by Image ID from
      glance and upload image from image storage.
> 20. **glance-api** validates the auth-token with **keystone.**
> 21. **nova-compute** get the image metadata.
> 22. **nova-compute** does the REST-call by passing auth-token to **Network API** to allocate and configure the network
      such that instance gets the IP address.
> 23. **quantum-server** validates the auth-token with **keystone**.
> 24. **nova-compute** get the network info.
> 25. **nova-compute** does the REST call by passing auth-token to **Volume API** to attach volumes to instance.
> 26. **cinder-api** validates the auth-token with **keystone**.
> 27. **nova-compute** gets the block storage info.
> 28. **nova-compute** generates data for hypervisor driver and executes request on Hypervisor( via **libvirt** or **api
      **).
>
> The table represents the Instance state at various steps during the provisioning :
>
> | **Status** | **Task**             | **Power state** | **Steps** |
> | ---------- | -------------------- | --------------- | --------- |
> | Build      | scheduling           | None            | 3-12      |
> | Build      | networking           | None            | 22-24     |
> | Build      | block_device_mapping | None            | 25-27     |
> | Build      | spawing              | None            | 28        |
> | Active     | none                 | Running         |           |

## vm状态的介绍

* `Initialized(building)`:初始化，虚拟机在准备创建
* `active`:虚拟机运行中
* `Paused`:虚拟机暂停，依然占用计算和内存资源
* `Suspended`:虚拟机挂起，不占用计算和内存资源
* `Stop`: 虚拟机停止运行
* `Resized`: 虚拟机在源节点停止，在目标结点运行

## nova命令行介绍

```shell
# 查看Nova服务列表
$ nova service-list
# 查看实例(Instance)列表
$ nova list --all-tenant
# 查看单个实例(Instance)
$ nova show instance_uuid 
# 查看服务器规格列表(Flavor)
$ nova flavor-list
# 启动一个实例(Instance)
$ nova boot
# 删除一个实例(Instance)
$ nova delete
```

## nova日志的查看

```shell
# Nova日志目录
# 1. For Nova-api
/var/log/nova/nova-api.log
# 2. For nova-conductor
/var/log/nova/nova-conductor.log
# 3. For nova-scheduler
/var/log/nova/nova-scheduler.log
# 4. For nova-compute
/var/log/nova/nova-compute.log
```

# Glance( OpenStack Image Service)

## 什么是Glance

`glance`即`image service`（镜像服务），是为虚拟机的创建提供镜像服务

## 为什么要有Glance？

基于`openstack`是构建基本的`Iaas`平台对外提供虚机，而虚机在创建的时候必须为其选择操作系统，`glance`服务器就是为该选择提供不同的系统镜像

## 功能

`glance`服务使用户能够发现，注册，检索虚拟机的镜像，它提供一个能够查询虚拟机镜像元数据和检索真实镜像的`REST API`

具体的，`REST API`的体现就是一个`URI`，而在`glance`中通过一个`URI`地址来唯一标示一个镜像的形式如 下：

```xml
<Glance Server Location>/V1/images/</ID>
```

## glance命令介绍

```shell
# 创建一个镜像
$ glance image-create
# 删除一个镜像
$ glance image-delete
# 下载一个镜像
$ glance image-download
# 列出所有镜像
$ glance image-list
# 显示镜像的详细信息
$ glance image-show
# 更新镜像元数据
$ glance image-update
```

## glance日志查看

镜像服务Glance的日志默认存放在/var/log/glance目录中

```shell
# Glance API相关的日志
- api.log
# Glance registry服务相关的日志
- registry.log
```

# Neutron(OpenStack Network Service)

## neutron基本概念介绍

​ 传统的网络管理方式很大程度上依赖于管理员手工配置和维护各种网络硬件设备；而云环境下的网络
已经变得非常复杂，特别是在多租户场景里，用户随时都可能需要创建、修改和删除网络，网络的连 通性和隔离已经不太可能通过手工配置来保证了。

​ 如何快速响应业务的需求对网络管理提出了更高的要求。传统的网络管理方式已经很难胜任这项工作，
而“软件定义网络（`software-defined networking`, `SDN`）”所具有的灵活性和自动化优势使其成为 云时代网络管理的主流。

​ 网络服务`Neutron`的设计目标是实现“网络即服务（`Networking as a Service`）”。为了达到这一目标，在设 计上遵循了基于 `SDN`
实现网络虚拟化的原则，在实现上充分利用了`Linux`系统上的各种网络相关的技术。

​ 网络服务`Neutron`为整个`OpenStack`环境提供网络支持，包括

* 二层交换
* 三层路由
* 负载均衡
* 防火墙
* VPN
* etc...

## Neutorn的常用命令

```shell
# 列出当前租户所有的网络：
$ neutron net-list
# 列出所有租户的所有网络（需要管理员权限）：
$ neutron net-list --all-tenants
# 创建一个网络：
$ neutron net-create public_net_32 \ 
			--provider:network_type vlan \
			--provider:physical_network physnet1 \
			--provider:segmentation_id 32 \
			--tenant-id <tenant-id>
# 查看一个网络的详细信息：
$ neutron net-show <name-or-id>
# 删除一个网络：
$ neutron net-delete <name-or-id>
# 创建一个子网：
$ neutron subnet-create public_net_32 10.192.32.0/24 \
			--gateway_ip 10.192.32.254 \
			--dns_nameservers list=true \
			114.114.114.114 8.8.8.8 \
			--tenant-id <tenant-id>
# 列出所有的agent
$ neutron agent-list
```

## neutron查看日志

网络服务Neutron的日志默认存放在/var/log/neutron目录中

```shell
# 关于dhcp-agent的日志
- dhcp-agent.log
# 与l3代理及其功能相关的日志
- l3-agent.log
# 通过neutron代理给Nova元数据服务的相关日志
- metadata-agent.log
# 与openvswitch相关操作的日志项，在具体实现OpenStack网络 时，如果使用了不同的插件，就会有相应的日志文件名
- openvswitch-agent.log
# 与Neutron API服务相关的日志
- server.log
```

# 参考资料

> 1. [Request Flow for Provisioning Instance in Openstack](https://ilearnstack.com/2013/04/26/request-flow-for-provisioning-instance-in-openstack/)
> 2. [OpenStack CLI Document Index](https://docs.openstack.org/python-openstackclient/latest/genindex.html)
> 3. [别以为真懂Openstack: 虚拟机创建的50个步骤和100个知识点](https://www.cnblogs.com/popsuper1982/p/3927390.html)

