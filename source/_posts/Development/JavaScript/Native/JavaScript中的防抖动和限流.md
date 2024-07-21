---
title: JavaScript中的防抖动和限流
tags:
  - 开发
categories:
  - Development
  - JavaScript
toc: true
abbrlink: 7c39d03f
date: 2020-02-21T01:14:50.000Z
cover: /assets/images/20200222180809.webp
thumbnail: /assets/thumbnail/20200222180809.webp
---

# 防抖动(debounce)和限流函数(throttle)

debounce 与 throttle 是开发中常用的高阶函数，作用都是为了防止函数被高频调用，换句话说就是，用来控制某个函数在一定时间内执行多少次。

<!-- more -->

# Lodash 中的 debounce 函数

> https://github.com/lodash/lodash/blob/master/debounce.js

> 具体参数如下:

```typescript
interface debounceOptions {
  leading: boolean // 指定在延迟开始前调用。
  maxWait: number // 设置 func 允许被延迟的最大值。
  trailing: boolean // 指定在延迟结束后调用。
}

/**
 * @param {Function} [func] 需要包装的函数.
 * @param {number} [wait=0] 等待的毫秒时间. requestAnimationFrame
 * @param {Object} [options={}] The options object.
 * @returns {Function} 创建一个已经被防抖的函数
 **/
function debounce(
  func: Function,
  wait: number = 0,
  options: debounceOptions
): Function {
  return () => {
  }
}
```

官方说明: 创建一个防抖动的函数,其主要目是, 延迟调用某个函数

> 创建一个 `debounced`（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 `func` 方法。 `debounced`
> （防抖动）函数提供一个 `cancel` 方法取消延迟的函数调用以及 `flush` 方法立即调用。 可以提供一个 `options`（选项）
> 对象决定如何调用 `func` 方法，`options.leading` 与|或 `options.trailing` 决定延迟前后如何触发（是 先调用后等待 还是
> 先等待后调用）。 `func` 调用时会传入最后一次提供给 `debounced`（防抖动）函数 的参数。 后续调用的 `debounced`
> （防抖动）函数返回是最后一次 `func` 调用的结果。

> 注意: 如果 `leading` 和 `trailing` 选项为 `true`, 则 `func` 允许 `trailing` 方式调用的条件为: 在 `wait` 期间多次调用防抖方法。

> 如果 `wait` 为 `0` 并且 `leading` 为 `false`, `func` 调用将被推迟到下一个点，类似 `setTimeout` 为 `0` 的超时。

## 示例

```javascript
// 避免窗口在变动时出现昂贵的计算开销。
window.on('resize', _.debounce(calculateLayout, 150))

// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on(
  'click',
  _.debounce(sendMail, 300, {
    leading: true,
    trailing: false
  })
)

// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, {maxWait: 1000})
var source = new EventSource('/stream')
jQuery(source).on('message', debounced)

// 取消一个 trailing 的防抖动调用
window.on('popstate', debounced.cancel)
```

## 动态演示

> 搬运及汉化自: https://css-tricks.com/debouncing-throttling-explained-examples/

![防挂图,不怕示例挂掉](/assets/images/20200222170839.webp)

<p class="codepen" data-height="465" data-theme-id="dark" data-default-tab="result" data-user="BoJin" data-slug-hash="YzXpYVY" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="YzXpYVY">
  <span>See the Pen <a href="https://codepen.io/BoJin/pen/YzXpYVY">
  YzXpYVY</a> by Bo.Jin (<a href="https://codepen.io/BoJin">@BoJin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 具体应用

<p class="codepen" data-height="370" data-theme-id="dark" data-default-tab="result" data-user="BoJin" data-slug-hash="rNVWpKM" style="height: 244px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Debouncing keystrokes Example">
  <span>See the Pen <a href="https://codepen.io/BoJin/pen/rNVWpKM">
  Debouncing keystrokes Example</a> by Bo.Jin (<a href="https://codepen.io/BoJin">@BoJin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

# Lodash 中的 Throttle 函数

> https://github.com/lodash/lodash/blob/master/throttle.js

```typescript
interface throttleOptions {
  leading: boolean // 指定调用在节流开始前。
  trailing: boolean // 指定在延迟结束后调用。
}

/**
 * @param {Function} [func] 需要包装的节流函数.
 * @param {number} [wait=0] 需要节流的毫秒。
 * @param {Object} [options={}] The options object.
 * @returns {Function} 创建一个已经被防抖的函数
 **/
function throttle(
  func: Function,
  wait: number,
  options: throttleOptions
): Function {
}
```

> 创建一个节流函数，在 `wait` 秒内最多执行 `func` 一次的函数。 该函数提供一个 `cancel` 方法取消延迟的函数调用以及 `flush`
> 方法立即调用。 可以提供一个 `options` 对象决定如何调用 `func` 方法， `options.leading` 与|或 `options.trailing`
> 决定 `wait` 前后如何触发。 `func` 会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次 `func` 调用的结果。

> 注意: 如果 `leading` 和 `trailing` 都设定为 `true` 则 `func` 允许 `trailing` 方式调用的条件为: 在 `wait` 期间多次调用。

> 如果 `wait` 为 `0` 并且 `leading` 为 `false`, `func` 调用将被推迟到下一个点，类似 `setTimeout` 为 `0` 的超时。

## 示例

```javascript
// 避免在滚动时过分的更新定位
window.on('scroll', _.throttle(updatePosition, 100))

// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, {trailing: false})
window.on('click', throttled)

// 取消一个 trailing 的节流调用。
window.on('popstate', throttled.cancel)
```

# requestAnimationFrame (rAF)

无论是`Debounce`还是`throttle`,都提供了一种机制,就是`requestAnimationFrame (rAF)`
,他会产生一种类似于: `_.throttle(fn, 16)`的效果,因为: $\frac{1000ms}{60Hz} = 16ms$,这是在 60Hz 的刷新率下的,如果改成了
47Hz,或者更高的刷新率,这个事件会相应的改变.

这样做有一个好处,就是处理关于动画的防抖动时,比如`scroll, resize`等,不会超过刷新率,因为,这类防抖动,没有意义.

### 滚动示例

<p class="codepen" data-height="474" data-theme-id="dark" data-default-tab="result" data-user="BoJin" data-slug-hash="zYGoRxd" style="height: 474px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Scroll comparison requestAnimationFrame vs throttle">
  <span>See the Pen <a href="https://codepen.io/BoJin/pen/zYGoRxd">
  Scroll comparison requestAnimationFrame vs throttle</a> by Bo.Jin (<a href="https://codepen.io/BoJin">@BoJin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<br/>

> 1. 在上面的示例中, 可以看出,如果你的屏幕刷新率是 `60Hz`, 你将无法感觉出使用 `rAF` 和 `throttle-16ms` 之间的区别.
> 2. 但是 `throttle-50ms` 你却可以看出明显的卡顿.
> 3. 如果你的屏幕分辨率是 `20Hz`($\frac{1000ms}{50ms} = 20Hz$), 你将会感觉不到三者之间的区别,因为`throttle-16ms`
     对于你来说没有意义,硬件性能达不到,而`rAF`其实使用的就是`50ms`.

# 参考资料

> 1. https://css-tricks.com/debouncing-throttling-explained-examples/
>
> 2. https://www.lodashjs.com/docs/lodash.debounce
>
> 3. https://www.lodashjs.com/docs/lodash.throttle
