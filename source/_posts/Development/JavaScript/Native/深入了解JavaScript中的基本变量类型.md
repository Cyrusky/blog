---
title: 深入了解JavaScript中的基本变量类型
tags:
  - JavaScript
  - 函数
  - 流程
  - Native
categories:
  - Development
  - JavaScript
toc: true
abbrlink: 290f6390
date: 2019-11-19 12:22:33
thumbnail: https://imgs.borgor.cn/imgs/20191119100237.png
---

# JavaScript中的基本变量

JavaScript 目前有 7 种基本类型，如下：

- `String`
- `Number`
- `Boolean`
- `Null`
- `Undefined`
- `Object`
- `Symbol`(ES6新增)

<!-- more -->

除了 `Object` 是复杂数据类型外，其它的 6 种是 JavaScript的基本数据类型。每个 JavaScript 类型都有一个对应的表示，如：

- 字符串

```javascript
var string = "Hello John";  
```

- 数字

```javascript
var age = 33;  
```

# JavaScript中“变量”的定义方式

> 此处变量二字加引号的原因是因为，部分定义的内容其实是不可变的，`immutable`.

在 **JavaScript** 中，可以使用 `var` 关键字将值存储在变量中，这是声明变量的最兼容方法：

```javascript
var greet = "Hello";  
var year = 89;  
var not = false;  
```

这里说的兼容，是因为在 `ES6` 中我们还有两个选择: `let` 和 `const`。旧的浏览器可能不支持这些新的关键字，除非使用“转置器”，否则可能会遇到错误。在新的浏览器中，建议都 `let` 和 `const` 。主要有两个好处：

- `let` 和 `const` 都有自己的块作用域
- `const` 不能重新分配，也不能重新声明

> 通过以下的内容，可以看出，我对与let的理解其实就是一个加了作用域的`var`，其作用域是以代码块为`namespace`的代码段，而`const`的是更加严格的`let`。

**块作用域**是指用 `let` 或 `const` 声明的变量与在封闭或外部`块`中声明的相同变量名不重叠。例如：

```javascript

let name = "Foo";  
{  
 let name = "Bar";  
 console.log(name); // "Bar"  
}  
console.log(name); // "Foo"  
```

这里的 `name` 似乎是重复的，但实际上是两个不同的变量在自己的作用域里。`const` 具有相同的行为：

```javascript
const name = "Foo";  
{  
 const name = "Bar";  
 console.log(name); // "Bar"  
}  

console.log(name); // "Foo"  
```

`var` 的行为就与 `let` 和 `const` 不一样了。

```javascript
var name = "Foo";  
{  
 var name = "Bar";  
 console.log(name); // "Bar"  
}  
console.log(name); // "Bar"  
```

而`var`是可以重新生命的，就像上面的代码，`name`在内部代码块中被重新声明了一次，而且同时被重新赋值了。

`var`与`const`不同的地方在于：

- 如果你尝试重新声明一个 `const`，会得到 `"SyntaxError: Identifier has already been declared"`。

- 如果将某个值重新赋值给同一个 `const`，会得到 `"TypeError: Assignment to constant variable"` 错误。

```javascript

const name = "Foo";  
const name = "Bar";  
// SyntaxError: Identifier 'name' has already been declared  
const age = 33;  
age = 32;  
// TypeError: Assignment to constant variable.  
```

# 可变类型与不可变类型

上面所说的 `“const 不能重新分配，也不能重新声明”` 时，并不意味着**const** 是不可变的。

这是初学者都会遇到的问题。事实上，任何稍微复杂一点的JavaScript数据结构，如数组或对象，即使在分配给 `const` 时，它们的值或者属性值是可变的，不可变是指这些复杂对象的内存地址。

这里会涉及到一个引用类型概念，如果`const`中保存的变量其下有应用类型的变量，则这些字内容是可以被修改的。

