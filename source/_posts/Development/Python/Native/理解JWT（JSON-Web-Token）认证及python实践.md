---
title: 理解JWT（JSON Web Token）认证及python实践
tags:
  - jwt
  - auth
categories:
  - Development
  - Python
thumbnail: 'https://imgs.borgor.cn/imgs20190709084601.png'
reprint: 'https://segmentfault.com/a/1190000010312468'
abbrlink: aa2e3afb
date: 2019-07-09 08:44:18
---

## JWT 认证

> `Json web token (JWT)`, 根据官网的定义，是为了在网络应用环境间传递声明而执行的一种基于 JSON 的开放标准（(RFC 7519).该 token 被设计为紧凑且安全的，特别适用于分布式站点的单点登录（SSO）场景。JWT 的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该 token 也可直接被用于认证，也可被加密。

<!-- more -->

### JWT 特点

- 体积小，因而传输速度快
- 传输方式多样，可以通过 URL/POST 参数/HTTP 头部等方式传输
- 严格的结构化。它自身（在 payload 中）就包含了所有与用户相关的验证消息，如用户可访问路由、访问有效期等信息，服务器无需再去连接数据库验证信息的有效性，并且 payload 支持为你的应用而定制化。
- 支持跨域验证，可以应用于单点登录。

### JWT 原理

JWT 是 Auth0 提出的通过对 JSON 进行加密签名来实现授权验证的方案，编码之后的 JWT 看起来是这样的一串字符：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

由 `.` 分为三段，通过解码可以得到：

#### 1. 头部（Header）

```
// 包括类别（typ）、加密算法（alg）；
{
  "alg": "HS256",
  "typ": "JWT"
}
```

jwt 的头部包含两部分信息：

- 声明类型，这里是 jwt
- 声明加密的算法 通常直接使用 HMAC SHA256

然后将头部进行 base64 加密（该加密是可以对称解密的)，构成了第一部分。

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
```

#### 2. 载荷（payload）

载荷就是存放有效信息的地方。这些有效信息包含三个部分：

- 标准中注册声明
- 公共的声名
- 私有的声明

`公共的声明 ：`
公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息.但不建议添加敏感信息，因为该部分在客户端可解密。

`私有的声明 ：`
私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为 base64 是对称解密的，意味着该部分信息可以归类为明文信息。

下面是一个例子：

```
// 包括需要传递的用户信息；
{ "iss": "Online JWT Builder",
  "iat": 1416797419,
  "exp": 1448333419,
  "aud": "www.gusibi.com",
  "sub": "uid",
  "nickname": "goodspeed",
  "username": "goodspeed",
  "scopes": [ "admin", "user" ]
}
```

- iss: 该 JWT 的签发者，是否使用是可选的；
- sub: 该 JWT 所面向的用户，是否使用是可选的；
- aud: 接收该 JWT 的一方，是否使用是可选的；
- exp(expires): 什么时候过期，这里是一个 Unix 时间戳，是否使用是可选的；
- iat(issued at): 在什么时候签发的(UNIX 时间)，是否使用是可选的；

其他还有：

- nbf (Not Before)：如果当前时间在 nbf 里的时间之前，则 Token 不被接受；一般都会留一些余地，比如几分钟；，是否使用是可选的；
- jti: jwt 的唯一身份标识，主要用来作为一次性 token，从而回避重放攻击。

将上面的 JSON 对象进行`base64编码`可以得到下面的字符串。这个字符串我们将它称作 JWT 的 Payload（载荷）。

```
eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0MTY3OTc0MTksImV4cCI6MTQ0ODMzMzQxOSwiYXVkIjoid3d3Lmd1c2liaS5jb20iLCJzdWIiOiIwMTIzNDU2Nzg5Iiwibmlja25hbWUiOiJnb29kc3BlZWQiLCJ1c2VybmFtZSI6Imdvb2RzcGVlZCIsInNjb3BlcyI6WyJhZG1pbiIsInVzZXIiXX0
```

> `信息会暴露`：由于这里用的是可逆的 base64 编码，所以第二部分的数据实际上是明文的。我们应该避免在这里存放不能公开的隐私信息。

#### 3. 签名（signature）

```
// 根据alg算法与私有秘钥进行加密得到的签名字串；
// 这一段是最重要的敏感信息，只能在服务端解密；
HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    SECREATE_KEY
)
```

jwt 的第三部分是一个签证信息，这个签证信息由三部分组成：

- header (base64 后的)
- payload (base64 后的)
- secret

将上面的两个编码后的字符串都用句号.连接在一起（头部在前），就形成了:

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKb2huIFd1IEpXVCIsImlhdCI6MTQ0MTU5MzUwMiwiZXhwIjoxNDQxNTk0NzIyLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiZnJvbV91c2VyIjoiQiIsInRhcmdldF91c2VyIjoiQSJ9
```

