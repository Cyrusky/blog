---
title: OpenStack相关服务端口
tags:
  - DevOps
categories:
  - Operations
  - OpenStack
toc: true
cover: /assets/images/imgs20190625084604.webp
abbrlink: e3b04838
date: 2017-10-25T08:50:44.000Z
thumbnail: /assets/thumbnail/imgs20190625084604.webp
---

## openstack组件使用的默认端口号

<!-- more -->

| openstack service                                                               | default ports    | port type              |
|---------------------------------------------------------------------------------|------------------|------------------------|
| Block Storage (**cinder**)                                                      | 8776             | publicurl and adminurl |
| Compute (**nova**) endpoints                                                    | 8774             | publicurl and adminurl |
| Compute API (**nova-api**)                                                      | 8773, 8775       |                        |
| Compute ports for access to virtual machine consoles                            | 5900-5999        |                        |
| Compute VNC proxy for browsers ( **openstack-nova-novncproxy**)                 | 6080             |                        |
| Compute VNC proxy for traditional VNC clients (**openstack-nova-xvpvncproxy**)  | 6081             |                        |
| Proxy port for HTML5 console used by Compute service                            | 6082             |                        |
| Data processing service (**sahara**) endpoint                                   | 8386             | publicurl and adminurl |
| Identity service (**keystone**) administrative endpoint                         | 35357            | adminurl               |
| Identity service public endpoint                                                | 5000             | publicurl              |
| Image service (**glance**) API                                                  | 9292             | publicurl and adminurl |
| Image service registry                                                          | 9191             |                        |
| Networking (**neutron**)                                                        | 9696             | publicurl and adminurl |
| Object Storage (**swift**)                                                      | 6000, 6001, 6002 |                        |
| Orchestration (**heat**) endpoint                                               | 8004             | publicurl and adminurl |
| Orchestration AWS CloudFormation-compatible API (**openstack-heat-api-cfn**)    | 8000             |                        |
| Orchestration AWS CloudWatch-compatible API (**openstack-heat-api-cloudwatch**) | 8003             |                        |
| Telemetry (**ceilometer**)                                                      | 8777             | publicurl and adminurl |

## 非openstack组件使用的默认端口号

| openstack service             | default ports | used by                                                                            |
|-------------------------------|---------------|------------------------------------------------------------------------------------|
| HTTP                          | 80            | OpenStack dashboard (Horizon) when it is not configured to use secure access.      |
| HTTP alternate                | 8080          | OpenStack Object Storage (swift) service.                                          |
| HTTPS                         | 443           | Any OpenStack service that is enabled for SSL, especially secure-access dashboard. |
| rsync                         | 873           | OpenStack Object Storage. Required.                                                |
| iSCSI target                  | 3260          | OpenStack Block Storage. Required.                                                 |
| MySQL database service        | 3306          | Most OpenStack components.                                                         |
| Message Broker (AMQP traffic) | 5672          | OpenStack Block Storage, Networking, Orchestration, and Compute.                   |

理清openstack各个服务的端口，对学习openstack有很大的帮助。

## 参考链接：

<http://docs.openstack.org/kilo/config-reference/content/firewalls-default-ports.html>
