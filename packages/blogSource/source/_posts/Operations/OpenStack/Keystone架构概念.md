---
title: KeyStone架构相关概念
tags:
  - DevOps
categories:
  - Operations
  - OpenStack
toc: true
cover: /assets/images/imgs20190625084529.webp
abbrlink: ff1ba62b
date: 2017-09-12T11:20:08.000Z
thumbnail: /assets/thumbnail/imgs20190625084529.webp
---

# 服务(Services)

keyStone是在一个或多个端点(`Endpoint`)上对外开放的已租内部服务组织，这些服务中很多都是以组合的方式供给前端使用。例如，验证动作会调用认证服务去认证用户的凭据，如果成功，就会使用令牌服务返回一个令牌。

<!-- more -->

## 身份认证（identity）

身份认证服务提供对于用户和用户组的认证凭证和数据的验证。在基本情况下，允许它处理与此相关的所有CURD操作。在更复杂的情况下，数据是由一个更加独立的后端服务来管理。例如，认证服务的后端为LDAP时，就会出现这种情况，该情况下，LDAP服务用户提供数据，而认证服务只需要准确的传递信息。

身份服务提供了对用户和组的身份验证和数据。在基本情况下，该数据由身份服务管理，允许它处理与此数据相关的所有CRUD操作。在更复杂的情况下，数据由一个权威的后端服务来管理。当标识服务充当LDAP的前端时，就会出现这样的情况。在这种情况下，LDAP服务器是真理的来源，身份服务的角色是准确地传递信息。

### 用户（Users）

用户是API的单独使用者，用户必须要属于特定的域。所以，用户名并不需要全局唯一，只需要在域中唯一即可。

### 用户组（Groups）

组是一个用户的容器，一个组必须属于一个特定的域。因此，组的名字也不需要全局唯一，域中唯一即可。

## 资源（Resource）

资源服务提供关于项目和域的数据。

### 项目/租户（Projects /Tenants)

项目（在v2.0版本以前被称为租户）是一个OpenStack中的基本单元，OpenStack中的所有资源都属于某个特定的项目。项目本身又属于特定的域。同样，项目的名字不需要全局唯一，在域中唯一即可。OpenStack在部署时有一个默认的域，如果创建项目时没有指定域，新创建的项目会被添加到默认域中。

### 域（Domains）

域是一个项目、用户和用户组的高级容器。每种资源都被包含在某个域中。每个域都有一个命名空间，命名空间中有一个API可见的`name`
属性。KeyStone在部署时提供了一个默认的域，名字为`Default`。

在身份认证服务v3 版本的API中，名称属性的唯一性如下：

* `domain`，域，全局唯一。
* `Role Name`，角色名称，所属域中唯一。
* `User Name`，用户名，所属域中唯一。
* `Project Name`，项目名，所属域中唯一。
* `Group Name`，组名，所属域中唯一。

由于上述资源的结构特性，域也可以被用作是OpenStack管理资源的一种方式。如果想要一个域中的用户能够访问其他域中的资源，需要在策略上做一些配置或授权。

## 分配（Assignment）

授权服务提供角色和角色分配的相关操作。

### 角色（Roles）

角色是定义用户等级的方式，规定了用户可以获得的授权级别。角色可以在域或者项目商授权。也可以为单个用户或用户组分配角色。角色的名字在域中唯一。

### 角色分配（Role Assignments)

一个元组，包含角色信息(`Role`)、资源信息(`Resource`)和认证信息(`Idneity`)

## 令牌（Token）

当用户的凭证被验证成功时，会获得一个由令牌服务发放的令牌，用于对用户的请求鉴权。用户验证和管理用户。该令牌由令牌服务统一验证和管理。

## 目录（Catalog）

目录服务提供一种使用端点发现（`Endpoint discovery`）的方法管理端点注册（`endpoint registry`）的服务。

## 策略（Policy）

策略服务提供一种基于规则的认证引擎，并且负责这些规则的管理与分配。

# 应用结构（Application Construction)

`Keystone`是一个使用Http作为前端的服务。就像其他OpenStack应用一样，使用Python-Paste模块配置的WSGI接口与应用。应用中的Http端点使用WSGI的pipelines组成，如：