> 引用类型主要有以下几个类型：
> 
> - `Object`类型
> 
> - `Array`类型
> 
> - `Date`类型
> 
> - `RegExp`类型
> 
> - `Function`类型
> 
> - 基本包装类型
>   
>   - `Boolean`类型是布尔值对应的引用类型。要创建`Boolean`对象，可以像下面这样调用`Boolean`构造函数并传入 `true` 或 `false` 值.
>     
>     ```javascript
>         let a = new Boolean(true)  
>     ```
>     
>         `Number` 是数字值对应的引用类型。要创建`Number`对象，可以在调用`Number`构造函数是向其中传递相应的数值。如下：
>     
>     ```javascript
>         let n = new Number(10)  
>     ```
>     
>         `String`类型是字符串的对象包装类型，如下：
>     
>     ```javascript
>         let s = new String('Foo')  
>     ```
> 
> - 内置对象
>   
>   - `Global`对象
>   
>   - `Math`对象

```javascript

const person = {  
 name: "Foo",  
 age: 21  
};  
person.name = "Bar";  
console.log(person);  
// {name: "Bar", age: 21}  
```

因为引用类型中存放的是变量的地址，所以，如果变量的地址不变的话，其内部的变化，不受`const`类型的约束。

# Function类型

Function类型主要由以下几种定义方式：

- 命名函数

```javascript
function sum(a, b) {  
 return a + b;  
}  
```

- 匿名函数

```javascript

// 匿名函数没有名称，可以分配给一个变量供以后使用  
var sum = function(a, b) {  
 return a + b;  
};  

// 或者用作其他函数中的回调  
var button = document.createElement("button");  
button.addEventListener("click", function(event) {  
 // do stuff  
});  
```

- 对象方法

如果将`Function`定义在对象中，则可以在`Function`内部使用`this`调用对象的内部属性。

```javascript
var widget = {  
 showModal: function() {  
 // do stuff  
 }  
};  
widget.showModal();  
// 或者如下  
var widget = {  
 html: "<div></div>",  
 showModal: function() {  
 console.log(this.html);  
 }  
};  

widget.showModal(); // "<div></div>"  
```

- 对象方法简写(ES 6)

```javascript

var widget = {  
 showModal() {  
 // object method shortand  
 }  
};  
// 上面的定义方法和下面的定义方法是等价的  
var widget = {  
 showModal: function() {  
 // object method shortand  
 }  
};  
widget.showModal();  
```

- IIFE(立即执行函数)

```javascript
var IIFE = (function() {  
 // what happens in an IIFE stays in the IIFE  
})();  
// 函数将在定义后立即执行  
```

# 箭头函数

- 命名箭头函数

```javascript
const arrow = () => console.log("Silly me");  

const arrow = () => {  
 const a = callMe();  
 const b = callYou();  
 return a + b;  
};  

// 下面代码的语法是错的  
const arrow = () => {  
 a : "hello",   
 b: "world"  
};  
// 需要这么定义：  
const arrow = () => ({  
 a: "hello",  
 b: "world"  
});  
// 或者：  
const arrow = () => {  
 return {  
 a: "hello",  
 b: "world"  
 };  
};  
console.log(arrow());  
// { a: 'hello', b: 'world' }  
// 如果箭头函数只有一个参数，则无需在其周围加上括号：  
const fun = singleParameter => singleParameter + 1;  

// 但如果你需要更多的参数，括号是必需的：  
const fun = (a, b) => a + b + 1;  
```

- 匿名箭头函数

与常规匿名函数一样，也有匿名箭头函数。这里有一个作为回调传递给另一个函数

```javascript
const arr = [1, 2, 3];  
const res = arr.map(element => element + 1);  
console.log(res); // [ 2, 3, 4 ]  
```

- 对象方法

```javascript

var widget = {  
 html: "<div></div>",  
 showModal: function() {  
 console.log(this.html);  
 }  
};  

widget.showModal(); // "<div></div>"  
// 而箭头函数中的 this 则指向完全不同的东西:  

var widget = {  
 html: "<div></div>",  
 showModal: () => console.log(this.html)  
};  
// 所以，头函数不太适合作为对象方法  
widget.showModal(); // undefined  
```

- IIFE 箭头函数

```javascript
(() => {  
 console.log("Foo");  
})();
```
