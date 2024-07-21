---
title: Identity API v3 (CURRENT)(三)
tags:
  - DevOps
categories:
  - Operations
  - OpenStack
toc: true
abbrlink: f5cff8d8
date: 2017-09-08 08:18:28
---

### [原文地址](https://developer.openstack.org/api-ref/identity/v3/#domain-configuration)

## 域配置

```
译者注：该组API实际为配置认证服务的相关信息。
```

你可以对特定的预配置项进行管理。

<!-- more -->

特定的域配置项是由一组对象组成的结构定义的。认证服务API只支持`identity` 和 `ldap` 组. 这些组可以复写由认证服务指定的默认配置项。

你可以通过`HTTP`协议的`PUT`、`PATCH`和`DELETE`方法去`创建`、`更新`和`删除`特定域配置项。当更新的时候只需要写入要变更的项目即可。

要创建一个配置项，可以通过PUT方法。一些敏感项目不会被包含在返回结果中。目前唯一被认为是敏感的选项是`ldap`组中的`password`
选项。

该API允许您将敏感选项包括为非敏感选项的一部分。例如，您可以将密码作为url选项的一部分包含在内。

如果你尝试为无权限的`identity`或`ldap`组创建或更新配置选项，则会返回 `Forbidden (403)` 返回码。

