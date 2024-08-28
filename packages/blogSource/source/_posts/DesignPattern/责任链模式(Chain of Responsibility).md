---
title: 责任链模式(Chain of Responsibility)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: fabda9c7
date: '2024-08-19 16:42:43'
---

责任链模式中事宜一个链表的形式去管理任务, 每一个任务都是链表中的一个节点, 而任务本身会以参数的形式依次在链表中进行传递. 每一个节点负责处理并且终止任务或者将任务传递到下一个及诶单, 如果没有下一个节点,则任务执行失败.

<!-- more -->
# 责任链模式的类图:

{% plantuml %}
class Client

class Handler {
	- next
	+ request()
}

class ConcreteHandler1 extends Handler {
	+ request()
}

class ConcreteHandler2 extends Handler {
	+ request()
}

Handler o-> Handler

Client -right-> Handler: Request
{% endplantuml %}



# 责任链模式的特点

* 弱化了调用者与被调用对象的关系,将其抽离出去. 每一个请求者本身不应该知道如何去处理请求, 而是由`handler`去决定. 但是每一个`handler`又只知道其中的一种处理方式.
* 责任链中, 可以很方便的添加或者删除, 或者修改每一个任务处理方式. 也可以动态的调整顺序. 而几乎不修改代码.
* 每一个责任链单元都只负责自己的事情, 这符合了04. 接口隔离原则（Interface Segregation Principle，ISP）.

# 相关的设计模式

* 组合模式(Composite Pattern),  责任链模式中通常会使用组合模式来对责任链节点进行定义.
* 命令模式(Command), `Clinet`发起的请求有时候会使用命令模式向`Handler`发起请求.
