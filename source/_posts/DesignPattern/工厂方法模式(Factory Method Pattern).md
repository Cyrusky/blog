---
title: 工厂方法模式(Factory Method Pattern)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: de947954
date: '2024-08-19 16:42:43'
---

工厂方法模式是一种创建型设计模式，用于创建对象，但不直接指定将要创建的对象的类。工厂方法模式通过定义一个创建对象的接口，让子类决定实例化哪一个类。工厂方法让类的实例化推迟到子类中进行。

<!-- more -->
### 特点：

1. **封装性**：封装了对象的创建过程，将对象的创建和使用分离。
2. **扩展性**：当需要增加新的对象时，只需要增加一个具体的类和相应的工厂类即可，无需修改已有的代码。
3. **代码复用**：通过定义一个公共的接口来创建对象，可以在不同的工厂子类中复用相同的创建逻辑。

### 结构：

工厂方法模式包含以下角色：

* **产品（Product）** ：定义了产品的接口，描述了可以创建的对象的公共行为。
* **具体产品（Concrete Product）** ：实现了产品接口的具体类。
* **工厂（Creator）** ：定义了创建产品的接口，声明了工厂方法。
* **具体工厂（Concrete Creator）** ：实现了工厂接口，生成具体的产品对象。

### 应用场景：

* 当一个类不知道它所必须创建的对象的类时。
* 当需要通过子类来指定创建的对象时。
* 当类将创建逻辑委托给子类时，并且子类实现了这个接口，但不知道具体要实例化的类。

## 类图

{% plantuml %}
@startuml
package Framework {
    class Factory {
        + createProduct()
        + create()
        + registerProduct()
    }

    class Product {
        + use()
    }
}

package idCard {
    class IDCard {
        - owner
        + use()
        + getOwner()
    }

    class IDCardFactory {
        - owners
        + createProduct()
        + registerProduct()
        + getOwners()
    }
}

Factory <|-- IDCardFactory
Product <|-- IDCard
Factory -right-> Product
IDCardFactory -right-> IDCard
@enduml
{% endplantuml %}



`Framework`中的包不依赖具体的产品, 这就意味着如果其他产品和工厂能够遵循相同的`Framework`,那么代码扩展会变得很容易.

## 生成实例的三种处理方法

### 指定`Factory`中为抽象类,子类必须实现.

```java
abstract class Factory {
	public abstract Product createProduct(String name);
}
```

### 实现默认处理方法

```java
abstract class Factory {
	public Product createProduct(String name) {
		return new Product(name); // 此时因为要创建Product的实例,所以Product不能定义为抽象类.
	}
}
```

### 抛出异常

如果我们必须要为每一个工厂都实现具体的实例生成方法,但是又无法提供抽象类, 那么可以将父类中的`createProduct`进行异常抛出.

```java
abstract class Factory {
	public Product createProduct(String name){
		// 这个Exception类需要定义一下.
		throw new FactoryMethodRuntimeException();
	}
}
```

# 相关的设计模式

* 模板方法模式(Template Method Pattern),在上述例子中, create就是一个模板方法.
* 单例模式(Singleton Pattern), 在大多数场景下, 工厂可以作为全局单例来存在,不需要实例化多次.
* 组合模式(Composite Pattern), 有时可以将Composite模式应用于Product角色 或者 Concrete Product角色.
* 迭代器模式(Iterator Pattern), 有的时候在Iterator中生成Iterator实例的时候,会使用到工厂方法模式.
