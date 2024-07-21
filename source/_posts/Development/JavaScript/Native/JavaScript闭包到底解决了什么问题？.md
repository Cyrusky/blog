---
title: JavaScript闭包到底解决了什么问题？
tags:
  - 闭包
  - 全局变量
  - 全局对象
  - 私有对象
categories:
  - Development
  - JavaScript
toc: true
cover: '/assets/images/20191124220507.webp'
abbrlink: 4adcf99c
date: 2019-11-24 20:42:13
---

# JavaScript中的闭包到底是个什么东西

JavaScript中的闭包其实是一个让函数返回另一个内部函数的过程，我们都知道，JavaScript中，函数其实也是一个变量，或者说是对象，所以，对于上述的过程，我们就能够理解，这种方式是能够被实现的。

闭包的具体实现方式：

<!-- more -->

```javascript
function addToArr(element) {
  var arr = [];

  return function push() {
    arr.push(element);
    console.log(arr);
  };
}
```

在上面的Snippet中，我们可以看到，addToArr是一个函数，而在其内部定义了一个push方法，而且将push方法给返回了。

我们可以去观察一下这个方法：

![](/assets/images/20191124230448.webp)

现在，外部的`addToArr`变成了一个可被调用的容器，调用之后会返回一个可执行的`push`函数，这个`push`函数的定义是在`addToArr`
容器之内的。

我们可以通过调用`addToArr`去拿到这个内部定义的`push`函数。

```javascript
var result = addToArr();
```

# 闭包解决的问题

## 局部的全局变量

如果说，我们需要有一个全局的变量，我们需要如何去编写我们的代码。一方面可以将变量挂载到全局的对象上，比如说，在浏览器中，全局的对象包括`window`、`document`
等，但是，这样的话，会污染全局对象，十分的不友好，甚至可能会造成不同程度的兼容性问题。还有的解决方法就是使用`var`
关键字定义一个相对全局的变量。这样的话，就可以在整个省代码的作用于中使用这个全局对象。

> `var`关键字定义的跨文件全局对象在ES6中可以使用`‘use strict’`关键字启用严格模式来避免。

```javascript
var arr = [];
function addToArr(element) {
  arr.push(element);
  return element + " added!";
}
addToArr('a')
// ['a']
addToArr('b')
// ['a','b']
addToArr('c')
// ['a', 'b', 'c']
```

但是，这样做有一个问题，就是很难保证在多人合作编写程序的时候，别人不会去使用`arr`
这个名字作为自己程序段的变量名，这样的话，一方面会导致变量的数据可能会丢失或者被修改，另一方面会导导致安全性问题。

如果说在函数内部使用变量的话，这个变量又会变成一个彻头彻尾的局部变量，无法保存状态，每次修改后，在跳出函数的时候，信息就会丢失。函数自身是无法保存该数据的，除非该数据被返回后交由其他的Snippet去保存。

还有一种保存全局对象的方式就像`Redux`或者`vuex`那样，将所有可能用到的全局对象，保存在同一个对象中，这样的话，随时可以导入包并且使用这些对象。

但是，更为轻便的方法就是闭包。

具体的使用方法如下：

```javascript
function addToArr() {
  var arr = [];

  return function push(element) {
    arr.push(element);
    console.log(arr);
  };
}

var result = addToArr();
result("a"); // [ 'a' ]
result("b"); // [ 'a', 'b' ]
```

当`addToArr`方法被调用的时候，`arr`数组对象被创建，然后被`push`函数引用，这个时候`result`其实就是`push`对象，而`arr`
对象就变成了一个`result`对象的**局部的全局对象**，只要`result`对象没有消失，那么`arr`对象就可以一直被`result`
函数对象使用，而且是用一个`arr`，其生命周期和`result`的生命周期相同。

```javascript
var result = addToArr();
result("a")
// ["a"]
result("b")
// ["a", "b"]
result("c")
// ["a", "b", "c"]
var result1 = addToArr();
result1("c")
// ["c"]
```

## 函数之间的变量传递

其实，从上面的例子我们已经可以看出了，不管`result`作为一个函数被执行了多少次，其对应的`arr`
对象都是那么一个，这样有一个好处，就是我们可以在函数内部去使用这个共享的对象，进行一些数据的传递。

## 避免外部对共享对象的访问

```javascript
console.log(addToArr.arr)
// undefined
console.log(result.arr)
// undefined
```

可以看出对于`arr`来说，只能在`push`函数中去访问，其他的任何方式都无法去访问，无意间`arr`就变成了一个内部的**私有对象**。

# 闭包的应用

JS中闭包最有趣的应用程序之一是`模块模式`。在ES6之前，除了将变量和方法封装在函数中之外，没有其他方法可以模块化JS代码并提供私有变量与方法”。闭包与立即调用的函数表达式相结合
是至今通用解决方案。

我们去定义一个变量，如面的Snippet：

```javascript
var Person = (function() {
  var person = {
    name: "",
    age: 0
  };

  function setName(personName) {
    person.name = personName;
  }

  function setAge(personAge) {
    person.age = personAge;
  }

  return {
    setName: setName,
    setAge: setAge
  };
})();
```

我们创建了一个函数，这个函数在内部定义了一个闭包对象（姑且先这么叫着），这个对象包含两个字段`name`和`age`
，并且创建了两个内部的函数，对这两个字段进行`get`和`set`的操作。最后将这两个方法返回。

并且在定义好这个函数后，立即执行，将其结果存储到`Person`变量中。

这个时候Person变量就变成了一个货真价实的对象，这个对象与`java`中的对象十分得相似。

> JavaScript中，模块的实现，就是用了这种方法。

# 结论

全局变量很容易引发bug，咱们应该尽可能地避免它们。 有时全局变量是有用的，需要格外小心使用，因为JS引擎可以自由地创建全局变量。

这些年来出现了许多模式来管理全局变量，模块模式就是其中之一。 模块模式建立在闭包上，这是JS的固有特性。 JS
中的闭包是一种能够“记住”其变量环境的函数，即使在后续函数调用之间也是如此。
当咱们从另一个函数返回一个函数时，会创建一个闭包，这个模式也称为**“工厂函数”**。
