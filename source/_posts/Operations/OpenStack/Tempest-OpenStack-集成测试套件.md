---
title: Tempest -- OpenStack 集成测试套件
tags:
  - DevOps
categories:
  - Operations
  - OpenStack
toc: true
cover: /assets/images/imgs20190625084637.webp
abbrlink: be5e5dbe
date: 2018-07-03T14:01:00.000Z
thumbnail: /assets/thumbnail/imgs20190625084637.webp
---

## Tempest-Openstack Integration Test Suite

测试本身的API符合规范

## Tempest概述

OpenStack的几种测试工具

<!-- more -->

Rally： https://blog.csdn.net/jiahaojie1984/article/details/52043274

selenium

OpenStack的集成测试集

开源项目

测试对象：live openstack集群

测试对象

* Api validation
* scenarios
* stress
* other specific tests useful in validating an OS

### 设计原则

* Live OpenStack
* 明确结果（OpenStack是否correct）
* 聚焦public interface
* 完全覆盖API和common scenarios
* Load Generator，负载生成器
* 自清理（及时释放资源）
* 自测试（Unit Test）

## Tempest的测试分类和设计

### Tempest测试分类--API-Test

* 当前tempest自主要的部分
* 验证OpenStack的API按照设计进行工作
* 用力要求
    * 不适用。。。

### Tempest测试分类--API-Scenarios

* 特点
    * 采用end-to-end的测试用例，及用户的真是操作流程
    * 测试uhuanjing的构建复杂
    * 对针对模块间的协作场景
* 用途
    * operator--快速验证openstack基本功能是否完善
    * developer--测试new code是否导致其他模块regression（回归）

### Tempest测试分类--Stress test

* openstack是分布式异步系统，单元测试和功能测试不足以发现子高压下的问题

* 在tempest.conf文件的stress部分，需要额外的配置

* 运行：

    * 安装`tempes CLI`

    * 执行

      ```
      tempset run state -d 30
      ```

### Tempest测试设计

### Tempest 测试框架

tempset中测试和各个模块的unit test都是基于python unittest module

testcase是一个测试用例，包括测试前准备环境的搭建-setup，
执行测试代码-run以及测试后环境的还原teardown。一个测试用例是一个完整的测试单元，通过运行这个测试单元，可以对某一个问题进行验证

开发的testcase，集成unittest或其他子类即可。

## Tempest安装和使用

### Tempest安装

1. devstack
    1. 下载devstack，
    2. 将devstack、sample下的sample配置文件local.conf拷贝到。。。。。
    3. 。。。
    4. 。。。
2. 生产测试OpenStack环境
    1. 或者live openstack
    2. 获取tempset代码
    3. 安装tempest

### Tempest配置

配置/etc/tempest.conf

Devstack会自动生成配置文件，无需修改

生产/测试OpenStack需要手动生成配置文件

```
tox -egening
```

### Tempest运行

```
TempestCLI
	ostestr
testr(directly)
run_tempest。sh。。。

```

### Tempest结果

。。。

## Tempest自测和扩展

### 自测

Tempest作为OpenStack的组件之一， 也拥有自己的UnitTest

特点

* 对Tempest自身进行测试
* 确保Tempest自身各个模块的正确性
* 不能应用外部服务

测试方法：

tox

### 扩展

testcase扩展

* 增加更为全面的测试用例

公共类及client扩展

* 使得testcase的创建更为便捷
* tempsets/services tempsets/common 和 tempset/lib目录下

环境变量扩展

* 可进行更丰富的配置
* 在tempest/etc/tempest.conf力添加新的环境变量
* 在tempest/config.py内补充对新增环境变量的解析

### Tempest的LBaaS的变化

负载均衡是openstack neutron支持的功能之一，负载均衡能够在网络请求分发到多个实际处理请求的虚拟机上。

## Tempest的相关链接
