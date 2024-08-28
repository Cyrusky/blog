---
title: 享元模式(Flyweight)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: b579649a
date: '2024-08-19 16:42:43'
thumbnail: /assets/thumbnail/design-patterns/design-pattern.jpg
---

享元模式（Flyweight Pattern）是一种结构型设计模式，旨在通过共享来高效地管理大量细粒度对象。这种模式非常适合于当有大量相似或相同的对象时，通过共享这些对象的一部分数据来减少内存的使用量和提高性能。

<!-- more -->
### 享元模式的主要角色：

1. **享元对象（Flyweight）** ：细粒度的对象，可以被共享。
2. **非享元对象（UnsharedConcreteFlyweight）** ：如果有些数据不适合共享，可以创建非享元对象来存储这些数据。
3. **享元工厂（FlyweightFactory）** ：负责创建和管理享元对象，确保享元对象可以被共享。
4. **客户端（Client）** ：使用享元对象。

### 享元模式的实现步骤：

1. **定义享元接口**：声明一个接口或抽象类，定义了所有享元对象必须实现的方法。
2. **创建具体享元类**：实现享元接口，存储内部状态（可以共享的部分）。
3. **创建享元工厂**：负责创建和管理享元对象的实例，确保共享的实例被复用。
4. **使用享元对象**：客户端通过享元工厂获取享元对象，并设置外部状态（不可以共享的部分）。

### 使用场景：

* 当一个应用程序使用大量相似或相同的对象时。
* 当对象的创建开销很大时（例如，对象包含大量数据或复杂计算）。
* 当对象的存储（占用的内存）是一个问题时。

### 优点：

* 减少内存的使用，因为相同的对象被共享。
* 提高了性能，因为减少了对象的创建和销毁。
* 使得程序更加模块化，因为享元对象和客户端之间是低耦合的。

### 缺点：

* 增加了设计的复杂性，需要区分内部状态和外部状态。
* 享元对象的状态可能受到外部状态的影响，这可能导致一些不可预见的副作用。
* 享元工厂的实现可能比较复杂，特别是当享元对象的创建和检索逻辑很复杂时。

# 享元模式的类图

{% plantuml %}
skinparam linetype ortho

class Flyweight {
+methodA()
+methodB()
}

class FlyweightFactory {
- pool
+ getFlyweight()
}

class client {

}

Flyweight <-down-o FlyweightFactory: Creates <
FlyweightFactory <-down- client 
client --> Flyweight
{% endplantuml %}



# 享元模式的特性

* 享元模式更像是一种缓存机制, 比如client需要使用Flyweight的时候, 可以先在FlyweightFactory中进行查询, 如果有, 那么直接使用, 如果没有, 那么久去创建一个, 然后进行使用, 其他的Client如果需要使用的时候, 也是要先进性查询, 那么这样, 所有的角色使用到的同一个Flyweight类型, 就只会是共享的类型和实例.
* 如果要动到被共享的对象的时候,需要考虑会有多出会受到影响.
* 在需要共享某个对象的时候, 需要考虑到这个对象是否应该被共享, 如果共享了不能被共享的对象, 会对程序的问题定性和安全性有影响.
* 因为实例是被共享的, 但是如果语言中包含了垃圾回收机制, 那么有可能被共享的对象会被回收, 这个时候, 所有使用到该对象的地方都会受到影响. 比如说: 缓存失效.

# 相关的设计模式

* 代理模式(Proxy), 代理模式中如果生成一个实例需要花费较长的时间, 而且这个实例是能够被共享的, 那么可以使用享元模式来生成, 也就是用缓存来生成.
* 组合模式(Composite Pattern), 可以使用享元模式来生成叶子结点. 但是这个时候叶子结点是可以被共享的.
* 单例模式(Singleton Pattern), 有时候享元模式中的`FlyweightFactory`角色需要使用单例模式来生成.


