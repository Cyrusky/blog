---
title: 观察者模式(Observer)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: 1b1ccf72
date: '2024-08-19 16:42:43'
---
观察者模式（Observer Pattern），又称为发布-订阅模式或模型-视图模式，是一种行为型设计模式。它定义了对象之间的一种一对多的依赖关系，当一个对象（称为“主题”或“被观察者”）的状态发生改变时，所有依赖于它的对象（称为“观察者”）都会得到通知并自动更新。

<!-- more -->
### 特点：

1. **解耦**：观察者模式实现了主题和观察者之间的解耦，主题只需要维护一个观察者列表，而不需要了解观察者的具体实现。
2. **动态订阅**：观察者可以在任何时候订阅或取消订阅主题的更新。
3. **广播通信**：当主题状态改变时，它会广播通知给所有注册的观察者。

### 组成部分：

* **Subject（主题）** ：主题是观察者模式的核心，它维护了一组观察者对象，并提供接口供观察者注册和注销。
* **Observer（观察者）** ：观察者接口定义了观察者更新的接口，通常是一个更新方法。
* **ConcreteSubject（具体主题）** ：具体主题实现了主题接口，存储状态，并提供方法供观察者注册和注销。
* **ConcreteObserver（具体观察者）** ：具体观察者实现了观察者接口，当接收到主题的更新通知时，执行相应的操作。

# 观察者模式的类图

{% plantuml %}
skinparam linetype ortho
interface Subject <<interface>> {
    - observers: Observer[]
    + addObserver()
    + removeObserver()
    + notifyObservers()
    + getSubjectState()
}

interface Observer <<interface>> {
    update()
}

class ConcreteSubject {
    - subjectState: string
    + getSubjectState()
    + setSubjectState()
}

class ConcreteObserver {
    - observerState: string
    + update()
}

Subject <|-- ConcreteSubject
Observer <|-- ConcreteObserver

Subject o---right---- Observer: Notifies >
{% endplantuml %}

# 观察者模式的特点

* Observer的调用会有顺序, 先注册的Observer会先执行.
* Observer的调用会产生链式反应, 如果使用的不合理, 会造成简介递归, 比如在React中,在UseEffect中使用setState.
* 观察者模式其实是一种发布和订阅模式, 发布者发布变动之后,订阅者来执行操作. 所以也被叫做`Publis-Subscribe`模式.

# 相关的数据模式

* 中介者模式(Mediator), 中介者模式中的`onChanged`方法, 可以由观察者模式来驱动.


