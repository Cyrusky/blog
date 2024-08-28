---
title: Hexo-Icarus中使用justifiedGallery的坑
tags:
  - 写作
categories:
  - Reading&Writing
  - Hexo
cover: /assets/images/imgs20190703143844.webp
toc: true
abbrlink: 579ed25a
date: 2019-07-03T14:37:02.000Z
thumbnail: /assets/thumbnail/imgs20190703143844.webp
---

# 起因

在使用`Icarus`的过程中，需要制作一个阅读列表，我的想法是，在列出图书列表之后，使用`Icarus`
自带的相册功能将书籍封面列出来，所以，我按照官方的示例，写了如下代码：

<!-- more -->

```html
<div class="justified-gallery">
![数学之美 （第二版）](/assets/images/imgs20190625155731.webp)
![Effective DevOps](/assets/images/imgs20190625111409.webp)
![持续交付：发布可靠软件的系统方法](/assets/images/imgs20190625111423.webp)
![图解TCP IP(第5版)](/assets/images/imgs20190625111452.webp)
</div>
```

[链接](https://blog.zhangruipeng.me/hexo-theme-icarus/Plugins/General/gallery-plugin/)

发现，hexo渲染出来的内容如下：

> `![数学之美 （第二版）](/assets/images/imgs20190625111409.webp) ![持续交付：发布可靠软件的系统方法](/assets/images/imgs20190625111452.webp)`

# 问题

直接将`markdown`原样输出了

# 解决

```html
// markdown的html内容中，上下添加空行
<div class="justified-gallery">

![数学之美 （第二版）](/assets/images/imgs20190625155731.webp)
![Effective DevOps](/assets/images/imgs20190625111409.webp)
![持续交付：发布可靠软件的系统方法](/assets/images/imgs20190625111423.webp)
![图解TCP IP(第5版)](/assets/images/imgs20190625111452.webp)

</div>
```

但是出现了一个新问题

`markdown`渲染时会自动在添加一个**p**标签：

```html
<div class="justified-gallery">
	<p>  <!-- <=== 就这里  -->
		<img src="/assets/images/imgs20190625111151.webp="人类简史：从动物到上帝">
		<br>
		<img src="/assets/images/imgs20190625111220.webp="三体全集">
		<br>
		<img src="/assets/images/imgs20190625111101.webp="哲学家们都干了些什么?">
		<br>
		<img src="/assets/images/imgs20190625111325.webp="星空的琴弦">
		<br>
		<img src="/assets/images/imgs20190625111310.webp="《时间的形状:相对论史话》(彩图升级版)">
	</p> <!-- <=== 和这里  -->
</div>
```

所以，修改`gallery.js`文件：

```diff
// themes/icarus/source/js/gallery.js
$(function(){
    if (typeof ($.fn.justifiedGallery) === 'function') {
+      let justifiedGallery = $('.justified-gallery')
+      if(justifiedGallery.length > 0) {
+        for (let i = 0; i < justifiedGallery.length; i ++){
+          let html = justifiedGallery[i].childNodes[0].innerHTML
+          justifiedGallery[i].innerHTML = html
+        }
+      }
+      justifiedGallery.justifiedGallery({
        cssAnimation: true,
        imagesAnimationDuration: 1000
      });
    }
    if (typeof ($.fn.lightGallery) === 'function') {
        $('.article').lightGallery({ selector: '.gallery-item' });
    }
})
```

手动删除p标签

# 新问题

在`hexo-neat`压缩代码时，修改过的这里会报错，导致`gallery.js`最后输出的是个空文件，原因没有深究。

所以如果开启了代码压缩的情况下，需要在全局配置文件`_config.yml`中设置不要压缩这个文件。

```yaml
# 压缩 js
neat_js:
  enable: true
  mangle: true
  output:
  compress:
  exclude:
    - '**/gallery.js'
    - '**/clipboard.js'
    - '**/back-to-top.js'
```

# 完美解决
