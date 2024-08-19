---
title: 外观模式(Facade Pattern)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: 3ba82237
date: '2024-08-19 16:42:43'
---

Facade模式是一种软件设计模式，属于结构型模式之一。它提供了一个统一的高层接口，用于访问子系统中的一群接口。这种模式定义了一个高层的接口，使得子系统更容易使用。简而言之，Facade模式隐藏了系统的复杂性，并向客户端提供了一个客户端可以访问系统的接口。

<!-- more -->
### 特点：

1. **简化接口**：为复杂的子系统提供一个简单的接口。
2. **降低耦合度**：客户端与子系统之间通过Facade进行交互，从而降低了它们之间的耦合度。
3. **提高安全性**：可以控制对子系统内部的访问。

### 组成部分：

* **Facade**：定义了一个高层接口，使得子系统更容易使用。
* **Subsystem**：实现子系统的功能，同时可以被Facade访问。

# Facade模式的类图如下

{% plantuml %}
class Client

class Facade

class ClassA
class ClassB
class ClassC
class ClassD

Client -down-> Facade: Uses >
Facade -down-> ClassA
Facade -down-> ClassB
Facade -down-> ClassC
Facade -down-> ClassD

ClassA -down-> ClassB
ClassB -right-> ClassC
ClassC -right-> ClassB
ClassD -down-> ClassC
{% endplantuml %}

# 外观模式的主要作用

向外部提供同一的接口,把内部的复杂调用关系封装在内部, 对外只是保留必要的接口即可.

但是外观模式有一个问题, 测试不太好写, 相当于把很多功能封装在了内部, 不对外暴漏, 那么如果要写内部的接口, 就需要提供各种变种的入口参数. 这提升了单元测试的复杂度.

外观模式可以使用分治的思想, 在外观模式的内部继续使用外观模式, 这样可以一层一层的减少必要的接口暴露.



# 相关的设计模式

* 抽象工厂模式(Abstract Factory), 抽象工厂模式可用看做是生成复杂实例的外观模式, 所有的接口都由抽象工厂提供. 而且`Client`也只需要知道抽象工厂的接口即可. 不需要知道具体的零件构建方法.
* 单例模式(Singleton Pattern), 单例模式中的实例, 有时候会提供外观模式的角色. 这样做的好处就是可以提供全局的,而且唯一的外观入口. 极大地简化API的调用过程.
* 中介者模式(Mediator),  外观模式的主要方法是提供一个封装好的`API`来调用内部复杂的接口. 而中介模式是提供了一个仲裁者, 由仲裁者作出一系列相应来去操作具体的方法.