最后，我们将上面拼接完的字符串用 HS256 算法进行加密。在加密的时候，我们还需要提供一个密钥（secret）。如果我们用 `secret` 作为密钥的话，那么就可以得到我们加密后的内容:

```
pq5IDv-yaktw6XEa5GEv07SzS9ehe6AcVSdTj0Ini4o
```

将这三部分用.连接成一个完整的字符串,构成了最终的 jwt:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0MTY3OTc0MTksImV4cCI6MTQ0ODMzMzQxOSwiYXVkIjoid3d3Lmd1c2liaS5jb20iLCJzdWIiOiIwMTIzNDU2Nzg5Iiwibmlja25hbWUiOiJnb29kc3BlZWQiLCJ1c2VybmFtZSI6Imdvb2RzcGVlZCIsInNjb3BlcyI6WyJhZG1pbiIsInVzZXIiXX0.pq5IDv-yaktw6XEa5GEv07SzS9ehe6AcVSdTj0Ini4o
```

> `签名的目的`：签名实际上是对头部以及载荷内容进行签名。所以，如果有人对头部以及载荷的内容解码之后进行修改，再进行编码的话，那么新的头部和载荷的签名和之前的签名就将是不一样的。而且，如果不知道服务器加密的时候用的密钥的话，得出来的签名也一定会是不一样的。
> 这样就能保证 token 不会被篡改。

token 生成好之后，接下来就可以用 token 来和服务器进行通讯了。

下图是 client 使用 JWT 与 server 交互过程:

![](https://imgs.borgor.cn/imgs20190709084721.png)

这里在第三步我们得到 JWT 之后，需要将 JWT 存放在 client，之后的每次需要认证的请求都要把 JWT 发送过来。（请求时可以放到 header 的 Authorization ）

### JWT 使用场景

JWT 的主要优势在于使用无状态、可扩展的方式处理应用中的用户会话。服务端可以通过内嵌的声明信息，很容易地获取用户的会话信息，而不需要去访问用户或会话的数据库。在一个分布式的面向服务的框架中，这一点非常有用。

但是，如果系统中需要使用黑名单实现长期有效的 token 刷新机制，这种无状态的优势就不明显了。

> ```
> 优点
> ```

快速开发
不需要 cookie
JSON 在移动端的广泛应用
不依赖于社交登录
相对简单的概念理解

> ```
> 缺点
> ```

Token 有长度限制
Token 不能撤销
需要 token 有失效时间限制(exp)

## python 使用 JWT 实践

我基本是使用 python 作为服务端语言，我们可以使用 [pyjwt：https://github.com/jpadilla/pyjwt/](https://github.com/jpadilla/pyjwt/)

使用比较方便，下边是我在应用中使用的例子：

```
import jwt
import time

# 使用 sanic 作为restful api 框架
def create_token(request):
    grant_type = request.json.get('grant_type')
    username = request.json['username']
    password = request.json['password']
    if grant_type == 'password':
        account = verify_password(username, password)
    elif grant_type == 'wxapp':
        account = verify_wxapp(username, password)
    if not account:
        return {}
    payload = {
        "iss": "gusibi.com",
         "iat": int(time.time()),
         "exp": int(time.time()) + 86400 * 7,
         "aud": "www.gusibi.com",
         "sub": account['_id'],
         "username": account['username'],
         "scopes": ['open']
    }
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    return True, {'access_token': token, 'account_id': account['_id']}


def verify_bearer_token(token):
    #  如果在生成token的时候使用了aud参数，那么校验的时候也需要添加此参数
    payload = jwt.decode(token, 'secret', audience='www.gusibi.com', algorithms=['HS256'])
    if payload:
        return True, token
    return False, token
```

这里，我们可以使用 jwt 直接生成 token，不用手动 base64 加密和拼接。
