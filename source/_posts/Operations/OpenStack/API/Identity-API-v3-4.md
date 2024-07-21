---
title: Identity API v3 (CURRENT)(四)
tags:
  - OpenStackApi
  - Development
categories:
  - Operations
  - OpenStack
toc: true
abbrlink: f8c17d7
date: 2017-09-08 08:18:28
---

### [原文地址](https://developer.openstack.org/api-ref/identity/v3/#groups)

## 用户组

> 用户组API关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/group`

> 译者注：这部分与前部分的风格不一样，估计和前面不是一个人写的。

<!-- more -->

用户组是一个用户的容器，每一个用户组属于一个域。

您可以使用组来简化为用户分配角色任务的任务。将角色分配给项目或领域中的一个组，相当于将角色分配给该项目或域中的每个组成员。

当您从组中取消一个角色时，该角色将自动从该组的任何用户中自动分配。任何将这些用户验证到相关项目或域的令牌都将被撤销。

与用户一样，没有分配任何角色的分组是没有任何作用的，并且没有访问资源的权限。但是，一个没有角色分配的组可以作为一种从外部资源获取或加载用户和组的方式，然后将它们映射到项目和域。

### 获取组列表

> [get] /v3/groups

#### 响应代码

##### 成功

| 代码         | 原因   |
| ---------- | ---- |
| `200 - OK` | 请求成功 |

##### 失败

| 代码                   | 原因           |
| -------------------- | ------------ |
| `400 - Bad Request`  | 请求中的部分内容不合法。 |
| `401 - Unauthorized` | 用户未授权。       |
| `403 - Forbidden`    | 当前用户不允许做此操作。 |

### 请求参数

| 参数名                  | 位置    | 类型     | 描述         |
| -------------------- | ----- | ------ | ---------- |
| name (Optional)      | query | string | 通过组名称过滤列表。 |
| domain_id (Optional) | query | string | 通过域ID过滤列表。 |

#### 请求示例



#### 响应参数

| 参数名         | 位置   | 类型     | 描述                         |
| ----------- | ---- | ------ | -------------------------- |
| links       | body | object | 资源链接。                      |
| groups      | body | array  | 一个 `group` 对象的列表，没想包括以下内容： |
| description | body | string | `group`的描述。                |
| domain_id   | body | string | `group`所属`domain`的ID。      |
| id          | body | string | `group`的ID。                |
| links       | body | object | `group`资源链接。               |
| name        | body | string | `group`名称。                 |

#### 响应示例

```json
{
    "links": {
        "self": "http://example.com/identity/v3/groups",
        "previous": null,
        "next": null
    },
    "groups": [
        {
            "description": "non-admin group",
            "domain_id": "default",
            "id": "96372bbb152f475aa37e9a76a25a029c",
            "links": {
                "self": "http://example.com/identity/v3/groups/96372bbb152f475aa37e9a76a25a029c"
            },
            "name": "nonadmins"
        },
        {
            "description": "openstack admin group",
            "domain_id": "default",
            "id": "9ce0ad4e58a84d7a97b92f7955d10c92",
            "links": {
                "self": "http://example.com/identity/v3/groups/9ce0ad4e58a84d7a97b92f7955d10c92"
            },
            "name": "admins"
        }
    ]
}
```



### 创建一个组

> [post] /v3/groups

#### 响应代码

##### 成功

| 代码              | 原因           |
| --------------- | ------------ |
| `201 - Created` | 资源被创建，已可以使用。 |

##### 失败

| 代码                   | 原因               |
| -------------------- | ---------------- |
| `400 - Bad Request`  | 请求中的部分内容不合法。     |
| `401 - Unauthorized` | 用户未授权。           |
| `403 - Forbidden`    | 访问策略导致用户不能进行该操作。 |
| `409 - Conflict`     | 当前操作与另一个操作发生冲突。  |

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

| 参数名                    | 位置   | 类型     | 描述                    |
| ---------------------- | ---- | ------ | --------------------- |
| group                  | body | object | 一个 `group`对象， 包括：     |
| description (Optional) | body | string | `group`描述。            |
| domain_id (Optional)   | body | string | `group`所属`domain`的ID。 |
| name                   | body | string | `group`名称。            |

#### 请求示例

```json
{
    "group": {
        "description": "Contract developers",
        "domain_id": "default",
        "name": "Contract developers"
    }
}
```



#### 响应参数

| 参数名         | 位置   | 类型     | 描述                    |
| ----------- | ---- | ------ | --------------------- |
| group       | body | object | 一个 `group` 对象，包括：     |
| description | body | string | `group`描述。            |
| domain_id   | body | string | `group`所属`domain`的ID。 |
| id          | body | string | `group`的ID。           |
| links       | body | object | `group`资源链接。          |
| name        | body | string | `group`名称。            |

#### 响应示例

```json
{
    "group": {
        "description": "Contract developers",
        "domain_id": "default",
        "id": "c0d675eac29945ad9dfd08aa1bb75751",
        "links": {
            "self": "http://example.com/identity/v3/groups/c0d675eac29945ad9dfd08aa1bb75751"
        },
        "name": "Contract developers"
    }
}
```



### 显示一个组的详细信息

> [get] /v3/groups/{group_id}

#### 响应代码

##### 成功

| 代码         | 原因    |
| ---------- | ----- |
| `200 - OK` | 请求成功。 |

##### 失败

| 代码                   | 原因               |
| -------------------- | ---------------- |
| `400 - Bad Request`  | 请求中的部分内容非法。      |
| `401 - Unauthorized` | 用户未授权。           |
| `403 - Forbidden`    | 访问策略导致用户不能进行该操作。 |
| `404 - Not Found`    | 请求的资源找不到。        |

#### 请求参数

| 参数名      | 位置   | 类型     | 描述          |
| -------- | ---- | ------ | ----------- |
| group_id | path | string | `group`的ID。 |

#### 请求示例



#### 响应参数

| 参数名         | 位置   | 类型     | 描述                    |
| ----------- | ---- | ------ | --------------------- |
| group       | body | object | 一个 `group` 对象，包括：     |
| description | body | string | `group`的描述。           |
| domain_id   | body | string | `group`所属`domain`的ID。 |
| id          | body | string | `group`的ID。           |
| links       | body | object | `group`的资源链接。         |
| name        | body | string | `group`的名称。           |

#### 响应示例

```json
{
    "group": {
        "description": "Contract developers",
        "domain_id": "default",
        "id": "c0d675eac29945ad9dfd08aa1bb75751",
        "links": {
            "self": "http://example.com/identity/v3/groups/c0d675eac29945ad9dfd08aa1bb75751"
        },
        "name": "Contract developers"
    }
}
```



### 更新一个组信息

> [patch] /v3/groups/{group_id}

#### 响应代码

##### 成功

| 代码         | 原因    |
| ---------- | ----- |
| `200 - OK` | 请求成功。 |

##### 失败

| 代码                      | 原因                        |
| ----------------------- | ------------------------- |
| `400 - Bad Request`     | 请求中的某些内容不合法。              |
| `401 - Unauthorized`    | 用户未授权。                    |
| `403 - Forbidden`       | 根据访问策略，该用户不能进行此操作。        |
| `404 - Not Found`       | 所请求的资源未找到。                |
| `409 - Conflict`        | 该操作与其他操作冲突。               |
| `501 - Not Implemented` | 服务器要么不识别请求方法，要么缺乏满足请求的能力。 |

#### 请求参数

| 参数名                    | 位置   | 类型     | 描述                                       |
| ---------------------- | ---- | ------ | ---------------------------------------- |
| group_id               | path | string | `group`的ID。                              |
| group                  | body | object | 一个 `group` 对象，包括：                        |
| description (Optional) | body | string | `group`的新描述。                             |
| domain_id (Optional)   | body | string | `group`所属的`domain`的ID。现在已经弃用了更改一个组的域的能力，并将在随后的版本中删除。在大多数身份服务实现中，默认情况下已经禁用了它。 |
| name (Optional)        | body | string | `group`的新名字。                             |

#### 请求示例

```json
{
    "group": {
        "description": "Contract developers 2016",
        "name": "Contract developers 2016"
    }
}
```



#### 响应参数

| 参数名         | 位置   | 类型     | 描述                     |
| ----------- | ---- | ------ | ---------------------- |
| group       | body | object | 一个 `group` 对象，包含：      |
| description | body | string | `group`描述。             |
| domain_id   | body | string | `group`所属的`domain`的ID。 |
| id          | body | string | `group`的ID。            |
| links       | body | object | `group`的资源链接。          |
| name        | body | string | `group`的新名字。           |

#### 响应示例

```json
{
    "group": {
        "description": "Contract developers 2016",
        "domain_id": "default",
        "id": "c0d675eac29945ad9dfd08aa1bb75751",
        "links": {
            "self": "http://example.com/identity/v3/groups/c0d675eac29945ad9dfd08aa1bb75751"
        },
        "name": "Contract developers 2016"
    }
}
```



### 删除一个组

> [delete] /v3/groups/{group_id}

#### 响应代码

##### 成功

| 代码                 | 原因          |
| ------------------ | ----------- |
| `204 - No Content` | 服务器已经完成了请求。 |

##### 失败

| 代码                   | 原因                  |
| -------------------- | ------------------- |
| `400 - Bad Request`  | 请求中的某些部分非法。         |
| `401 - Unauthorized` | 用户未授权。              |
| `403 - Forbidden`    | 由于访问策略，用户不被允许执行该操作。 |
| `404 - Not Found`    | 要删除的资源为找到。          |

#### 请求参数

| 参数名      | 位置   | 类型     | 描述              |
| -------- | ---- | ------ | --------------- |
| group_id | path | string | 要删除的`group`的ID。 |

#### 请求示例



#### 响应参数

>译者注：该请求无响应体

#### 响应示例



### 获取组中的用户列表

> [get] /v3/groups/{group_id}/users

#### 响应代码

##### Success[¶](https://developer.openstack.org/api-ref/identity/v3/#Success)

| Code       | Reason                  |
| ---------- | ----------------------- |
| `200 - OK` | Request was successful. |

##### Error[¶](https://developer.openstack.org/api-ref/identity/v3/#Error)

| Code                 | Reason                                   |
| -------------------- | ---------------------------------------- |
| `400 - Bad Request`  | Some content in the request was invalid. |
| `401 - Unauthorized` | User must authenticate before making a request. |
| `403 - Forbidden`    | Policy does not allow current user to do this operation. |
| `404 - Not Found`    | The requested resource could not be found. |

#### 请求参数

| 参数名                            | 位置    | 类型     | 描述                                       |
| ------------------------------ | ----- | ------ | ---------------------------------------- |
| group_id                       | path  | string | `group`的ID。                              |
| password_expires_at (Optional) | query | string | 过滤用户的密码过期时间信息时使用该选项，该选项的值由`operator`和 `timestamp` 组成，并使用冒号 (`:`)分开。 如：`password_expires_at={operator}:{timestamp}`，可用的操作符为：`lt`, `lte`, `gt`, `gte`, `eq`和 `neq`，依次分别代表：小于、小于等于、大于、大于等于、等于、不等于。时间格式为：` YYYY-MM-DDTHH:mm:ssZ`，具体示例为：`/v3/users?password_expires_at=lt:2016-12-08T22:02:00Z`，表示密码于改时间之前失效的用户列表。 |

#### 请求示例



#### 响应示例

```json
{
    "links": {
        "self": "http://example.com/identity/v3/groups/9ce0ad4e58a84d7a97b92f7955d10c92/users",
        "previous": null,
        "next": null
    },
    "users": [
        {
            "domain_id": "default",
            "description": null,
            "enabled": true,
            "id": "acd565a08293c1e48bc0dd0d72ad5d5d"
            "name": "Henry",
            "links": {
                "self": "http://example.com/identity/v3/users/acd565a08293c1e48bc0dd0d72ad5d5d"
            }
        },
        {
            "domain_id": "default",
            "description": null,
            "enabled": true,
            "id": "fff603a0829d41e48bc0dd0d72ad61ce",
            "name": "Paul",
            "links": {
                "self": "http://example.com/identity/v3/users/fff603a0829d41e48bc0dd0d72ad61ce"
            },
            "password_expires_at": "2016-11-06T15:32:17.000000"
        }
    ]
}
```



### 向组中添加用户

> [put] /v3/groups/{group_id}/users/{user_id}

#### 响应代码

##### 成功

| 代码         | 原因   |
| ---------- | ---- |
| `200 - OK` | 请求成功 |

##### 失败

| 代码                   | 原因                |
| -------------------- | ----------------- |
| `400 - Bad Request`  | 请求内容中有部分非法。       |
| `401 - Unauthorized` | 用户未授权。            |
| `403 - Forbidden`    | 访问策略不允许该用户进行此项操作。 |
| `404 - Not Found`    | 请求的资源未找到。         |

#### 请求参数

| 参数名      | 位置   | 类型     | 描述          |
| -------- | ---- | ------ | ----------- |
| user_id  | path | string | `user`的ID。  |
| group_id | path | string | `group`的ID。 |

#### 请求示例



#### 响应参数

> 该请求没有响应体，具体的返回情况请参照返回代码。

#### 响应示例



### 检查用户是否属于一个组

> [head] /v3/groups/{group_id}/users/{user_id}

#### 响应代码

##### 成功

| 代码                 | 原因        |
| ------------------ | --------- |
| `204 - No Content` | 服务器已完成请求。 |

##### 失败

| 代码                   | 原因                |
| -------------------- | ----------------- |
| `400 - Bad Request`  | 请求内容中有部分非法。       |
| `401 - Unauthorized` | 用户未授权。            |
| `403 - Forbidden`    | 访问策略不允许该用户进行此项操作。 |
| `404 - Not Found`    | 请求的资源未找到。         |

#### 请求参数

| 参数名      | 位置   | 类型     | 描述          |
| -------- | ---- | ------ | ----------- |
| user_id  | path | string | `user`的ID。  |
| group_id | path | string | `group`的ID。 |

#### 请求示例



#### 响应参数

> 该请求无响应体。

#### 响应示例



### 从组中删除一个用户

> [delete] /v3/groups/{group_id}/users/{user_id}

#### 响应代码

##### 成功

| 代码                 | 原因        |
| ------------------ | --------- |
| `204 - No Content` | 服务器已完成请求。 |

##### 失败

| 代码                   | 原因                |
| -------------------- | ----------------- |
| `400 - Bad Request`  | 请求内容中有部分非法。       |
| `401 - Unauthorized` | 用户未授权。            |
| `403 - Forbidden`    | 访问策略不允许该用户进行此项操作。 |
| `404 - Not Found`    | 请求的资源未找到。         |

#### 请求参数

| 参数名      | 位置   | 类型     | 描述          |
| -------- | ---- | ------ | ----------- |
| user_id  | path | string | `user`的ID。  |
| group_id | path | string | `group`的ID。 |

#### 请求示例



#### 响应参数

> 该请求无响应体。

#### 响应示例

