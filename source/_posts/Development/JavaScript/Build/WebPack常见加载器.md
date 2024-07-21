---
title: WebPack常见加载器
tags:
  - webpack
  - loader
categories:
  - Development
  - JavaScript
toc: true
cover: '/assets/images/imgs20190625083405.webp'
abbrlink: 297bd48b
date: 2019-06-13 14:08:48
---

# WebPack的资源管理

在 webpack 出现之前，前端开发人员会使用 grunt 和 gulp 等工具来处理资源，并将它们从 `/src` 文件夹移动到 `/dist` 或 `/build`
目录中。同样方式也被用于 JavaScript 模块，但是，像 webpack 这样的工具，将**动态打包(dynamically bundle)**
所有依赖项（创建所谓的[依赖图(dependency graph)](https://www.webpackjs.com/concepts/dependency-graph)
）。这是极好的创举，因为现在每个模块都可以*明确表述它自身的依赖*，我们将避免打包未使用的模块。

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader *引入任何其他类型的文件*。也就是说，以上列出的那些
JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容。

<!-- more -->

> 注：Webpack加载器(loader)的配置目录均在`webpack.config.js`文件中

- 在配置加载器后，文件中可以使用requre("对应文件")进行相关的文件加载，所有加载内容会按照相应规则进行加载。

# 官方加载器

## CSS加载器

### 安装

```bash
npm install --save-dev style-loader css-loader
```

### 配置

> 注：每一个规则下的加载器的使用是有顺序的，从下往上，如下：
>
> 先使用css-loader，再使用style-loader

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
    }
  };
```

## 加载图片与字体

### 安装

```bash
npm install --save-dev file-loader
```

### 配置

```diff
 const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
+       { // 图片加载
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }，
+       { // 字体加载
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

## 加载数据

### 安装

```bash
npm install --save-dev csv-loader xml-loader
```

### 配置

```diff
const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
      ]
    }
  };
```

# 第三方常用加载器

## 加载Vue文件

### 安装

```bash
npm install -D vue-loader vue-template-compiler
```

### 额外说明

资源 URL 转换会遵循如下规则：

- 如果路径是绝对路径 (例如 `/images/foo.png`)，会原样保留。

- 如果路径以 `.` 开头，将会被看作相对的模块依赖，并按照你的本地文件系统上的目录结构进行解析。

- 如果路径以 `~` 开头，其后的部分将会被看作模块依赖。这意味着你可以用该特性来引用一个 Node 依赖中的资源：

  ```html
  <img src="~some-npm-package/foo.png">
  ```

- 如果路径以 `@` 开头，也会被看作模块依赖。如果你的 webpack 配置中给 `@` 配置了 alias，这就很有用了。所有 `vue-cli`
  创建的项目都默认配置了将 `@` 指向 `/src`。

### 配置

```js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

## 加载Sass文件

### 安装

```bash
npm install sass-loader node-sass webpack --save-dev
```

### 配置

```js
// webpack.config.js
module.exports = {
	...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    }
};
```

## 加载stylus文件

### 安装

```bash
npm install stylus-loader stylus --save-dev
```

### 配置

```javascript
module: {
  loaders: [{
    test: /\.styl$/,
    loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
  }]
}
```

## 加载Pug文件

### 安装

```bash
npm install --save-dev pug-html-loader html-loader
```

### 配置

```javascript
module: {
  rules: [
    ...
    {
      test: /\.pug$/,
      use: [
        'html-loader',
        'pug-html-loader'
      ]
    },
  ],
},
```
