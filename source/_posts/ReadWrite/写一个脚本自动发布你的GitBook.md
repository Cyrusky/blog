---
title: 写一个脚本自动发布你的GitBook
tags:
  - Hexo
  - 发布
  - git
categories:
  - Reading&Writing
  - GitBook
toc: true
abbrlink: dbe45b51
date: 2019-12-02 12:58:16
cover: /assets/images/20190725163724.webp
---

`GitBook`在`Build`以后,会产生一个`_book`的目录,里面存放着整个`html`
目录.只要将这个目录发布到你的Page中,就可以实现`GitPage`了.

# 前提

* 先创建一个空的`GitRepo`.
* 在`Repo`中创建两个`Branch`, 一个为书写`Branch`,在本例中为`write`,另一个为发布`branch`,在本例中为`master`.
* 将下面的脚本加入书写`branch`中.

<!-- more -->

# 脚本

```bash
# 先保存当前的Repo状态
git add .
git commit -a -m "Update master"
git push origin write

# 构建GitBook
gitbook install && gitbook build

# 切换到发布版本
git checkout master

# 拉取GitBook发布版本的最新版
git pull origin master --rebase

# 将_book内容移到根目录
cp -R _book/* .

# 删除 'node_modules' 和 '_book' 目录
git clean -fx node_modules
git clean -fx _book

# 将所有的文件添加到Repo中
git add .

# 提交
git commit -a -m "Update docs"

# 发布到Master
git push origin master

# 切换回书写版本
git checkout write
```

> 因为我的GitPage是发布在Coding上的,Coding不支持将除`master`分支之外的分支发布到`page`上,所以上面的脚本中,
> 书写分支为`write`,发布分支为`master`.

# 注:

有两个`.gitignore`文件需要注意一下:

分支`write`中,不需要html文件:

```text
node_modules/
*.html
_book/
```

分支`master`中不需要发布脚本和md源文件:

```text
node_modules/
*.md
publish.sh
```
