---
title: 使用Dockerfile创建一个JupyterLab镜像
tags:
  - 开发
categories:
  - Operations
  - Docker
toc: true
cover: /assets/images/20200201205554.webp
abbrlink: 8e6f1be4
date: 2020-02-01T16:32:32.000Z
thumbnail: /assets/thumbnail/20200201205554.webp
---

# Dockerfile中的一些常用命令

## FROM指令

**FROM**指令是整个**Dockerfile**的入口，**必须**是第一条指令。其代表新制作镜像的基础镜像。基础镜像可以自己制作，也可以从开源的仓库
**pull**，例如**dockerhub**或是国内阿里云的免费仓库。

**Docker**中存在一种特殊的情况，就是不以任何基础镜像为基准，此时可以第一句话使用：

```dockerfile
FROM scratch
```

来表示以空白镜像为基础，也就是直接将可执行文件复制进镜像。例如swarm、coreos/etcd等。

<!-- more -->

## RUN指令

是**Dockerfile**中最常用的指令之一。用来执行命令行上的命令。**RUN**的格式分为两种：

> **第一种**：shell格式：`RUN<命令>`，类似于直接在终端输入命令。例如：

```dockerfile
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/tomcat/welcome.html
```

> **第二种**： exec格式：`RUN ["可执行文件", "参数1", "参数2"]`。
> **RUN**既然可以像在命令行那样工作，那么就也可以实现传参来运行指令：

```dockerfile
FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y gcc libc6-dev make
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-3.2.5.tar.gz"
RUN mkdir -p /usr/src/redis
RUN tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1
RUN make -C /usr/src/redis
RUN make -C /usr/src/redis install
```

**RUN**一次就代表**Dockerfile**中的一层。而**docker**镜像的构建就是不断去完善每一层需要做的事情。而**dockerfile**对一个*
*file**中层数是有限制的，最大不超过**127**层（ $ 2^7-1 $ ）。因此，**RUN**
提供命令的串联功能，也就是允许每一层可包含多种操作，他们会按照书写顺序来依次执行。下面的例子也是在Linux中一条命令执行多条指令的方式。
那么上面的例子可以变为：

```dockerfile
FROM ubuntu:14.04
RUN buildDeps='gcc libc6-dev make' \
    && apt-get update \
    && apt-get install -y $buildDeps \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-3.2.5.tar.gz" \
    && mkdir -p /usr/src/redis \
    && tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1 \
    && make -C /usr/src/redis \
    && make -C /usr/src/redis install \
    && rm -rf /var/lib/apt/lists/* \
    && rm redis.tar.gz \
    && rm -r /usr/src/redis \
    && apt-get purge -y --auto-remove $buildDeps
```

换行用 \ ，注释用 # ，平时书写注意缩进来保证文件的可读性。上述例子中的最后一句还进行了无关文件的清理，进一步保证每一层的最优和最小。

> 注意事项：
> 镜像的初衷是进行功能的模块化，也是尽可能让每个容器干最少的事情，那么我们在书写dockerfile的时候要注意这个问题，每一层的东西确保是必须的，否则就不要进行安装或是拷贝。

## MAINTAINER指令

指定作者，句法：

```dockerfile
MAINTAINER <name>
```

## LABEL指令

该指令是为镜像添加标签。
句法：

```dockerfile
LABEL <key>=<value> <key>=<value> <key>=<value> ...
```

> **一个Dockerfile种可以有多个LABEL**，例如，一般情况下，***latest***标签一般都会有一个别名。如下：

```dockerfile
LABEL multi.label1="value1" \
multi.label2="value2" \
other="value3"
```

> 说明：**LABEL**会继承基础镜像种的**LABEL**，如遇到**key**相同，则值覆盖

## COPY指令

该指令用于将宿主机文件拷贝至镜像内的指定路径。格式：

```docker
COPY <源路径>... <目标路径>
# 或
COPY ["<源路径1>",... "<目标路径>"]
```

也就是说，原路径可以有多个，而目标路径唯一。注意事项：

> 1. 可以使用符合**GO**规范的通配符，例如：`COPY hom* /mydir/`
> 2. 目的路径可以是镜像内的绝对路径，也可以是相对于当前工作目录的相对路径。
> 3. **COPY**过来的文件权限与原始**权限相同**。如需更改，请用传统**Liunx**的**chmod**命令进行修改即可。
> 4. **原路径**为宿主机上的路径，**目标路径**为镜像内的路径。

