---
title: HTML拾遗
tags:
  - html5
  - ruby
  - rp
  - rt
  - section
  - header
  - footer
  - nav
categories:
  - Development
  - html5
toc: true
abbrlink: 612cf31e
date: 2020-02-23 20:28:31
thumbnail: https://imgs.borgor.cn/imgs/20200223210222.png
---

# Ruby 标签

## 定义和用法

`<ruby>` 标签定义 `ruby` 注释（中文注音或字符）。在东亚使用，显示的是东亚字符的发音。与 `<ruby>` 以及 `<rt>` 标签一同使用：
`ruby` 元素由一个或多个字符（需要一个解释/发音）和一个提供该信息的 `rt` 元素组成，还包括可选的 `rp` 元素，定义当浏览器不支持 "`ruby`" 元素时显示的内容,类似于`noscript`标签

<!-- more -->

```html
<div>
  <h1>
    给你一个
    <ruby>
      友善
      <rt>bǐ shì</rt> </ruby
    >的眼神
  </h1>
</div>
```

## 实例

> <div>
> <h1>
> 给你一个<ruby>友善<rt>bǐ shì</rt></ruby>的眼神
> </h1>
> </div>

# 强调 标签

定义和用法
以下元素都是短语元素。虽然这些标签定义的文本大多会呈现出特殊的样式，但实际上，这些标签都拥有确切的语义。

我们并不反对使用它们，但是如果您只是为了达到某种视觉效果而使用这些标签的话，我们建议您使用样式表，那么做会达到更加丰富的效果。

> `<em>` : 把文本定义为强调的内容。
> `<strong>` : 把文本定义为语气更强的强调的内容。
> `<dfn>` : 定义一个定义项目。
> `<code>` : 定义计算机代码文本。
> `<samp>` : 定义样本文本。
> `<kbd>` : 定义键盘文本。它表示文本是从键盘上键入的。它经常用在与计算机相关的文档或手册中。
> `<var>` : 定义变量。您可以将此标签与 `<pre>` 及 `<code>` 标签配合使用。
> `<cite>` : 定义引用。可使用该标签对参考文献的引用进行定义，比如书籍或杂志的标题。

# section 与 H1 标签

```html
<div>
  <section>
    <h1>这是一个H1标签 </h1>
    <section>
      <h1>这也是一个H1标签</h1>
    </secrion>
  </section>
</div>
```

## 示例

> 因为 Blog 中的样式会影响下面的示例,所以,下面的示例在 CodePen 上.

<p class="codepen" data-height="211" data-theme-id="dark" data-default-tab="result" data-user="BoJin" data-slug-hash="XWbNwmg" style="height: 211px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="XWbNwmg">
  <span>See the Pen <a href="https://codepen.io/BoJin/pen/XWbNwmg">
  XWbNwmg</a> by Bo.Jin (<a href="https://codepen.io/BoJin">@BoJin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 说明

`section`标签是 `HTML5` 中新增的一个标签,每一次在 `Section` 标签嵌套的过程中,`h1~h6`标签会在每一次自动下降一个级别.

# 其他一些语义化标签

1. `header`，如其名，通常出现在前部，表示导航或者介绍性的内容。
2. `footer`，通常出现在尾部，包含一些作者信息、相关链接、版权信息等。

> `header` 和 `footer` 一般都是放在 `article` 或者 `body` 的直接子元素，但是标准中并没有明确规定，`footer` 也可以和 `aside`，`nav`，`section` 相关联（`header` 不存在关联问题）。

`aside` 表示跟文章主体不那么相关的部分，它可能包含导航、广告等工具性质的内容。
`aside` 很容易被理解为侧边栏，实际上二者是包含关系，侧边栏是 `aside`，`aside` 不一定是侧边栏。

`aside` 和 `header` 中都可能出现导航（`nav` 标签），二者的区别是，`header` 中的导航多数是到文章自己的目录，而 `aside` 中的导航多数是到关联页面或者是整站地图。

最后 `footer` 中包含 `address`，这是个非常容易被误用的标签。`address` 并非像 `date` 一样，表示一个给机器阅读的地址，而是表示“文章（作者）的联系方式”，`address` 明确地只关联到 `article` 和 `body`。
