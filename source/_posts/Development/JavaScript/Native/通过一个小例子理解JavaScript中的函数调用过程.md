---
title: 通过一个小例子理解JavaScript中的函数调用过程
tags: 
  - 变量类型
  - JavaScript
categories: 
  - Development
  - JavaScript
toc: true
abbrlink: 5b57bf1a
date: 2019-11-19 12:17:41
cover: /assets/images/20191119111938.webp
---

# 函数调用栈

调用栈，具有`LIFO`（Last in, First out 后进先出）结构，用于存储在代码执行期间创建的所有执行上下文。

当JavaScript引擎首次读取脚本时，会创建一个全局执行上下文并将其`push`
到当前执行栈中。每当发生函数调用时，引擎都会为该函数创建一个新的执行上下文并`push`到当前执行栈的栈顶。

引擎会运行执行上下文在执行栈栈顶的函数，根据`LIFO`规则，当此函数运行完成后，其对应的执行上下文将会从执行栈中`pop`
出，上下文控制权将转到当前执行栈的下一个执行上下文。

<!-- more -->

# 示例代码

```js
var myOtherVar = 10;

function a() {  
 console.log('myVar', myVar);  
 b();  
}

function b() {  
 console.log('myOtherVar', myOtherVar);  
 c();  
}

function c() {  
 console.log('Hello world!');  
}

a();

var myVar = 5;
```

有几个点需要注意：

- 变量声明的位置(一个在上`myOtherVar`，一个在下`myVar`)

- 函数`a`调用下面定义的函数`b`, 函数`b`调用函数`c`

- `var`的提升问题是指，将`var`的定义提升，而其赋值过程，仍然在原来的位置，

    - 如果不赋值的话，console的log结果为`undefined`，而不定义的结果是`ReferenceError`

当它被执行时你期望发生什么？ 是否发生错误，因为`b`在`a`之后声明或者一切正常？ `console.log` 打印的变量又是怎么样？

```js
"myVar" undefined  
"myOtherVar" 10  
"Hello world!"
```

# 运行过程

## 1. 变量和函数声明(创建阶段)

第一步是在内存中为所有变量和函数分配空间。 但请注意，除了`undefined`之外，尚未为变量分配值。 因此，`myVar`
在被打印时的值是`undefined`，因为JavaScript引擎从顶部开始逐行执行代码。

函数与变量不一样，函数可以一次声明和初始化，这意味着它们可以在任何地方被调用。

所以以上代码在创建阶段时，看起来像这样子：

```js
var myOtherVar = undefined

function a() {...}  
function b() {...}  
function c() {...}

// 下面才是具体的执行过程  
var myOtherVar = 10;  
a();  
var myVar = 5;
```

通过上面的步骤分解，就可以很容易的理解为什么会输出如此的结果。

这些都存在于JavaScript创建的全局上下文中，因为它位于全局作用域中。

在全局上下文中，JS还添加了：

- 全局对象(浏览器中是 `window` 对象，NodeJs 中是 `global` 对象)
- `this` 指向全局对象

## 执行

接下来，JS 引擎会逐行执行代码。

`myOtherVar = 10`在全局上下文中，`myOtherVar`被赋值为`10`

已经创建了所有函数，下一步是执行函数 `a()`

每次调用函数时，都会为该函数创建一个新的上下文(重复步骤1)，并将其放入调用堆栈。

```js
function a() {
 console.log('myVar', myVar)
 b()
}
```

如下步骤：

- 创建新的函数上下文
- `a` 函数里面没有声明变量和函数
- 函数内部创建了 `this` 并指向全局对象(window)
- 接着引用了外部变量 `myVar`，`myVar` 属于全局作用域的。
- 接着调用`函数 b` ，`函数b`的过程跟`a`一样，这里不做分析。

更加通俗的步骤如下：

- 创建全局上下文，全局变量和函数。
- 每个函数的调用，会创建一个上下文,外部环境的引用及 this。
- 函数执行结束后会从堆栈中弹出，并且它的执行上下文被垃圾收集回收(闭包除外)。
- 当调用堆栈为空时，它将从事件队列中获取事件。
