---
title: React的基本生命周期
tags:
  - React
  - 生命周期
categories:
  - Development
  - React
toc: true
cover: '/assets/images/20191118174847.webp'
abbrlink: fb847130
date: 2019-11-18 16:44:05
---

React中，负责生命周期的主要方法如下图所示：

![](/assets/images/20191118174805.webp)

>
图片来自于：[http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
>
> 话说这么出名的网站竟然不是HTTPs

<!-- more -->

其中出现了几个重要的方法，依次梳理这些方法，就可以知道React在整体渲染VirtualDOM的过程中的具体流程了：

# Render阶段

纯净且不包含副作用。可能会被 React 暂停，中止或重新启动。

## constructor

用于创建组件，组件再被使用之前，必须要先被创建出来。这是一个标准的JavaScript构造函数，在这个方法中，可以直接调用**this.state
**来直接对其进行修改，这是唯一一个能够对state进行直接修改的方法，因为State在其中是刚初始化出来的，不存在State污染（自己起的名字，为了方便理解）之类的事情，在其他方法中，则需要使用
**this.setState**方法来对state进行修改。但是，一般情况下我们不会再**constructor**中直接做初始化操作，而是在其他的方法中。

## getDerivedStateFromProps

通过一些外部的属性初始化内部的状态（Since v16.3）,所有返回的状态都可以Merge到当前的状态(State)上。

* 当State需要从Props初始化的时候，就会调用这个方法

* 一般不建议使用，因为如果使用该方法，会造成逻辑上相同的内容出现在两个地方，State和Props，这回对代码的维护产生一定的损耗，保持一致性会导致额外的开销。一般情况下，在此处使用的时候直接可以通过计算得到结果。

* 每次Render的时候都会调用这个方法。

典型的场景为：表单的初始值，因为初始值在用户修改表单之后就会失去作用。

## render

用于描述UI的DOM结构，React组件唯一强制需要被定义的方法，因为他是定义DOM的，所以，如果不定义这个方法，那么，这个组件其实有没有具体被定义出来的意义了。

## shouldComponentUpdate

这个方法是一个用户和程序员可以介入的部分，主要是去判断具体的DOM是否真的需要更新的类似于中间件作用的一个方法，主要是可以在组件更新DOM的时候进行拦截或者中间处理，如果组件的确在VDOM更新时不需要更新具体的DOM，那么在该方法中返回false就可以了（就是上图中的那个红颜色叉❌）。类似的应用场景主要是：性能优化。比如一个VDOM在短时间内更新了好多次，那么，我们可以防止其DOM出现抖动，仅仅在一段时间之后返回一次true。

> 一般情况下，可以由**PureComponent**自动实现，如果VDOM没有变化的话，可以组织UI更新。

# Pre-Commit阶段

可以读取 DOM。

## getSnapshotBeforUpdate

这个方法和**getDerivedStateFromProps**一样，也是一个在v16.3新加入的生命周期方法，

主要是在每次Render组件之前调用，获取DOM的当前状态， 这个时候State已经更新了（**此处存在疑问**）

# Commit阶段

可以使用 DOM，运行副作用(具体是指修改DOM等操作，翻译的坑)，安排更新。

## React去更新DOM和ref

执行一些具体的逻辑操作

## componentDidMount

在整个UI渲染完成后调用，而且，在整个生命周期中只会调用一次。

典型的应用场景就是，去获取外部的资源，如RestFul-API调用等。

## componentDidUpdate

在页面每次更新的时候都会调用，其典型场景是，如果UI需要根据Props来变化，则可以使用该方法去捕获变化。

上面的两个did方法，是在组件整体挂载上和发生具体的更新后执行的，可以作为一些CallBack或者Hook来使用。

## componentWillUnmount

在组建从界面上消失的时候，需要自己销毁自己，然后会调用这个方法，可以理解为析构函数。

典型的使用场景为释放资源，比如说去销毁一些计时器等。

# 按操作区分阶段

## 挂载时

* constructor

* getDerivedStateFromProps

* render

* react更新DOM和refs

* componentDidMount

## 更新时

更新主要分为三种

* **new props**,就是在组件创建时，为组件传入Props的操作。

* **setState()**， 在组建内部进行属性更新的操作。

* **forceUpdate()**, 是在组件内部的状态其实未发生变化，但是，我们想去手动刷新一下组件的操作。

以上三个动作都会触发**getDerivedStateFromProps**操作。

* getDerivedStateFromProps

* shouldComponentUpdate

* render

* getSnapshotBeforUpdate

* react更新DOM和refs

* componentDidUpdate

## 卸载时

* componentWillUnmount
