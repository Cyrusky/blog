---
title: Office文档在线预览解决方案
tags:
  - LibreOffice
  - PDF
  - Document
  - pdf2html
categories:
  - Development
  - Python
toc: true
thumbnail: 'https://imgs.borgor.cn/imgs/20190820174141.png'
abbrlink: 80238b93
date: 2019-08-20 16:47:34
---

> 注： 由于这个点是在开发Python项目的时候需要的，所以将其分类到Python下，但是，本文中的方法适用于大多数浏览器环境。

> 注2： 你真的会安装的想哭的。。。。。。。

#### 环境：

> **OS**: **CentOS7**_min

<!-- more -->

# 安装与升级软件包

```shell
yum install git vim epel-release net-tools lrzsz zip unzip wget -y
yum update -y
```

# 安装**pdf2htmlEx**

## 安装依赖

```bash
sudo yum install -y \
    cmake \
    gcc \
    gnu-getopt \
    libpng-devel \
    fontforge-devel \
    cairo-devel \
    poppler-devel \
    libspiro-devel \
    freetype-devel \
    poppler-data \
    libjpeg-turbo-devel \
    git \
    make \
    gcc-c++ \
    pango-devel \
    libjpeg-turbo.x86_64 \
    libjpeg-turbo-devel \
    libjpeg-turbo-devel.x86_64 \
    libtiff.x86_64 \
    libtiff-devel \
    openjpeg-devel.x86_64 \
    openjpeg \
    giflibgiflib-devel \
    libxml2.x86_64 \
    libxml2-devel \
    libspiro.x86_64 \
    libspiro-devel \
    libuninameslist-devel.x86_64
```

## 拉取源码

```bash
git clone https://github.com/coolwanglu/pdf2htmlEX.git
```

## 配置环境变量

```bash
// 将如下两条加入到/etc/profile文件底部
export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig
export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH
// 使其生效
source /etc/profile
```

## 编译安装

```bash
cmake . && make && sudo make install
```

## FontForge问题

> **注意** :在cmake这一不的时候会提示你fontforge版本太低，找不到，所以我们先来解决一下这个问题：

```bash
Trying to locate cairo-svg...
-- checking for module 'libfontforge>=2.0.0'
--   package 'libfontforge>=2.0.0' not found
CMake Error at /usr/share/cmake/Modules/FindPkgConfig.cmake:279 (message):
  A required package was not found
Call Stack (most recent call first):
  /usr/share/cmake/Modules/FindPkgConfig.cmake:333 (_pkg_check_modules_internal)
  CMakeLists.txt:57 (pkg_check_modules)


-- Configuring incomplete, errors occurred!
See also "/root/pdf2htmlEX/CMakeFiles/CMakeOutput.log".
```

> 1. 首先去下载作者指定的fotforge-devel版本：https://github.com/coolwanglu/fontforge/tree/pdf2htmlEX
>
>    `git clone https://github.com/coolwanglu/fontforge.git -b pdf2htmlEX `
>
> 2. 根据INSTALL-git.md中的说明安装
>
>    > 先是使用命令**./autogen.sh**
>    > 然后使用命令**./configure** 
>    > 使用**make**命令
>    > 使用**make install**命令

```
# fontforge的依赖：
yum install -y autoconf automake libtool libtool-ltdl-devel
```

## pdf2htmlEx的具体使用

```bash
pdf2htmlEX [input.pdf] [output.html]
```

如：

```
pdf2htmlEX --hdpi 144 --vdpi 144 gaodengshuxuegongshi.pdf 
```

具体效果请看：

<a href="/pdfs/pdf2html.html" target="_blank">高等数学公式-pdf2html示例</a>

# 安装LibreOffice

> 主要目的是为了将其余类型的office文档转换为pdf

```bash
wget https://download.documentfoundation.org/libreoffice/stable/6.3.0/rpm/x86_64/LibreOffice_6.3.0_Linux_x86-64_rpm.tar.gz
tar zxvf LibreOffice_6.3.0_Linux_x86-64_rpm.tar.gz
cd LibreOffice_6.3.0_Linux_x86-64_rpm
cd RPMS
yum install *.rpm
```



## 使用

```
libreoffice --headless --convert-to pdf test.docx --outdir  /pdf
```

## LibreOffice转换后文档中出现方格

> 这是因为Linux没有字体库的原因。

**解决办法如下：**

1. 将字体库上传到centos机器（C:\Windows\Fonts）->（/usr/share/fonts）

2. 刷新字库

   > mkfontscale
   >
   > mkfontdir
   >
   > fc-cache

**相关依赖：**

```bash
yum install -y mkfontscale mkfontdir fc-cache
```

