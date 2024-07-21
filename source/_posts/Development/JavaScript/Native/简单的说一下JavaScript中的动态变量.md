---
title: 简单的说一下JavaScript中的动态变量
tags:
  - JavaScript
  - 动态变量
categories:
  - Development
  - JavaScript
toc: true
abbrlink: 1c00caef
date: 2020-03-31 22:45:56
thumbnail: https://imgs.borgor.cn/imgs/20200331224805.png
---

# 我们从一个很简单的示例开始说起

```javascript
[] + {}
// '[object Object]'
{} + []
// 0
{} + {}
// NaN
[] + []
// ''
```

由于时间关系，我在这片笔记中就不展开说了。简单的说一下上面几个语句。

<!-- more -->

# JavaScript 中的比较

## 基本类型的比较

| A↓\B→     | Undefined | Null    | Number                | String                        | Boolean                         | Object                          |
| :-------- | --------- | ------- | --------------------- | ----------------------------- | ------------------------------- | ------------------------------- |
| Undefined | `true`    | `true`  | `false`               | `false`                       | `false`                         | `IsFalsy(B)`                    |
| Null      | `true`    | `true`  | `false`               | `false`                       | `false`                         | `IsFalsy(B)`                    |
| Number    | `false`   | `false` | `A === B`             | `A === ToNumber(B)`           | `A=== ToNumber(B)`              | `A== ToPrimitive(B)`            |
| String    | `false`   | `false` | `ToNumber(A) === B`   | `A === B`                     | `ToNumber(A) === ToNumber(B)`   | `ToPrimitive(B) == A`           |
| Boolean   | `false`   | `false` | `ToNumber(A) === B`   | `ToNumber(A) === ToNumber(B)` | `A === B`                       | `ToNumber(A) == ToPrimitive(B)` |
| Object    | `false`   | `false` | `ToPrimitive(A) == B` | `ToPrimitive(A) == B`         | `ToPrimitive(A) == ToNumber(B)` | `A === B`                       |

> 值得注意的是，由于`Symbol`是一个唯一值，所以一般情况下和其他的值比较，都是`false`，除了一种情况：
>
> ```javascript
> let x = Symbol('Nothing or some Strings.')
> let y = new Object(x)
> let z = Object(x)
>
> x == y
> // true
> x == z
> // true
> ```

> 除了上述的情况以外，下面的都是`false`
>
> ```javascript
> x === y
> // false
> x === z
> // false
> y == z
> // false
> y === z
> // false
> ```

## 判等

|          x          |          y          |  `==`   |  `===`  | `Object.is` |
| :-----------------: | :-----------------: | :-----: | :-----: | :---------: |
|     `undefined`     |     `undefined`     | `true`  | `true`  |   `true`    |
|       `null`        |       `null`        | `true`  | `true`  |   `true`    |
|       `true`        |       `true`        | `true`  | `true`  |   `true`    |
|       `false`       |       `false`       | `true`  | `true`  |   `true`    |
|       `"foo"`       |       `"foo"`       | `true`  | `true`  |   `true`    |
|         `0`         |         `0`         | `true`  | `true`  |   `true`    |
|        `+0`         |        `-0`         | `true`  | `true`  |   `false`   |
|         `0`         |       `false`       | `true`  | `false` |   `false`   |
|        `""`         |       `false`       | `true`  | `false` |   `false`   |
|        `""`         |         `0`         | `true`  | `false` |   `false`   |
|        `"0"`        |         `0`         | `true`  | `false` |   `false`   |
|       `"17"`        |        `17`         | `true`  | `false` |   `false`   |
|       `[1,2]`       |       `"1,2"`       | `true`  | `false` |   `false`   |
| `new String("foo")` |       `"foo"`       | `true`  | `false` |   `false`   |
|       `null`        |     `undefined`     | `true`  | `false` |   `false`   |
|       `null`        |       `false`       | `false` | `false` |   `false`   |
|     `undefined`     |       `false`       | `false` | `false` |   `false`   |
|  `{ foo: "bar" }`   |  `{ foo: "bar" }`   | `false` | `false` |   `false`   |
| `new String("foo")` | `new String("foo")` | `false` | `false` |   `false`   |
|         `0`         |       `null`        | `false` | `false` |   `false`   |
|         `0`         |        `NaN`        | `false` | `false` |   `false`   |
|       `"foo"`       |        `NaN`        | `false` | `false` |   `false`   |
|        `NaN`        |        `NaN`        | `false` | `false` |   `true`    |

# 再说回去

加法运算中，其实就是用到了上面的隐式类型转换。

1. `[]`，在`LHS`操作和`RHS`操作时，都会将其先拆箱（通过`[].valueOf()`，然后发现其不是一个原始值，会进行`ToPrimitive`操作，最终的到的值是：`''`，即空字符串）。
2. `{}`，在`LHS`操作时和`RHS`操作时的表现是不一样的，`LHS`操作的时候，`{}`在语义和语法上，会被当做是一个代码块。而在`RHS`的时候，会和`[]`一样，进行先`valueOf`后`ToPrimitive`的拆箱操作。

那么，我们来看一下第一小节提出的那几个问题。

1. `[]`，拆箱的话会先执行`[].valueOf()`,得到的是`[]`,并不是原始值，就执行`[].toString()`，得到的结果是`''`。
2. `{}`，拆箱会先执行`{}.valueOf()`，得到的是`{}`，并不是原始值，于是执行`toString()`,得到的结果是`[object Object]`。
3. `[]+{}`就相当于`""+"[object Object]"`，结果就是[object Object]。
4. `{}+[]`的话，js 会把开头的`{}`理解成代码块，如果是一个空白的代码块，JS 引擎会忽略它，相当于没有任何东西。所以这句话就相当于`+[]`,也就是等于`+""`,将空字符串转换为数字类型，结果就是`0`。
5. `{}+{}`的话，也是和上面一样的道理,相当于`+"[object Object]"`，将字符串转化为数字类型，结果是`NaN`。
6. `[]+[]`就相当于`""+""`，所以结果还是`""`。

# 参考

1. [JavaScript 对象转换到基本类型值算法 ToPrimitive](https://juejin.im/post/5a695ec16fb9a01ca10b195b)
