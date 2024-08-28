---
title: Identity API v3 (CURRENT)(二)
tags:
  - DevOps
categories:
  - Operations
  - OpenStack
toc: true
abbrlink: 8b3cd8f3
date: 2017-09-08 08:18:28
---

#### [原文地址](https://developer.openstack.org/api-ref/identity/v3/)

## 凭据管理

服务器会返回一个令牌用于交换用户提供的身份验证凭据。并且可以选择性的授权特定的项目或域。

<!-- more -->

你可以列出凭据、创建凭据、查看凭据的详细信息、更新凭据或者删除一个凭据。

### 创建一个凭据

```
[post] /v3/credentials
```

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/credentials`
* 创建一个凭据。
* 下面的例子显示了如何创建一个类似于`EC2`风格的凭据。凭证的`blob`是一个包含`access`和 `secret`
  密钥的JSON字符串。在指定`ec2`类型时需要这种格式。如果要修改数据的`blob`类型和内容，需要同时指定其他的凭证，如`access_key`。
* 正常返回代码：`201`
* 可能的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

| 参数名        | 位置   | 类型     | 描述                                  |
|------------|------|--------|-------------------------------------|
| credential | body | object | 一个`credential`对象。                   |
| project_id | body | string | `project`的ID。                       |
| type       | body | string | 凭据类型，如：`ec2`或者`cert`。该项决定了受支持类型的列表。 |
| blob       | body | string | 凭据本身，作为一个序列化的`blob`。                |
| user_id    | body | string | 拥有该凭据的`user`的ID。                    |

#### 请求示例

```json
{
    "credential": {
        "blob": "{\"access\":\"181920\",\"secret\":\"secretKey\"}",
        "project_id": "731fc6f265cd486d900f16e84c5cb594",
        "type": "ec2",
        "user_id": "bb5476fd12884539b41d5a88f838d773"
    }
}
```

#### 响应参数

| 参数名        | 位置   | 类型     | 描述                                 |
|------------|------|--------|------------------------------------|
| credential | body | object | 一个 `credential` 对象。                |
| user_id    | body | string | 拥有该`credential`的用户ID。              |
| links      | body | object | `credential` 资源链接。                 |
| blob       | body | string | `credential`自身，包含一个序列化的字符串。        |
| project_id | body | string | `project`的ID。                      |
| type       | body | string | `credential`的类型，可以是`ec2`或者是`cert`。 |
| id         | body | string | `credential`的`UUID`。               |

#### 响应示例

```json
{
    "credential": {
        "user_id": "bb5476fd12884539b41d5a88f838d773",
        "links": {
            "self": "http://example.com/identity/v3/credentials/3d3367228f9c7665266604462ec60029bcd83ad89614021a80b2eb879c572510"
        },
        "blob": "{\"access\":\"181920\",\"secret\":\"secretKey\"}",
        "project_id": "731fc6f265cd486d900f16e84c5cb594",
        "type": "ec2",
        "id": "3d3367228f9c7665266604462ec60029bcd83ad89614021a80b2eb879c572510"
    }
}
```

### 获取凭据列表

```
[get] /v3/credentials
```

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/credentials`
* 列出所有的凭据。
* 你可以在请求链接中包含`user_id`参数或者`type`参数来过滤请求所得的凭据列表。
* 正常返回代码：`200`
* 可能的错误代码：`413`,`405`,`404`,`403`,`401`,`400`,`503`

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

| 参数名                | 位置    | 类型     | 描述                            |
|--------------------|-------|--------|-------------------------------|
| user_id (Optional) | query | string | 通过`user_id`过滤列表。              |
| type (Optional)    | body  | string | 凭证类型，用于过滤列表，可以是`ec2`或者`cert`。 |

#### 响应参数

| 参数名         | 位置   | 类型     | 描述                                |
|-------------|------|--------|-----------------------------------|
| user_id     | body | string | 拥有该`credential`的用户ID。             |
| links       | body | object | `credential` 资源链接。                |
| blob        | body | string | `credential`自身，包含一个序列化的字符串。       |
| credentials | body | array  | `credential` 对象的列表。               |
| project_id  | body | string | `project`的ID。                     |
| type        | body | string | `credential`的类型，可以是`ec2`或者是`cert` |
| id          | body | string | `credential`的`UUID`。              |

#### 响应示例

