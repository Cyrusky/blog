---
title: Horizon的登录过程
tags:
  - DevOps
categories:
  - Operations
  - OpenStack
toc: true
cover: /assets/images/imgs20190625084343.webp
abbrlink: 33fbe266
date: 2018-07-02T13:59:42.000Z
thumbnail: /assets/thumbnail/imgs20190625084343.webp
---

# 正常的Django访问流程

<!-- more -->

```flow
flow
st=>start: Requests
manager=>operation: python manage.py runserver
setting=>inputoutput: setting.py
user=>operation: User
url=>operation: url.py
views=>operation: views.py
e=>end: Terminate
st->manager(right)->setting->url->views->user->e

```

# Django身份认证框架

```flow
st=>start: Request
auth=>condition: authentication 
& authorization
response_302=>operation: Response 302
response_redirect=>operation: Redirect to Login
user_view=>operation: Response of User Views
login=>operation: Login
record=>operation: Record SessionID to Cookies
e=>end: response
st->auth
auth(no)->response_302->response_redirect->login->record(right)->auth
auth(yes)->user_view->e
```

## Django的身份验证系统

1. `auth`模块是`Django`提供的标准权限管理系统，并可拓展性

2. `auth`身份验证系统包括:

    * `user`

   > user对象是身份验证系统的核心(`django.contrib.auth.models.User`类)

    * `permission`

   > 为指定的用户和用户组指定权限(`django.contrib.auth.models.ModelAdmin`类)

    * `group`

   > 一个分组中的用户可自动获得该分组的权限(`django.contrib.auth.models.Group`类)

    * `可配置的密码哈希系统`

   > `django`不在用户模型中存储原始密码，只存储密码的哈希值

3. 可集成第三方认证系统

### django.contrib.auth

1. 在`settings.py`文件中的`INSTALLED_APPS`中

   > 添加`django.contrib.auth`以激活认证系统

2. 在`settings.py`文件中的`MIDDLEWARE_CLASSES`中

   > 添加`django.contrib.auth.middleware.AuthenticationMiddleware`以在中间件处理`request`请求时完成身份认证

3. 在`settings.py`文件中的`AUTHENTICATION_BACKENDS`中

   > 添加`openstack_auth.backend.KeystoneBackend`以指定`keystone`进行用户认证

### 自定义认证后端

```
自定义认证后端:通过类定义，且必须实现以下两个方法
```

1. **authenticate()**

   `authenticate()`检查传入的用户凭据，并在通过检查时返回对应的`User`对象，否则返回`None`当调用`authenticate()`
   方法时，`Django`会在`AUTHENTICATION_BACKENDS`指定的所有身份认证后端中一一尝试认 证(第一个后端认证失败，尝试使用第二个认证后端，
   **依次类推**)

2. **get_user(user_id)**

   参数`user_id`可以是用户名或数据库中的`ID`等，但必须是`User`对象的主键`get_user()`返回一个`User`对象

## 使用django身份验证系统

1. `Django`使用会话和中间件把身份验证系统插入`request`对象，为每个请求提供`request.user` 属性，表示当前用户
2. 未认证用户是一个`AnonymousUser`实例，已认证用户是一个`User`实例
3. `request.user`提供了一个方法`is_authenticated()`判断当前用户是否登陆

# Horizon登录验证流程

```flow
st=>start: 开始
user=>operation: 用户
url=>operation: url.py
is_user_exist=>condition: 用户存在？
get_user_home=>operation: horizon.__init__.get_user_home
has_dashboard=>condition: 有默认Dashboard
base_get_user_home=>operation: horizon.base.Size:get_user_home(self,user)
views_get_user_home=>operation: openstack_dashboard.views.py:get_user_home(user)
get_default_dashboard=>operation: horizon.base.Size: get_default_dashboard()
registered=>operation: horizon.base.Registry._registered()
get_absolute_url=>operation: horizon.base.Dashboard.get_absolute_url()
panel_get_absolute_url=>operation: horzion.base.Panel.get_absolute_url()

auth_form_login=>operation: openstack_auth.forms.login()
t_or_v=>condition: Template?
template_html=>operation: horizon/templates/login.html
auth_form_login_init=>operation: openstack_auth.forms.login.__init__()
get_region=>operation: openstack_auth.forms.lgin.get_region_choise()
response=>operation: Response
base_html=>inputoutput: horizon/templates/base.html
login_html=>inputoutput: horizon/template/auth/_login.html
e=>end: 结束

st->user->url->is_user_exist
is_user_exist(yes)->get_user_home->has_dashboard
is_user_exist(no)->auth_form_login->t_or_v
t_or_v(yes)->base_html->login_html->template_html->response
t_or_v(no)->auth_form_login_init->get_region->response->e
has_dashboard(yes)->get_default_dashboard
has_dashboard(no)->base_get_user_home->views_get_user_home(left)->get_default_dashboard->registered->get_absolute_url->panel_get_absolute_url->response
get_user_home(yes)->base_get_user_home

```

