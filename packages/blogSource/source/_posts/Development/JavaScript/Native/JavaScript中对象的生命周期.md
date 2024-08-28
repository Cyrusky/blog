---
title: JavaScript中对象的生命周期
tags:
  - 开发
categories:
  - Development
  - JavaScript
toc: true
cover: /assets/images/20191122161153.webp
abbrlink: f971e187
date: 2019-11-22T14:04:32.000Z
thumbnail: /assets/thumbnail/20191122161153.webp
---

# 一切皆对象

其实，我们已经了解到了，JavaScript中，所有的东西都是对象，也就是所谓的`“Object”`
类型，但是，在JavaScript中，并没有真正的类的概念，所以，此处的对象并不像是Java或者Python中的那样，是由类实例化而来的，而是由键和值来组成的，对象其实就是以键命名的值的容器。

比如，我们使用`typeof`来检查一个数组的类型，会发现，其实数组也是一个`Object`

```javascript
let a = []
typeof a
// "object"
```

<!-- more -->

其他的一些类型也可以这么验证，比如说function类型，如果说，创建一个function类型的话，JavaScript引擎会自动为这个function添加一些额外的属性，就像给对象添加属性一样，比如说`toString()`
方法。

```javascript
let b = function () {
}
b.toString()
// "function(){}"
```

我们如果深究的话，可以尝试一下：

```javascript
dir(b)
// ƒ b()
//     arguments: null
//     caller: null
//     length: 0
//     name: "b"
//     prototype:
//         constructor: ƒ ()
//         __proto__:
//             constructor: ƒ Object()
//             hasOwnProperty: ƒ hasOwnProperty()
//             isPrototypeOf: ƒ isPrototypeOf()
//             propertyIsEnumerable: ƒ propertyIsEnumerable()
//             toLocaleString: ƒ toLocaleString()
//             toString: ƒ toString()
//             valueOf: ƒ valueOf()
//             __defineGetter__: ƒ __defineGetter__()
//             __defineSetter__: ƒ __defineSetter__()
//             __lookupGetter__: ƒ __lookupGetter__()
//             __lookupSetter__: ƒ __lookupSetter__()
//             get __proto__: ƒ __proto__()
//             set __proto__: ƒ __proto__()
//     __proto__: ƒ ()
//     [[FunctionLocation]]: VM353:1
//     [[Scopes]]: Scopes[2]
```

其原型下面拥有`constructor`等方法，这一看就是一个对象啊。

同样考察其他基本数据类型：

```javascript
typeof Object.prototype // 'object'
typeof Date.prototype // 'object'
typeof String.prototype // 'object'
typeof Number.prototype // 'object'
typeof Array.prototype // 'object'
typeof Error.prototype // 'object'
```

可以看得出来，真的是一切皆对象。

那么什么是一个对象的`ProtoType`呢？简单的来说，`prototype`就是一个父对象（可以参考父类）的镜像或者链接，通过`prototype`
我们可以访问父对象中的一些方法。

就像，我们本来定义一个`function`的时候是没有`toString()`这个方法的，这个方法是哪里来的呢？其实就是我们调用了`prototype`
中的`toString()`方法，这个方法来自于其父对象，也就是`Object`。

# 对象的创建和连接

JavaScript中的对象是互相有关系的，就像Python中的`Object`一样，所有的对象，都是`object`
对象的子对象，我们创建一个对象的时候其实是创建了一个Object的副本，然后向这个副本中添加别的一些属性，并且重命名成为我们想要的对象，当然这个过程还是会进行一些别的操作的。

```javascript
var Person = {
  name: "noname",
  age: 0,
  greet: function () {
    console.log(`Hello ${this.name}`);
  }
};

var Tom = Object.create(Person);
var tomAge = Tom.age;
var tomName = Tom.name;

console.log(`${tomAge} ${tomName}`);

// Output: 0 noname
```

