---
title: 抽象工厂模式(Abstract Factory)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: 6a486f00
date: '2024-08-19 16:42:44'
thumbnail: /assets/thumbnail/design-patterns/design-pattern.jpg
---

举个例子:

<!-- more -->
{% plantuml %}
@startuml
skinparam linetype ortho
package factory {
    class AbstractProduct1 <<Abstract Class>>
    class AbstractProduct2 <<Abstract Class>>
    class AbstractProduct3 <<Abstract Class>>
    class AbstractFactory <<Abstract Class>>
}

package concreteFactory {
    class Product1
    class Product2
    class Product3
    class Factory
}

factory.AbstractProduct1 <|-- concreteFactory.Product1
factory.AbstractProduct2 <|-- concreteFactory.Product2
factory.AbstractProduct3 <|-- concreteFactory.Product3
factory.AbstractFactory <|-- concreteFactory.Factory
factory.AbstractFactory -up-> factory.AbstractProduct1: Creates >
factory.AbstractFactory -up-> factory.AbstractProduct2: Creates >
factory.AbstractFactory -up-> factory.AbstractProduct3: Creates >

concreteFactory.Factory -up-> concreteFactory.Product1: Creates >
concreteFactory.Factory -up-> concreteFactory.Product2: Creates >
concreteFactory.Factory -up-> concreteFactory.Product3: Creates >

@enduml
{% endplantuml %}



# Abstract Factory模式中的角色

* `AbstractProduct`: 抽象的产品类, 在上述的例子中, 具体的例子为: `factory.AbstractProduct1`/`factory.AbstractProduct2`/`factory.AbstractProduct3`, 负责定义产品的行为规范, 但是不定义具体的业务逻辑.
* `AbstractFactory`: 抽象的工厂类, 抽象工厂类会使用到抽象产品类, 具体可以规定生产产品的规范.
* `Product`: 具体产品类,在上述的例子中, 产品角色由`concreteFactory.Product1`/`concreteFactory.Product2`/`concreteFactory.Product3`担任. 分别定义了具体的产品是如何生产的.
* `Factory`: 具体的工厂类, 规定了具体的工厂如何生产具体的产品.
* `Client`: 委托者, 委托者负责像具体工厂发起生产任务. 工厂才会进行生产.

# 特性

* 如果需要添加一个新的工厂和去生产一个新的产品, 那么只需要新增一个具体工厂类和具体的产品类即可, 无需对抽象工厂和抽象产品以及委托者进行修改, 这样就符合了02. 开放封闭原则（Open-Closed Principle，OCP）.
* 抽象工厂对与固定零件类型的场景比较适合,但是如果零件也需要变化的话,那么就不太方便了. 比如说, 我需要添加一个新的`Product4`, 那么我需要做的事情:

  1. 添加一个新的抽象产品类: `AbstractProduct4`,
  2. 添加一个新的具体产品类: `Product4`.
  3. 修改所有的工厂,包括抽象工厂和具体工厂来添加`Product4`. 这种情况下, 我们已经添加的工厂越多, 工作量也就越大.

# 相关的设计模式

* 抽象工厂模式通过调用抽象产品的接口来组装抽象产品, 这个地方其实有时候是不需要知道具体工厂和具体产品的, 但是在建造者模式(Builder Pattern)中, 我们必须要知道具体生产的产品才可以.而且建造者模式可以分步骤进行构建, 抽象工厂模式是一次性构建.
* 比较难区分的两个模式就是抽象工厂模式和工厂方法模式(Factory Method Pattern), 名字太相近了.可以这么来理解:

  * 抽象工厂方法是将整个工厂进行了抽象, 但是工厂方法模式其实只是抽象了生产产品的方法.
  * 抽象工厂方法其中针对各个产品的方法,其实是使用了工厂方法模式.
* 抽象工厂模式在制作产品的时候, 会使用到组合模式(Composite Pattern).
* 在部分情况下, 抽象工厂模式中的具体工厂, 会使用到单例模式(Singleton Pattern)