```json
{
    "credentials": [
        {
            "user_id": "bb5476fd12884539b41d5a88f838d773",
            "links": {
                "self": "http://example.com/identity/v3/credentials/207e9b76935efc03804d3dd6ab52d22e9b22a0711e4ada4ff8b76165a07311d7"
            },
            "blob": "{\"access\": \"a42a27755ce6442596b049bd7dd8a563\", \"secret\": \"71faf1d40bb24c82b479b1c6fbbd9f0c\", \"trust_id\": null}",
            "project_id": "6e01855f345f4c59812999b5e459137d",
            "type": "ec2",
            "id": "207e9b76935efc03804d3dd6ab52d22e9b22a0711e4ada4ff8b76165a07311d7"
        }
    ],
    "links": {
        "self": "http://example.com/identity/v3/credentials",
        "previous": null,
        "next": null
    }
}
```

### 获取凭证的详细信息

```
[get] /v3/credentials/{credential_id}
```

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/credential`
* 显示凭证的详细信息。
* 正常返回代码：`200`
* 可能的错误代码：`413`,`405`,`404`,`403`,`401`,`400`,`503`

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

| 参数名           | 位置   | 类型     | 描述                   |
|---------------|------|--------|----------------------|
| credential_id | path | string | `credential`的`UUID`。 |

#### 响应参数

| 参数名        | 位置   | 类型     | 描述                                |
|------------|------|--------|-----------------------------------|
| credential | body | object | 一个 `credential` 对象。               |
| user_id    | body | string | 拥有该`credential`的用户ID。             |
| links      | body | object | `credential` 资源链接。                |
| blob       | body | string | `credential`自身，包含一个序列化的字符串。       |
| project_id | body | string | `project`的ID。                     |
| type       | body | string | `credential`的类型，可以是`ec2`或者是`cert` |
| id         | body | string | `credential`的`UUID`。              |

#### 响应示例

```json
{
    "credential": {
        "user_id": "bb5476fd12884539b41d5a88f838d773",
        "links": {
            "self": "http://example.com/identity/v3/credentials/207e9b76935efc03804d3dd6ab52d22e9b22a0711e4ada4ff8b76165a07311d7"
        },
        "blob": "{\"access\": \"a42a27755ce6442596b049bd7dd8a563\", \"secret\": \"71faf1d40bb24c82b479b1c6fbbd9f0c\", \"trust_id\": null}",
        "project_id": "6e01855f345f4c59812999b5e459137d",
        "type": "ec2",
        "id": "207e9b76935efc03804d3dd6ab52d22e9b22a0711e4ada4ff8b76165a07311d7"
    }
}
```

### 更新凭据

```
[patch] /v3/credentials/{credential_id}
```

* 关联项： `https://docs.openstack.org/api/openstack-identity/3/rel/credential`
* 更新凭据信息。
* 正常返回代码：`200`
* 可能的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

| 参数名                | 位置   | 类型     | 描述                                 |
|--------------------|------|--------|------------------------------------|
| credential_id      | path | string | `credential`的`UUID`。               |
| credential         | body | object | 一个 `credential` 对象。                |
| project_id         | body | string | `project`的ID。                      |
| type (Optional)    | body | string | `credential`的类型，可以是`ec2`或者是`cert`。 |
| blob (Optional)    | body | string | `credential`自身，包含一个序列化的字符串。        |
| user_id (Optional) | body | string | 拥有该`credential`的用户ID。              |

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

```json
{
    "credential": {
        "blob": "{\"access\":\"181920\",\"secret\":\"secretKey\"}",
        "project_id": "731fc6f265cd486d900f16e84c5cb594",
        "type": "ec2",
        "user_id": "bb5476fd12884539b41d5a88f838d773"
    }
}
```

#### 响应参数

| 参数名        | 位置   | 类型     | 描述                                |
|------------|------|--------|-----------------------------------|
| credential | body | object | 一个 `credential` 对象。               |
| user_id    | body | string | 拥有该`credential`的用户ID。             |
| links      | body | object | `credential` 资源链接。                |
| blob       | body | string | `credential`自身，包含一个序列化的字符串。       |
| project_id | body | string | `project`的ID。                     |
| type       | body | string | `credential`的类型，可以是`ec2`或者是`cert` |
| id         | body | string | `credential`的`UUID`。              |

#### 响应示例

```json
{
    "credential": {
        "user_id": "bb5476fd12884539b41d5a88f838d773",
        "links": {
            "self": "http://example.com/identity/v3/credentials/207e9b76935efc03804d3dd6ab52d22e9b22a0711e4ada4ff8b76165a07311d7"
        },
        "blob": "{\"access\":\"181920\",\"secret\":\"secretKey\"}",
        "project_id": "731fc6f265cd486d900f16e84c5cb594",
        "type": "ec2",
        "id": "207e9b76935efc03804d3dd6ab52d22e9b22a0711e4ada4ff8b76165a07311d7"
    }
}
```

