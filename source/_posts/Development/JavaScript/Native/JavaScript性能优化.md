---
title: JavaScript性能优化
tags:
  - JavaScript
  - Development
categories:
  - Development
  - JavaScript
toc: true
cover: '/assets/images/imgs20190625083157.webp'
abbrlink: db275d8a
date: 2018-06-27 13:58:35
---

## 循环

1. **For循环**

```javascript
for(var i = 0; i < 10; i ++){
    // do something
}
```

2. **For/In循环**

```javascript
// TODO 不推荐，相同的迭代次数，性能是其他三种的1/7
var person={fname:"John",lname:"Doe",age:25};
for (x in person){
    txt=txt + person[x];
}
```

<!--more -->

3. **While循环**

```javascript
while(condition){
    // Do something
}
```

4. **Do/While循环**

```javascript
do{
    // Do something
}while(condition)
```

> *1 & 3*为前测型循环，每次循环时，先进行条件检测。
>
> *2 & 4*为后测型循环，先执行一次内容，后进行条件监测。
>
> 这四种循环中，不建议使用***For/In***循环，其在相同的条件与规模下，执行时间是其他三种的七倍，效率较低。

### 减少迭代的工作量

将再循环中执行的相同语句，提到循环外执行，如：

```javascript
var arr = [1,2,3,4,5,6,7,8,9,10];
for(var i = 0; i < arr.length; i ++){
    console.log(arr[i]);
}
```

可以优化为：

```javascript
var arr = [1,2,3,4,5,6,7,8,9,10];
var len = arr.length;
for(var i = 0; i < len; i ++){
    console.log(arr[i]);
}
```

`arr.length`从每次循环都要执行一次，共执行10次，优化为总共执行一次。

## 条件语句

```javascript
if(condition){
    // Do Something
}else{
    // Do something else
}
```

```javascript
switch(foo){
    case true:
        break;
    case false:
        break;
    default:
        break;
}
```

* ***switch*** 表达式比***if/else***表达式的可读性更好
* 大多数情况下***switch***比***if/else***运行速度更快
* 条件增加时，***if/else***的性能负担增加

> 综上，更倾向于在条件数量较少时使用 ***if/else***在条件数量较大时使用***switch***, 通常来说，***if/else***适用于判断两个离散值或
> 几个不同的值域，当判断的离散值过多时则 推荐使用***switch***语句。

### 优化if-else语句

目标：最小化到达正确分支前所需要判断的条件数量

```javascript
if(a < 10){
    // do something
}else if (a > 10 && a < 20){
    // do something
}else{
    // do something
}
```

如果是`a`的值**整数**的**离散值**的话，使用下面的程序:

```javascript
// bad example
if(a == 0){return 0}
else if(a == 1){return 1}
else if(a == 2){return 2}
else if(a == 3){return 3}
else if(a == 4){return 4}
else if(a == 5){return 5}
else if(a == 6){return 6}
else if(a == 7){return 7}
else if(a == 8){return 8}
else if(a == 9){return 9}
else{ ... }
```

更进一步的优化可以使用**二分法**判断：

```javascript
// good example， binary search
if(a < 6){
    if(a < 3){
        if(a == 0){
            return 0;
        }else if(a == 1){
            return 1;
        }else{
            return 2;
        }
    }else{
        if(a == 3){
            return 3;
        }else if(a == 4){
            return 4;
        }else{
            return 5;
        }
    }
}else{
    // TODO other for 6.7.8.9
}
```

> 使用二分法把离散的值分成不同值域的一系列区间，逐步缩小范围。 当值的范围均匀分布在0-10之
> 间时，代码运行的效率增加。如果分布不均匀，可以适当调整判断的位置，从而最小化判断次数。

## 递归算法

使用递归函数的潜在问题是终止条件不明确或者缺少终止条件，从而导致程序陷入死循环，递归函数还可能遇到浏览器的调用栈大小限时。

```javascript
// 斐波那契额数列函数
function fibonacci(n){
    if (n == 1 || n == 2){
        return 1;
    }else{
        return fibonacci(n-1) + fibonacci(n-2);
    }
}
```

递归的调用：

```javascript
function foo(){
    foo();
}
```

```javascript
// 隐伏式递归
function foo(){
    bar()
}
function bar(){
    foo()
}
```

在第二种递归模式中，两个函数相互调用形成死循环，在大型程序中很难排查，如果可以使用迭代的方式解决，尽量不要使用递归算法。

# 在编程中优化

## 避免双重求值

执行一段义字符串表示的程序，有几种：`eval()`,` Function()`,` SetTimeout()`,` SetIntval()`

在***JavaScript***代码中执行另一段***JavaScript***代码时，都会导致双重求值的性能消耗。此时代码首先会已正
常的方式求值，然后再执行过程中对包含于字符串中的代码发起另一个求值运算。 消耗的时间存在巨大差异是因为每次调用
***eval()***是都要创建一个新的解释器/编译器实例。非特殊情况没必 要且应尽量避免使用***eval()***和***Function()***，至于***
setTimeout()***和***setInterval()***建议穿入函数最为参数值。

## 使用Object/Array直接量

创建一个对象：

```javascript
var MyObj = new Object();
MyOjb.name = "Bob";
MyObj.age = 40

// Prefer doing:
var MyObj = {
    name: "Bob",
    age:40
}
```

> 对象属性和数组项的数量越多，使用直接量的好处就越明显。

## 使用定时器让出时间片段

在JavaScript操作UI/DOM时，若无法在短时间内完成，最理想的方式是让出UI控制权。是UI可以更新，让出控制权意味着停止执行代码，使UI线程有机会更新。

```javascript
var button= document.getElementByID("my-button")
button.onclick = function(){
    oneMethod();
    setTimeout(function(){
        // DOM Opration
        document.getElementById("notice").style.color = "red"
    }, 250);
       // 上面的定时器会在250ms后加入队列。所以下面的anotherMethod()会立即执行。
    anotherMethod();
}
```

> * 如果anotherMethod在250ms内完成，则DOM Opration会在250ms时执行
> * 如果anotherMethod在T(>250ms)时完成，则DOMOpration会在T+250时执行

> 浏览器会有一个脚本执行时间限制，但是如果设置定时器，SetTimeout会刷新脚本时间显示，是一个低成本的跨浏览器兼容解决方案。
