---
title: Windows 与 Mac 添加静态路由
categories:
  - CheatSheets
tags:
  - DevOps
toc: true
cover: /assets/images/20190816084726.webp
abbrlink: 9b4e21b8
date: 2017-12-10T10:18:51.000Z
thumbnail: /assets/thumbnail/20190816084726.webp
---

为了解决多个网卡同时配置网关时部分内网不能访问的问题，可以通过配置静态路由来解决：

## mac route命令同时访问内外网

```shell
sudo route -n add -net 192.168.0.0 -netmask 255.255.255.0 192.168.5.254 
sudo route -n add -net 192.168.3.0 -netmask 255.255.255.0 192.168.5.254 
sudo route -n add -net 192.168.2.0 -netmask 255.255.255.0 192.168.5.254
```

<!-- more -->

## Windows route命令同时访问内外网

```powershell
route add -p 192.168.3.0 mask 255.255.255.0 192.168.5.254 
route add -p 192.168.0.0 mask 255.255.255.0 192.168.5.254 
route add -p 192.168.2.0 mask 255.255.255.0 192.168.5.254
```