### 删除一个凭证

```
[delete] /v3/credentials/{credential_id}
```

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/credential`。
* 删除一个凭证。
* 正常返回代码：`204`
* 可能的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

| 参数名           | 位置   | 类型     | 描述                   |
|---------------|------|--------|----------------------|
| credential_id | path | string | `credential`的`UUID`。 |

#### 响应示例

```
译者注：该请求不会返回请求体。
```

## 域

```
译者注：关于域的状态，官方文档中类型为"String"，但是在实际操作中，会报错。应该为“Boolean”类型。
```

域是一个类似于容器的概念，容器中的内容可以为用户、用户组、项目。每一个用户组和项目必须明确指定一个所属域。

每一个与都会定义一个命名空间，命名空间中存在API可见的名称属性。这些属性必须在全局是唯一的。认证服务中涉及的唯一属性如下：

- `Domain name`，全局唯一。
- `Role name`，在所属域中唯一。
- `User name`，在所属域中唯一。
- `Project name`，在所属域中唯一。
- `Group name`，在所属域中唯一。

### 列出所有域

```
[get] /v3/domains
```

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/domains`
* 列出所有的域。
* 正常返回代码：`200`。
* 可能的错误代码：`413`,`405`,`404`,`403`,`401`,`400`,`503`

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

| 参数名                | 位置    | 类型     | 描述                                                                           |
|--------------------|-------|--------|------------------------------------------------------------------------------|
| name (Optional)    | query | string | 使用域的名称过滤列表。                                                                  |
| enabled (Optional) | query | string | 如果该项设置为`true`，则只会返回当前可用域，如果设置为`false`，则只会返回当前不可用的域。任何大于`0`的值都会被当做是`true`来处理。 |

#### 响应参数

| 参数名         | 位置   | 类型     | 描述                                         |
|-------------|------|--------|--------------------------------------------|
| domains     | body | array  | `domain`对象的列表。每一个元素都包含以下内容：                |
| description | body | string | `domain`的描述。                               |
| enabled     | body | string | 如果该项设置为`true`，则该域可用，如果该项设置为`false`，则该域不可用。 |
| id          | body | string | 域的ID。                                      |
| links       | body | object | `domain`资源的链接。                             |
| name        | body | string | `domain`的名称。                               |

#### 响应示例

```json
{
    "domains": [
        {
            "description": "Used for swift functional testing",
            "enabled": true,
            "id": "5a75994a383c449184053ff7270c4e91",
            "links": {
                "self": "http://example.com/identity/v3/domains/5a75994a383c449184053ff7270c4e91"
            },
            "name": "swift_test"
        },
        {
            "description": "Owns users and tenants (i.e. projects) available on Identity API v2.",
            "enabled": true,
            "id": "default",
            "links": {
                "self": "http://example.com/identity/v3/domains/default"
            },
            "name": "Default"
        }
    ],
    "links": {
        "next": null,
        "previous": null,
        "self": "http://example.com/identity/v3/domains"
    }
}
```

### 创建一个域

```
[post] /v3/domains
```

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/domains`
* 创建一个域。
* 正常返回代码： `201`
* 可能的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

| 参数名                    | 位置   | 类型     | 描述                                                                                                             |
|------------------------|------|--------|----------------------------------------------------------------------------------------------------------------|
| domain                 | body | object | 一个`domain`对象，包含以下：                                                                                             |
| enabled (Optional)     | body | string | 如果该项被设置为`true`，域被创建时为可用状态。如果被这只为`false`，域被创建时为不可用状态。 默认为`true`。用户只能对一个只有可用状态的域（或项目）才能被授权给用户。另外，用户也只能对可用状态的域授权。 |
| description (Optional) | body | string | `domain`对象的描述。                                                                                                 |
| name                   | body | string | `domain`对象的名称。                                                                                                 |

```json
{
    "domain": {
        "description": "Domain description",
        "enabled": true,
        "name": "myDomain"
    }
}
```

#### 响应参数

| 参数名         | 位置   | 类型     | 描述                                         |
|-------------|------|--------|--------------------------------------------|
| domain      | body | object | 一个`domain`对象，包含以下：                         |
| description | body | string | `domain`对象的描述。                             |
| enabled     | body | string | 如果该项设置为`true`，则该域可用，如果该项设置为`false`，则该域不可用。 |
| id          | body | string | `domain`的ID。                               |
| links       | body | object | `domain`对象的资源链接。                           |
| name        | body | string | `domain`对象的名称。                             |

#### 响应示例

```json
{
  "domain": {
    "links": {
      "self": "http://10.0.0.6/identity/v3/domains/ddbd3bd494394e9daf9d7efe6a5841be"
    },
    "description": "Domain description",
    "name": "myDomain",
    "enabled": true,
    "id": "ddbd3bd494394e9daf9d7efe6a5841be"
  }
}
```

### 获取域的详细信息

```
[get] /v3/domains/{domain_id}
```

* 关联项： `https://docs.openstack.org/api/openstack-identity/3/rel/domains`
* 获取域的详细信息。
* 正常返回代码：`200`
* 可能的错误代码：`413`,`405`,`404`,`403`,`401`,`400`,`503`

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

