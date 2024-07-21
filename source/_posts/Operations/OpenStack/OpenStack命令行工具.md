---
title: OpenStackClient的使用
tags:
  - Development
  - openstack
  - CLI
categories:
  - Operations
  - OpenStack
toc: true
abbrlink: 1dcf0b5d
date: 2017-11-04 15:40:05
---

OpenStackClient (aka OSC) is a command-line client for OpenStack that brings the command set for Compute, Identity, Image, Object Storage and Block Storage APIs together in a single shell with a uniform command structure.

OpenStack客户端，也称为OSC，是一个用于操作OpenStack的命令行客户端，包括一系列针对计算、认证、镜像、对象存储、块存储API的命令集，通过shell进行统一风格的操作。

<!-- more -->

## 如何使用OSC

- [用户文档](https://docs.openstack.org/python-openstackclient/latest/cli/index.html)
  - [文档页](https://docs.openstack.org/python-openstackclient/latest/cli/man/openstack.html)
  - [命令列表](https://docs.openstack.org/python-openstackclient/latest/cli/command-list.html)
  - [命令格式](https://docs.openstack.org/python-openstackclient/latest/cli/commands.html)
  - [插件命令](https://docs.openstack.org/python-openstackclient/latest/cli/plugin-commands.html)
  - [认证](https://docs.openstack.org/python-openstackclient/latest/cli/authentication.html)
  - [交互模式](https://docs.openstack.org/python-openstackclient/latest/cli/interactive.html)
  - [映射关系](https://docs.openstack.org/python-openstackclient/latest/cli/decoder.html)
  - [一些不向后兼容的变更](https://docs.openstack.org/python-openstackclient/latest/cli/backwards-incompatible.html)
- [配置](https://docs.openstack.org/python-openstackclient/latest/configuration/index.html)
  - [全局配置](https://docs.openstack.org/python-openstackclient/latest/configuration/index.html#global-options)
  - [环境变量](https://docs.openstack.org/python-openstackclient/latest/configuration/index.html#environment-variables)
  - [配置文件](https://docs.openstack.org/python-openstackclient/latest/configuration/index.html#configuration-files)
  - [日志配置](https://docs.openstack.org/python-openstackclient/latest/configuration/index.html#logging-settings)
  - [本地化与语言支持](https://docs.openstack.org/python-openstackclient/latest/configuration/index.html#locale-and-language-support)

## 第一步

- 尝试一些[命令](https://docs.openstack.org/python-openstackclient/latest/cli/command-list.html#command-list)
- 读一下[源码](https://git.openstack.org/cgit/openstack/python-openstackclient/tree)
- 通过PyPi或者tarball安装OpenStackClient

## 更新日志

- [更新日志](http://docs.openstack.org/releasenotes/python-openstackclient)

### 索引与列表

- [索引](https://docs.openstack.org/python-openstackclient/latest/genindex.html)
- [列表](https://docs.openstack.org/python-openstackclient/latest/search.html)
