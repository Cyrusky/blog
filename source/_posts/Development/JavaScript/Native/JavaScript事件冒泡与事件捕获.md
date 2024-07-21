---
title: JavaScript事件冒泡与事件捕获
tags:
  - JavaScript
  - 事件
  - 事件冒泡
  - 事件捕获
  - 事件代理
categories:
  - Development
  - JavaScript
toc: true
abbrlink: e801510a
date: 2019-12-04 08:35:59
thumbnail: https://imgs.borgor.cn/imgs/20191205114512.png
---

# 事件冒泡与事件捕获

**事件冒泡**和**事件捕获**分别由**微软**和**网景**公司提出，这两个概念都是为了解决页面中事件流（事件发生顺序）的问题。

比如说，下面的代码：

```html
<div id="outer">
    <p id="inner">Click me!</p>
</div>
```

上面的代码当中一个`div`元素当中有一个`p`子元素，如果两个元素都有一个`click`的处理函数，如果点击了`inner`的话，其实`outer`也算是被点击了的。那么我们怎么才能知道哪一个函数会首先被触发呢？为了解决这个问题微软和网景提出了两种几乎完全相反的概念。

<!-- more -->

# 事件冒泡（Event Bubbling）

微软提出了名为`事件冒泡(event bubbling)`的事件流。事件冒泡可以形象地比喻为把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对象。

因此在事件冒泡的概念下在p元素上发生click事件的顺序应该是`p(.inner) -> div(.outer) -> body -> html -> document`

# 事件捕获（Event Capturing）

网景提出另一种事件流名为`事件捕获(event capturing)`。与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。

因此在事件捕获的概念下在p元素上发生click事件的顺序应该是`document -> html -> body -> div(.outer) -> p(.inner)`

# addEventListener的第三个参数

我们通常使用`addEventListener`来为`DOM`元素绑定事件，具体的`API`如下：

```javascript
element.addEventListener(event, function, useCapture)
```

* 第一个参数`event`是需要绑定的事件

* 第二个参数`function`是触发事件后要执行的函数

* 第三个参数`useCapture`是一个`bool`类型，默认值是`false`，表示在事件冒泡阶段调用事件处理函数；如果参数为`true`，则表示在事件捕获阶段调用处理函数。

# 阻止事件冒泡

`w3c` 的方法是 `e.stopPropagation()`，IE 则是使用 `e.cancelBubble = true`

在支持 `addEventListener() `的浏览器中，可以调用事件对象的一个 `stopPropagation() `方法已阻止事件的继续传播。如果在同一对象上定义了其他处理程序，剩下的处理程序将依旧被调用，但调用 `stopPropagation() `方法可以在事件传播期间的任何时间调用，它能工作在捕获阶段、事件目标本身中和冒泡阶段。

IE9 之前的IE不支持 `stopPropagation() `方法。相反，IE事件对象有一个 `cancleBubble `属性，设置这个属性为` true` 能阻止事件进一步传播。（ IE8 及之前版本不支持事件传播的捕获阶段，所以冒泡是唯一待取消的事件传播。）

当前的 `DOM `事件规范草案在` Event `对象上定义了另一个方法，命名为`stopImmediatePropagation()`。类似 `stopPropagation()`,这个方法组织了任何其他对象的事件传播，但也阻止了在相同对象上注册的任何其他事件处理程序的调用。

# 案例

## 事件冒泡

```html
<div id="demo_s1" style="height: 100px;padding:20px; background-color: gray;">s1.outer
    <div id="demo_s2" style="height: 60px;padding:20px; background-color: white;">s2.inner</div>
</div>
<script>
    var s1 = document.getElementById('demo_s1');
    var s2 = document.getElementById('demo_s2');
    s1.addEventListener("click",function(e){
        alert("s1 冒泡事件");
    },false);
    s2.addEventListener("click",function(e){
        alert("s2 冒泡事件");
    },false);
</script>
```

你可以在下面尝试一下：

<div id="demo_s1" style="height: 120px; width: 100px; padding:20px; background-color: #cccccc;">s1.outer
    <div id="demo_s2" style="height: 60px; background-color: #eeeeee;">s2.inner</div>
</div>
<script>
    var s1 = document.getElementById('demo_s1');
    var s2 = document.getElementById('demo_s2');
    s1.addEventListener("click",function(e){
        alert("s1 冒泡事件");
    },false);
    s2.addEventListener("click",function(e){
        alert("s2 冒泡事件");
    },false);
</script>

## 事件捕获

```html
<div id="demo_s3" style="height: 100px;padding:20px; background-color: gray;">s1.outer
    <div id="demo_s4" style="height: 60px;padding:20px; background-color: white;">s2.inner</div>
</div>
<script>
    var s3 = document.getElementById('demo_s3');
    var s4 = document.getElementById('demo_s4');
    s3.addEventListener("click",function(e){
        alert("s3 捕获事件");
    },true);
    s4.addEventListener("click",function(e){
        alert("s4 捕获事件");
    },true);
</script>
```

你同样可以在下面尝试一下：

<div id="demo_s3" style="height: 120px; width: 100px; padding:20px; background-color: #cccccc;">s3.outer
    <div id="demo_s4" style="height: 60px; background-color: #eeeeee;">s4.inner</div>
</div>
<script>
    var s3 = document.getElementById('demo_s3');
    var s4 = document.getElementById('demo_s4');
    s3.addEventListener("click",function(e){
        alert("s3 捕获事件");
    },true);
    s4.addEventListener("click",function(e){
        alert("s4 捕获事件");
    },true);
</script>

# 事件冒泡与事件捕获应用:事件代理

在实际的开发当中，利用事件流的特性，我们可以使用一种叫做事件代理的方法。

```html
<ul id="color-list">
    <li>red</li>
    <li>yellow</li>
    <li>blue</li>
    <li>green</li>
    <li>black</li>
    <li>white</li>
</ul>
```

如果点击页面中的`li`元素，然后输出`li`当中的颜色，我们通常会这样写:

```javascript
(function () {
    var color_list = document.getElementById('color-list');
    var colors = color_list.getElementsByTagName('li');
    for (var i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', showColor, false);
    };
    function showColor(e) {
        var x = e.target;
        console.log("The color is " + x.innerHTML);
    };
})();
```

利用事件流的特性，我们只绑定一个事件处理函数也可以完成：

```javascript
(function () {
    var color_list = document.getElementById('color-list');
    color_list.addEventListener('click', showColor, false);
    function showColor(e) {
        var x = e.target;
        if (x.nodeName.toLowerCase() === 'li') {
            console.log('The color is ' + x.innerHTML);
        }
    }
})();
```

使用事件代理的好处不仅在于将多个事件处理函数减为一个，而且对于不同的元素可以有不同的处理方法。假如上述列表元素当中添加了其他的元素（如：`a`、`span`等），我们不必再一次循环给每一个元素绑定事件，直接修改事件代理的事件处理函数即可。