```yaml
[ pipeline:api_v3 ]
  pipeline = healthcheck cors sizelimit http_proxy_to_wsgi osprofiler url_normalize request_id build_auth_context token_auth json_body ec2_extension_v3 s3_extension service_v3
```

使用 [`keystone.common.wsgi.ComposingRouter`](https://docs.openstack.org/keystone/pike/api/keystone.common.html#keystone.common.wsgi.ComposingRouter)
的子类的返回结果生成Urls链接到控制端（一个[`keystone.common.wsgi.Application`](https://docs.openstack.org/keystone/pike/api/keystone.common.html#keystone.common.wsgi.Application)
的子类)
。每个控制端会加载一个或者多个管理器（例如：[`keystone.catalog.core.Manager`](https://docs.openstack.org/keystone/pike/api/keystone.catalog.html#keystone.catalog.core.Manager)
），这是一个浅层的包装类，它根据关键配置加载适当的服务驱动程序。

- 分配

> - [`keystone.assignment.controllers.GrantAssignmentV3`](https://docs.openstack.org/keystone/pike/api/keystone.assignment.html#keystone.assignment.controllers.GrantAssignmentV3)
> - [`keystone.assignment.controllers.ImpliedRolesV3`](https://docs.openstack.org/keystone/pike/api/keystone.assignment.html#keystone.assignment.controllers.ImpliedRolesV3)
> - [`keystone.assignment.controllers.ProjectAssignmentV3`](https://docs.openstack.org/keystone/pike/api/keystone.assignment.html#keystone.assignment.controllers.ProjectAssignmentV3)
> - [`keystone.assignment.controllers.TenantAssignment`](https://docs.openstack.org/keystone/pike/api/keystone.assignment.html#keystone.assignment.controllers.TenantAssignment)
> - [`keystone.assignment.controllers.Role`](https://docs.openstack.org/keystone/pike/api/keystone.assignment.html#keystone.assignment.controllers.Role)
> - [`keystone.assignment.controllers.RoleAssignmentV2`](https://docs.openstack.org/keystone/pike/api/keystone.assignment.html#keystone.assignment.controllers.RoleAssignmentV2)
> - [`keystone.assignment.controllers.RoleAssignmentV3`](https://docs.openstack.org/keystone/pike/api/keystone.assignment.html#keystone.assignment.controllers.RoleAssignmentV3)
> - [`keystone.assignment.controllers.RoleV3`](https://docs.openstack.org/keystone/pike/api/keystone.assignment.html#keystone.assignment.controllers.RoleV3)

- 认证

> - [`keystone.auth.controllers.Auth`](https://docs.openstack.org/keystone/pike/api/keystone.auth.html#keystone.auth.controllers.Auth)

- 目录

> - [`keystone.catalog.controllers.EndpointFilterV3Controller`](https://docs.openstack.org/keystone/pike/api/keystone.catalog.html#keystone.catalog.controllers.EndpointFilterV3Controller)
> - [`keystone.catalog.controllers.EndpointGroupV3Controller`](https://docs.openstack.org/keystone/pike/api/keystone.catalog.html#keystone.catalog.controllers.EndpointGroupV3Controller)
> - [`keystone.catalog.controllers.EndpointV3`](https://docs.openstack.org/keystone/pike/api/keystone.catalog.html#keystone.catalog.controllers.EndpointV3)
> - [`keystone.catalog.controllers.ProjectEndpointGroupV3Controller`](https://docs.openstack.org/keystone/pike/api/keystone.catalog.html#keystone.catalog.controllers.ProjectEndpointGroupV3Controller)
> - [`keystone.catalog.controllers.RegionV3`](https://docs.openstack.org/keystone/pike/api/keystone.catalog.html#keystone.catalog.controllers.RegionV3)
> - [`keystone.catalog.controllers.ServiceV3`](https://docs.openstack.org/keystone/pike/api/keystone.catalog.html#keystone.catalog.controllers.ServiceV3)

- 凭证

> - [`keystone.contrib.ec2.controllers.Ec2ControllerV3`](https://docs.openstack.org/keystone/pike/api/keystone.contrib.ec2.html#keystone.contrib.ec2.controllers.Ec2ControllerV3)
> - [`keystone.credential.controllers.CredentialV3`](https://docs.openstack.org/keystone/pike/api/keystone.credential.html#keystone.credential.controllers.CredentialV3)

- 联结

> - [`keystone.federation.controllers.IdentityProvider`](https://docs.openstack.org/keystone/pike/api/keystone.federation.html#keystone.federation.controllers.IdentityProvider)
> - [`keystone.federation.controllers.FederationProtocol`](https://docs.openstack.org/keystone/pike/api/keystone.federation.html#keystone.federation.controllers.FederationProtocol)
> - [`keystone.federation.controllers.MappingController`](https://docs.openstack.org/keystone/pike/api/keystone.federation.html#keystone.federation.controllers.MappingController)
> - [`keystone.federation.controllers.ServiceProvider`](https://docs.openstack.org/keystone/pike/api/keystone.federation.html#keystone.federation.controllers.ServiceProvider)
> - [`keystone.federation.controllers.SAMLMetadataV3`](https://docs.openstack.org/keystone/pike/api/keystone.federation.html#keystone.federation.controllers.SAMLMetadataV3)

- 身份认证

> - [`keystone.identity.controllers.GroupV3`](https://docs.openstack.org/keystone/pike/api/keystone.identity.html#keystone.identity.controllers.GroupV3)
> - [`keystone.identity.controllers.UserV3`](https://docs.openstack.org/keystone/pike/api/keystone.identity.html#keystone.identity.controllers.UserV3)

- 策略

> - [`keystone.policy.controllers.PolicyV3`](https://docs.openstack.org/keystone/pike/api/keystone.policy.html#keystone.policy.controllers.PolicyV3)

- 资源

> - [`keystone.resource.controllers.DomainV3`](https://docs.openstack.org/keystone/pike/api/keystone.resource.html#keystone.resource.controllers.DomainV3)
> - [`keystone.resource.controllers.DomainConfigV3`](https://docs.openstack.org/keystone/pike/api/keystone.resource.html#keystone.resource.controllers.DomainConfigV3)
> - [`keystone.resource.controllers.ProjectV3`](https://docs.openstack.org/keystone/pike/api/keystone.resource.html#keystone.resource.controllers.ProjectV3)

- 撤销

> - [`keystone.revoke.controllers.RevokeController`](https://docs.openstack.org/keystone/pike/api/keystone.revoke.html#keystone.revoke.controllers.RevokeController)

- 信任

> - [`keystone.trust.controllers.TrustV3`](https://docs.openstack.org/keystone/pike/api/keystone.trust.html#keystone.trust.controllers.TrustV3)

# 服务后端（Service Backends）

后端服务可以通过配置允许Keystone适应不同的环境与需求。每个服务的后端驱动可以在`keystone.conf`
配置文件中相应服务的分组中使用关键字`driver`定义。

每个后端都存在一个通用类，为任何实现提供一个抽象基类，并标识预期的服务实现。抽象基类存储在服务的后端目录中，如`base.py`
。相应的服务驱动程序是:

- [`keystone.assignment.backends.base.AssignmentDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.assignment.backends.html#keystone.assignment.backends.base.AssignmentDriverBase)
- [`keystone.assignment.role_backends.base.RoleDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.assignment.role_backends.html#keystone.assignment.role_backends.base.RoleDriverBase)
- [`keystone.auth.plugins.base.AuthMethodHandler`](https://docs.openstack.org/keystone/pike/api/keystone.auth.plugins.html#keystone.auth.plugins.base.AuthMethodHandler)
- [`keystone.catalog.backends.base.CatalogDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.catalog.backends.html#keystone.catalog.backends.base.CatalogDriverBase)
- [`keystone.credential.backends.base.CredentialDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.credential.backends.html#keystone.credential.backends.base.CredentialDriverBase)
- [`keystone.endpoint_policy.backends.base.EndpointPolicyDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.endpoint_policy.backends.html#keystone.endpoint_policy.backends.base.EndpointPolicyDriverBase)
- [`keystone.federation.backends.base.FederationDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.federation.backends.html#keystone.federation.backends.base.FederationDriverBase)
- [`keystone.identity.backends.base.IdentityDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.identity.backends.html#keystone.identity.backends.base.IdentityDriverBase)
- [`keystone.identity.mapping_backends.base.MappingDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.identity.mapping_backends.html#keystone.identity.mapping_backends.base.MappingDriverBase)
- [`keystone.identity.shadow_backends.base.ShadowUsersDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.identity.shadow_backends.html#keystone.identity.shadow_backends.base.ShadowUsersDriverBase)
- [`keystone.oauth1.backends.base.Oauth1DriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.oauth1.backends.html#keystone.oauth1.backends.base.Oauth1DriverBase)
- [`keystone.policy.backends.base.PolicyDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.policy.backends.html#keystone.policy.backends.base.PolicyDriverBase)
- [`keystone.resource.backends.base.ResourceDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.resource.backends.html#keystone.resource.backends.base.ResourceDriverBase)
- [`keystone.resource.config_backends.base.DomainConfigDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.resource.config_backends.html#keystone.resource.config_backends.base.DomainConfigDriverBase)
- [`keystone.revoke.backends.base.RevokeDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.revoke.backends.html#keystone.revoke.backends.base.RevokeDriverBase)
- [`keystone.token.providers.base.Provider`](https://docs.openstack.org/keystone/pike/api/keystone.token.providers.html#keystone.token.providers.base.Provider)
- [`keystone.trust.backends.base.TrustDriverBase`](https://docs.openstack.org/keystone/pike/api/keystone.trust.backends.html#keystone.trust.backends.base.TrustDriverBase)

如果您需要实现一个关键服务的后端驱动，应该从上述类中继承。

## 模板后端（Templated Backend）

主要是为keystone项目中服务目录的常见用例设计的，模板后端是一个目录后端，它可以扩展预先配置的模板来提供目录数据。

如：`paste.deploy` 的配置（使用 `$` 代替`%` 避免冲突)

```
[DEFAULT]
catalog.RegionOne.identity.publicURL = http://localhost:$(public_port)s/v2.0
catalog.RegionOne.identity.adminURL = http://localhost:$(public_port)s/v2.0
catalog.RegionOne.identity.internalURL = http://localhost:$(public_port)s/v2.0
catalog.RegionOne.identity.name = 'Identity Service'

```

# 数据模型（Data Model）

Keystone的设计初衷是为了满足多种不同类型的后端。因此，许多方法和数据类型更倾向于接受数据并将这些数据传递到后端，而不是直接处理数据。

下面是一些主要的数据类型：

> - **User**: 包含账户凭证，会被分配给多个项目或域。
> - **Group**: 用户的容器，会被分配给一个或多个项目或域。
> - **Project**: 资源范围单位，包含一个或者多个用户。
> - **Domain**: 资源范围单位，包含用户、用户组和项目。
> - **Role**: 与许多用户项目对相关联的一级元数据。
> - **Token**: 身份认证凭据，分配给用户或者项目。
> - **Extras**: 关于用户-项目的键值对形式元数据的容器。
> - **Rule**: 用于描述用户操作时的一些需求。

当通用数据模型允许用户和用户组到项目和域的多对多关系时，对后端实现会有不同程度的优势。

# CURD方法（Approach to CRUD）

虽然在大型公司的生产环境中会使用自身的用户与用户组，但是为了开发和测试，Keystone还是体用的关于用户与用户在的CURD操作方法。

CURD操作应该被当做一种针对核心功能的扩展或者附加功能，因为它不需要后台的支持。如果后端不需要CURD操作，会提升[`keystone.exception.NotImplemented`](https://docs.openstack.org/keystone/pike/api/keystone.html#keystone.exception.NotImplemented)
的性能。

# 鉴权方法（Approach to Authorization/Policy)

用户能否访问系统中的各种组件并进行操作，需要根据用户授权而决定。

对于keystone来说，只需要检查几层授权就可以了:

> - 要求执行的用户被认为是管理员。
> - 用户权限与用户执行的操作匹配。

希望使用策略引擎以外的其他检查方式，需要编写自定义的后端。在默认情况下，keystone利用`oslo.policy`维护其策略。

## 规则（Rules）

给出一个匹配列表并且对其进行检查期凭证是否匹配。如：

```yaml
credentials = {'user_id': 'foo', 'is_admin': 1, 'roles': ['nova:netadmin']}

# An admin only call:
policy_api.enforce(('is_admin:1',), credentials)

# An admin or owner call:
policy_api.enforce(('is_admin:1', 'user_id:foo'), credentials)

# A netadmin call:
policy_api.enforce(('roles:nova:netadmin',), credentials)
```

凭证生成后存储在认证API的`extras`中的用户元数据中。所以，如果要给用户添加一个角色，是需要将角色信息添加到用户的元数据中。

## RBAC能力（Capability RBAC）

> 还未被实现

另一种实现鉴权的方式是基于行为的，通过一个包含允许动作的角色。如：

```python
credentials = {'user_id': 'foo', 'is_admin': 1, 'roles': ['nova:netadmin']}

# add a policy
policy_api.add_policy('action:nova:add_network', ('roles:nova:netadmin',))

policy_api.enforce(('action:nova:add_network',), credentials)
```

在后端，会查找名为`action:nova:addnetwork`的策略，然后执行有“简单匹配”来匹配凭证。

# 认证方法（Approach to Authentication）

keystone使用 [`keystone.auth.plugins.base`](https://docs.openstack.org/keystone/pike/api/keystone.auth.plugins.html#module-keystone.auth.plugins.base)
提供了几种鉴权插件，如下：

- [`keystone.auth.plugins.external.Base`](https://docs.openstack.org/keystone/pike/api/keystone.auth.plugins.html#keystone.auth.plugins.external.Base)
- [`keystone.auth.plugins.mapped.Mapped`](https://docs.openstack.org/keystone/pike/api/keystone.auth.plugins.html#keystone.auth.plugins.mapped.Mapped)
- [`keystone.auth.plugins.oauth1.OAuth`](https://docs.openstack.org/keystone/pike/api/keystone.auth.plugins.html#keystone.auth.plugins.oauth1.OAuth)
- [`keystone.auth.plugins.password.Password`](https://docs.openstack.org/keystone/pike/api/keystone.auth.plugins.html#keystone.auth.plugins.password.Password)
- [`keystone.auth.plugins.token.Token`](https://docs.openstack.org/keystone/pike/api/keystone.auth.plugins.html#keystone.auth.plugins.token.Token)
- [`keystone.auth.plugins.totp.TOTP`](https://docs.openstack.org/keystone/pike/api/keystone.auth.plugins.html#keystone.auth.plugins.totp.TOTP)

最基础的插件是`password`，需要提供两块内容： `Resource`和`Identity`信息。

如果使用下列信息作为认证凭据提交（Post方式）：

```json
{
    "auth": {
        "identity": {
            "methods": [
                "password"
            ],
            "password": {
                "user": {
                    "id": "0ca8f6",
                    "password": "secretsecret"
                }
            }
        },
        "scope": {
            "project": {
                "id": "263fd9"
            }
        }
    }
}
```

意味着一个用户(ID 为 0ca8f6) 尝试获取一个具有项目（ID 为 263fd9）授权的令牌。

如果要将ID换做名称来调用，则需要提供相应的域信息。这是因为用户名仅在指定的域中才唯一，但是整个部署过程中，用户的ID是全局唯一的。所以，凭证就变成了下面这个样子：

```json
{
    "auth": {
        "identity": {
            "methods": [
                "password"
            ],
            "password": {
                "user": {
                    "domain": {
                        "name": "acme"
                    }
                    "name": "userA",
                    "password": "secretsecret"
                }
            }
        },
        "scope": {
            "project": {
                "domain": {
                    "id": "1789d1"
                },
                "name": "project-x"
            }
        }
    }
}
```

同样，必须要提供域的ID或者域名，才能正确的找到用户与项目。

如果要使用命令行直接操作，则需要设置一下的环境变量。

```shell
$ export OS_PROJECT_DOMAIN_ID=1789d1
$ export OS_USER_DOMAIN_NAME=acme
$ export OS_USERNAME=userA
$ export OS_PASSWORD=secretsecret
$ export OS_PROJECT_NAME=project-x
```

值得注意的是，用户尝试要访问的项目必须要和用户在同一域下。

## Scope是什么（What is Scope?）

`Scope`是一个重载的术语。

在提到身份验证时，正如上面所看到的，`Scope`是指决定用户想要访问的`Resource`（项目或域）需要作为在POST请求中的一部分提供。

对于令牌来说，Scope是指令牌的有效范围，一个Scope令牌只针对最初授权的项目有用。Scope令牌可以用来执行关于授权于的相关操作。

对于用户、用户组和项目来说，Scope通常指的是实体范围，如，某个域的用户其权限就是该个域。
