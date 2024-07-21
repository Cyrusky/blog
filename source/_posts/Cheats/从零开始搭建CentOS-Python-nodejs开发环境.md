---
title: 从零开始搭建CentOS+Python+nodejs开发环境
tags:
  - Python
  - NodeJS
  - CentOS
categories:
  - CheatSheets
toc: true
cover: '/assets/images/20190725145223.webp'
abbrlink: 29fa0dd5
date: 2019-07-25 14:50:46
---

# 配置CentOS7的环境

## yum源

* 将yum源配置为阿里云镜像源：

```shell
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

<!-- more -->

```bash
#CentOS6
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
	# 或者
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
# CentOS7
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
	# 或者
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

```

* 配置Epel源为阿里云镜像

```shell
# 备份
mv /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel.repo.backup
mv /etc/yum.repos.d/epel-testing.repo /etc/yum.repos.d/epel-testing.repo.backup
# CentOS7
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
# CentOS6
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-6.repo
# CentOS5
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-5.repo
```

* 更新yum源的缓存

```bash
yum clean all
yum makecache
```

* 升级系统的软件

```bash
yum update -y
```

## 常用工具

```shell
yum install vim git net-tools git-lfs python-pip -y
```

# 安装Python

## Pyenv与Python

* 安装pyenv

```bash
# CheckOut Pyenv
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
# 将Pyenv写入环境变量
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
# 重新加载环境变量，使pyenv命令生效
source ~/.bash_profile
```

* 安装python编译安装的依赖

```shell
yum install -y ncurses-libs zlib-devel mysql-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel
```

* 安装Python版本

```shell
pyenv install 3.7.4
# 如果下载太慢的话，可以使用下面的命令加速
v=3.7.4;wget http://npm.taobao.org/mirrors/python/$v/Python-$v.tar.xz -P ~/.pyenv/cache/;pyenv install $v
其中的数字是版本号
```

结果

```shell
--2019-07-25 14:46:46--  http://npm.taobao.org/mirrors/python/3.7.4/Python-3.7.4.tar.xz
Resolving npm.taobao.org (npm.taobao.org)... 114.55.80.225
Connecting to npm.taobao.org (npm.taobao.org)|114.55.80.225|:80... connected.
HTTP request sent, awaiting response... 302 Found
Location: http://cdn.npm.taobao.org/dist/python/3.7.4/Python-3.7.4.tar.xz [following]
--2019-07-25 14:46:46--  http://cdn.npm.taobao.org/dist/python/3.7.4/Python-3.7.4.tar.xz
Resolving cdn.npm.taobao.org (cdn.npm.taobao.org)... 182.106.155.229, 110.80.139.242, 150.138.121.98, ...
Connecting to cdn.npm.taobao.org (cdn.npm.taobao.org)|182.106.155.229|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 17131432 (16M) [application/x-xz]
Saving to: ‘/root/.pyenv/cache/Python-3.7.4.tar.xz.1’

100%[====================================>] 17,131,432  12.1MB/s   in 1.4s

2019-07-25 14:46:47 (12.1 MB/s) - ‘/root/.pyenv/cache/Python-3.7.4.tar.xz.1’ saved [17131432/17131432]
Installing Python-3.7.4...
##---这个地方要等好久---#################
Installed Python-3.7.4 to /root/.pyenv/versions/3.7.4
#       ^----------出现Installed说明安装完成
```

## virtualenv

升级pip

```shell
pip install pip --upgrade
```

安装virtualenv

```shell
pip install virtualenv
```

创建虚拟环境

```bash
# p参数为虚拟环境的目标版本， Virtualenv Name 为虚拟环境的名称
virtualenv -p ~/.pyenv/versions/3.7.4/bin/python [Virtualenv Name]
```

## 修改pip源为阿里云源

```bash
mkdir ~/.pip
cat << EOF > ~/.pip/pip.conf
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
trusted-host = mirrors.aliyun.com
EOF
```

# 安装NodeJS

## 安装nvm

[-->NVM文档](https://github.com/nvm-sh/nvm)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# 或者
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

如果完成后没有`nvm`命令的话，还需要执行：

```bash
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

安装最新稳定版的NodeJS

```shell
nvm install node
```

验证是否安装成功

```bash
node -v
# v12.7.0
```

## 安装nrm

```bash
npm install -g nrm
```

## 或者使用CNPM

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
