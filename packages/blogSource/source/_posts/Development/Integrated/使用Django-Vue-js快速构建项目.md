---
title: 使用Django+Vue.js快速构建项目
tags:
  - 开发
categories:
  - Development
  - Integrated
cover: /assets/images/imgs20190625083622.webp
toc: true
abbrlink: 168aa3b1
date: 2019-06-11T14:33:30.000Z
thumbnail: /assets/thumbnail/imgs20190625083622.webp
---

# 安装Django

```shell
pip install django
```

如果需要`virtualenv`的话，请先创建虚拟环境。

```shell
virtualenv venv -p/usr/local/bin/python3
```

<!-- more -->

# 创建Django项目

```shell
django-admin startproject django_vue_manager
```

## 创建一个项目用于存放后端接口程序

```shell
cd django_vue_manager
django-admin startapp frontend
```

## 运行Django项目

```bash
python manage.py runserver
```

```shell
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 17 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.

June 12, 2019 - 02:56:23
Django version 2.2.2, using settings 'django_vue_manager.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

> 中间的告警是因为还没有进行数据库migrate

```shell
$ python manage.py makemigrations
No changes detected
$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying sessions.0001_initial... OK
```

# 创建Vue项目

使用`vue-cli`创建一个`webpack`项目作为前端，名字就叫做`frontend`

> `vue-cli`会自动安装所需要的`nodejs`包

创建完成的项目结构如下：

```shell
.
├── backend/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations/
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── django_vue_manager/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── frontend/
│   ├── README.md
│   ├── build/
│   │   ├── build.js
│   │   ├── check-versions.js
│   │   ├── logo.png
│   │   ├── utils.js
│   │   ├── vue-loader.conf.js
│   │   ├── webpack.base.conf.js
│   │   ├── webpack.dev.conf.js*
│   │   ├── webpack.prod.conf.js
│   │   └── webpack.test.conf.js
│   ├── config/
│   │   ├── dev.env.js
│   │   ├── index.js
│   │   ├── prod.env.js
│   │   └── test.env.js
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── App.vue
│   │   ├── assets/
│   │   ├── components/
│   │   ├── main.js
│   │   └── router/
│   ├── static/
│   └── test/
│       ├── e2e/
│       └── unit/
└── manage.py*
```

## webpack项目基本命令

### 运行dev模式：

```shell
cd frontend
yarn run dev
```

结果：

```shell
 DONE  Compiled successfully in 3852ms                                 10:46:09 AM
 I  Your application is running here: http://localhost:8080
```

### 打包webpack

```shell
yarn build
```

结果：

```shell
yarn run v1.15.2
$ node build/build.js
Hash: 3265f622e56ce4af884d
Version: webpack 3.12.0
Time: 7308ms
                                                  Asset       Size  Chunks             Chunk Names
               static/js/vendor.eefaac73d06c156e050b.js     120 kB       0  [emitted]  vendor
                  static/js/app.b22ce679862c47a75225.js    11.6 kB       1  [emitted]  app
             static/js/manifest.2ae2e69a05c33dfc65f8.js  857 bytes       2  [emitted]  manifest
    static/css/app.30790115300ab27614ce176899523b62.css  432 bytes       1  [emitted]  app
static/css/app.30790115300ab27614ce176899523b62.css.map  828 bytes          [emitted]
           static/js/vendor.eefaac73d06c156e050b.js.map     602 kB       0  [emitted]  vendor
              static/js/app.b22ce679862c47a75225.js.map    22.2 kB       1  [emitted]  app
         static/js/manifest.2ae2e69a05c33dfc65f8.js.map    4.97 kB       2  [emitted]  manifest
                                             index.html  510 bytes          [emitted]

  Build complete.

  Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work.

