---
title: Django中的中间件机制
tags:
  - 开发
categories:
  - Development
  - Python
toc: true
cover: /assets/images/imgs20190625083744.webp
abbrlink: 4e5ff57d
date: 2018-06-20T11:27:49.000Z
thumbnail: /assets/thumbnail/imgs20190625083744.webp
---

在这篇文章中，将会介绍到以下内容：

- 什么是中间件**MiddleWare**
- 中间件的运行过程

编写中间件时需要注意的内容

<!-- more -->

# 什么是中间件MiddleWare

> Middleware is a framework of hooks into Django’s request/response processing. It’s a light, low-level “plugin” system
> for globally altering Django’s input or output.
>
> from [*docs.djangoproject.com*](https://docs.djangoproject.com/en/2.0/topics/http/middleware/)

依照官网的说法，中间件是一种轻量级的插件，每一个中间件在处理**Request**和**Response**时会进行一些特定的操作。

## 主要的内建中间件 [参见](https://docs.djangoproject.com/en/2.0/ref/middleware/)：

- ***Cache middleware***

  >
  启用后，所有Django驱动的页面都会被缓存一段时间，时间由[`CACHE_MIDDLEWARE_SECONDS`](https://docs.djangoproject.com/en/2.0/ref/settings/#std:setting-CACHE_MIDDLEWARE_SECONDS)
  确定，默认为600秒。

- ***Common middleware***

  启用该中间件可以做一些站点的通用配置，如：

  > -
  通过配置[`DISALLOWED_USER_AGENTS`](https://docs.djangoproject.com/en/2.0/ref/settings/#std:setting-DISALLOWED_USER_AGENTS)
  ，过滤用户的**User-Agent**
  > - 通过配置[`APPEND_SLASH`](https://docs.djangoproject.com/en/2.0/ref/settings/#std:setting-APPEND_SLASH)
      和[`PREPEND_WWW`](https://docs.djangoproject.com/en/2.0/ref/settings/#std:setting-PREPEND_WWW)来设置：
      >
    - ***APPEND_SLASH***为*True*并且URL没有以**'/'**结尾的话，没有匹配url时会在结尾加上**‘/’**后再次尝试。
  > - ***PREPEND_WWW***为True的话，会在url前加上www。

- ***GZip middleware***

  > 使用GZip压缩网站内容

- ***Conditional GET middleware***

  使用*条件Get*，即：

  > ​
  客户端向服务器发送一个包询问是否在上一次访问网站的时间后是否更改了页面，如果服务器没有更新，显然不需要把整个网页传给客户端，客户端只要使用本地缓存即可，如果服务器对照客户端给出的时间已经更新了客户端请求的网页，则发送这个更新了的网页给用户。

  > Handles conditional GET operations. If the response doesn’t have an`ETag`header, the middleware adds one if needed.
  If the response has a`ETag`or`Last-Modified`header, and the request has`If-None-Match`or`If-Modified-Since`, the
  response is replaced by
  an[`HttpResponseNotModified`](https://docs.djangoproject.com/en/2.0/ref/request-response/#django.http.HttpResponseNotModified).

- ***Locale middleware***

  > 启用后可以做网站本地化（I18N）功能。

- ***Message middleware***

  > 启用基于*Cookie*或者*Session*的消息机制（同时适用于匿名访问和授权访问）

- ***[Security middleware](https://docs.djangoproject.com/en/2.0/ref/middleware/#module-django.middleware.security)***

  > 提供几种安全机制，分别通过以下配置项控制
  >
  > - SECURE_BROWSER_XSS_FILTER
  > - SECURE_CONTENT_TYPE_NOSNIFF
  > - SECURE_HSTS_INCLUDE_SUBDOMAINS
  > - SECURE_HSTS_PRELOAD
  > - SECURE_HSTS_SECONDS
  > - SECURE_REDIRECT_EXEMPT
  > - SECURE_SSL_HOST
  > - SECURE_SSL_REDIRECT

- ***Session middleware***

  > 启用Session支持

- ***Site middleware***

  > 在每一个输入的***HttpRequest***中加入***site***属性。

- ***Authentication middleware***

  > - **AuthenticationMiddleware**：在每一个输入的***HttpRequest***中加入***user***属性。
  > - **RemoteUserMiddleware**：利用*Web Server*提供认证服务。
  > - **PersistentRemoteUserMiddleware**：只在登录页面使用利用*Web Server*提供认证服务。

- ***CSRF protection middleware***

  > 防止跨域访问，避免跨站攻击。

- ***X-Frame-Options middleware***

  > 能够在***Request***/***Response***的头部加入类似于**X-**开头的头部。

## 内建中间件的建议排序方式

1. [`SecurityMiddleware`](https://docs.djangoproject.com/en/2.0/ref/middleware/#django.middleware.security.SecurityMiddleware)

   It should go near the top of the list if you’re going to turn on the SSL redirect as that avoids running through a
   bunch of other unnecessary middleware.

2. [`UpdateCacheMiddleware`](https://docs.djangoproject.com/en/2.0/ref/middleware/#django.middleware.cache.UpdateCacheMiddleware)

   Before those that modify the `Vary` header (`SessionMiddleware`,`GZipMiddleware`, `LocaleMiddleware`).

3. [`GZipMiddleware`](https://docs.djangoproject.com/en/2.0/ref/middleware/#django.middleware.gzip.GZipMiddleware)

   Before any middleware that may change or use the response body.

   After `UpdateCacheMiddleware`: Modifies `Vary` header.

4. [`ConditionalGetMiddleware`](https://docs.djangoproject.com/en/2.0/ref/middleware/#django.middleware.http.ConditionalGetMiddleware)

   Before `CommonMiddleware`: uses its `ETag` header
   when [`USE_ETAGS`](https://docs.djangoproject.com/en/2.0/ref/settings/#std:setting-USE_ETAGS) = `True`.

5. [`SessionMiddleware`](https://docs.djangoproject.com/en/2.0/ref/middleware/#django.contrib.sessions.middleware.SessionMiddleware)

   After `UpdateCacheMiddleware`: Modifies `Vary` header.

6. [`LocaleMiddleware`](https://docs.djangoproject.com/en/2.0/ref/middleware/#django.middleware.locale.LocaleMiddleware)

   One of the topmost, after `SessionMiddleware` (uses session data) and`UpdateCacheMiddleware` (modifies `Vary`
   header).

7. [`CommonMiddleware`](https://docs.djangoproject.com/en/2.0/ref/middleware/#django.middleware.common.CommonMiddleware)

   Before any middleware that may change the response (it sets the `ETag`and `Content-Length` headers). A middleware
   that appears before`CommonMiddleware` and changes the response must reset the headers.

   After `GZipMiddleware` so it won’t calculate an `ETag` header on gzipped contents.

   Close to the top: it redirects
   when [`APPEND_SLASH`](https://docs.djangoproject.com/en/2.0/ref/settings/#std:setting-APPEND_SLASH)
   or [`PREPEND_WWW`](https://docs.djangoproject.com/en/2.0/ref/settings/#std:setting-PREPEND_WWW) are set to `True`.

8. [`CsrfViewMiddleware`](https://docs.djangoproject.com/en/2.0/ref/middleware/#django.middleware.csrf.CsrfViewMiddleware)

   Before any view middleware that assumes that CSRF attacks have been dealt with.

   It must come after `SessionMiddleware` if you’re
   using[`CSRF_USE_SESSIONS`](https://docs.djangoproject.com/en/2.0/ref/settings/#std:setting-CSRF_USE_SESSIONS).

9. [`AuthenticationMiddleware`](https://docs.djangoproject.com/en/2.0/ref/middleware/#django.contrib.auth.middleware.AuthenticationMiddleware)

   After `SessionMiddleware`: uses session storage.

10. [`MessageMiddleware`](https://docs.djangoproject.com/en/2.0/ref/middleware/#django.contrib.messages.middleware.MessageMiddleware)

    After `SessionMiddleware`: can use session-based storage.

11. [`FetchFromCacheMiddleware`](https://docs.djangoproject.com/en/2.0/ref/middleware/#django.middleware.cache.FetchFromCacheMiddleware)

    After any middleware that modifies the `Vary` header: that header is used to pick a value for the cache hash-key.

12. [`FlatpageFallbackMiddleware`](https://docs.djangoproject.com/en/2.0/ref/contrib/flatpages/#django.contrib.flatpages.middleware.FlatpageFallbackMiddleware)

    Should be near the bottom as it’s a last-resort type of middleware.

13. [`RedirectFallbackMiddleware`](https://docs.djangoproject.com/en/2.0/ref/contrib/redirects/#django.contrib.redirects.middleware.RedirectFallbackMiddleware)

    Should be near the bottom as it’s a last-resort type of middleware.

# 中间件的运行过程

## 以函数(方法)的方式定义中间件

```python
def simple_middleware(get_response):
    # ----------------------
    # .
    # . 定义一些在中间件初始化的过程中运行的代码
    # .
    # ----------------------
    def middleware(request):
        # ----------------------
        # .
        # . 在调用view之前执行的代码
        # .
        # ----------------------
        response = get_response(request) # 执行正常的view代码
        # ----------------------
        # .
        # . 在调用view之后执行的代码
        # .
        # ----------------------
        return response
    return middleware
```

## 以类的方式定义中间件

```python
class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # ----------------------
        # .
        # . 定义一些在中间件初始化的过程中运行的代码
        # .
        # ----------------------

    def __call__(self, request):
        # ----------------------
        # .
        # . 在调用view之前执行的代码
        # .
        # ----------------------
        response = self.get_response(request) # 执行正常的view代码
        # ----------------------
        # .
        # . 在调用view之后执行的代码
        # .
        # ----------------------
        return response
```

    ### 将中间件标记为未使用

在`__init__()`
中抛出[`MiddlewareNotUsed`](https://docs.djangoproject.com/en/2.0/ref/exceptions/#django.core.exceptions.MiddlewareNotUsed)
异常将会从Django中移除这个中间件，同时，如果`DEBUG`配置开启（为`True`）的话，会在`django.request中`打印出日志信息。

### 激活中间件

在配置文件中添加`MIDDLEWARE`列表，列表中的中间件将会按照顺序执行。默认为：

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

### 其他的中间件钩子

* ***Process_view()***：在调用正常的`view`之前调用。
    * ***process_view(request, view_func, view_args, view_kwargs)***
* ***process_exception()***：处理`view`中抛出的异常。
    * ***process_exception(request, exception)***
* ***process_template_response()***：返回一个`TemplateResponse`对象。
    * ***process_template_response(request, response)***

## 老版本的Django使用的中间件定义方式

```python
class AnotherMiddleware(object):
    def process_request(self, request):
        # 在处理view之前处理request
        print "Another middleware executed"

    def process_response(self, request, response):
        # 在处理view之后处理response
        print "AnotherMiddleware process_response executed"
        return response

class BookMiddleware(object):
    def process_request(self, request):
        # 在处理view之前处理request
        print "Middleware executed"
        print request.user
        return HttpResponse("some response")
        #self._start = time.time()

    def process_response(self, request, response):
        # 在处理view之后处理response
        print "BookMiddleware process_response executed"
        return response
```

*Django*按照配置文件中的配置顺序调用*process_request*，然后请求*view*，获取*response*，在按照配置反向顺序调用
*process_response*。

## 兼容老版本的定义方式

新版本定义过程中可以使用继承`class django.utils.deprecation.MiddlewareMixin`的方式来兼容老版本的中间件。

```python
class MiddlewareMixin:
    def __init__(self, get_response=None):
        self.get_response = get_response
        super().__init__()

    def __call__(self, request):
        response = None
        if hasattr(self, 'process_request'):
            response = self.process_request(request)
        if not response:
            response = self.get_response(request)
        if hasattr(self, 'process_response'):
            response = self.process_response(request, response)
        return response
```

主要进行了以下操作：

> 1. Calls `self.process_request(request)` (if defined).
> 2. Calls `self.get_response(request)` to get the response from later middleware and the view.
> 3. Calls `self.process_response(request, response)` (if defined).
> 4. Returns the response.

# 编写中间件时需要注意的内容

- `middlewares`的顺序非常重要
- `一个middleware`只需要继承`object`类
- 一个`middleware`可以实现一些方法并且不需要实现所有的方法
- 一个`middleware`可以实现 `process_request`（方法）但是不实现`process_response`（方法） 和 `process_view `方法。
  这些都很常见，Django提供了很多`middlewares`可以做到。
    - `AuthenticationMiddleware`
      只实现了对请求的处理，并没有处理响应.[参照文档](https://blog.csdn.net/orangleliu/article/details/%28https://github.com/django/django/blob/master/django/contrib/auth/middleware.py#L14%29)
- 一个`middleware`可以实现 `process_response`方法，但是不实现 `process_request`方法
    - `GZipMiddleware`
      只实现了对响应的处理，并没有实现对请求和view的处理[参见文档](https://github.com/django/django/blob/master/django/middleware/gzip.py#L9)
