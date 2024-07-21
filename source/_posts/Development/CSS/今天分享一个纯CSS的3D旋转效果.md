---
title: 今天分享一个纯CSS的3D旋转效果
tags:
  - null
categories:
  - null
toc: true
abbrlink: da4d9ec6
date: 2020-04-05 20:58:47
cover: /assets/images/20200405210411.webp
---

为了不影响首页效果，就不在首页上放了，点进来看呗。

<!-- more -->

# 具体效果如下

<p class="codepen" data-height="600" data-theme-id="dark" data-user="BoJin" data-slug-hash="LYVKzbb" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="LYVKzbb">
  <span>See the Pen <a href="https://codepen.io/BoJin/pen/LYVKzbb">
  LYVKzbb</a> by Bo.Jin (<a href="https://codepen.io/BoJin">@BoJin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

# 涉及到的技术

## transform

### 定义和用法

`transform` 属性向元素应用 `2D` 或 `3D` 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。

```css
transform: none|transform-functions;
```

| 值                                           | 描述                         |
|---------------------------------------------|----------------------------|
| `none`                                      | 定义不进行转换。                   |
| `matrix(n,n,n,n,n,n)`                       | 定义 2D 转换，使用六个值的矩阵。         |
| `matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)` | 定义 3D 转换，使用 16 个值的 4x4 矩阵。 |
| `translate(x,y)`                            | 定义 2D 转换。                  |
| `translate3d(x,y,z)`                        | 定义 3D 转换。                  |
| `translateX(x)`                             | 定义转换，只是用 X 轴的值。            |
| `translateY(y)`                             | 定义转换，只是用 Y 轴的值。            |
| `translateZ(z)`                             | 定义 3D 转换，只是用 Z 轴的值。        |
| `scale(x,y)`                                | 定义 2D 缩放转换。                |
| `scale3d(x,y,z)`                            | 定义 3D 缩放转换。                |
| `scaleX(x)`                                 | 通过设置 X 轴的值来定义缩放转换。         |
| `scaleY(y)`                                 | 通过设置 Y 轴的值来定义缩放转换。         |
| `scaleZ(z)`                                 | 通过设置 Z 轴的值来定义 3D 缩放转换。     |
| `rotate(angle)`                             | 定义 2D 旋转，在参数中规定角度。         |
| `rotate3d(x,y,z,angle)`                     | 定义 3D 旋转。                  |
| `rotateX(angle)`                            | 定义沿着 X 轴的 3D 旋转。           |
| `rotateY(angle)`                            | 定义沿着 Y 轴的 3D 旋转。           |
| `rotateZ(angle)`                            | 定义沿着 Z 轴的 3D 旋转。           |
| `skew(x-angle,y-angle)`                     | 定义沿着 X 和 Y 轴的 2D 倾斜转换。     |
| `skewX(angle)`                              | 定义沿着 X 轴的 2D 倾斜转换。         |
| `skewY(angle)`                              | 定义沿着 Y 轴的 2D 倾斜转换。         |
| `perspective(n)`                            | 为 3D 转换元素定义透视视图。           |

## transform-style

### 定义和用法

`transform-style` 属性规定如何在 3D 空间中呈现被嵌套的元素。

## 语法

```css
transform-style: flat|preserve-3d;
```

| 值           | 描述              |
|:------------|:----------------|
| flat        | 子元素将不保留其 3D 位置。 |
| preserve-3d | 子元素将保留其 3D 位置。  |

## animation

```css
animation: name duration timing-function delay iteration-count direction;
```

### timeing-function

| 值                             | 描述                                       |
|:------------------------------|:-----------------------------------------|
| linear                        | 动画从头到尾的速度是相同的。                           |
| ease                          | 默认。动画以低速开始，然后加快，在结束前变慢。                  |
| ease-in                       | 动画以低速开始。                                 |
| ease-out                      | 动画以低速结束。                                 |
| ease-in-out                   | 动画以低速开始和结束。                              |
| cubic-bezier(_n_,_n_,_n_,_n_) | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。 |

## @keyframe

通过 `@keyframes` 规则，您能够创建动画。创建动画的原理是，将一套 CSS 样式逐渐变化为另一套样式。在动画过程中，您能够多次改变这套
CSS 样式。

以百分比来规定改变发生的时间，或者通过关键词 "from" 和 "to"，等价于 0% 和 100%。0% 是动画的开始时间，100% 动画的结束时间。

为了获得最佳的浏览器支持，您应该始终定义 0% 和 100% 选择器。

**注释：**请使用动画属性来控制动画的外观，同时将动画与选择器绑定。

### @keyframe语法

```css
@keyframes animationname {
  keyframes-selector {
    css-styles;
  }
}
```

| 值                    | 描述                                                                           |
|:---------------------|:-----------------------------------------------------------------------------|
| *animationname*      | 必需。定义动画的名称。                                                                  |
| *keyframes-selector* | 必需。<br />动画时长的百分比。<br />合法的值：<br /> 0 ~ 100%<br />from（与 0% 相同）to（与 100% 相同） |
| *css-styles*         | 必需。一个或多个合法的 CSS 样式属性。                                                        |
