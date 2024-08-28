---
title: 在Linux上搭建TimeMachine备份服务器
date: 2017-9-6
categories:
  - Operations
  - System
tags:
  - DevOps
toc: true
cover: /assets/images/imgs20190625084745.webp
abbrlink: f6088a4f
thumbnail: /assets/thumbnail/imgs20190625084745.webp
---

# First Things First

虽然看起来很有趣，但是有以下几点是必须要注意的。

- Time Machine 使用的 AFP 协议__没有加密__。因此，如果你的服务器暴露在公网：有必要新建一个账户单独用于 Time Machine 使用。
- 这个账户应当使用__随机密码__，以避免撞库。
- 有必要__禁用这个账户任何不必要的权限__。换言之，**不要赋予任何不需要的权限**（尤其 ssh 登录）。
- AFP 使用 TCP 548 端口。在服务商面板／`iptables`／`ufw` **限制这个端口传入连接的 IP 地址**。如果你的 IP
  地址并不是固定的，那么请复习一下 [IP 地址段表示法](http://vod.sjtu.edu.cn/help/Article_Print.asp?ArticleID=631)
  ，限制为你可能被分配到的 IP 地址范围。
- 即便如此，Time Machine 开启加密的捆绑稀疏镜像依然是安全的。所以务必加密。

<!-- more -->

所以还是建议在内网使用。以我国家庭宽带坑爹的上传带宽，放在公网上估计一辈子也传不完。

理论上来说，此法应当适用于一切 *nix 机器，包括但不限于 VPS、Mac、NAS、树莓派、路由器、冰箱、电视盒子等。

# Getting started

如果你已经有了一个可以正常挂载使用的硬盘分区，那么可以跳过这一段。

## 创建文件系统

假设硬盘的位置在 `/dev/vdb`，

创建 GPT：

```
parted -s /dev/vdb mklabel gpt

```

新建分区：

```
parted -s /dev/vdb unit mib mkpart primary 0% 100%

```

创建文件系统（以 `ext4` 为例）：

```
mkfs.ext4 /dev/vdb1

```

## 创建用户并挂载分区

添加用户（以用户名 `exampleuser` 为例）：

```
sudo adduser exampleuser

```

如果服务器在公网，务必用密码管理工具（1Password, Lastpass, Keepass, Apple Keychain etc.）生成一个随机密码，要不然可能会被截获并被撞库。

创建挂载目录并挂载：

```
cd /home/exampleuser
mkdir tm
sudo mount /dev/vdb1 tm

```

修改权限：

```
sudo chown -R exampleuesr /home/exampleuser/tm

```

## 安装软件包

如果是 DEB 系的发行版：

```
sudo apt-get install netatalk avahi-daemon

```

## 修改配置文件

先备份一下：

```
sudo mv /etc/netatalk/AppleVolumes.default /etc/netatalk/AppleVolumes.default.old

```

新建一个配置文件：

```
sudo vim /etc/netatalk/AppleVolumes.default

```

添加如下语句（假设允许的最大容量是 300000MiB）：

```
:DEFAULT: options:upriv,usedots
/home/exampleuser/tm "TimeMachine" options:tm volsizelimit:300000 exampleuser


```

重启服务：

```
sudo service netatalk restart

```

## 在 Mac 上添加服务器

在 Finder 里按 command+K，添加一个服务器，地址是 `afp://ip_adress`，在跳出的对话框输入账号密码。

在系统设置里，找到 Time Machine，选择磁盘，添加你的服务器。随后就和一般的备份一样了，要注意的是务必开启加密。至于备份速度，主要还得看自己的网络质量（废话）。

# 关于恢复

在互联网上广为流传的一个说法是，除非使用 Time Capsule，否则不能在 Recovery System 里进行恢复。然而这并不是真的。

在 Time Machine
恢复界面里，看不到任何连接是正常的，因为电脑才不知道你的服务器是什么鬼。手动添加一下，地址还是一样，不过要加上一开始在 `AppleVolumes.default`
里设定的名字。比如：`afp://ip_adress/TimeMachine`。如果使用了特殊字符，要按照一般处理 URL 的方法转义。

# 后记

折腾这玩意的主要原因还是因为，条件所限没有办法布置 NAS。再加上本来电脑就只有两个 USB，插着移动硬盘是在不便。再加上一直使用的
SSD 移动硬盘送人了（又是一个凄惨的故事，心里苦），所以干脆备份到云端。

说来惭愧，折腾这个在 Final 前浪费了不少时间，至少两三天花在这上面了。以下是得出的一点经验，供后来者参考：

- 测试下来，得出结论：块存储是目前看来最靠谱的方案。
- 理论上 AWS 的 Elastic File System 是最合适的方案，然而速度实在太慢，原因未知。
- 经济的方案是 Vultr SATA HDD VPS。但是目前有 AWS 的抵用券，用完再换。所以目前我的服务器搭在 AWS EC2 上。
- 基于 FUSE 的文件系统尝试全部失败。包括 Dropbox FUSE, OneDrive FUSE etc.
- 理论上将 Dropbox 转换为 WebDAV 也可以，但是实测失败，IO 和速度都跟不上，直接报错。
- 讲道理，并不一定需要块存储。但是对象存储总是不行，估计是 IO 跟不上。理论上只要能挂载就行，但是实际使用总会出各种问题。所以还得块存储。
- 关于安全问题暂且不需要担心，做好了上面的工作，即便被监听也是加密的。虽然连接密码明文了，但窃听者也还是连不上。

此法已经稳定运行一个月。谢谢各位阅读。

# Bibliography

<http://dae.me/blog/1660/concisest-guide-to-setting-up-time-machine-server-on-ubuntu-server-12-04/>
<https://ubuntuforums.org/showthread.php?t=2105755>
<https://support.apple.com/en-us/HT202944>
