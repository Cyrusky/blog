---
title: ES6中的模板字符串
tags:
  - 模板字符串
  - 标签模板
categories:
  - Development
  - JavaScript
toc: true
cover: '/assets/images/20200317105552.webp'
abbrlink: 7a553f23
date: 2020-03-16 17:22:37
---

前两天在看教程的时候，突然发现了一个语法，具体如下：

```javascript
foo = (...values) => console.log(...values)
// (...values) => console.log(...values)
a = 'bar'
// "bar"
foo`start${a}end`
// (2) ["start", "end"], raw: Array(2)] "bar"
// undefined
```

直接给我看蒙了，所以，我就ES6的模板字符串做一下总结：

<!-- more -->

# 基础用法

```javascript
let message = `Hello World`;
console.log(message);
```

如果你碰巧要在字符串中使用反撇号，你可以使用反斜杠转义：

```javascript
let message = `Hello \` World`;
console.log(message);
```

模板字符串的内容是原样输出的，不会对其中的内容做任何的删除或者修改：

```javascript
let message = `
	<ul>
		<li>1</li>
		<li>2</li>
	</ul>
`;
console.log(message);
//	<ul>
//		<li>1</li>
//		<li>2</li>
//	</ul>
```

# 嵌入变量

模板字符串里面是可以嵌入变量的。这个变量一般会在输出的时候转换成字符串类型，比如：

```javascript
console.log(`start'${a}'end`)
// "start'bar'end"
console.log(`start'${{}}'end`)
// `start'${{}}'end`
```

我们可以通过修改对象的`toString`方法来测试一下:

```javascript
c = {}
// {}
c.toString = (value) => {console.log("调用了toString")}
// (value) => {console.log("调用了toString")}
b = `start'${c}'end`
//>>> 调用了toString
// "start'undefined'end"
```

# 标签模板(重点来了)

模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串，该模板字符串会在经过特殊的处理后，作为参数传给这个函数，举个例子：

```javascript
foo = (name, ...params) => {
  console.log('name:'+ name)
  console.log(params)
}
foo`name${1}end`
// name:name,end
//	0: 1
//	length: 1
//	__proto__:
//	Array(0)

```

我们可以看出，传入的参数其实编程了下面的结构：

```javascript
[Array(n), param1, param2, ..., paramN ]
```

上面的结构中：

* `Array` 是一个数组，用于存放模板字符串中的固定部分，这些固定的部分被嵌入的变量所分割
* `paramN` 这些是模板字符串中嵌入的，还没有被`toString`处理过经过的变量。
* 按照其分割的方式，可以得出：$N = n - 1$

# 总结

现在就可以知道文章开头的那个问题啦，但是，值得注意的是如果将所有的参数都解包的话， 会得到下面的结果。

```javascript
foo = (...values) => values.map(
  t => console.log(t,typeof(t))
)
foo`start${a}end`
// (2) ["start", "end", raw: Array(2)]
//		0: "start"
//		1: "end"
//		length: 2
//		raw: (2) ["start", "end"]
//		__proto__: Array(0) "object"
// 123 "number"
```

这种方式在`GraphQL`和`React`处理`CSS`样式的时候会比较有用。