✨  Done in 10.41s.
```

打包后的目录结构

```shell
$ tree dist
dist
├── index.html
└── static
    ├── css
    │   ├── app.30790115300ab27614ce176899523b62.css
    │   └── app.30790115300ab27614ce176899523b62.css.map
    └── js
        ├── app.b22ce679862c47a75225.js
        ├── app.b22ce679862c47a75225.js.map
        ├── manifest.2ae2e69a05c33dfc65f8.js
        ├── manifest.2ae2e69a05c33dfc65f8.js.map
        ├── vendor.eefaac73d06c156e050b.js
        └── vendor.eefaac73d06c156e050b.js.map

3 directories, 9 files
```

# 项目配置

## 配置Django项目的模板搜索路径

{% codeblock django_vue_manager/settings.py lang:python %}
TEMPLATES = [
{
'BACKEND': 'django.template.backends.django.DjangoTemplates',

## 在此处配置frontend项目的构建目录

​        'DIRS': ['frontend/dist'],
​        'APP_DIRS': True,
​        'OPTIONS': {
​            'context_processors': [
​                'django.template.context_processors.debug',
​                'django.template.context_processors.request',
​                'django.contrib.auth.context_processors.auth',
​                'django.contrib.messages.context_processors.messages',
​            ],
​ },
​ }
{% endcodeblock %}

## 配置静态文件搜索路径

{% codeblock django_vue_manager/settings.py lang:python %}

## ------------ 以下为新增内容 ------------

STATICFILES_DIRS = [
os.path.join(BASE_DIR, "frontend/dist/static"),
]

## --------------------------------------

{% endcodeblock %}

## 关闭Django自带的`Csrf`校验中间件

{% codeblock django_vue_manager/settings.py lang:python %}
MIDDLEWARE = [
'django.middleware.security.SecurityMiddleware',
'django.contrib.sessions.middleware.SessionMiddleware',
'django.middleware.common.CommonMiddleware',

# 'django.middleware.csrf.CsrfViewMiddleware',

'django.contrib.auth.middleware.AuthenticationMiddleware',
'django.contrib.messages.middleware.MessageMiddleware',
'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
{% endcodeblock %}

> 不要调整中间件的顺序，中间件的调用是有顺序的。

### 在Django项目中添加首页route和api_route

> 直接使用[TemplateView](https://docs.djangoproject.com/en/2.2/ref/class-based-views/base/#templateview)

{% codeblock django_vue_manager/urls.py lang:python %}
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

urlpatterns = [
path('admin/', admin.site.urls),
re_path(r'^admin/', admin.site.urls),
re_path(r'^$', TemplateView.as_view(template_name="index.html")),
re_path(r'^api/', include('backend.urls'))
]
{% endcodeblock %}

创建一个api的route_url文件

{% codeblock 新建文件——backend/urls.py lang:python %}
from django.urls import path, re_path

urlpatterns = [

# Api的相关route需要写在这个地方

]
{% endcodeblock %}

# 调试

运行后端程序

```shell
$ python manage.py runserver

Watching for file changes with StatReloader
Performing system checks...

June 12, 2019 - 03:23:28
Django version 2.2.2, using settings 'django_vue_manager.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

运行前端程序

```shell
$ yarn run dev
 DONE  Compiled successfully in 5027ms                  11:24:44 AM
 I  Your application is running here: http://localhost:8080
```

## 调试配置

由于前后端运行在不同的端口上，所以需要使用webpack的代理服务进行代理，具体配置方法：

{% codeblock frontend/build/webpack.dev.conf.js lang:javascript %}

dev: {
// Paths
assetsSubDirectory: 'static',
assetsPublicPath: '/',
// -----------------------------主要修改proxyTable，具体如下
proxyTable: {
'/api': 'http://localhost:8000'
},
// ------------------------------------------------------

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,
    
    /**
     * Source Maps
     */
    
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',
    
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    
    cssSourceMap: true

},

{% endcodeblock %}

> 请求到 `/api/xxx` 现在会被代理到请求 `http://localhost:3000/api/xxx`, 例如 `/api/user`
> 现在会被代理到请求 `http://localhost:8000/api/user`

# 部署

部署的时候直接使用`yarn build`打包前段项目后，上传整个项目就可以了。


