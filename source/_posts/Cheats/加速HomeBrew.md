---
title: 加速HomeBrew
tags:
  - DevOps
categories:
  - CheatSheets
toc: true
cover: /assets/images/20191008135626.webp
Reprint: 'https://opsx.alibaba.com/mirror'
abbrlink: c599cf9c
date: 2019-10-08T13:53:06.000Z
thumbnail: /assets/thumbnail/20191008135626.webp
---

# 快速配置Alibaba的Homebrew

首先确保你已经安装好了 Homebrew 了, 如果没有, 请参考 OPSX 指引页的 Homebrew 文档;

然后你只需要粘贴下述命令在对应终端运行.

<!-- more -->

## Bash 终端配置

```bash
		# 替换brew.git:
    cd "$(brew --repo)"
    git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
    # 替换homebrew-core.git:
    cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
    git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
    # 应用生效
    brew update
    # 替换homebrew-bottles:
    echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
    source ~/.bash_profile
```

## Zsh 终端配置

```bash
    # 替换brew.git:
    cd "$(brew --repo)"
    git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
    # 替换homebrew-core.git:
    cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
    git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
    # 应用生效
    brew update
    # 替换homebrew-bottles:
    echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
    source ~/.zshrc
```

# 恢复默认配置

出于某些场景, 可能需要回退到默认配置, 你可以通过下述方式回退到默认配置.

首先执行下述命令:

```bash
	# 重置brew.git:
	$ cd "$(brew --repo)"
	$ git remote set-url origin https://github.com/Homebrew/brew.git
	# 重置homebrew-core.git:
	$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
	$ git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```

然后删掉 **HOMEBREW_BOTTLE_DOMAIN** 环境变量,将你终端文件

```bash
 ~/.bash_profile
```

或者

```bash
 ~/.zshrc
```

中

```bash
HOMEBREW_BOTTLE_DOMAIN
```

行删掉, 并执行

```bash
 source ~/.bash_profile
```

或者

```bash
 source ~/.zshrc
```
