---
title: JavaScript中的一些小技巧
tags:
  - 开发
categories:
  - Development
  - JavaScript
toc: true
abbrlink: e051982a
date: 2020-02-26T09:43:07.000Z
cover: /assets/images/20200226233727.webp
thumbnail: /assets/thumbnail/20200226233727.webp
---

# 字符串相关

## 格式化数字

```javascript
const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const number = ThousandNum(20190214)
// number => "20,190,214"
```

<!-- more -->

## 随机字符串

```javascript
const RandomStr = len =>
  Math.random()
    .toString(36)
    .substr(3, len)
const id = RandomStr(10)
// id => "jg7zpgiqva"
```

## 生成星级评分

```javascript
const StartScore = rate => '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
const start = StartScore(3)
// start => "★★★☆☆"
```

## 操作 URL 查询参数

```javascript
const params = new URLSearchParams(location.search.replace(/\?/gi, '')) // location.search = "?name=young&sex=male"
params.has('young') // true
params.get('sex') // "male"
```

# 数值相关

## 数字取整

```javascript
const num1 = ~~1.69
const num2 = 1.69 | 0
const num3 = 1.69 >> 0
// num1 num2 num3 => 1 1 1
```

## 补零

```javascript
const FillZero = (num, len) => num.toString().padStart(len, '0')
const num = FillZero(169, 5)
// num => "00169"
```

> 相应的 `String.prototype.padEnd()` 是在字符串后面添加.参数与 `padStart` 一致.

## 转数值

```javascript
const num1 = +null
const num2 = +''
const num3 = +false
const num4 = +'169'
// num1 num2 num3 num4 => 0 0 0 169
```

## 精确到小数点后几位

```javascript
const RoundNum = (num, decimal) =>
  Math.round(num * 10 ** decimal) / 10 ** decimal
const num = RoundNum(1.69, 1)
// num => 1.7 (精确到小数点后1位, 要求更高的精度位数的话,会忽略)
```

## 判断奇偶的另一种方式

```javascript
const OddEven = num => (!!(num & 1) ? 'odd' : 'even')
const num = OddEven(2)
// num => "even"
```

> 实际上进行了一个什么操作呢?

```javascript
// 将 num 二进制表示,比如`num=7` :
--
->
0111
// 将 1 用二进制表示, 此处 1 和 num 前面都可以按需添加 0 ,保证二者位数相同
--
->
0001
// 二者按位相与, 得到
--
->
0001
```

> 通过上面的操作,其实获取了`num`的最后一位是否为`1`(二进制情况下,奇数的尾数为 1)

# Boolean 相关

## 最最短路径计算

```javascript
const a = d && 1 // 满足条件赋值：取假运算，从左到右依次判断，遇到假值返回假值，后面不再执行，否则返回最后一个真值
const b = d || 1 // 默认赋值：取真运算，从左到右依次判断，遇到真值返回真值，后面不再执行，否则返回最后一个假值
const c = !d // 取假赋值：单个表达式转换为true则返回false，否则返回true
```

## 判断数据类型

```javascript
function DataType(tgt, type) {
  const dataType = Object.prototype.toString
    .call(tgt)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase()
  return type ? dataType === type : dataType
}

DataType('young') // "string"
DataType(20190214) // "number"
DataType(true) // "boolean"
DataType([], 'array') // true
DataType({}, 'array') // false
```

## 函数退出代替分支条件退出

```javascript
if (flag) {
  Func()
  return false
}
// 换成
if (flag) {
  return Func()
}
```

## Switch/Case 逆向使用

> 其实也谈不上逆向,只是与传统的思维方式不太一样.

> [参考示例](/acc/algorithm/Codes/%E6%95%B0%E7%BB%84%E4%B8%AD%E7%9A%84K-diff%E6%95%B0%E5%AF%B9.html#%E6%88%91%E7%9A%84%E8%A7%A3%E7%AD%94)

```javascript
const age = 26
switch (true) {
  case isNaN(age):
    console.log('not a number')
    break
  case age < 18:
    console.log('under age')
    break
  case age >= 18:
    console.log('adult')
    break
  default:
    console.log('please set your age')
    break
}
```

# 数组相关

## 克隆数组

```javascript
const _arr = [0, 1, 2]
const arr = [..._arr]
// arr => [0, 1, 2]
```

## 合并数组

```javascript
const arr1 = [0, 1, 2]
const arr2 = [3, 4, 5]
const arr = [...arr1, ...arr2]
// arr => [0, 1, 2, 3, 4, 5];
```

## 数组去重

```javascript
const arr = [...new Set([0, 1, 1, null, null])]
// arr => [0, 1, null]
```

## 快速打乱一个数组

```javascript
const arr = arr => arr.slice().sort(() => Math.random() - 0.5)
// arr => [3, 4, 0, 5, 1, 2]
```

## 清空数组

```javascript
const arr = [0, 1, 2]
arr.length = 0
// arr => []
```

## 交换赋值

```javascript
let a = 0
let b = 1
;[a, b] = [b, a]
// a b => 1 0
```

## 交换数组中的两个元素

```javascript
arr[i] = [arr[j], (arr[j] = arr[i])][0]
```

> [参考示例](http://localhost:8080/acc/algorithm/Codes/%E6%9C%80%E5%A4%A7%E4%BA%A4%E6%8D%A2.html#%E8%A7%A3%E7%AD%94%E4%BB%A3%E7%A0%81)

## 过滤空值及 0

```javascript
const arr = [undefined, null, '', 0, false, NaN, 1, 2].filter(Boolean)
```

> `filter`中本应该填入一个回调函数, 数组中的每一个值按照回调函数的真假来决定留取,此处将`Boolean`对象构造函数作为回调函数,传入空值和
> 0,及返回假,否则返回真,以达到过滤的效果

## 数组首部插入元素

```javascript
let arr = [1, 2] // 以下方法任选一种
arr.unshift(0)
arr = [0].concat(arr)
arr = [0, ...arr]
// arr => [0, 1, 2]
```

> 关于`Array.prototype.unshift()`方法,
>
可以参照:[参考示例](https://www.borgor.cn/acc/algorithm/Codes/%E8%AE%BE%E8%AE%A1%E5%BE%AA%E7%8E%AF%E5%8F%8C%E7%AB%AF%E9%98%9F%E5%88%97.html#%E6%8E%92%E5%90%8D%E7%AC%AC%E4%B8%80%E7%9A%84%E8%A7%A3%E7%AD%94)

## 统计元素个数

```javascript
const arr = [0, 1, 1, 2, 2, 2]
const count = arr.reduce((t, v) => {
  t[v] = t[v] ? ++t[v] : 1
  return t
}, {})
// count => { 0: 1, 1: 2, 2: 3 }
```

> 关于`Array.prototype.reduce()`
> 的相关内容,请查阅:[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

> 基本语法如下:

```javascript
arr.reduce(callback(accumulator, currentValue[, index[, array
]])
[, initialValue]
)
```

# DOM 相关

## 去除字符串中的 html 标记

```javascript
function FilterXss(content) {
  let elem = document.createElement('div')
  elem.innerText = content
  const result = elem.innerHTML
  elem = null
  return result
}
```

# 参考资料:

前端迷: https://mp.weixin.qq.com/s/uXiXB_AP5HIBnRNFQkH6Rw
