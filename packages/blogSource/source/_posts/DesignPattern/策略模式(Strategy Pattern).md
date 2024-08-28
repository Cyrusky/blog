---
title: 策略模式(Strategy Pattern)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: 5db9b4b7
date: '2024-08-19 16:42:44'
thumbnail: /assets/thumbnail/design-patterns/design-pattern.jpg
---

# 一个例子

<!-- more -->
{% plantuml %}
@startuml
skinparam linetype ortho
class Player {
    - strategy
    + nextHand()
    + win()
    + lose()
    + even()
}

interface Strategy <<Interface>> {
    + nextHand()
    + study()
}

class WinningStrategy implements Strategy {
    + nextHand()
    + study()
}

class ProbStrategy implements Strategy {
    + nextHand()
    + study()
}

Player o-right-> Strategy
@enduml
{% endplantuml %}

# 策略模式中的角色

* `Strategy`，该角色是一个接口，负责决定实现策略所必须得功能。
* `ConcreteStrategy`，具体的策略，实现了`Strategy`接口，可以分别实现不同的策略、方法、算法等等。
* `Context`上下文角色，用于保存`ConcreteStrategy`角色的具体实例，并且进行使用。在上述例子中，是`Player`

# 策略模式的类图

{% plantuml %}
@startuml
skinparam linetype ortho
class Context {
    - strategy
    + contextMethod()
}

interface Strategy <<Interface>> {
    + strategyMethod()
}

class ConcreteStrategy1 implements Strategy {
    + strategyMethod()
}

class ConcreteStrategy2 implements Strategy {
    + strategyMethod()
}

Context o-right-> Strategy
@enduml
{% endplantuml %}

# 策略模式的特点

* 策略模式也是一种委托模式，委托模式是一种弱关联，这种弱关联可以很方便的整体替换算法。
* 策略模式可以再程序的运行中替换策略，从而替换整体算法。

# 相关的设计模式

* 享元模式(Flyweight)， 享元模式可以让很多个地方共用`ConcreteStrategy`角色。
* 抽象工厂模式(Abstract Factory)模式和策略模式有一定的相似性，不过一个是替换算法，一个是整体替换生产的产品。
* 状态模式(State)和策略模式都可以替换被委托的对象，而且之间的关系也很相似。

  * 在策略模式中，`ConcreteStrategy`角色表示的时被替换的算法，只有在必要的时候才需要替换。
  * 在状态模式中，`ConcreteState`角色表示的是具体的状态，该状类会随着被替换的状态而变化。
