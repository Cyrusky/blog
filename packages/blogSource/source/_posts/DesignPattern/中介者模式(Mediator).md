---
title: 中介者模式(Mediator)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: b579649a
date: '2024-08-19 16:42:43'
---

中介者模式也叫做仲裁者模式（Mediator Pattern）是一种行为型设计模式，它定义了一个中介对象来封装一系列对象之间的交互。这种模式使得对象之间的耦合度降低，使得它们可以独立地改变和复用。在没有使用仲裁者模式的情况下，对象之间可能会直接相互引用，这会导致它们之间的高度耦合。

<!-- more -->

### 特点：

1. **降低耦合度**：对象之间不直接通信，而是通过一个中介对象来相互交互。
2. **提高模块化**：对象的逻辑更加独立，可以更容易地修改和扩展。
3. **集中管理交互**：中介对象可以控制对象之间的交互，使得交互逻辑集中管理。

### 组成部分：

* **Mediator**：中介者接口，定义了同事对象与中介者之间的通信协议。
* **ConcreteMediator**：具体的中介者实现，它需要知道所有同事对象，并负责协调它们之间的交互。
* **Colleague**：同事类接口，定义了与其他同事对象交互的方法。
* **ConcreteColleague**：具体的同事类，实现同事类接口，并与中介者通信。

# 中介者模式中的角色

{% plantuml %}
@startuml
skinparam linetype ortho
interface Mediator <<interface>> {
    + createColleague(): void
    + colleagueChanged(message: String): void
}
class ConcreteMediator {
    - concreteColleague1
    - concreteColleague2
    - concreteColleague3
    + createColleagues()
    + colleagueChanged()
}

interface Colleague {
    + setMediator()
    + controlColleague()
}

class ConcreteColleague1 {
    + controlColleague()
}

class ConcreteColleague2 {
    + controlColleague()
}
class ConcreteColleague3 {
    + controlColleague()
}


ConcreteMediator -up-|> Mediator
ConcreteColleague1 -up-|> Colleague
ConcreteColleague2 -up-|> Colleague
ConcreteColleague3 -up-|> Colleague
Mediator <-right-o Colleague
ConcreteMediator o-right-> ConcreteColleague1
ConcreteMediator o-right-> ConcreteColleague2
ConcreteMediator o-right-> ConcreteColleague3
@enduml
{% endplantuml %}

# 中介者模式的特点

* 中介者模式在React中很常见, 主要是由父组件来充当中介者. 其他的组件如果发生了数据变化,那么只需要通知父组件(中介者), 由父组件来决定具体如何处理这些变化.
* 当中介者模式出现问题时, 很容易通过数据的流向来判断问题出在什么地方. 但是如果讲这些处理逻辑分散在具体的类中, 那么数据的处理会变得很复杂. 调试也不容易.
* 组件之间的通信线路会始终保持在线性相关的数量级上. 如果不用这种中介者模式,那么 组件的增加是指数级别的. 没添加一个通信组件,都需要考虑所有的消息接受者如何处理.

# 相关的设计模式

* 外观模式(Facade Pattern), 外观模式中, Facade角色单方面来使用其他角色提供的接口, 但是在中介者模式中, 可以进行双向的通信, 他们都是中心化的结构, 有一个数据和逻辑的处理中心.
* 观察者模式(Observer), 可以看到上述的方法中有一个`colleagueChanged`方法,这个方法可以用观察者模式来实现.
