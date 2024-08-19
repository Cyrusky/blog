---
title: 状态模式(State)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: da6cfa60
date: '2024-08-19 16:42:44'
---

状态模式（State Pattern）是一种行为设计模式，它允许一个对象在其内部状态改变时改变它的行为，看起来好像改变了其类。状态模式主要解决的是当一个对象的行为取决于它的状态，并且这个状态会随时间而变化的问题。

<!-- more -->
### 状态模式的主要角色：

1. **上下文（Context）** ：维护一个指向当前状态对象的引用，这个引用可以是状态接口或者抽象类的实例。
2. **状态接口或抽象类（State）** ：定义一个接口或抽象类，声明了在不同状态下需要实现的方法。
3. **具体状态类（Concrete State）** ：实现状态接口或继承抽象类，并且具体实现在特定状态下的行为。

### 状态模式的实现步骤：

1. **定义状态接口或抽象类**：声明一个方法，该方法将在不同状态下有不同的实现。
2. **创建具体状态类**：为每一个具体状态创建一个类，实现状态接口或继承抽象类，并提供具体的状态行为。
3. **定义上下文类**：持有一个状态对象的引用，并且可以接收一个状态对象，调用状态对象的方法。

### 使用场景：

* 当一个对象的行为取决于它的状态，并且它的状态值在运行时会改变。
* 当代码中包含大量与状态相关的条件语句。

### 优点：

* 将所有与特定状态相关的行为局部化到一个类中，使得状态转换逻辑更加清晰。
* 可以更容易地增加新的状态，因为不需要修改上下文类。
* 封装了状态转换的逻辑，使得状态转换更加灵活。

### 缺点：

* 增加设计复杂性，需要为每个状态创建一个类。
* 状态模式可能会导致系统中状态类和状态转换代码的增多。

# 状态机(有限状态机)和状态模式的关系

如果需要开发一个真实的状态转移的程序, 那么可以用状态机来描述, 这个是业务层面的描述, 而由业务转交给开发之后, 开发可以有很多种实现方式, 其中状态模式来实现状态机一般来说是最优解.

# 状态模式的类图

{% plantuml %}
@startuml
skinparam linetype ortho
class Context {
	- state: State
	+ requestX()
	+ requestY()
	+ requestZ()
}

interface State {
    + methodA()
    + methodB()
    + methodC()
    + methodD()
}

class ConcreteStateA implements State {
    + methodA()
    + methodB()
    + methodC()
    + methodD()
}

class ConcreteStateB implements State {
    + methodA()
    + methodB()
    + methodC()
    + methodD()
}

Context o-right-> State
@enduml
{% endplantuml %}

# 状态模式的特性

* 分而治之的思想, 每一种具体的状态都有相应的实现类,而实现类中可以定义具体如何去接受输入, 如何进行输出, 并且如何跳转到下一个状态, 那么就可以将复杂的逻辑进行拆分, 而每一个拆分也有相似或者相同的结构. 方便上层进行统一的调用.
* 状态的管理有谁来进行? 状态模式中, 即可以将状态的管理交友`Context`角色来进行. 也可以交给每一个`ConcreteState`来进行管理, 但是交给`ConcreteState`来管理的缺点就是,每一个状态都需要知道其他的`ConcreteState`并且在状态发生变化的时候进行通知.
* 状态管理可以使用状态迁移表来实现.
* 状态管理的过程中, 需要注意, 不能让状态和具体的值之间发生冲突.
* 状态模式是很容易添加新的状态的.

# 相关的设计模式

* 单例模式(Singleton Pattern), 一般来说, 如果一个系统的某个状态在全局的定义只有一处, 那么可以尽量使用单例模式来定义这个状态的实例.
* 享元模式(Flyweight), 有的时候, 如果多个状态中, 都连接到了某一个其他状态, 那么可以使用享元模式来进行`ConcreteState`的共享.