## ADD高级复制指令

ADD的本质作用类似于COPY，但是其更复杂：

> 1. **ADD**过来的压缩包可以**自动**在目标路径下进行解压
>  2. 原始路径可以是一个连接，**ADD**过程会尝试从该链接下载所需的文件到目的路径。
>  3. 一般情况下，建议使用**COPY**而不是**ADD**，因为COPY过来的文件可以配合使用RUN来进行解压或是其他操作，搭配使用更灵活，且单条语句所负担的功能唯一。

## WORKDIR指令

该指令用于指定**Dockerfile**中该指令下面的操作所在的工作目录。类似于 **cd** 命令。

## CMD 服务启动指令

**Docker**不是虚拟机而是一个进程，作为进程，当然可以制定启动镜像时的具体参数。说白了就是制定一些你想自动启动的服务。格式：

```dockerfile
shell 格式：CMD <命令>
exec 格式：CMD ["可执行文件", "参数1", "参数2"...]
参数列表格式：CMD ["参数1", "参数2"...]。在指定了 ENTRYPOINT 指令后，用 CMD 指定具体的参数。
```

注意事项：

> 1. CMD中的启动参数可以被更新覆盖。例如：
     >
     >    > Dockerfile中若是用CMD指定启动镜像时执行/bin/bash，那么在启动镜像时输入`docker run -it ubuntu ./test.sh`
     则会用./test.sh命令来覆盖/bin/bash命令。
>
> 2. 推荐使用exec格式的CMD书写。这类格式在解析时会被解析为 JSON 数组，因此一定要使用双引号 "，而不要使用单引号。
>
> 3. 如果使用 shell 格式的话，实际的命令会被包装为 sh -c 的参数的形式进行执行。比如：`CMD echo /java`
     > 在实际执行中，会将其变更为：
     >
     >    > `CMD [ "sh", "-c", "echo /java" ]`

## ENV设置环境变量

说是环境变量还不说是一个全局变量。在前面定义，后面可以通过 $
取值进行使用。该处的环境变量最终会设置到系统中共，如果配置了环境变量，将会永久存在于镜像中，如果后期创建实例，登录后，可以使用`export`
等命令查看。格式：

```dockerfile
ENV <key> <value>
ENV <key1>=<value1> <key2>=<value2>...
```

例如可以指定一些包的版本号，这样更新镜像很方便，或是保存一些密码**（该功能慎用，自己玩还是可以的）**

## ARG 构建参数

语法形式: `ARG [=]`，**ARG**和**ENV**效果类似，都是用来设置环境变量的。唯一 不同的是**dockerfile**中的**ARG**
编译好后是不会出现在打开的容器内的。

> **ARG**在**dockerfile**中创建一个全局参数，参数可以给定一个默认值，在编译时可以传参对其进行覆盖。如果**ARG**
> 指令有默认值并且在构建期间没有接收到参数、则使用默认值。一个**dockerfile**中可以包含多个**ARG**参数。

```dockerfile
docker build --build-arg <varname>=<value>
```

> 可以使用**ARG**或**ENV**指令来指定**RUN**指令可用的变量，如果**ARG**和**ENV**
> 同时指定了一个相同名称的变量、则ENV设置的变量会覆盖ARG设置的变量。如下:

```dockerfile
1 FROM ubuntu
2 ARG CONT_IMG_VER
3 ENV CONT_IMG_VER v1.0.0
4 RUN echo $CONT_IMG_VER
```

使用   `docker build --build-arg CONT_IMG_VER=v2.0.1 .` 最终输出v1.0.0 。

> 一个ARG指令的有效范围在其定义的构建阶段内、如果要在多个阶段中都有效、则必须在每个阶段都使用ARG指令；**与ARG不同
ENV设置参数的有效期为整个构建期内。**

## VOLUME 挂在共享卷

格式为：

```xml
VOLUME ["
<路径1>", "
    <路径2>"...]
        VOLUME
        <路径>
```

**Docker**
的使用原则除了每个容器干尽量少的事情外，还尽可能要求容器运行时应该尽量保持容器存储层不发生写操作，对于数据库类需要保存动态数据的应用，其数据库文件应该保存于卷(
**volume**)中，也就是将本地磁盘的某一个目录挂载至容器内。同时这样的共享目录可以被多个不同的容器所使用。

除了可以在**dockerfile**中指定这一参数外，在运行启动容器时也可以附带这一参数来指定共享卷：