在上面的例子中，我们定义了一个`Person`对象作为父对象，然后，我们通过这个父对象，创建了一个`Tom`
子对象，这个子对象就继承了`Person`对象的所有属性。包括：`name`、`age`，以及`greet`方法。

我们可以继续为`Tom`对象添加新的属性：

```javascript
Tom.sayHi = function () {
  console.log('Hi');
}
Tom.gender = "Male"
Tom.sayHi()
console.log(Tom.gender)
// "Hi"
// "Male"
```

上面的这种方法创建的对象，继承了所有父对象的属性和值，为`Object.create()`方法添加额外的参数，就可以为其返回的新对象初始化数据了。但是，我们先做一个实验：

```javascript
for (const key in Tom) {
  console.log(key)
}
// "sayHi"
// "gender"
// "name"
// "age"
// "greet"
```

为什么做这个实验我们先不纠结，上面的实验是指我们循环遍历Tom中，目前所拥有的的属性的名称。

然后我们接着来看另外一种初始化对象的方法：

```javascript
var Tom = Object.create(Person, {
  name: {
    value: "Tom.Initiated"
  },
  age: {
    value: 66
  }
})
for (const key in Tom) {
  console.log(key)
}
console.log(Tom.age)
// "greet"
// 66
```

我们可以看出，我们使用在`Object.create()`方法中添加参数的方法来初始化对象的话，初始化的对象都不能被枚举了。

> 我们在JavaScript引擎的工作原理中提到过这些概念，现在复习一下这几个概念:
>
> * 可枚举（迭代）性（enumerable）：
    >
    >

* 可枚举意味着属性会在 `for...in` 循环中显示，或者会被遍历，但是该属性还是可以被直接访问到，就是俗称的点出来如：`Tom.age`

>
> * 可配置性（configurable）：
    >
    >

* 意味着能修改属性的行为，让该对象的属性都是不可迭代的、不可修改的和不可配置的. 只有可配置的属性才能通过 `delete` 被删除。

>
> * 可修改（写）性（writable）：
    >
    >

* 意味着我能修改该对象的所有属性的值，通过为这些属性赋予一个新值就能修改: `Tom.age = 1000;`.

所以我们可以修改上面的创建方式来对上面的三个属性使能：

```javascript
var Tom = Object.create(Person, {
  age: {
    value: 34,
    enumerable: true,
    writable: true,
    configurable: true
  },
  name: {
    value: "Tom",
    enumerable: true,
    writable: true,
    configurable: true
  }
});
for (const key in Tom) {
  console.log(key)
}
// "age"
// "name"
// "greet"
// 34
```

当然，我们还有一种更为方便的创建对象的方法，就是以函数的方式去创建对象，我们将上面的代码修改如下：

```javascript
var personMethods = {
  greet: function () {
    console.log("Hello " + this.name);
  }
};

function Person(name, age) {
  // greet lives outside now
  var newPerson = Object.create(personMethods);
  newPerson.age = age;
  newPerson.name = name;
  return newPerson;
}

var me = Person("Valentino");
me.greet();

// Output: "Hello Valentino"
```

上面的方法具体干了些什么事情？

* 定义了一个`personMethods`对象，对象中包含一个函数元素，命名为`greet`

* 定义了一个`Person`函数，该函数返回一个对象，返回的这个对象继承了`personMethods`对象。

* `Person`执行的过程中，还对创建的`personMethods`的这个子对象添加了一些自己的属性：`age`、`name`

~~当然，我们也可以不单独定义`personMethods`对象，也就是父对象。而是将这个方法直接挂载到我们新创建的`newPerson`
对象的原型上，具体如下~~（理解错误了）：

当然我们也可以直接使用`Person`的原型为模板创建这个`newPerson`对象，这样的话，我们就可以直接为原型添加方法，如下：

```javascript
Person.prototype.greet = function () {
  console.log("Hello " + this.name);
};
```

