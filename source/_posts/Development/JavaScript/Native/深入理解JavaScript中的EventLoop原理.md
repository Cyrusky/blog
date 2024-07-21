---
title: 深入理解JavaScript中的EventLoop原理
tags:
  - JavaScript
  - 函数
  - Native
  - 流程
categories:
  - Development
  - JavaScript
toc: true
abbrlink: 72ab985e
date: 2019-12-04 08:35:29
thumbnail: https://imgs.borgor.cn/imgs/20191204101900.png
---

# 浏览器的多进程架构

在浏览器刚被设计出来的时候，那时的网页非常的简单，每个网页的资源占有率是非常低的，因此一个进程处理多个网页时可行的。然后在今天，大量网页变得日益复杂。把所有网页都放进一个进程的浏览器面临在健壮性，响应速度，安全性方面的挑战。

- 健壮性：现代浏览器大多都是多`tab`架构，如果所有的`tab`都存在于一个进程内部的话，如果其中的一个`tab`崩溃，会影响其他的`tab`，为每个`tab`分配一个进程，则会有效避免这个问题。

- 响应速度：这个不赘述。

- 安全性：由于同一进程内的线程是共享资源与地址空间的，所以如果把不同的网页放在同一进程内，可能会导致数据泄露等问题。

<!-- more -->

## 浏览器内核的多线程

- GUI 渲染线程（Render线程），负责渲染浏览器界面HTML元素,当界面需要重绘(Repaint)或由于某种操作引发回流(reflow)时,该线程就会执行。在Javascript引擎运行脚本期间,GUI渲染线程都是处于挂起状态的,也就是说被”冻结”了.

- JavaScript引擎线程（JS线程），也可以称为JS内核，主要负责处理Javascript脚本程序，例如V8引擎。Javascript引擎线程理所当然是负责解析Javascript脚本，运行代码。

- 事件触发线程（Event线程），当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理。这些事件可以是当前执行的代码块如定时任务、也可来自浏览器内核的其他线程如鼠标点击、AJAX异步请求等，但由于JS的单线程关系所有这些事件都得排队等待JS引擎处理。

- 异步http请求线程（I/O线程），在XMLHttpRequest在连接后是通过浏览器新开一个线程请求， 将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件放到 JavaScript引擎的处理队列中等待处理。

- 定时触发器线程（Timer线程），浏览器定时计数器并不是由JavaScript引擎计数的, 因为JavaScript引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确, 因此通过单独线程来计时并触发定时是更为合理的方案。

所以，当我们说“**JavaScript是单线程的**”这句话的时候，其实并是指浏览器，而是指上面所说的“JS线程”。

> **Render线程和JS线程是互斥的**，由于JavaScript是可操纵DOM的，如果在修改这些元素属性同时渲染界面（即JavaScript线程和UI线程同时运行），那么渲染线程前后获得的元素数据就可能不一致了。因此为了防止渲染出现不可预期的结果，浏览器设置GUI渲染线程与JavaScript引擎为互斥的关系，当JavaScript引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到引擎线程空闲时立即被执行。

# EventLoop

由于JavaScript的单线程特性，所以，要达到**“非阻塞”**，就必须要使用一种机制来合理的安排与调度这些同步于异步的任务，这个机制我们就称为EventLoop。

## EventLoop在浏览器执行过程中的位置