```kotlin
docker run -it --name container-test -h CONTAINER -v /data debian /bin/bash
```

上述命令也可以覆盖**dockerfile**中的目录设定。

## USER 指定用户

在书写**dockerfile**时，某些层的操作若想切换用户名，可以使用该参数指定某些层的用户，并且是存在的用户名。
格式：`USER <用户名>`

> 如果以 `root` 执行的脚本，在执行期间希望改变身份，比如希望以某个已经建立好的用户来运行某个服务进程，不要使用 `su`
> 或者 `sudo`，这些都需要比较麻烦的配置，而且在 TTY 缺失的环境下经常出错。建议使用 `gosu`

```bash
# 建立 redis 用户，并使用 gosu 换另一个用户执行命令
RUN groupadd -r redis && useradd -r -g redis redis
# 下载 gosu
RUN wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/1.7/gosu-amd64" \
    && chmod +x /usr/local/bin/gosu \
    && gosu nobody true
# 设置 CMD，并以另外的用户执行
CMD [ "exec", "gosu", "redis", "redis-server" ]
```

## EXPOSE暴露端口

句法：

```xml
EXPOSE
<端口1>[
    <端口2>...]
```

> `EXPOSE` 指令是声明运行时容器提供服务端口，这只是一个声明，在运行时并不会因为这个声明应用就会开启这个端口的服务。在
> Dockerfile
>
中写入这样的声明有两个好处，一个是帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射；另一个用处则是在运行时使用随机端口映射时，也就是 `docker run -P`
> 时，会自动随机映射 `EXPOSE` 的端口。

> 要将 EXPOSE 和在运行时使用 `-p <宿主端口>:<容器端口>` 区分开来。`-p`，是映射宿主端口和容器端口，换句话说，就是将容器的对应端口服务公开给外界访问，而
> EXPOSE 仅仅是声明容器打算使用什么端口而已，并不会自动在宿主进行端口映射。

# 构建一个Dockerfile

```dockerfile
# 改镜像是从Python3.7镜像创建而来的
FROM python:3.7

WORKDIR /root/
ENV NODE_VERSION=v13.7.0
# 创建一些必要的目录
RUN mkdir -p /root/.pip \
    && mkdir -p /root/.nvm \
    && mkdir -p /root/notebook \
    && mkdir -p /root/extensions 
# 修改pypi镜像，并且安装jupyter
RUN echo "[global]" > /root/.pip/pip.conf \
    && echo "index-url = http://mirrors.aliyun.com/pypi/simple/" >> /root/.pip/pip.conf \
    && echo "trusted-host = mirrors.aliyun.com" >> /root/.pip/pip.conf \
    && /usr/local/bin/pip install jupyter jupyterlab jupyterlab_code_formatter 
# 安装NodeJS，版本为NODE_VERSION配置的版本
RUN wget https://npm.taobao.org/mirrors/node/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.gz \
    && tar zxf node-$NODE_VERSION-linux-x64.tar.gz \
    && mv node-v13.7.0-linux-x64 /usr/local/share/node \
    && ln -s /usr/local/share/node/bin/node /usr/bin/ \
    && ln -s /usr/local/share/node/bin/npm /usr/bin/ \
    && ln -s /usr/local/share/node/bin/npx /usr/bin/ \
    && rm -rf /root/node-$NODE_VERSION-linux-x64.tar.gz 
# 安装变量查看插件
RUN git clone https://github.com/lckr/jupyterlab-variableInspector /root/extensions/jupyterlab-variableInspector \
    && cd /root/extensions/jupyterlab-variableInspector \
    && npm install --registry=https://registry.npm.taobao.org \
    && npm run build \
    && /usr/local/bin/jupyter labextension install . 
# 安装代码自动格式化插件
RUN /usr/local/bin/jupyter labextension install @ryantam626/jupyterlab_code_formatter \
    && /usr/local/bin/jupyter serverextension enable --py jupyterlab_code_formatter

# 暴露出两个Volume，一个是工作路径，一个是配置路径。
VOLUME [ "/root/notebook", '/root/.jupyter' ]

# 默认暴露8888端口
EXPOSE 8888
# 镜像启动后，启动JupyterLab服务。
CMD ["/usr/local/bin/jupyter", "lab"]
```

## 构建镜像

```bash
docker build -t [name[:tag]] [-f PathOfDockerfile] .
```