现在公共方法的来源是`Person.prototype`。 使用JS中的`new`运算符，可以消除`Person`中的所有噪声，并且只需要为`this`分配参数。

可以将下面的这部分代码：

```javascript
function Person(name, age) {
  // greet lives outside now
  var newPerson = Object.create(Person.prototype);
  newPerson.age = age;
  newPerson.name = name;
  return newPerson;
}
```

修改为：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
```

然后在其原型上直接添加属性：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log("Hello " + this.name);
};

var me = new Person("Valentino");
me.greet();

// Output: "Hello Valentino"
```

注意，使用`new`关键字，被称为“`构造函数调用”`，`new` 干了三件事情：

* 创建一个空对象

* 将空对象的`__proto__`指向构造函数的`prototype`

- 使用空对象作为上下文的调用构造函数

  ```javascript
  function Person(name, age) {
   this.name = name;
   this.age = age;
  }
  ```

根据上面描述的，`new Person("Valentino")` 做了：

- 创建一个空对象：`var obj = {}`
- 将空对象的`__proto__`指向构造函数的 prototype：`obj.__proto__ = Person().prototype`
- 使用空对象作为上下文调用构造函数： `Person.call(obj)`

# 检查原型链

原型链其实简单地说就是一个对象之间的依赖关系。类似于父类到子类的继承关系。

对于`JavaScript`的原型链检查，可以使用`Object.getPrototypeOf()`
方法来实现，还有一种方法就是判断一个对象的父对象是否为另一个对象，使用`Object.isPrototypeOf()`方法来实现。

比如：

```javascript
var Person = {
  name: "noname",
  age: 0,
  greet: function () {
    console.log(`Hello ${this.name}`);
  }
};

var Tom = Object.create(Person);
var tomPrototype = Object.getPrototypeOf(Tom);

console.log(tomPrototype === Person);
// Output: true
```

很明显，如果使用`Object.create()`方法来创建对象的话，使用`Object。getPrototypeOf()`方法获取到的就是其父对象`Person`的内容：

```javascript
console.log(Object.getPrototypeOf(Tom) === Person);
// ture
```

而如果使用构造函数方法来创建对象的话，要对其原型进行检查的话需要观察其`prototype`属性，具体如下：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log("Hello " + this.name);
};

var me = new Person("Valentino");

var mePrototype = Object.getPrototypeOf(me);

console.log(mePrototype === Person.prototype);
// Output: true
```

还有一种检查原型链的方法，就是`[Object].prototype.isPrototypeOf()`
方法，该方法用于测试一个对象是否存在于另一个对象的原型链上，如下所示，检查 `me` 是否在 `Person.prototype` 上：

```javascript
Person.prototype.isPrototypeOf(me) && console.log('Yes I am!')
```

如果要测试一个构造函数的`prototype`属性是否出现在原型链上，则还有一种方式`isinstance()`方法。

```javascript
isinstance(tom, Person)
// Output: True
isinstance(tom, object)
// Output: True
```

`JavaScript`在访问对象的属性时，具体的流程为：JS引擎会检查该方法是否可直接在当前对象上使用。 如果不是，搜索将继续向上链接，直到找到该方法。

# 保护对象不受操作

大多数情况下，JS 对象“可扩展”是必要的，这样咱们可以向对象添加新属性。 但有些情况下，我们希望对象不受进一步操纵。 考虑一个简单的对象：

```javascript
var superImportantObject = {
  property1: "some string",
  property2: "some other string"
};
```

默认情况下，每个人都可以向该对象添加新属性

```javascript
var superImportantObject = {
  property1: "some string",
  property2: "some other string"
};

superImportantObject.anotherProperty = "Hei!";