| 参数名       | 位置   | 类型     | 描述    |
|-----------|------|--------|-------|
| domain_id | path | string | 域的ID。 |

#### 响应参数

| 参数名         | 位置   | 类型     | 描述                                         |
|-------------|------|--------|--------------------------------------------|
| domain      | body | object | 一个`domain`对象，包含以下：                         |
| description | body | string | `domain`对象的描述。                             |
| enabled     | body | string | 如果该项设置为`true`，则该域可用，如果该项设置为`false`，则该域不可用。 |
| id          | body | string | `domain`的ID。                               |
| links       | body | object | `domain`对象的资源链接。                           |
| name        | body | string | `domain`对象的名称。                             |

#### 响应示例

```json
{
    "domain": {
        "description": "Owns users and tenants (i.e. projects) available on Identity API v2.",
        "enabled": true,
        "id": "default",
        "links": {
            "self": "http://example.com/identity/v3/domains/default"
        },
        "name": "Default"
    }
}
```

### 更新域信息

```
[patch] /v3/domains/{domain_id}
```

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/domain`
* 更新域信息。
* 正常返回代码：`200`。
* 可能的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

| Name                   | In   | Type   | Description                                                                                                                                                        |
|------------------------|------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| domain_id              | path | string | 域的ID。                                                                                                                                                              |
| domain                 | body | object | 一个`domain`对象，包含以下：                                                                                                                                                 |
| enabled (Optional)     | body | string | 如果该项被设置为`true`，域被创建时为可用状态。如果被这只为`false`，域被创建时为不可用状态。 默认为`true`。用户只能对一个只有可用状态的域（或项目）才能被授权给用户。另外，用户也只能对可用状态的域授权。 当你禁用一个域时，所有授权到该域的`token`都会失效。即使当你重新启用该域时，令牌也不会重新有效。 |
| description (Optional) | body | string | `domain`对象的新描述。                                                                                                                                                    |
| name (Optional)        | body | string | `domain`对象的新名称。                                                                                                                                                    |

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

#### 响应参数

| 参数名         | 位置   | 类型     | 描述                                         |
|-------------|------|--------|--------------------------------------------|
| domain      | body | object | 一个`domain`对象，包含以下：                         |
| description | body | string | `domain`对象的描述。                             |
| enabled     | body | string | 如果该项设置为`true`，则该域可用，如果该项设置为`false`，则该域不可用。 |
| id          | body | string | `domain`的ID。                               |
| links       | body | object | `domain`对象的资源链接。                           |
| name        | body | string | `domain`对象的名称。                             |

#### 响应示例

```json
{
    "domain": {
        "links": {
            "self": "http://example.com/identity/v3/domains/default"
        },
        "enabled": true,
        "description": "Owns users and projects on Identity API v2.",
        "name": "Default",
        "id": "default"
    }
}
```

### 删除域

```
[delete] /v3/domains/{domain_id}
```

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/domain`
* 删除一个域，
* 为了减小风险，你必须先使用更新域方法禁用要删除的域。
* 当你删除一个域时。也会删除该域包含的一切实体，如：用户、用户组、项目，以及与这些实体相关的凭证与授权。
* 如果你要删除一个启用状态的域，会返回一个 `Forbidden (403)` 错误代码。
* 正常返回代码： `204`。
* 可能的错误代码：`413`,`415`,`405`,`404`,`403`,`401`,`400`,`503`,`409`

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

| 参数名       | 位置   | 类型     | 描述    |
|-----------|------|--------|-------|
| domain_id | path | string | 域的ID。 |

#### 响应示例



