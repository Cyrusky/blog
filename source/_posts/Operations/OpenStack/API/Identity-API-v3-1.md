---
title: Identity API v3 (CURRENT)(一)
tags:
  - OpenStackApi
  - Development
categories:
  - Operations
  - OpenStack
toc: true
abbrlink: 240d4391
date: 2017-09-06 09:18:28
---

#### [原文地址](https://developer.openstack.org/api-ref/identity/v3/)

认证服务（Identity）生成一套令牌（Token）来授权用户访问OpenStack Restful Api。用户以授权令牌和服务端点（URL Endpoint）作为有效凭证访问其他服务的API。

每次访问一个OpenStack的API，都要提供名为X-Auth-Token，值为Token的访问头。

<!-- more -->

大多数的OpenStack项目都是以基于角色的访问控制（Role-Based Access Control，RBAC）作为规则来访问。

这些规则以JSON文件方式存放，并将JSON文件的名称和路径写入了认证服务配置的文件中。

值得注意的是，V3 API支持GET方式访问的HTTP访问头。每个访问使用相同的HTTP头部与状态进行通信。

更多关于认证服务的信息，请查阅在OpenStack管理手册中查看[Identity API protection with role-based access control (RBAC)](https://docs.openstack.org/keystone/latest/admin/identity-service-api-protection.html)

## 3.8版API更新内容

- 允许服务用户（service user）获取有过期时间的Token
- 在用户列表和用户组列表功能中，添加了一个`password_expires_at`参数

## 3.7版API更新内容

- 在用户相应对象中添加了`password_expires_at`参数

- 引入一个标志来绕过过期（Expire）和撤销（Revocation）检查。

## 关联项

下面的操作中的条目包含一个关系链接，它看起来是一个有效的URI，但是这些实际上是URN(统一的资源名)，它与GUID类似，只是使用了URI语法，以便更容易被读取。这些关系链接并不能解决任何有效的问题，仅用作显示关系。

## 凭证（Authentication）与令牌管理

认证服务生成了一些令牌用于交换身份验证凭证。令牌表示用户身份已验证的身份，并可以选择性地授予对特定项目或域。

再认证请求中必须明确提供密码或令牌、作为认证凭证，同时可以选择认证授权范围。你可以将一个令牌授权给一个项目或者一个域，或什么范围都不指定。但不能同时将同一个令牌授权于一个项目或一个域。

令牌也拥有ID，并且在API响应头中以`X-Subject-Token`作为名字返回。

此外，可以验证一个令牌，包括令牌可访问的域或项目，令牌可访问的服务端点（EndPoint），也可以立即强制性销毁一个令牌。

当你拥有一个令牌时，你可以进行以下操作：

- 在请求头中以 `X-Auth-Token` 方式提供该令牌，以访问其他服务提供的RestAPI。
- 验证该令牌，包括其授权项目或域、授权服务端点。
- 使用该令牌请求可以访问其他项目或域的新令牌。
- 立即强制性销毁该令牌。


- 列出被撤销的公钥基础设施(PKI)令牌。

在认证服务3.7版本中，添加了两个新的配置选项，叫做`[resource] admin_project_name` 和`[resource] admin_project_domain_name`。这两个选项在标识了只有云管理员才能访问的项目，这样会在令牌相应参数中添加一个额外的字段`{is_admin_project: True}`。该字段可以在写入策略规则（Policy rules）时可以作为附加字段写入。

已超时的令牌被当做是无效令牌。部署时可以决定令牌可以被存储多长时间。

在验证身份时可能会出现以下错误：

| 响应代码                 | 描述                                       |
| -------------------- | ---------------------------------------- |
| `Bad Request (400)`  | 身份服务未能像预期的那样解析请求。可能原因是：1、缺少一个必需的属性。2、指定了一个不被允许的属性，例如一个基本CRUD操作中的POST请求上的ID。3、指定了一个意外数据类型的属性。 |
| `Unauthorized (401)` | 可能原因如下：1、未进行认证。2、凭证无效，给定的 `X-Auth-Token` 头错误或无效。3、凭据无效。 |
| `Forbidden (403)`    | 凭据虽然有效，但是凭据没有进行该操作的权限。                   |
| `Not Found (404)`    | 应用实体的ID不能被找到。对于一个POST请求，引用的实体可以在请求体中指定，而不是在URL中指定。 |
| `Conflict (409)`     | 常见于POST或者PATCH操作。如：请求想要修改一个唯一属性，但这个属性与其他实体冲突或相同。或者请求想要创建已经存在的唯一值。又或者如：两次请求想要创建一个想用的用户。 |

## 认证与令牌相关

### 通过密码进行未指定授权范围的认证

```shell
[post] /v3/auth/tokens
```

* 关系项: `https://docs.openstack.org/api/openstack-identity/3/rel/auth_tokens`
* 认证一个请求，并生成一个令牌。使用密码作为认证方式。该认证方式获取的令牌**未授权访问范围**。
* 请求体必须包含有效的认证凭据：密码，并通过ID或者用户名指定用户。
* 正常返回代码：`201`
* 可能产生的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

| 参数名                  | 位置   | 类型     | 描述                                       |
| -------------------- | ---- | ------ | ---------------------------------------- |
| nocatalog (Optional) | URL  | string | (v3.1以后) 响应信息是否包含目录，默认包含目录               |
| domain               | body | object | 包含一个 `domain`的对象信息。                      |
| name (Optional)      | body | string | 用户名，如果未提供用户的ID，则该项为必选项，如果你提供了用户名，则必须要以ID或名称的形式提供域信息。 |
| auth                 | body | object | 一个`auth`对象                               |
| user                 | body | object | 一个`user`对象                               |
| password             | body | object | `password` 对象，包括认证信息。                    |
| id (Optional)        | body | string | 用户的ID，如果未提供用户名，则该项必选。                    |
| identity             | body | object | 一个 `identity` 对象。                        |
| methods              | body | array  | 认证方式，如果以密码方式认证，则填写为 `password`。          |

#### 请求示例

```json
{
    "auth": {
        "identity": {
            "methods": [
                "password"
            ],
            "password": {
                "user": {
                    "name": "admin",
                    "domain": {
                        "name": "Default"
                    },
                    "password": "devstacker"
                }
            }
        }
    }
}
```

#### 响应参数

| 参数名             | 位置     | 类型     | 描述                                       |
| --------------- | ------ | ------ | ---------------------------------------- |
| X-Subject-Token | header | string | 认证返回的令牌，响应中在头部返回令牌ID，而不是在响应体中。           |
| domain          | body   | object | 一个 `domain` 域对象，包含如下内容：                  |
| methods         | body   | array  | 认证方式，指定为 `password`。                     |
| expires_at      | body   | string | 令牌失效时间，格式为标准[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601):`CCYY-MM-DDThh:mm:ss.sssZ`。例如, `2015-08-27T09:49:58.000000Z`，如果令牌不过期，则范围`null`。 |
| token           | body   | object | 一个 `token` 对象。                           |
| extras          | body   | object | 如果有的话，以键值对方式返回一组元数据。                     |
| user            | body   | object | 一个 `user` 对象。                            |
| audit_ids       | body   | array  | 包含一个或者两个审计ID。审计ID是随机产生的唯一值，对URL安全，可以用于追踪令牌行为。第一个审计ID用于当前令牌。第二个审计ID仅作用于重新申请具有访问范围的令牌。重新申请新令牌后失效。重新授权的令牌被交换给另外一个具有相同或者不同的访问范围的令牌。你可以使用这些审计ID追踪这些令牌或者令牌链的访问行为，而不会将令牌暴露给未授权用户。 |
| issued_at       | body   | string | 令牌的发放时间，格式为标准[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601):`CCYY-MM-DDThh:mm:ss.sssZ`，如： `2015-08-27T09:49:58.000000Z`. |
| id (Optional)   | body   | string | 用户ID，如果用户名未指定用户对象。                       |
| name (Optional) | body   | string | 用户名，如果未提供用户的ID，则该项为必选项，如果你提供了用户名，则必须要以ID或名称的形式提供域信息。 |

#### 响应示例

```json
{
    "token": {
        "methods": [
            "password"
        ],
        "expires_at": "2015-11-06T15:32:17.893769Z",
        "extras": {},
        "user": {
            "domain": {
                "id": "default",
                "name": "Default"
            },
            "id": "423f19a4ac1e4f48bbb4180756e6eb6c",
            "name": "admin",
            "password_expires_at": null
        },
        "audit_ids": [
            "ZzZwkUflQfygX7pdYDBCQQ"
        ],
        "issued_at": "2015-11-06T14:32:17.893797Z"
    }
}
```





### 通过密码进行指定授权范围的认证

```shell
[post] /v3/auth/tokens
```

- 关系项: `https://docs.openstack.org/api/openstack-identity/3/rel/auth_tokens`
- 认证一个请求，并生成一个令牌。使用密码作为认证方式。该认证方式获取的令牌**具有授权访问范围**。
- 请求体必须包含有效的认证凭据：密码，并通过ID或者用户名指定用户。
- 正常返回代码：`201`
- 可能产生的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

| 参数名                  | 位置    | 类型     | 描述                                       |
| -------------------- | ----- | ------ | ---------------------------------------- |
| nocatalog (Optional) | query | string | (v3.1以后) 响应信息是否包含目录，默认包含目录               |
| name (Optional)      | body  | string | 用户名，如果未提供用户的ID，则该项为必选项，如果你提供了用户名，则必须要以ID或名称的形式提供域信息。 |
| auth                 | body  | object | 一个`auth`对象                               |
| user                 | body  | object | 一个`user`对象                               |
| scope (Optional)     | body  | string | 授权范围，包含一个项目或者一个域(v3.4以后)。一个令牌不能同时制定项目和域，否则会返回一个400的Http错误，使用ID来表示一个项目，但如果项目是以名称给定，则项目的域也应该被一同指定。域也如此。 |
| password             | body  | object | `password` 对象，包括认证信息。                    |
| id (Optional)        | body  | string | 用户的ID，如果未提供用户名，则该项必选。                    |
| identity             | body  | object | 一个`identity`对象                           |
| methods              | body  | array  | 认证方式，如果以密码方式认证，则填写为 `password`。          |

#### 请求示例

```json
{
    "auth": {
        "identity": {
            "methods": [
                "password"
            ],
            "password": {
                "user": {
                    "id": "ee4dfb6e5540447cb3741905149d9b6e",
                    "password": "devstacker"
                }
            }
        },
        "scope": {
            "project": {
                "id": "a6944d763bf64ee6a275f1263fae0352"
            }
        }
    }
}
```



#### 响应参数

| 参数名             | 位置     | 类型     | 描述                                       |
| --------------- | ------ | ------ | ---------------------------------------- |
| X-Subject-Token | header | string | 认证返回的令牌，响应中在头部返回令牌ID，而不是在响应体中。           |
| domain          | body   | object | 一个 `domain` 域对象，包含如下内容：                  |
| methods         | body   | array  | 认证方式，指定为 `password`。                     |
| expires_at      | body   | string | 令牌失效时间，格式为标准[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601):`CCYY-MM-DDThh:mm:ss.sssZ`。例如, `2015-08-27T09:49:58.000000Z`，如果令牌不过期，则范围`null`。 |
| token           | body   | object | 一个 `token` 对象。                           |
| extras          | body   | object | 如果有的话，以键值对方式返回一组元数据。                     |
| user            | body   | object | 一个 `user` 对象。                            |
| audit_ids       | body   | array  | 包含一个或者两个审计ID。审计ID是随机产生的唯一值，对URL安全，可以用于追踪令牌行为。第一个审计ID用于当前令牌。第二个审计ID仅作用于重新申请具有访问范围的令牌。重新申请新令牌后失效。重新授权的令牌被交换给另外一个具有相同或者不同的访问范围的令牌。你可以使用这些审计ID追踪这些令牌或者令牌链的访问行为，而不会将令牌暴露给未授权用户。 |
| issued_at       | body   | string | 令牌的发放时间，格式为标准[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601):`CCYY-MM-DDThh:mm:ss.sssZ`，如： `2015-08-27T09:49:58.000000Z`. |
| id (Optional)   | body   | string | 用户ID，如果用户名未指定用户对象。                       |
| name (Optional) | body   | string | 用户名，如果未提供用户的ID，则该项为必选项，如果你提供了用户名，则必须要以ID或名称的形式提供域信息。 |

#### 响应示例

```json
{
  "token": {
    "is_domain": false,
    "methods": [
      "password"
    ],
    "roles": [
      {
        "id": "8dc6c830774649d2a006dceb82d289d6",
        "name": "admin"
      }
    ],
    "expires_at": "2017-09-06T07:12:39.000000Z",
    "project": {
      "domain": {
        "id": "default",
        "name": "Default"
      },
      "id": "364f0b03e8a643dc8c797020bdf0cd62",
      "name": "admin"
    },
    "catalog": [
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/volume/v3/364f0b03e8a643dc8c797020bdf0cd62",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "5616c29ba741430f9e015608c06706b6"
          }
        ],
        "type": "volumev3",
        "id": "0d8dcd691e0341ef9df4244bb4e35d15",
        "name": "cinderv3"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/compute/v2.1",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "6ad84f3a538c412f9cd7237e88918b2b"
          }
        ],
        "type": "compute",
        "id": "23f6e93ca9f645a7ba5d5803895d0efb",
        "name": "nova"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/volume/v1/364f0b03e8a643dc8c797020bdf0cd62",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "cb9af7e6f0e841afafc3231a36206854"
          }
        ],
        "type": "volume",
        "id": "401f2e0f52bb466da2f4ffd6f78002be",
        "name": "cinder"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/compute/v2/364f0b03e8a643dc8c797020bdf0cd62",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "34ac37b8285c4893865ecf9f87ec0db0"
          }
        ],
        "type": "compute_legacy",
        "id": "76d1e60b841f40d2bdff066bd7bf0880",
        "name": "nova_legacy"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/placement",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "6829782399744a40b2546e5fdc852f53"
          }
        ],
        "type": "placement",
        "id": "7db653c696ae4f8fa75d7b11baedfeb7",
        "name": "placement"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/volume/v2/364f0b03e8a643dc8c797020bdf0cd62",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "4661bfc74342404c9f17e64476cfa088"
          }
        ],
        "type": "volumev2",
        "id": "b31512522dc4467d99b4efca79c6939f",
        "name": "cinderv2"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6:9696/",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "bf91132a08634b3f8ac5a462d753e2f4"
          }
        ],
        "type": "network",
        "id": "bd3397fb192848c79e22daad556c6c5d",
        "name": "neutron"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/identity",
            "interface": "admin",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "8e7b3a3865394a3ab02087f582ef3be6"
          },
          {
            "url": "http://10.0.0.6/identity",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "b05c72d3a1ea457db3ab0f0bb6db4571"
          }
        ],
        "type": "identity",
        "id": "d4463a0b1e5d4c2f8fbf24b03357eae2",
        "name": "keystone"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/image",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "7bf611c21d684d5f81b61d14ba151202"
          }
        ],
        "type": "image",
        "id": "fd22b458ad114b29909ce0ef55f18688",
        "name": "glance"
      }
    ],
    "user": {
      "password_expires_at": null,
      "domain": {
        "id": "default",
        "name": "Default"
      },
      "id": "0b159a8c547c4b839e106d25383e4f53",
      "name": "admin"
    },
    "audit_ids": [
      "I61_10JAS7-_cjCpG7HIag"
    ],
    "issued_at": "2017-09-06T06:12:39.000000Z"
  }
}
```







### 使用显式授权的密码身份验证(未指定授权范围)

```shell
[post] /v3/auth/tokens
```

- 关系项: `https://docs.openstack.org/api/openstack-identity/3/rel/auth_tokens`
- 认证一个请求，并生成一个令牌。使用密码作为认证方式。该认证方式获取的令牌**无授权访问范围**。
- 请求体必须包含有效的认证凭据：密码，并通过ID或者用户名指定用户。
- 正常返回代码：`201`
- 可能产生的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

| 参数名                  | 位置    | 类型     | 描述                                       |
| -------------------- | ----- | ------ | ---------------------------------------- |
| nocatalog (Optional) | query | string | (v3.1以后) 响应信息是否包含目录，默认包含目录               |
| name (Optional)      | body  | string | 用户名，如果未提供用户的ID，则该项为必选项，如果你提供了用户名，则必须要以ID或名称的形式提供域信息。 |
| auth                 | body  | object | 一个`auth`对象                               |
| user                 | body  | object | 一个`user`对象                               |
| scope (Optional)     | body  | string | 授权范围，包含一个项目或者一个域(v3.4以后)。一个令牌不能同时制定项目和域，否则会返回一个400的Http错误，使用ID来表示一个项目，但如果项目是以名称给定，则项目的域也应该被一同指定。域也如此。 |
| password             | body  | object | `password` 对象，包括认证信息。                    |
| id (Optional)        | body  | string | 用户的ID，如果未提供用户名，则该项必选。                    |
| identity             | body  | object | 一个 `identity` 对象。                        |
| methods              | body  | array  | 认证方式，如果以密码方式认证，则填写为 `password`。          |

#### 请求示例

```json
{
    "auth": {
        "identity": {
            "methods": [
                "password"
            ],
            "password": {
                "user": {
                    "id": "ee4dfb6e5540447cb3741905149d9b6e",
                    "password": "devstacker"
                }
            }
        },
        "scope": "unscoped"
    }
}
```



#### 响应参数

| 参数名             | 位置     | 类型     | 描述                                       |
| --------------- | ------ | ------ | ---------------------------------------- |
| X-Subject-Token | header | string | 认证返回的令牌，响应中在头部返回令牌ID，而不是在响应体中。           |
| domain          | body   | object | 一个 `domain` 域对象，包含如下内容：                  |
| methods         | body   | array  | 认证方式，指定为 `password`。                     |
| roles           | body   | array  | A list of `role` objects, each containing: |
| expires_at      | body   | string | 令牌失效时间，格式为标准[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601):`CCYY-MM-DDThh:mm:ss.sssZ`。例如, `2015-08-27T09:49:58.000000Z`，如果令牌不过期，则范围`null`。 |
| token           | body   | object | 一个 `token` 对象。                           |
| extras          | body   | object | 如果有的话，以键值对方式返回一组元数据。                     |
| user            | body   | object | 一个 `user` 对象。                            |
| audit_ids       | body   | array  | 包含一个或者两个审计ID。审计ID是随机产生的唯一值，对URL安全，可以用于追踪令牌行为。第一个审计ID用于当前令牌。第二个审计ID仅作用于重新申请具有访问范围的令牌。重新申请新令牌后失效。重新授权的令牌被交换给另外一个具有相同或者不同的访问范围的令牌。你可以使用这些审计ID追踪这些令牌或者令牌链的访问行为，而不会将令牌暴露给未授权用户。 |
| issued_at       | body   | string | 令牌的发放时间，格式为标准[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601):`CCYY-MM-DDThh:mm:ss.sssZ`，如： `2015-08-27T09:49:58.000000Z`. |
| id (Optional)   | body   | string | 用户ID，如果用户名未指定用户对象。                       |
| name (Optional) | body   | string | 用户名，如果未提供用户的ID，则该项为必选项，如果你提供了用户名，则必须要以ID或名称的形式提供域信息。 |

#### 响应示例

```json
{
    "token": {
        "methods": [
            "password"
        ],
        "expires_at": "2015-11-09T01:42:57.527363Z",
        "extras": {},
        "user": {
            "domain": {
                "id": "default",
                "name": "Default"
            },
            "id": "ee4dfb6e5540447cb3741905149d9b6e",
            "name": "admin",
            "password_expires_at": null
        },
        "audit_ids": [
            "lC2Wj1jbQe-dLjLyOx4qPQ"
        ],
        "issued_at": "2015-11-09T00:42:57.527404Z"
    }
}
```





### 使用令牌进行未指定范围授权的认证

```shell
[post] /v3/auth/tokens
```

- 关系项: `https://docs.openstack.org/api/openstack-identity/3/rel/auth_tokens`
- 认证一个请求，并生成一个令牌。使用**令牌**作为认证方式。该认证方式获取的新令牌**无授权访问范围**。
- 请求体必须包含有效的认证凭据：密码，并通过ID或者用户名指定用户。
- 正常返回代码：`201`
- 可能产生的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

| Name                 | In    | Type   | Description                              |
| -------------------- | ----- | ------ | ---------------------------------------- |
| nocatalog (Optional) | query | string | (v3.1以后) 响应信息是否包含目录，默认包含目录               |
| identity             | body  | object | 一个 `identity` 对象。                        |
| token                | body  | object | 一个`token`对象。使用令牌身份验证方法。此方法通常与更改授权范围的请求一起使用。 |
| id                   | body  | string | 一个`token`的ID                             |
| auth                 | body  | object | 一个`auth`对象                               |
| methods              | body  | array  | 认证方式，对于以令牌认证的方式，指定为`token`               |

#### 请求示例

```json
{
    "auth": {
        "identity": {
            "methods": [
                "token"
            ],
            "token": {
                "id": "'$OS_TOKEN'"
            }
        }
    }
}
```



#### 响应参数

| Name            | In     | Type   | Description                    |
| --------------- | ------ | ------ | ------------------------------ |
| X-Subject-Token | header | string | 认证返回的令牌，响应中在头部返回令牌ID，而不是在响应体中。 |

#### 响应示例

```json
{
    "token": {
        "methods": [
            "token"
        ],
        "expires_at": "2015-11-05T22:00:11.000000Z",
        "extras": {},
        "user": {
            "domain": {
                "id": "default",
                "name": "Default"
            },
            "id": "10a2e6e717a245d9acad3e5f97aeca3d",
            "name": "admin",
            "password_expires_at": null
        },
        "audit_ids": [
            "mAjXQhiYRyKwkB4qygdLVg"
        ],
        "issued_at": "2015-11-05T21:00:33.819948Z"
    }
}
```





### 使用范围授权的令牌身份验证

```shell
[post] /v3/auth/tokens
```

- 关系项: `https://docs.openstack.org/api/openstack-identity/3/rel/auth_tokens`
- 认证一个请求，并生成一个令牌。使用**令牌**作为认证方式。该认证方式获取的令牌**具有授权访问范围**。
- 请求体必须包含有效的认证凭据：密码，并通过ID或者用户名指定用户。
- 正常返回代码：`201`
- 可能产生的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

| 参数名                  | 位置    | 类型     | 描述                                       |
| -------------------- | ----- | ------ | ---------------------------------------- |
| nocatalog (Optional) | query | string | (v3.1以后) 响应信息是否包含目录，默认包含目录               |
| methods              | body  | array  | 认证方式，如果以密码方式认证，则填写为 `token`。             |
| auth                 | body  | object | 一个`auth`对象                               |
| token                | body  | object | 一个`token`对象。使用令牌身份验证方法。此方法通常与更改授权范围的请求一起使用。 |
| audit_ids            | body  | array  | 包含一个或者两个审计ID。审计ID是随机产生的唯一值，对URL安全，可以用于追踪令牌行为。第一个审计ID用于当前令牌。第二个审计ID仅作用于重新申请具有访问范围的令牌。重新申请新令牌后失效。重新授权的令牌被交换给另外一个具有相同或者不同的访问范围的令牌。你可以使用这些审计ID追踪这些令牌或者令牌链的访问行为，而不会将令牌暴露给未授权用户。 |
| scope (Optional)     | body  | string | 授权范围，包含一个项目或者一个域(v3.4以后)。一个令牌不能同时制定项目和域，否则会返回一个400的Http错误，使用ID来表示一个项目，但如果项目是以名称给定，则项目的域也应该被一同指定。域也如此。 |
| id                   | body  | string | 一个`token`的ID                             |
| identity             | body  | object | 一个`identity`对象                           |

#### 请求示例

```json
{
    "auth": {
        "identity": {
            "methods": [
                "token"
            ],
            "token": {
                "id": "'$OS_TOKEN'"
            }
        },
        "scope": {
            "project": {
                "id": "5b50efd009b540559104ee3c03bbb2b7"
            }
        }
    }
}
```



#### 响应参数

| 参数名             | 位置     | 类型     | 描述                             |
| --------------- | ------ | ------ | ------------------------------ |
| X-Subject-Token | header | string | 认证返回的令牌，响应中在头部返回令牌ID，而不是在响应体中。 |

#### 响应示例

```json
{
  "token": {
    "is_domain": false,
    "methods": [
      "token",
      "password"
    ],
    "roles": [
      {
        "id": "8dc6c830774649d2a006dceb82d289d6",
        "name": "admin"
      }
    ],
    "expires_at": "2017-09-06T08:59:49.000000Z",
    "project": {
      "domain": {
        "id": "default",
        "name": "Default"
      },
      "id": "364f0b03e8a643dc8c797020bdf0cd62",
      "name": "admin"
    },
    "catalog": [
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/volume/v3/364f0b03e8a643dc8c797020bdf0cd62",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "5616c29ba741430f9e015608c06706b6"
          }
        ],
        "type": "volumev3",
        "id": "0d8dcd691e0341ef9df4244bb4e35d15",
        "name": "cinderv3"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/compute/v2.1",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "6ad84f3a538c412f9cd7237e88918b2b"
          }
        ],
        "type": "compute",
        "id": "23f6e93ca9f645a7ba5d5803895d0efb",
        "name": "nova"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/volume/v1/364f0b03e8a643dc8c797020bdf0cd62",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "cb9af7e6f0e841afafc3231a36206854"
          }
        ],
        "type": "volume",
        "id": "401f2e0f52bb466da2f4ffd6f78002be",
        "name": "cinder"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/compute/v2/364f0b03e8a643dc8c797020bdf0cd62",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "34ac37b8285c4893865ecf9f87ec0db0"
          }
        ],
        "type": "compute_legacy",
        "id": "76d1e60b841f40d2bdff066bd7bf0880",
        "name": "nova_legacy"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/placement",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "6829782399744a40b2546e5fdc852f53"
          }
        ],
        "type": "placement",
        "id": "7db653c696ae4f8fa75d7b11baedfeb7",
        "name": "placement"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/volume/v2/364f0b03e8a643dc8c797020bdf0cd62",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "4661bfc74342404c9f17e64476cfa088"
          }
        ],
        "type": "volumev2",
        "id": "b31512522dc4467d99b4efca79c6939f",
        "name": "cinderv2"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6:9696/",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "bf91132a08634b3f8ac5a462d753e2f4"
          }
        ],
        "type": "network",
        "id": "bd3397fb192848c79e22daad556c6c5d",
        "name": "neutron"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/identity",
            "interface": "admin",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "8e7b3a3865394a3ab02087f582ef3be6"
          },
          {
            "url": "http://10.0.0.6/identity",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "b05c72d3a1ea457db3ab0f0bb6db4571"
          }
        ],
        "type": "identity",
        "id": "d4463a0b1e5d4c2f8fbf24b03357eae2",
        "name": "keystone"
      },
      {
        "endpoints": [
          {
            "url": "http://10.0.0.6/image",
            "interface": "public",
            "region": "RegionOne",
            "region_id": "RegionOne",
            "id": "7bf611c21d684d5f81b61d14ba151202"
          }
        ],
        "type": "image",
        "id": "fd22b458ad114b29909ce0ef55f18688",
        "name": "glance"
      }
    ],
    "user": {
      "password_expires_at": null,
      "domain": {
        "id": "default",
        "name": "Default"
      },
      "id": "0b159a8c547c4b839e106d25383e4f53",
      "name": "admin"
    },
    "audit_ids": [
      "6RxfbwaLRhqC2tQilKpo4Q",
      "h3MVbyyIRz2rf7UYvqkzPA"
    ],
    "issued_at": "2017-09-06T08:10:00.000000Z"
  }
}
```



###  使用显式授权的令牌身份认证（未指定授权范围）

```shell
[post] /v3/auth/tokens
```

- 关系项: `https://docs.openstack.org/api/openstack-identity/3/rel/auth_tokens`
- 认证一个请求，并生成一个令牌。使用令牌作为认证方式。该认证方式获取的令牌**显式无授权访问范围**。
- 请求体必须包含有效的认证凭据：密码，并通过ID或者用户名指定用户。
- 正常返回代码：`201`
- 可能产生的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

| 参数名                  | 位置    | 类型     | 描述                                       |
| -------------------- | ----- | ------ | ---------------------------------------- |
| nocatalog (Optional) | query | string | (v3.1以后) 响应信息是否包含目录，默认包含目录               |
| methods              | body  | array  | 授权方式，作为以`token`认证的方式来说，指定为`token`        |
| auth                 | body  | object | 一个`auth`对象                               |
| token                | body  | object | 一个`token`对象。使用令牌身份验证方法。此方法通常与更改授权范围的请求一起使用。 |
| audit_ids            | body  | array  | 包含一个或者两个审计ID。审计ID是随机产生的唯一值，对URL安全，可以用于追踪令牌行为。第一个审计ID用于当前令牌。第二个审计ID仅作用于重新申请具有访问范围的令牌。重新申请新令牌后失效。重新授权的令牌被交换给另外一个具有相同或者不同的访问范围的令牌。你可以使用这些审计ID追踪这些令牌或者令牌链的访问行为，而不会将令牌暴露给未授权用户。 |
| scope (Optional)     | body  | string | 授权范围，包含一个项目或者一个域(v3.4以后)。一个令牌不能同时制定项目和域，否则会返回一个400的Http错误，使用ID来表示一个项目，但如果项目是以名称给定，则项目的域也应该被一同指定。域也如此。 |
| id                   | body  | string | 一个`token`的ID                             |
| identity             | body  | object | 一个 `identity` 对象。                        |

#### 请求示例

```json
{
    "auth": {
        "identity": {
            "methods": [
                "token"
            ],
            "token": {
                "id": "'$OS_TOKEN'"
            }
        },
        "scope": "unscoped"
    }
}
```



#### 响应参数

| 参数名             | 位置     | 类型     | 描述                             |
| --------------- | ------ | ------ | ------------------------------ |
| X-Subject-Token | header | string | 认证返回的令牌，响应中在头部返回令牌ID，而不是在响应体中。 |

#### 响应示例

```json
{
  "token": {
    "issued_at": "2017-09-06T08:22:35.000000Z",
    "audit_ids": [
      "suwF8CnXT5qAQFZKnSlUvQ",
      "h3MVbyyIRz2rf7UYvqkzPA"
    ],
    "methods": [
      "token",
      "password"
    ],
    "expires_at": "2017-09-06T08:59:49.000000Z",
    "user": {
      "password_expires_at": null,
      "domain": {
        "id": "default",
        "name": "Default"
      },
      "id": "0b159a8c547c4b839e106d25383e4f53",
      "name": "admin"
    }
  }
}
```







### 验证和显示令牌信息

```shell
[get] /v3/auth/tokens
```

* 关系项： `https://docs.openstack.org/api/openstack-identity/3/rel/auth_tokens`
* 验证和显示令牌相关信息，包括超时时间与授权范围等。
* 将你自己的`token`作为请求头中的`X-Auth-Token`传入。
* 将你想要验证的`token`作为请求头中的`X-Subject-Token`传入。
* 正常返回代码：`200`
* 可能的错误返回码：`413`,`405`,`404`,`403`,`401`,`400`,`503`

#### 请求参数

| 参数名                      | 位置     | 类型     | 描述                                       |
| ------------------------ | ------ | ------ | ---------------------------------------- |
| X-Auth-Token             | header | string | 管理员`token`                               |
| X-Subject-Token          | header | string | 需要验证的`token`，此处不再请求体中提供，而在请求头中提供。        |
| nocatalog (Optional)     | query  | string | (v3.1以后) 响应信息是否包含目录，默认包含目录。              |
| allow_expired (Optional) | query  | bool   | (v3.8以后)允许获取已经超时的`token`，默认情况下，已超时的`token`会返回404错误。 |

#### 请求示例





#### 响应参数

| 参数名             | 位置     | 类型     | 描述                                       |
| --------------- | ------ | ------ | ---------------------------------------- |
| X-Subject-Token | header | string | 验证的`token`，此处不再请求体中提供，而在请求头中提供。          |
| domain          | body   | object | 一个 `domain` 对象。                          |
| methods         | body   | array  | 验证方式，可以提供为`password`和`token`两种中的其中一种或同时提供。表示用于验证`token`时的身份验证方法。例如，如果通过密码身份验证获得令牌，则它包含`password`。此后，如果该`token`使用令牌验证方法交换过多次，则随后创建的包括`password`和`token`两个属性。不同于多因素认证，`method`属性仅仅是表示用于对用户换取令牌进行身份验证的方法。客户端负责检测认证因素的总数。 |
| links           | body   | object | 到 `domain` 资源的链接。                        |
| user            | body   | object | 一个 `user` 对象                             |
| token           | body   | object | 一个 `token` 对象。                           |
| expires_at      | body   | string | 令牌失效时间，格式为标准[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601):`CCYY-MM-DDThh:mm:ss.sssZ`。例如, `2015-08-27T09:49:58.000000Z`，如果令牌不过期，则范围`null`。 |
| project         | body   | object | A `project` object, containing:          |
| catalog         | body   | array  | A `catalog` object.                      |
| extras          | body   | object | A set of metadata key and value pairs, if any. |
| roles           | body   | array  | A list of `role` objects, each containing: |
| audit_ids       | body   | array  | 包含一个或者两个审计ID。审计ID是随机产生的唯一值，对URL安全，可以用于追踪令牌行为。第一个审计ID用于当前令牌。第二个审计ID仅作用于重新申请具有访问范围的令牌。重新申请新令牌后失效。重新授权的令牌被交换给另外一个具有相同或者不同的访问范围的令牌。你可以使用这些审计ID追踪这些令牌或者令牌链的访问行为，而不会将令牌暴露给未授权用户。 |
| issued_at       | body   | string | 令牌发放时间，格式为标准[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601):`CCYY-MM-DDThh:mm:ss.sssZ`。例如, `2015-08-27T09:49:58.000000Z`，如果令牌不过期，则范围`null`。 |
| id (Optional)   | body   | string | 用户`id`，在未指定用户`name`时指定。                  |
| name (Optional) | body   | string | 用户`name`，在未指定用户`id`时指定。若果指定`name`，同事也要通过ID或者名称指定域。 |

#### 响应示例



### 检查令牌

```
[head] /v3/auth/tokens
```

* 关联项 `https://docs.openstack.org/api/openstack-identity/3/rel/auth_tokens`
* 验证一个Token。
* 调用方法与上一条相似，但不提供响应体。
* 认证服务API会返回与`POST /auth/tokens` 类似的结果，但如果`token`无效，则会返回`204`状态。
* 正常返回码：`200`
* 可能的错误返回码： `413`,`405`,`404`,`403`,`401`,`400`,`503`

#### 请求参数

| 参数名                      | 位置     | 类型     | 描述                                       |
| ------------------------ | ------ | ------ | ---------------------------------------- |
| X-Auth-Token             | header | string | 管理员`token`                               |
| X-Subject-Token          | header | string | 需要验证的`token`，此处不再请求体中提供，而在请求头中提供。        |
| allow_expired (Optional) | query  | bool   | (v3.8以后)允许获取已经超时的`token`，默认情况下，已超时的`token`会返回404错误。 |

#### 响应示例



### 撤销令牌

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/auth_tokens`
* 撤销一个令牌。
* 与 HEAD `/auth/tokens` 调用方式一致，如果调用，则无视`X-Subject-Token`无视`expires_at`立即失效。不需要额外的`X-Auth-Token`参数。
* 正常返回代码：`204`
* 可能的错误返回代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

| 参数名             | 位置     | 类型     | 描述                                |
| --------------- | ------ | ------ | --------------------------------- |
| X-Auth-Token    | header | string | 管理员`token`                        |
| X-Subject-Token | header | string | 需要撤销的`token`，此处不再请求体中提供，而在请求头中提供。 |

#### 请求示例



#### 响应示例





## 服务目录

```
[get] /v3/auth/catalog
```

* 关联项： `https://docs.openstack.org/api/openstack-identity/3/rel/auth_catalog`
* 3.3版新增
* 该请求会返回一个`X-Auth-Token`提供的服务目录。（即使该`token`不包含服务目录，如通过`nocatlog`参数获取的`token`。
* 返回结果中的`catlog`对象与`token`中包含的`catlog`对象是一致的。
* 正常返回代码：`200`
* 可能的错误结果：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

| 参数名          | 位置     | 类型     | 描述            |
| ------------ | ------ | ------ | ------------- |
| X-Auth-Token | header | string | 管理员的有效`token` |

#### 请求示例



#### 响应参数

| 参数名       | 位置   | 类型     | 描述                                       |
| --------- | ---- | ------ | ---------------------------------------- |
| endpoints | body | array  | 一个`endpoint`对象列表                         |
| id        | body | string | `endpoint`包含的`service`的`UUID`            |
| type      | body | string | `service`类型，用于描述服务提供的API。可以的值为： `compute`, `ec2`,`identity`, `image`, `network`, 或 `volume`. |
| name      | body | string | 服务名称                                     |

#### 响应示例





## 项目范围

```
[get] /v3/auth/projects
```

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/auth_projects`
* 3.3新增
* 返回当前`X-Auth-Token`携带的`token`授权访问的项目范围。
* 结构与用户`project`列表一致。
* 正常返回代码: `200`
* 可能的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

| 参数名          | 位置     | 类型     | 描述            |
| ------------ | ------ | ------ | ------------- |
| X-Auth-Token | header | string | 管理员的有效`token` |

#### 请求示例



#### 响应参数

| 参数名       | 位置   | 类型      | 描述                      |
| --------- | ---- | ------- | ----------------------- |
| domain_id | body | string  | `project`的域ID           |
| enabled   | body | boolean | 如果该值为`true`则项目可用，否则不可用。 |
| id        | body | string  | `project`的ID            |
| links     | body | object  | `project`的资源链接。         |
| name      | body | string  | `project`的名称            |

#### 响应示例



## 获取可用域的范围

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/auth_domains`
* 3.3版本新增

- 返回当前`X-Auth-Token`携带的`token`授权访问的域范围。
- 结构与用户`domain`列表一致。
- 正常返回代码: `200`
- 可能的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

| 参数名          | 位置     | 类型     | 描述           |
| ------------ | ------ | ------ | ------------ |
| X-Auth-Token | header | string | 管理员的有效`token |

#### 请求示例



#### 响应参数

| 参数名         | 位置   | 类型      | 描述                      |
| ----------- | ---- | ------- | ----------------------- |
| description | body | string  | 域描述                     |
| enabled     | body | boolean | 如果该值为`true`则项目可用，否则不可用。 |
| id          | body | string  | `domain`的ID             |
| links       | body | object  | `domain`的资源链接。          |
| name        | body | string  | `domain`的名称             |

#### 响应示例

