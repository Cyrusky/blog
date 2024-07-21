---
title: 理解JavaScript中的__proto__和prototype
tags:
  - proto
  - prototype
categories:
  - Development
  - JavaScript
toc: true
abbrlink: 30319b7d
date: 2020-03-24 10:35:38
thumbnail: https://imgs.borgor.cn/imgs/norderney-4890873_960_720.jpg
---

# 需要理解的一些概念

## 万物皆对象

虽然说 JavaScript 的面向对象不像是我们通常了解到的那些 OOP，但是，的确，在 JavaScript 中，所有的东西都是对象，这其中就包括了我们今天要说的，方法（Function）以及方法的原型(Function.prototype)，他们都是对象。因此，它们都会具有对象共有的特点。
即：对象具有属性`__proto__`，可称为隐式原型，一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。

<!-- more -->

## 方法也就是函数（Function）

对于函数这个特殊的对象来说，除了和其他对象一样有上述`__proto__`属性之外，还有自己特有的属性——原型属性（`prototype`），这个属性是一个引用，它指向一个对象，这个被指向的对象（原型对象）包含了一些被该函数共享的属性和方法。原型对象也有一个属性，叫做 constructor，这个属性包含了一个指针，指回原构造函数，比如：

```javascript
b = function() {}
b.prototype.constructor == b // true
```

> 要注意这么几点：
>
> 1. 遵循ECMAScript标准，`someObject.[[Prototype]]` 符号（Symbol）是用于指向 `someObject` 的原型。从 ECMAScript 6 开始，`[[Prototype]]` 可以通过 [`Object.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) 和 [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 访问器来访问。
>
> 
>
> 2. `someObject.[[Prototype]]`这个等同于 `JavaScript` 的许多浏览器实现（非ECMAScript标准）的属性 `__proto__`。
>
> 
>
> 3. 注意与构造函数 `func` 的 `prototype` 属性的区别。被构造函数创建的实例对象的 `[[prototype]]` 指向 `func` 的 `prototype` 属性。**`Object.prototype`** 属性表示 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 的原型对象。

# 一张经典的图

![一张经典的图](https://imgs.borgor.cn/imgs/e83bca5f1d1e6bf359d1f75727968c11_720w.jpg)

## 我们做几个实验来理解以下上面的这幅图

### 1. `function foo()`

```javascript
function Foo(){}
Foo.prototype.constructor == Foo // true
```

### 2. `new`一个函数

```javascript
function Foo(){}
let a = new Foo()  // Important
a.__proto__ == Foo.prototype // true
```

### 3. 别忘了`Object`也是一个函数对象

```javascript
typeof Object // "function"
// 和上面的1、2保持一致：

Object.prototype.constructor == Object // true
let b = new Object()
b.__proto__ == Object.prototype // true
```

### 4. 这点是图上没有的，但是我个人觉得应该需要注意一下

```javascript
// 通常最常用的创建一个空对象
let o1 = {}
// 使用构造方法创建一个空对象
let o2 = new Object()

o1.__proto__ == Object.prototype
// true
o2.__proto__ == Object.prototype
// true

// 使用构造方法创建一个空对象
let f1 = new Function(){}
// 使用箭头函数
let f2 = () => {}
// 使用传统的语法创建一个函数
let f3 = functon(){}

f1.__proto__ == Function.prototype
// true
f2.__proto__ == Function.prototype
// true
f3.__proto__ == Function.prototype
// true
```

### 5. 下面这点图上也没有

创建函数的三种方式如下：

```javascript
let a = function(){}
let b = Function()
let c = new Function()
```

`b`与`c`的区别我们就不说了，其实没啥区别，但是，`a`和`b`、`c`是有些区别的。他们的`prototype`是不一样的，具体如下：

```javascript

a.prototype
// {constructor: ƒ}
//     constructor: ƒ ()
//     length: 0
//     name: "a"
//     arguments: null
//     caller: null
//     prototype: {constructor: ƒ}
//     __proto__: ƒ ()
//     [[FunctionLocation]]: VM10690:1
//     [[Scopes]]: Scopes[1]
// __proto__: Object
b.prototype
// {constructor: ƒ}
//     constructor: ƒ anonymous( )
//     length: 0
//     name: "anonymous"
//     arguments: null
//     caller: null
//     prototype: {constructor: ƒ}
//     __proto__: ƒ ()
//     [[FunctionLocation]]: VM10941:1
//     [[Scopes]]: Scopes[1]
// __proto__: Object
c.prototype
// {constructor: ƒ}
//     constructor: ƒ anonymous( )
//     length: 0
//     name: "anonymous"
//     arguments: null
//     caller: null
//     prototype: {constructor: ƒ}
//     __proto__: ƒ ()
//     [[FunctionLocation]]: VM10874:1
//     [[Scopes]]: Scopes[1]
// __proto__: Object
```

看出来了么？ 如果用`function(){}`这种方式定义的函数，他们是有一个名字的。但是其他两种方式定义出来的都是匿名函数，但是将其引用赋给了`b`和`c`。

# 最后再说一下对象的继承

当然这里包括了函数对象和普通对象。

## 普通对象

对于普通对象来说，我们可以使用`Object.create`来实现继承。

```javascript
a = { parm_a: 'a' }
b = Object.create(a, {
  parm_b: {
    value: 'b',
    writable: true,
    configurable: true,
    enumerable: true
  }
})
c = Object.create(b, {
  parm_c: {
    value: 'c',
    writable: true,
    configurable: true,
    enumerable: true
  }
})
```

这样，就实现了`a --> b --> c`这样的继承，这样继承主要由以下特点：

* 父对象的属性可以由子对象点出来，比如：`c.parm_a`
* 如果设置了`enumerable: true`，那么在`for ... in ...`循环中，父对象的属性也可以遍历。
* `JSON.stringify`中，无法对父对象的属性进行序列化。
* `c.hasOwnProperty('parm_a')`，子对象对父对象的属性调用`hasOwnProperty`时，返回为`false`，父对象的属性不能用`own`来归类。
* 不管继承多少层，`isPrototypeOf`都能找得到：`a.isPrototypeOf(c) --> true ` 

## 函数对象

函数对象有这样的原型链关系：`Object --> Function --> Foo`

与普通对象的不同，我们只说一点。函数对象中，如果父对象的prototype中定义了一个属性（这个属性可以是方法，也可以是单纯的属性），子对象中也是可以点出来的。

# new一个对象的过程

在本文的最后，我们谈一个老生常谈的问题，就是new一个对象的过程。

## new 关键字做了什么

1. 创建一个新的对象，这个对象的类型是 object；
2. 设置这个新的对象的内部、可访问性和`[[prototype]]`属性(这个属性就是我们上面一直在说的`__proto__`，他是一个非`ECMAScript`标准)，为构造函数（指``prototype.constructor`所指向的构造函数）中设置的；
3. 执行构造函数，将`this`关键字绑定到这个新创建的对象上；
4. 返回新创建的对象（除非构造方法中返回的是‘无原型’）。

在创建新对象成功之后，如果调用一个新对象没有的属性的时候，JavaScript 会延原型链向止逐层查找对应的内容。这类似于传统的‘类继承’。

注意：在第二点中所说的有关`[[prototype]]`属性（`__proto__`），只有在一个对象被创建的时候起作用，比如使用 `new` 关键字、使用`Object.create` 、基于字面意义的（函数默认为 `Function.prototype` ，数字默认为 `Number.prototype` 等）。它只能被`Object.getPrototypeOf(someObject)` 所读取。没有其他任何方式来设置或读取这个值。

