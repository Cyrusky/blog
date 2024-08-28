---
title: 备忘录模式(Memento)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: 2039af48
date: '2024-08-19 16:42:43'
thumbnail: /assets/thumbnail/design-patterns/design-pattern.jpg
---

备忘录模式（Memento Pattern）是一种行为设计模式，用于在不破坏封装性的前提下捕获并存储对象的内部状态，以便之后可以将该对象恢复到该状态。这种模式通常用于实现撤销功能。

<!-- more -->
### 备忘录模式的主要角色：

1. **发起人（Originator）** ：负责创建一个备忘录，用以记录当前时刻的内部状态，并可以使用备忘录恢复内部状态。
2. **备忘录（Memento）** ：负责存储发起人的内部状态，并可以**防止其他对象访问这个状态**。
3. **负责人（Caretaker）** ：负责保存好备忘录，但不能对备忘录的内容进行操作或检查。

### 备忘录模式的实现步骤：

1. **定义发起人**：发起人需要有一个方法来创建备忘录，并且有一个方法来恢复状态。
2. **创建备忘录**：备忘录需要能够存储发起人的内部状态，并且能够将这个状态提供给发起人。
3. **定义负责人**：负责人负责保存备忘录，但不会对备忘录中的数据进行任何操作。

### 使用场景：

* 当需要保存和恢复数据的快照时。
* 当需要提供撤销功能，但又不希望破坏封装性时。

### 优点：

* 保护了发起人的状态不被外部直接访问。
* 允许在不同的时间点保存和恢复状态。

### 缺点：

* 可能会消耗更多的资源，因为每个状态都需要被存储。
* 增加了系统的复杂性。

# 备忘录模式的类图

{% plantuml %}
skinparam linetype ortho
class Originator {
+ createMemento()
+ restoreMemento()
}

class Memento {
	+ <<wide interface>> getProtectedInfo()
	+ <<narrow interface>> getPublicInfo()
}

class Caretaker {

}

Caretaker -right-> Originator: Requests >
Originator -down-> Memento: Creates >

Caretaker o-right-> Memento 
{% endplantuml %}

备忘录模式中的`Memento`角色提供了两种接口

* `wide interface` 所有用于获取和回复对象装填信息的方法的集合, 该接口汇报罗所有`Memento`角色的内部信息, 因此能够使用这个接口的角色只能是`Originator`.
* `narrow interface`, 宅接口可以获取`Memento`的信息比较有限,  可以有效的防止信息的泄露.

# 相关的设计模式

* 命令模式(Command), 如果发起人使用命令模式, 那么可以用命令来操作`Memento`.
* 原型模式(Prototype), 在`Memento`模式中, 一般只需要保存变化的部分就可以了. 而原型模式, 是需要完整的克隆出一个新的一毛一样的实例.
* 状态模式(State), 状态模式是使用类来保存状态, 备忘录模式是使用实例来保存状态.