console.log(superImportantObject.anotherProperty); // Hei!
```

`Object.preventExtensions()`方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。

```javascript
var superImportantObject = {
  property1: "some string",
  property2: "some other string"
};
Object.preventExtensions(superImportantObject);
superImportantObject.anotherProperty = "Hei!";
console.log(superImportantObject.anotherProperty); // undefined
```

这种技术对于“保护”代码中的关键对象非常方便。JS
中还有许多预先创建的对象，它们都是为扩展而关闭的，从而阻止开发人员在这些对象上添加新属性。这就是“重要”对象的情况，比如`XMLHttpRequest`
的响应。浏览器供应商禁止在响应对象上添加新属性

```javascript
var request = new XMLHttpRequest();
request.open("GET", "https://jsonplaceholder.typicode.com/posts");
request.send();
request.onload = function () {
  this.response.arbitraryProp = "我是新添加的属性";
  console.log(this.response.arbitraryProp); // undefined
};
```

这是通过在“response”对象上内部调用`Object.preventExtensions`来完成的。 您还可以使用`Object.isExtensible`方法检查对象是否受到保护。
如果对象是可扩展的，它将返回`true`：

```javascript
var superImportantObject = {
  property1: "some string",
  property2: "some other string"
};

Object.isExtensible(superImportantObject) && console.log("我是可扩展的");
```

如果对象不可扩展的，它将返回`false`：

```javascript
var superImportantObject = {
  property1: "some string",
  property2: "some other string"
};

Object.preventExtensions(superImportantObject);

Object.isExtensible(superImportantObject) || console.log("我是不可扩展的!");
```

当然，对象的现有属性可以更改甚至删除

```javascript
var superImportantObject = {
  property1: "some string",
  property2: "some other string"
};

Object.preventExtensions(superImportantObject);

delete superImportantObject.property1;

superImportantObject.property2 = "yeees";

console.log(superImportantObject); // { property2: 'yeees' }
```

现在，为了防止这种操作，可以将每个属性定义为不可写和不可配置。为此，有一个方法叫`Object.defineProperties`。

```javascript
var superImportantObject = {};

Object.defineProperties(superImportantObject, {
  property1: {
    configurable: false, writable: false, enumerable: true, value: "some string"
  },
  property2: {
    configurable: false, writable: false, enumerable: true, value: "some other string"
  }
});
```

或者，更方便的是，可以在原始对象上使用`Object.freeze`：

```javascript
var superImportantObject = {
  property1: "some string",
  property2: "some other string"
};

Object.freeze(superImportantObject);
```

`Object.freeze`工作方式与`Object.preventExtensions`相同，并且它使所有对象的属性不可写且不可配置。
唯一的缺点是“`Object.freeze`”仅适用于对象的第一级：嵌套对象不受操作的影响。

# 类

有大量关于ES6 类的文章，所以在这里只讨论几点。JS是一种真正的面向对象语言吗?看起来是这样的，如果咱们看看这段代码

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello ${this.name}`);
  }
}
```

ES6中引入了类。但是在这一点上，咱们应该清楚JS中没有“`真正的`”类。 一切都只是一个对象，尽管有关键字`class`，“原型系统”仍然存在。
新的JS版本是向后兼容的，这意味着在现有功能的基础上添加了新功能，这些新功能中的大多数都是遗留代码的语法糖。

# 总结

JS中的几乎所有东西都是一个对象。 从字面上看。 JS对象是键和值的容器，也可能包含函数。 `Object`
是JS中的基本构建块：因此可以从共同的祖先开始创建其他自定义对象。 然后咱们可以通过语言的内在特征将对象链接在一起：原型系统。

从公共对象开始，可以创建共享原始“父”的相同属性和方法的其他对象。 但是它的工作方式不是通过将方法和属性复制到每个孩子，就像OOP语言那样。
在JS中，每个派生对象都保持与父对象的连接。 使用`Object.create`或使用所谓的构造函数创建新的自定义对象。 与`new`
关键字配对，构造函数类似于模仿传统的OOP类。
