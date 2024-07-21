---
title: CentOS7中使用脚本升级OpenSSH-8.p01
tags:
  - DevOps
categories:
  - Operations
  - System
toc: true
cover: /assets/images/20200116101404.webp
abbrlink: fb6c5a26
date: 2020-01-16T10:10:35.000Z
thumbnail: /assets/thumbnail/20200116101404.webp
---

# 废话不多说，直接上脚本

<!-- more -->

具体的说明大多都在注释里面了

```bash
# 先准备一下,安装telnet以防万一
yum install telnet-server -y
mv /etc/securetty /etc/securetty.bak
systemctl enable telnet.socket
systemctl restart telnet.socket
firewall-cmd --add-port=23/tcp --permanent
firewall-cmd --reload
netstat -ntlp 

# 卸载ssh
mv /etc/ssh /etc/ssh.bak
rpm -e --nodeps `rpm -qa |grep openssh`
# 下载安装包
mkdir -p /tmp/openssh
cd /tmp/openssh
wget https://cloudflare.cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-8.0p1.tar.gz
tar -zxvf openssh-8.0p1.tar.gz
cd openssh-8.0p1
# 配置
./configure --prefix=/usr --sysconfdir=/etc/ssh
# 编译
make
# 安装
make install

# 拷贝启动文件并配置启动项
cp -a contrib/redhat/sshd.init /etc/init.d/sshd
cp -a contrib/redhat/sshd.pam /etc/pam.d/sshd.pam
chmod +x /etc/init.d/sshd
chkconfig --add sshd
systemctl enable sshd
systemctl start sshd
# 添加随机自启
echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
systemctl restart sshd
mv /etc/ssh.bak /etc/ssh/ssh.old
cd 
netstat -ntlp

# 清理环境
systemctl stop telnet.socket
systemctl disable telnet.socket
yum remove telnet-server -y
mv /etc/securetty.bak /etc/securetty
firewall-cmd --remove-port=23/tcp --permanent
firewall-cmd --reload
netstat -ntlp
```

