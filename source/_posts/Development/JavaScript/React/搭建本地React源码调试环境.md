---
title: 搭建本地React源码调试环境
tags:
  - React
  - 源码
  - 调试
  - 本地
categories:
  - Development
  - React
toc: true
abbrlink: f48cc00c
date: 2019-12-09 09:38:42
cover: /assets/images/20191227110243.webp
---

一般来说，我们想要去学习 React 的源码的时候，可能会先`Build`一下，然后使用源码包下的`fixtures`
内的测试样例进行调试，但是，不管是`production`的`build`还是`Development`的`build`
，源码都是被打包在一个文件中的，结构混乱，即使代码没有被压缩，也很难看得懂具体那一个方法是属于哪一个模块的。所以，为何不使用源码包直接来调试源代码呢？

本文将会介绍如何直接使用`React`源码包来调试源码。

> 相关代码以全部放置在:
>
> [https://gitee.com/cyrusky/StudyReact.git](https://gitee.com/cyrusky/StudyReact.git)

<!-- more -->

# 创建一个项目

```bash
create-react-app reading_source
```

其中，`reading_source`是自己起的名字，你也可以使用自己的名字。

```bash
Creating a new React app in ./reading_source.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template...

yarn add v1.19.2
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
[1/4] ⡀ fsevents

...(省略)
...(省略)
...(省略)

We suggest that you begin by typing:

  cd reading_source
  yarn start

Happy hacking!
```

这个时候，我们就创建好了一个空白的项目，最好之前可以启动一下：

```bash
cd reading_source
yarn start
```

此时会自动打开一个页面，显示下面的样子，说明，我们的项目创建成功了。

![](/assets/images/20191227100249.webp)

# Eject 配置

因为我们需要对项目中的依赖进行自定义配置，所以，我们需要暴露出 React 项目的配置文件，执行：

```bash
$ yarn eject
```

我们就会得到 React 项目的配置文件以及一些构建脚本：

![](/assets/images/20191227101015.webp)

# 克隆 React 源码

克隆一个指定版本的 React 源码，到`src/react`目录下，当然这里也可以使用`master`
分支，但是不建议。如果你需要将你自己对代码的修改保存到版本控制中，你最好自己`fork`一份`React`官方的`repo`，到自己的账号。

> 话说 github 是在是太慢了，所以，我`fork`了一份，到我的`github`仓库，然后，强制同步到了`gitee`仓库了。
>
> 我选择的分支是`16.8.6`，截止发稿日期的最新版本。

```bash
git clone git@gitee.com:cyrusky/react.git -b 16.8.6 src/react
```

# 开始修改配置

## webpack 中将包链接到源代码

修改`/config/webpack.config.js`

```javascript
resolve: {
    alias: {
        'react-native': 'react-native-web',
+        'react': path.resolve(__dirname, '../src/react/packages/react'),
+        'react-dom': path.resolve(__dirname, '../src/react/packages/react-dom'),
+        'shared': path.resolve(__dirname, '../src/react/packages/shared'),
+        'react-reconciler': path.resolve(__dirname, '../src/react/packages/react-reconciler'),
         'react-events': path.resolve(__dirname, '../src/react/packages/events')
    }
}
```

> 需要注意的一点是：`react-events`在`master`分支中已经变更为`legacy-events`了，不需要在此处添加了。

## 修改环境变量

修改`/config/env.js`

```js
const stringified = {
  __DEV__: true,
  __PROFILE__: true,
  __UMD__: true,
  'process.env': Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key])
    return env
  }, {})
}
```

根目录创建`.eslintrc.json`文件

```json
{
  "extends": "react-app",
  "globals": {
    "__DEV__": true,
    "__PROFILE__": true,
    "__UMD__": true
  }
}
```

## 忽略 flow 下 type

```
$ yarn add @babel/plugin-transform-flow-strip-types -D
```

同时在`/config/webpack.config.js`中`babel-loader`的`plugins`中添加该插件

```js
{
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),

                plugins: [
+                  require.resolve('@babel/plugin-transform-flow-strip-types'),
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                        }
                      }
                    }
                  ]
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                compact: isEnvProduction
              }
            },
```

> 就是避免这个错误：

```bash
Failed to compile.

./src/react/packages/react-dom/src/client/ReactDOM.js
SyntaxError: ./reading_source/src/react/packages/react-dom/src/client/ReactDOM.js: Unexpected token (10:12)

   8 |  */
   9 |
> 10 | import type {ReactNodeList} from 'shared/ReactTypes';
     |             ^
  11 | // TODO: This type is shared between the reconciler and ReactDOM, but will
  12 | // eventually be lifted out to the renderer.
  13 | import type {
```

## 解决 event 冲突(master 分支请忽略)

在`webpack.config.js`中的`alias`中添加`react-events`后，需要修改`react`源码包中相应引用`event`的部分，具体如下：

> 替换源码中所有的`import XXX from 'events/...'`为`import XXX from 'react-events/...'`，其中`react-events`就是`alias`
> 中的命名。

## 导出 HostConfig

修改文件`/src/react/packages/react-reconciler/src/ReactFiberHostConfig.js`
。注释中说明，这块还需要根据环境去导出`HostConfig`。

```js
// invariant(false, 'This module must be shimmed by a specific renderer.');
export * from './forks/ReactFiberHostConfig.dom'
```

## 保持 import first，根据编译信息修改

修改文件`/src/react/packages/shared/ReactSharedInternals.js`。`react`此时未`export`内容，直接从`ReactSharedInternals`拿值

```js
//  import React from 'react';
import ReactSharedInternals from '../react/src/ReactSharedInternals'

//  const ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
```

## 关闭 ESlint 对 fbjs 插件的扩展

修改`src/react/.eslingrc.js`，在`module.exports`中删去`extends: 'fbjs'`：

```js
module.exports = {
  // extends: 'fbjs',
  ......
```

# vscode 配置

## 安装`flowtype.flow-for-vscode`插件：

![](/assets/images/20191227105608.webp)

进行配置，一般来说，我们只会在看源码的时候用到`flow`，所以我们将配置写在`workspace`的配置文件下：

![](/assets/images/20191227105706.webp)

# 测试

至此，我们的源码调试环境就搭建完毕了。我们可以测试一下：

我们修改一下`src/react/packages/react-dom/src/client/ReactDOMComponents.js`中的`createElement`，添加一个断点：

```js
export function createElement(
  type: string,
  props: Object,
  rootContainerElement: Element | Document,
  parentNamespace: string,
): Element {
  debugger
  let isCustomComponentTag;
  ......
```

一般来说，如果你操作了`yarn start`，在修改代码后，会热加载。所以，如果你的`development tools`是打开的，这个时候，应该就可以停在断点处了，具体如下：

![](/assets/images/20191227115228.webp)

来愉快的进行调试把！！
