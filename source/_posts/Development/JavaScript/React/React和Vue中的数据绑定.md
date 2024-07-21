---
title: React和Vue中的数据绑定
tags:
  - Vue
  - React
  - 数据绑定
  - 双向绑定
categories:
  - Development
  - JavaScript
toc: true
abbrlink: 2b18f777
date: 2019-12-04 21:10:25
cover: /assets/images/20191205190545.webp
reprint: 
---

# 数据的单向绑定

我们在做原生页面开发的时候，如果涉及到前端的数据动态展现，是如何做的呢？（这里排除了后端直接返回嵌入数据的`HTML`
页面的模式，比如说`PHP`中的模式），比如下面的例子：

```html
<p></p>
```

```javascript
const data = { value: 'hello' }
document.querySelector('p').innerText = data.value;
```

通过 `JavaScript` 原生的`DOM`操作方式，将数据动态填充到`DOM`中，就是数据（`Data`）到模板（`DOM`）的绑定，这就是数据单向绑定。

<!-- more -->

# 数据的双向绑定

双向绑定就是在上面单相绑定的这个基础上，又扩展了反向的绑定效果，就是模板（`DOM`）到数据（`Data`）的绑定。上面的例子扩展以下：

```html
<input onkeyup="change(event)" />
<p></p>
```

```javascript
const data = { value: '' }
const change = e => {               // 更新输入值
    data.value = e.target.value;    // 且，同步值的展示
    document.querySelector('p').innerText = data.value
}
```

我们将与单向绑定的区别是，数据与模板是相互影响的，一方发生变化，另一方立即做出更新。在这个简单的例子中，我们认识了双向绑定，`Vue`
便是在此概念下进行模块化抽象封装。

# 双向绑定的原理

## 认识双向绑定在框架中的作用

因为 Vue 是数据双向绑定的框架，而整个框架的由三个部分组成：

- 数据层（`Model`）：应用的数据及业务逻辑，为开发者编写的业务代码；
- 视图层（`View`）：应用的展示效果，各类UI组件，由 template 和 css 组成的代码；
- 业务逻辑层（`ViewModel`）：框架封装的核心，它负责将数据与视图关联起来；

而上面的这个分层的架构方案，可以用一个专业术语进行称呼：`MVVM`。

这里的控制层的核心功能便是 “数据双向绑定” 。自然，我们只需弄懂它 是什么，便可以进一步了解数据绑定的原理。

## 理解ViewModel

它的主要职责就是：

1. 数据变化后更新视图；
2. 视图变化后更新数据；

那么，就可以得出它主要由两个部分组成：

1. 监听器（`Observer`）：观察数据，做到时刻清楚数据的任何变化，然后通知视图更新；
2. 解析器（`Compiler`）：观察UI，做到时刻清楚视图发生的一切交互，然后更新数据；

然后把二者组合起来，一个具有数据双向绑定的框架就诞生了。

# 双向绑定如何实现的？

## 实现监听器

确保它是一个独立的功能，它的任务就是监听数据的变化，并提供通知功能。

监听数据变化常见的方式有三种：

1. 观察者模式（发布+订阅）；

2. 数据劫持；

3. 脏检查；

`AngularJS` 最早所提供的监听数据变化方式就是第三种，脏数据检查，而 `Vue` 是采用前两者的组合，那么让我们来看看它们是怎么被运用的。

## 观察者模式

观察者模式是一种对象行为模式。它定义对象间的一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

在观察者模式中，主导的是起通知作用的**发布者**，它发出通知时并不需要知道谁是它的观察者，**可以有任意数目的观察者**订阅并接收通知。

## 消息队列（queue）

我们可以看到，单纯的订阅和发布功能，它们彼此是独立存在的，因此还需要一个消息队列来关联他们。

上面的例子中，消息队列是作为一个全局存储变量，而在框架中则是封装起来的，每个 `new Vue()` 都有独立的一个队列，在下面我们将具体演示。

## 数据劫持

其实，就数据监听来说，观察者就已经满足了需求。但是，为什么和Vue不一样呢？因为 `Vue` 进行了优化，添加了数据劫持。

2009 年发布的 `ECMAScript 5` 中新增了一个 `Object.definePropotype`
的特性（具体使用不在此文章讲解范围内，请自行了解 [developer.mozilla.org/zh-CN/docs/…](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
），能够定义对象属性的 getter 和 setter ，这可就厉害了，要知道 JavaScript 中一切皆对象。

那么我们的 `setData(myData, 'value', 100);` 就可以替换成 `myData.value = 100;` 的编写方式。从语法和使用上都变的更简单。

以上，我们已经完成双向绑定中的数据层的功能，现在任何的数据变化，我们都可以及时的知道，并关联任何想要做的事情，比如更新视图。

接下来就是模板的操作了，也就是 `Compile` 模板解析功能。

## 模板解析（实现视图到数据的绑定）

对于`DOM`的操作，目前常见的方式有：

- 原生或者基于库的`DOM`操作；
- 将`DOM`转换为`Virtual DOM`，然后进行对比与更新；
- 使用原生的`Web Component`技术；

以上三种的差异与性能等，之后有机会再单独分享。在`Vue`中使用的是 `Virtual DOM` 的方式，因为它比直接操作 `DOM`
所消耗的性能要少很多，也不存在 `Web Component` 的兼容性。

这三中方式的本质都是更新 `DOM` 的展示效果，只是方式不同而已，为了更简单的说明双向绑定的原理，我们就采用第一种方式。虚拟`DOM`
是有很多独立的第三方库，如果有兴趣同学可以去研究哦。

## 解析器与DOM操作

这里的主要任务是：

- 解析模板中所有的特定特性，例如：`v-model`、`v-text`、`双大括号`语法等；
- 关联数据展示到`DOM`；
- 关联事件绑定到`DOM`；

# React中的数据绑定

在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。当然，这可以通过`shouldComponentUpdate`
这个生命周期方法来进行控制`purerender`，但`Vue`将此视为默认的优化。所以说，`React`其实是一个单项数据流的。

> ### 虚拟DOM
>
> `vue`和`react`的虚拟`DOM`的`Diff`算法大致相同：
>
> 1. `tree diff` 只对同一层级节点比较
> 2. `component diff` 比较组件类型
> 3. `element diff` 同一层级子节点通过id区分
>
> 基于以上这三个约束，使得虚拟`DOM`的`Diff`算法的复杂度从$O(n^3)$降到了$O(n)$。

# 总结

### Vue

1. `Vue`会遍历`data`对象的所有属性，并使用`Object.defineProperty`把这些属性全部转为`getter/setter`
2. 每个组件实例都有相应的 `watcher` 实例对象，它会在组件渲染的过程中把属性记录为依赖
3. 当依赖项的`setter`被调用时，会通知`watcher`重新计算，从而致使它关联的组件得以更新

### React

1. 当使用`setState/forceUpdate`，会调用`render`方法更新视图
2. 父组件更新视图时，会`re-render`子组件，所以看起来改变子组件的`props`也会更新视图

# 参考资料

* [https://juejin.im/post/5d7e582751882546ce278684](https://juejin.im/post/5d7e582751882546ce278684)

* [https://www.jianshu.com/p/6e124ad23c68](https://www.jianshu.com/p/6e124ad23c68)