![](https://imgs.borgor.cn/imgs/20191204100901.png)

## EventLoop中的任务队列

在EventLoop中，所有的任务都分为两类，分别处于不同的任务队列中，具体：

- MacroTask（宏任务/Tasks）
  
  - setTimeout
  
  - setInterval
  
  - I/O
  
  - setImmediate(NodeJS)
  
  - requestAnimationFrame(浏览器)
  
  - UI Rendering(浏览器)

- MicroTask（微任务/Jobs）
  
  - process.nextTick(NodeJS)
  
  - Promise
  
  - Object.observe
  
  - MutationObserver

## 浏览器中的EventLoop

我们可以将所有的JavaScript看做是一个大的宏任务，并将其加入宏任务队列，这样就可以开始Loop了，具体步骤如下：

1. 先执行一条宏任务队列中的任务（第一次为全局JavaScript），在过程中，将相应的宏任务和微任务加入对应的队列，并结束第一次循环。

2. 如果微任务队列中有任务，则需要先执行微任务队列中的队列，直至清空微任务队列，需要额外注意的是：**如果在执行微任务队列的过程中，又新创建了微任务，则改为任务会直接添加至微任务队列末尾，并在本次循环中直接执行**。

3. 如果宏任务队列中有任务，则继续1步骤。

听起来倒是挺简单的，我们可以通过下面的代码做个试验：

```javascript
// Position 1
console.log(1);

// Position 2
setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

// Position 3
new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

// Position 4
setTimeout(() => {
  console.log(6);
})

// Position 5
console.log(7);
```

### 我们来跟踪一下这段程序

- 第一遍，我们运行全局JavaScript，我们输出了`1`（Position 1）、`4`（Position 3）、`7`（Position5），并将两个`setTimeout`的回调函数加入了宏任务队列，分别为`Position 2`和`Position 4`，将一个`Promise`回调加入了微任务队列。

> 这里要注意的是`Promise`在定义的阶段，其参数中的方法是同步执行的，就是：`（resolve, reject）=> { ... }`这部分。所以，其中你的`console.log(4)`在第一遍的时候随着其宏任务同步执行了。
> 
> 经过上面的过程后：
> 
> `Tasks`：`setTimeoutCallback1``setTimeoutCallback2`
> 
> `Jobs`：`PromiseThen`
> 
> `Console`：`1`，`4`，`7`

- 紧接着我们需要清空微任务队列，即：`Jobs`队列，所以输出：`5`（Position 5）

> 经过上面的过程后：
> 
> `Tasks`：`setTimeoutCallback1`，`setTimeoutCallback2`
> 
> `Jobs`：
> 
> `Console`：`1`，`4`，`7`，`5`

- 继续执行宏任务队列中的任务，输出`2`，但是这个时候，我们的`setTimeoutCallback1`中，又创建了一个`Promise`所以，将这个`PromiseThen`加入微任务队列。

> 经过上面的过程后：
> 
> `Tasks`：`setTimeoutCallback2`
> 
> `Jobs`：`PromiseThen`
> 
> `Console`：`1`，`4`，`7`，`5`，`2`

- 然后清空微任务队列，即`PromiseThen`，这里的`PromiseThen`和上一个`PromiseThen`分别是两个`Promise`创建的，需要注意一下。

> 经过上面的过程后：
> 
> `Tasks`：`setTimeoutCallback2`
> 
> `Jobs`：
> 
> `Console`：`1`，`4`，`7`，`5`，`2`，`3`

- 最后再次执行宏任务队列中的第一个任务，即`setTimeoutCallback2`。

> 经过上面的过程后：
> 
> `Tasks`：`setTimeoutCallback2`
> 
> `Jobs`：
> 
> `Console`：`1`，`4`，`7`，`5`，`2`，`3`，`6`

**在上述过程中，未提起CallStack的内容，但是，在最后所有程序执行完毕后，CallStack也会被清空**。

### 自己实现

如果你单步调试体验一下的话，可以在下面这个地址：

[https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

## NodeJS中的EventLoo

![](https://user-gold-cdn.xitu.io/2018/9/5/165a8667e0f09fa2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- Development

### NodeJS中的宏队列和微队列

NodeJS的Event Loop中，执行宏队列的回调任务有**6个阶段**，如下图：

![](https://imgs.borgor.cn/imgs/20191204101825.png)

各个阶段执行的任务如下：

- **timers阶段**：这个阶段执行`setTimeout`和`setInterval`预定的`callback`
- **I/O callback阶段**：执行除了`close`事件的`callbacks`、被`timers`设定的`callbacks`、`setImmediate()`设定的`callbacks`这些之外的`callbacks`
- **idle, prepare阶段**：仅`node`内部使用
- **poll阶段：获取新的I/O事件**，适当的条件下`node`将阻塞在这里
- **check阶段**：执行`setImmediate()`设定的`callbacks`
- **close callbacks阶段**：执行`socket.on('close', ....)`这些`callbacks`

**NodeJS中宏队列主要有4个**

由上面的介绍可以看到，回调事件主要位于4个宏任务队列中：

1. `Timers Queue`
2. `IO Callbacks Queue`
3. `Check Queue`
4. `Close Callbacks Queue`

这4个都属于宏队列，但是在浏览器中，可以认为只有一个宏队列，所有的`macrotask`都会被加到这一个宏队列中，但是在`NodeJS`中，不同的`macrotask`会被放置在不同的宏队列中。

**NodeJS中微队列主要有2个**：

1. `Next Tick Queue`：是放置`process.nextTick(callback)`的回调任务的
2. `Other Micro Queue`：放置其他`microtask`，比如`Promise`等

在浏览器中，也可以认为只有一个微队列，所有的`microtask`都会被加到这一个微队列中，但是在`NodeJS`中，不同的`microtask`会被放置在不同的微队列中。

1. 执行全局`Script`的同步代码

2. 执行`microtask`微任务，先执行所有`Next Tick Queue`中的所有任务，再执行`Other Microtask Queue`中的所有任务

3. 开始执行`macrotask`宏任务，共6个阶段，从第1个阶段开始执行相应每一个阶段`macrotask`中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的`Event Loop`中是只取宏队列的第一个任务出来执行，每一个阶段的`macrotask`任务执行完毕后，开始执行微任务，也就是步骤2

4. `Timers Queue` -> `步骤2 `->` I/O Queue` -> `步骤2`-> `Check Queue` -> `步骤2` -> `Close Callback Queue` -> `步骤2`-> `Timers Queue` ......

### 示例

```javascript
console.log('start');

setTimeout(() => {          // callback1
  console.log(111);
  setTimeout(() => {        // callback2
    console.log(222);
  }, 0);
  setImmediate(() => {      // callback3
    console.log(333);
  })
  process.nextTick(() => {  // callback4
    console.log(444);  
  })
}, 0);

setImmediate(() => {        // callback5
  console.log(555);
  process.nextTick(() => {  // callback6
    console.log(666);  
  })
})

setTimeout(() => {          // callback7              
  console.log(777);
  process.nextTick(() => {  // callback8
    console.log(888);   
  })
}, 0);

process.nextTick(() => {    // callback9
  console.log(999);  
})

console.log('end');
```

输出为：

```textile
start
end
999
111
777
444
888
555
333
666
222
```

# 参考资料

* [https://juejin.im/post/5b8f76675188255c7c653811](https://juejin.im/post/5b8f76675188255c7c653811)

* [https://zhuanlan.zhihu.com/p/33058983](https://zhuanlan.zhihu.com/p/33058983)

* [https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
