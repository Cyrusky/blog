---
title: 写一个脚本一键发布你的Hexo网站
tags:
  - Hexo
categories:
  - Reading&Writing
  - Hexo
toc: true
cover: '/assets/images/20190805091629.webp'
abbrlink: 134e037a
date: 2019-08-05 09:14:36
---

# 安装Git部署插件

```bash
npm install hexo-deployer-git --save
```

官方的解释如下：

> Hexo provides a fast and easy deployment strategy. You only need one single command to deploy your site to your
> servers.

你可以在这里看到：https://hexo.io/docs/deployment.html

<!-- more -->

## 配置

```yaml
deploy:
  type: git
  repo: <repository url> 
  branch: [branch]
  message: [message]
```

## 使用

```bash
hexo deploy
```

# 一键发布脚本

```bash
#!/usr/bin/env bash
cd [你的博客路径]

echo -e "清除旧文件"
hexo cl > /dev/null
echo -e "\t\t......OK\n正在【生成】静态页面"
hexo g  > /dev/null
echo -e "\t\t......OK\n正在【发布】静态页面"
hexo d > /dev/null
echo -e "\t\t......OK\n将源文件添加到git版本库"
git add .  > /dev/null
echo -e "\t\t......OK\n添加GitComment"
git commit -m '`date  +"%Y-%m-%d %H:%M.%S 发布文章:$1"`'  > /dev/null
git push  > /dev/null
echo -e "\t\t......OK\n正在GitPush推送源文件"
cd -  > /dev/null
echo "发布完成"
```

> 你可以将该脚本放置在PATH环境变量可以找到的地方。就可以直接使用了。
