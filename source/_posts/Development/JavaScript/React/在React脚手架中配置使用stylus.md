---
title: 在React脚手架中配置使用stylus
tags:
  - 开发
categories:
  - Development
  - React
toc: true
cover: /assets/images/20200127104429.webp
abbrlink: 1180e59c
date: 2020-01-27T10:13:43.000Z
thumbnail: /assets/thumbnail/20200127104429.webp
---

# 创建一个项目

我们此次使用react脚手架工具创建一个空白的项目，具体为：

```bash
$ create-react-app with-stylus
```

创建完空白项目后，我们为项目添加一个我们自己的Remote地址（可选）。

```bash
$ git remote add origin GIT_URL
$ git push -u origin master
```

<!-- more -->

# 导出配置项

```bash
$ yarn eject
```

中间会有一次交互，提醒此操作是永久性操作，不可回退，选择`Y`即可。

## 修改配置

> 修改的文件为：`config/webpack.config.js` 此目录只有在执行过`eject`之后才会出现。

1. 先将`styl`文件添加到`file-loader`的`exclude`列表中，也就是说，我们不直接用`fileloader`去解析`styl`
   文件，而是需要继续往下找到对应的`loader`。

```js
{
  loader: require.resolve('file-loader'),
    // Exclude `js` files to keep "css" loader working as it injects
    // its runtime that would otherwise be processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [
      /\.(js|mjs|jsx|ts|tsx)$/,
      /\.html$/,
      /\.json$/,
      /\.styl$/
    ],
      options: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
}
```

2. 将`styl`文件添加到`loader`规则中，具体位置为：`return->module->rules`。

```js
{
  test: /\.styl$/,
    loaders: ['style-loader', 'css-loader', 'stylus-loader']
},
```

# 测试

## jsx文件

```jsx
import React from 'react'
import './App.styl'

function App() {
  return (
    <div className="App">
      <div className="test-stylus">
        <div className="text-box">123123</div>
      </div>
    </div>
  )
}

export default App
```

## styl文件

```stylus
.test-stylus 
   width: 100px
   height: 100px
   background black
   margin-top: 50px
   padding 10px
   margin-left: 50px
   .text-box
     background: white
     color black
     width 50px
     height 50px
```

## 最终效果

![](/assets/images/20200127104159.webp)```
