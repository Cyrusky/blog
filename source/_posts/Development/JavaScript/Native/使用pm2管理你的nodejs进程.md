---
title: 使用pm2管理你的nodejs进程
tags:
  - 开发
categories:
  - Development
  - JavaScript
toc: true
cover: /assets/images/20190802093130.webp
abbrlink: b32780d9
date: 2019-08-02T09:29:30.000Z
thumbnail: /assets/thumbnail/20190802093130.webp
---

> PM2 是一个具有内置负载均衡功能的 Node.js 应用程序的进程管理器。 它可以使 Node.js
> 应用程序永久保持运行状态，无需停机即可重新加载它们，并且很容易进行系统任务管理

<!-- more -->

# Github

- https://github.com/Unitech/pm2

# 常用指令

## 全局安装 pm2

```bash
npm install pm2 -g
```

## 列举所有正在运行的应用

```bash
pm2 list

┌─────────────────────┬────┬──────┬────────┬───┬──────┬───────────┐
│ Name                │ id │ mode │ status │ ↺ │ cpu  │ memory    │
├─────────────────────┼────┼──────┼────────┼───┼──────┼───────────┤
│ AppName │ 0  │ fork │ online │ 0 │ 0.2% │ 31.3 MB   │
└─────────────────────┴────┴──────┴────────┴───┴──────┴───────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

## 运行应用

```bash
pm2 start app.js
┌─────────────────────┬────┬──────┬────────┬───┬─────┬───────────┐
│ Name                │ id │ mode │ status │ ↺ │ cpu │ memory    │
├─────────────────────┼────┼──────┼────────┼───┼─────┼───────────┤
│ index               │ 0  │ fork │ online │ 0 │ 0%  │ 6.8 MB    │
└─────────────────────┴────┴──────┴────────┴───┴─────┴───────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

## 停止应用(通过应用名称)

```bash
pm2 stop app_name
[PM2] Applying action stopProcessId on app [index](ids: 1)
[PM2] [index](1) ✓
┌─────────────────────┬────┬─────────┬──────┬───────┬─────────┬─────────┬────────┬─────┬───────────┬───────┬──────────┐
│ App name            │ id │ version │ mode │ pid   │ status  │ restart │ uptime │ cpu │ mem       │ user  │ watching │
├─────────────────────┼────┼─────────┼──────┼───────┼─────────┼─────────┼────────┼─────┼───────────┼───────┼──────────┤
│ index               │ 0  │ N/A     │ fork │ 0     │ stopped │ 9       │ 0      │ 0%  │ 0 B       │ xxxx │ disabled │
└─────────────────────┴────┴─────────┴──────┴───────┴─────────┴─────────┴────────┴─────┴───────────┴───────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

## 停止应用(通过应用 id)

```bash
pm2 stop id

[PM2] Applying action deleteProcessId on app [index](ids: 1)
[PM2] [index](1) ✓
┌─────────────────────┬────┬─────────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬───────┬──────────┐
│ App name            │ id │ version │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user  │ watching │
├─────────────────────┼────┼─────────┼──────┼───────┼────────┼─────────┼────────┼─────┼─────────┴─────────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴───────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

## 停止所有应用

```bash
pm2 stop all
```

## 重启应用(通过应用名称)

```bash
pm2 restart app_name
```

## 重启应用(通过应用 id)

```bash
pm2 restart id
```

## 重启所有应用

```bash
pm2 restart all
```

## 删除应用(通过应用名称)

```bash
pm2 delete app_name
```

## 删除应用(通过应用 id)

```bash
pm2 delete id
```

## 删除所有应用

```bash
pm2 delete all
```

## 获取应用的详细信息(通过应用名称)

```bash
pm2 describe app_name

 Describing process with id 0 - name AppName
┌───────────────────┬─────────────────────────────────────────────────────┐
│ status            │ online                                              │
│ name              │ AppName                                             │
│ version           │ N/A                                                 │
│ restarts          │ 0                                                   │
│ uptime            │ 13m                                                 │
│ script path       │ /usr/local/bin/npm                                  │
│ script args       │ run dev                                             │
│ error log path    │ /home/username/.pm2/logs/AppName-error.log          │
│ out log path      │ /home/username/.pm2/logs/AppName-out.log            │
│ pid path          │ /home/username/.pm2/pids/AppName-0.pid              │
│ interpreter       │ node                                                │
│ interpreter args  │ N/A                                                 │
│ script id         │ 0                                                   │
│ exec cwd          │ /home/username/appPath                        │
│ exec mode         │ fork_mode                                           │
│ node.js version   │ 10.14.2                                             │
│ node env          │ N/A                                                 │
│ watch & reload    │ ✘                                                   │
│ unstable restarts │ 0                                                   │
│ created at        │ 2019-08-02T01:28:20.709Z                            │
└───────────────────┴─────────────────────────────────────────────────────┘
 Actions available
┌────────────────────────┐
│ km:heapdump            │
│ km:cpu:profiling:start │
│ km:cpu:profiling:stop  │
│ km:heap:sampling:start │
│ km:heap:sampling:stop  │
└────────────────────────┘
 Trigger via: pm2 trigger AppName <action_name>

 Code metrics value
┌────────────────────────┬───────────┐
│ Heap Size              │ 15.23 MiB │
│ Heap Usage             │ 65.22 %   │
│ Used Heap Size         │ 9.94 MiB  │
│ Active requests        │ 0         │
│ Active handles         │ 4         │
│ Event Loop Latency     │ 0.73 ms   │
│ Event Loop Latency p95 │ 1.88 ms   │
└────────────────────────┴───────────┘
 Divergent env variables from local env
┌────────┬───────────────────────────────┐
│ OLDPWD │ N/A                           │
│ PWD    │ /home/username/appPath  │
└────────┴───────────────────────────────┘

 Add your own code metrics: http://bit.ly/code-metrics
 Use `pm2 logs AppName [--lines 1000]` to display logs
 Use `pm2 env 0` to display environement variables
 Use `pm2 monit` to monitor CPU and Memory usage AppName
```

## 获取应用的详细信息(通过应用 id)

```bash
pm2 describe id
```

## 显示每个应用的 CPU 和内存占用情况

```bash
pm2 monit
```

## 使用 pm2 调用 npm 命令

```bash
pm2 start --name "AppName" npm -- run dev
```

> `--`的意思是调用模块的内部命令，如 npm 的 run 命令
