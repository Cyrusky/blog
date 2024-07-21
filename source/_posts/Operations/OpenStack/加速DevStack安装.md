---
title: 加速DevStack安装
tags:
  - OpenStack
  - Development
categories:
  - Operations
  - OpenStack
toc: true
thumbnail: 'https://imgs.borgor.cn/imgs20190625084713.png'
abbrlink: 7a87f5ae
date: 2017-10-30 20:32:37
---

# 一、更换系统源

devstack配置过程中会安装系统依赖，所以配置好系统源 当然是第一步

centos root执行:

```
 curl firxiao.com/sh/chrepo.sh|sh
```

<!-- more -->

ubuntu 普通用户执行:

```
curl firxiao.com/sh/chapt.sh|sudo sh
```

脚本会自动将源配置为aliyun的源



# 二、更换pip源

openstack是python项目 好多依赖都要用pip install 当然要换pip源啦

  执行以下命令即可

```
mkdir ~/.pip
cat << EOF > ~/.pip/pip.conf
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
trusted-host = mirrors.aliyun.com
EOF
```

# 三、更换git源

 在执行devstack的过程中 要去clone官方的源码

 默认用的是git://协议 如果你发现每次都是在git clone那卡住 

  那么你可以更换为[https://](https://my.oschina.net/firxiao/blog/481595)协议

  更改stackrc中GIT_BASE即可

```
diff --git a/stackrc b/stackrc
index d16fcf6..2290edd 100644
--- a/stackrc
+++ b/stackrc
@@ -161,7 +161,8 @@ USE_CONSTRAINTS=$(trueorfalse False USE_CONSTRAINTS)
 
 # Base GIT Repo URL
 # Another option is https://git.openstack.org
-GIT_BASE=${GIT_BASE:-git://git.openstack.org}
+#GIT_BASE=${GIT_BASE:-git://git.openstack.org}
+GIT_BASE=${GIT_BASE:-https://git.openstack.org}
 
 # Which libraries should we install from git instead of using released
 # versions on pypi?
```

  也可以更换为 <https://github.com/openstack>   

好啦 配置完以后 你的devstack 会不会快许多呢？