更多关于集成`LDAP`
服务的信息，请参阅： [Integrate Identity with LDAP](https://docs.openstack.org/admin-guide/keystone_integrate_with_ldap.html)。

### 显示默认的配置选项

```
[get] /v3/domains/config/default
```

* 默认的配置选项可以被复写和检索。
* 关联项： `https://docs.openstack.org/api/openstack-identity/3/rel/domain_config_default`

#### 请求参数

```
译者注：此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
```

#### 请求示例

#### 响应参数

| 参数名          | 位置   | 类型     | 描述                                                 |
|--------------|------|--------|----------------------------------------------------|
| config       | body | object | 一个`config`对象。                                      |
| ldap         | body | object | 一个`ldap`对象，需要配置`LDAP`组的配置选项。                       |
| url          | body | string | `LDAP`的URL                                         |
| user_tree_dn | body | string | `LDAP`的基础DN，可以被所有用户访问，如：`ou=Users,dc=root,dc=org`. |
| identity     | body | object | 一个`identity`对象。                                    |
| driver       | body | string | 认证驱动。                                              |

#### 响应示例

```json
{
    "config": {
        "identity": {
            "driver": "ldap"
        },
        "ldap": {
            "url": "ldap://localhost",
            "user": "",
            "suffix": "cn=example,cn=com",
            ....
        }
    }
}
```

### 显示某个组的默认配置选项

```
[get] /v3/domains/config/{group}/default
```

* 读取某个特定组的默认配置选项。
* 关联项： `https://docs.openstack.org/api/openstack-identity/3/rel/domain_config_default`
* 该API只支持 `identity` 和 `ldap` 。
* 正常返回代码：`200`
* 可能的错误代码： `413`,` 405`,` 404`,` 403`,`401`,` 400`,` 503`

#### 请求参数

```
译者注：
	1、此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
	2、在请求参数中，官方文档描述的是组的ID，但在实际调用中，可以选择为“identity”或者为“ldap”，如果给定为特定的GroupID，则会报错。
```

| 参数名   | 位置   | 类型     | 描述          |
|-------|------|--------|-------------|
| group | path | string | `group`的ID。 |

#### 请求示例

#### 响应参数

| 参数名          | 位置   | 类型     | 描述                                                   |
|--------------|------|--------|------------------------------------------------------|
| ldap         | body | object | 一个 `ldap` 对象，需要设置`ldap`组选项。                          |
| url          | body | string | `LDAP`的url                                           |
| user_tree_dn | body | string | LDAP的基础DN，必须要所有用户都能访问。例如：，`ou=Users,dc=root,dc=org`. |
| identity     | body | object | 一个 `identity` 对象。                                    |
| driver       | body | string | `identity`的后端驱动。                                     |

#### 响应示例

```json
{
    "ldap": {
        "url": "ldap://localhost",
        "user": "",
        "suffix": "cn=example,cn=com".
        ....
    }
}
```

```
译者注：下面的例子是错误的，因为咋地址中使用的特定的GroupID作为参数。
```

### 显示某个组的某个默认配置项

```
[get] /v3/domains/config/{group}/{option}/default
```

* 获取组内特定的配置。
* 关联项： `https://docs.openstack.org/api/openstack-identity/3/rel/domain_config_default`
* 该API仅支持 `identity`组`ldap`。对于 `ldap` 组来说，允许的值为： `url` 或 `user_tree_dn`。对于`identity`
  组来说，允许的值为：`driver`。
* 正常返回代码：`200`
* 可能的错误代码：`413`,`405`,` 404`,` 403`, `401`,` 400`, `503`

#### 请求参数

```
译者注：
	1、此处需要在请求头中加入X-Auth-token参数，该参数需要为Scoped。
	2、在请求参数中，官方文档描述的是组的ID，但在实际调用中，可以选择为“identity”或者为“ldap”，如果给定为特定的GroupID，则会报错。
```

| 参数名    | 位置   | 类型     | 描述                                                                               |
|--------|------|--------|----------------------------------------------------------------------------------|
| group  | path | string | `group`的ID，                                                                      |
| option | path | string | 选项名，对于 `ldap` 组来说，允许的值为： `url` 或 `user_tree_dn`。对于`identity` 组来说，允许的值为：`driver`。 |

#### 请求示例

#### 响应参数

| 参数名          | 位置   | 类型     | 描述                                                   |
|--------------|------|--------|------------------------------------------------------|
| url          | body | string | `LDAP`的URL。                                          |
| driver       | body | string | `identity`的后端驱动。                                     |
| user_tree_dn | body | string | LDAP的基础DN，必须要所有用户都能访问。例如：，`ou=Users,dc=root,dc=org`. |

#### 响应示例

```json
{
    "driver": "ldap"
}
```

### 译者注：补充说明

> 以下的一部分Api都是在需要额外的配置认证服务时才必要的，比如说：需要使用ldap来作为认证服务的后端驱动等，并且只能适用于认证服务版本2。

> ## 这些内容来自OpenStack认证服务Keystone的配置文件中的注释内容：
>
>This references the domain to use for all Identity API v2 requests (which are
> not aware of domains). A domain with this ID can optionally be created for
> you by keystone-manage bootstrap. The domain referenced by this ID cannot
> be deleted on the v3 API, to prevent accidentally breaking the v2 API. There
> is nothing special about this domain, other than the fact that it must exist
> to order to maintain support for your v2 clients. There is typically no
> reason to change this value. (string value)
> A subset (or all) of domains can have their own identity driver, each with
> their own partial configuration options, stored in either the resource
> backend or in a file in a domain configuration directory (depending on the
> setting of [identity] domain_configurations_from_database). Only values
> specific to the domain need to be specified in this manner. This feature is
> disabled by default, but may be enabled by default in a future release; set
> to true to enable. (boolean value)
> By default, domain-specific configuration data is read from files in the
> directory identified by [identity] domain_config_dir. Enabling this
> configuration option allows you to instead manage domain-specific
> configurations through the API, which are then persisted in the backend
> (typically, a SQL database), rather than using configuration files on disk.
> (boolean value)
> Absolute path where keystone should locate domain-specific [identity]

### 显示某个域下属组的默认配置选项

```
[get] /v3/domains/{domain_id}/config/{group}/{option}
```

* 关联项：`https://docs.openstack.org/api/openstack-identity/3/rel/domain_config_default`
* 显示某个域下的某个组的特定配置项。
* 该API仅支持 `identity`组`ldap`。对于 `ldap` 组来说，允许的值为： `url` 或 `user_tree_dn`。对于`identity`
  组来说，允许的值为：`driver`。
* 正常返回代码：`200`
* 可能的错误代码：`413`,`405`,` 404`,` 403`, `401`,` 400`, `503`

#### 请求参数

| 参数名       | 位置   | 类型     | 描述                                                                               |
|-----------|------|--------|----------------------------------------------------------------------------------|
| domain_id | path | string | `domain`的ID。                                                                     |
| group     | path | string | `group`的ID。                                                                      |
| option    | path | string | 选项名，对于 `ldap` 组来说，允许的值为： `url` 或 `user_tree_dn`。对于`identity` 组来说，允许的值为：`driver`。 |

#### 响应参数

| 参数名          | 位置   | 类型     | 描述                                                   |
|--------------|------|--------|------------------------------------------------------|
| url          | body | string | `LDAP`的URL。                                          |
| driver       | body | string | `identity`的后端驱动。                                     |
| ldap         | body | object | 一个 `ldap` 对象，需要在Path中配置`ldap`选项。                     |
| config       | body | object | 一个 `config`对象。                                       |
| user_tree_dn | body | string | LDAP的基础DN，必须要所有用户都能访问。例如：，`ou=Users,dc=root,dc=org`. |
| identity     | body | object | 一个 `identity` 对象。                                    |

#### 响应示例

```json
{
    "url": "http://myldap/root"
}
```

### 更新某个域下属组的默认配置选项（未译）

```
[patch] /v3/domains/{domain_id}/config/{group}/{option}
```

### 删除某个域下属组的默认配置选项（未译）

```
[delete] /v3/domains/{domain_id}/config/{group}/{option}
```

### 获取某个域下组的配置信息（未译）

```
[get] /v3/domains/{domain_id}/config/{group}
```

### 更新某个域下组的配置信息（未译）

```
[patch] /v3/domains/{domain_id}/config/{group}
```

### 删除某个域下组的配置信息（未译）

```
[delete] /v3/domains/{domain_id}/config/{group}
```

### 创建一个域配置（未译）

```
[put] /v3/domains/{domain_id}/config
```

### 显示一个域配置（未译）

```
[get] /v3/domains/{domain_id}/config
```

### 更新一个域配置（未译）

```
[patch] /v3/domains/{domain_id}/config
```

### 删除一个域配置（未译）

```
[delete] /v3/domains/{domain_id}/config
```



