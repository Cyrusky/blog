---
title: 代理模式(Proxy)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: 8fd3abeb
date: '2024-08-19 16:42:43'
---

代理模式（Proxy Pattern）是一种结构型设计模式，它为另一个对象提供一个代替或占位符，以控制对它的访问。代理模式可以在不直接与实际对象交互的情况下，提供对目标对象的间接访问。

<!-- more -->
### 代理模式的主要角色：

1. **主题（Subject）** ：定义了真实对象和代理对象的共同接口，这样代理对象可以在客户端中代替真实对象使用。
2. **真实主题（RealSubject）** ：需要被代理的对象，包含业务逻辑。
3. **代理（Proxy）** ：包含对真实主题的引用，提供与真实主题相同的接口，并在访问真实主题之前或之后进行额外操作。

### 代理模式的类型：

1. **远程代理（Remote Proxy）** ：为位于不同地址空间的对象提供代理，隐藏对象位于远程地址空间的事实。
2. **虚拟代理（Virtual Proxy）** ：延迟创建开销大的对象，直到真正需要它们的时候。
3. **保护代理（Protection Proxy）** ：控制对原始对象的访问，根据不同的访问权限提供不同的访问策略。
4. **智能引用（Smart Reference）** ：在访问对象时执行额外的动作，例如引用计数、线程安全检查等。

### 代理模式的实现步骤：

1. **定义主题接口**：声明一个接口，定义了代理和真实主题共有的方法。
2. **创建真实主题类**：实现主题接口，包含实际的业务逻辑。
3. **创建代理类**：实现主题接口，并包含对真实主题的引用。在代理类中实现额外的逻辑，并在适当的时候委托给真实主题。
4. **使用代理**：客户端通过代理对象来访问真实主题。

### 使用场景：

* 当需要对真实对象的访问进行控制时。
* 当需要为远程对象、复杂对象或需要延迟初始化的对象提供代理时。
* 当需要在访问对象时执行额外的逻辑，如访问权限检查、日志记录等。

### 优点：

* 代理可以在不修改真实主题的情况下，提供额外的功能或控制。
* 代理可以保护真实主题，隐藏其实现细节。
* 代理可以延迟对象的创建，节省资源。

### 缺点：

* 可能会引入额外的复杂性，因为需要维护代理和真实主题的同步。
* 可能会增加系统的性能开销，因为每次访问都需要经过代理。

# 代理模式的类图

{% plantuml %}
@startuml
skinparam linetype ortho
class Subject {
    + request1()
    + request2()
}

class RealSubject extends Subject {
    + request1()
    + request2()
}

class Proxy extends Subject {
    - realSubject: RealSubject
    + request1()
    + request2()
}

class client

client -right-> Subject: Uses >
Proxy o-right-> RealSubject: Uses >

@enduml
{% endplantuml %}

# 代理模式的特点

* 透明性, 如果使用代理模式, 因为`Proxy`和`RealSubject`都继承或者实现了`Subject`接口, 所以二者在使用的时候是没有感知的, 使用`Proxy`和使用`RealSubject`的方式是一样的.
* 代理与委托, 代理只能处理自己能处理的事情, 如果不能处理, 还是得要将任务委托出去执行. 参照代理与委托的区别和关系

# 相关的设计模式

* 适配器模式(Adapter Pattern) 适配器用来整合不同的接口, 而代理模式是具有相同的接口.
* 装饰器模式(Decorator Pattern) 装饰器模式与代理模式很相似, 装饰器模式更注重于增加新的功能, 而代理模式更注重的是将任务交出去, 二者的目的不同.
