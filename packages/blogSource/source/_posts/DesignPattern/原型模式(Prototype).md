---
title: 原型模式(Prototype)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: 5ffaf317
date: '2024-08-19 16:42:43'
---

原型模式（Prototype Pattern）是一种创建型设计模式，用于创建新对象时，通过复制现有的对象来避免创建新对象的高昂成本。这种模式特别适用于那些创建过程复杂、耗时或消耗资源较多的对象。

<!-- more -->
### 特点：

1. **克隆对象**：通过克隆现有的对象来创建新对象，而不是从头开始创建。
2. **减少创建成本**：避免了复杂的构造过程和资源消耗。
3. **扩展性**：可以很容易地添加新的对象类型，而不需要修改现有代码。

原型模式允许动态地创建新对象，同时保持与原始对象的一致性，适用于需要快速复制对象的场景。不过，需要注意的是，如果对象包含指针或引用，克隆时需要特别注意深克隆和浅克隆的问题，以避免潜在的副作用。

# 一个例子

{% plantuml %}
@startuml
package Framework {
    class Manager {
        + showCase
        + register()
        + create()
    }

    interface Product <<interface>> {
        + use()
        + createClone()
    }
}

class UnderlinePen {
    - ulchar
    + use()
    + createClone()
}

class MessageBox{
    - decochar
    + use()
    + createClone()
}
Manager -right-> Product: Uses >
UnderlinePen .up.|> Product
MessageBox .up.|> Product
@enduml
{% endplantuml %}

## 例子对应的代码:

```java
package cn.borgor.prototype.impl;

import cn.borgor.prototype.Product;

public class MessageBox implements Product {
    private final char decochar;

    public MessageBox(char decochar) {
        this.decochar = decochar;
    }


    @Override
    public void use(String s) {
        int length = s.getBytes().length;
        for (int i = 0; i < length + 4; i++) {
            System.out.print(decochar);
        }
        System.out.println();
        System.out.println(decochar + " " + s + " " + decochar);
        for (int i = 0; i < length + 4; i++) {
            System.out.print(decochar);
        }

        System.out.println();
    }

    @Override
    public Product createClone() {
        Product p = null;
        try {
            p = (Product) clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return p;
    }
}

package cn.borgor.prototype.impl;

import cn.borgor.prototype.Product;

public class UnderlinePen implements Product {
    private final char ulchar;

    public UnderlinePen(char ulchar) {
        this.ulchar = ulchar;
    }

    @Override
    public void use(String s) {
        int length = s.getBytes().length;
        System.out.print(" \"" + s + "\"");
        System.out.println(" ");
        for (int i = 0; i < length + 4; i++) {
            System.out.print(ulchar);
        }
        System.out.println();
    }

    @Override
    public Product createClone() {
        Product p = null;
        try {
            p = (Product) clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return p;
    }
}
package cn.borgor.prototype;

import java.util.HashMap;

public class Manager {

    private final HashMap<String, Product> showcase = new HashMap<>();

    public void register(String name, Product proto) {
        showcase.put(name, proto);
    }

    public Product create(String prototype) {
        Product p = showcase.get(prototype);
        return p.createClone();
    }
}

package cn.borgor.prototype;

public interface Product extends Cloneable {
    void use(String s);

    Product createClone();
}

{% endplantuml %}

# 原型模式中的角色

* `Prototype`, 这是个接口, 如上图中说是的`Product`, 用于复制现有的实例来生成新的实例.
* `ConcretePrototype`, 这个角色实现了`Prototype`接口,负责克隆现有实例的功能. 可以对于不同的实例实现不同的业务逻辑, 在上图中, `UnderlinePen`和`MessageBox`类, 他们用于生成实例.
* `Client`, Client角色负责使用生成的实例, 在上图中,由`Manager`来扮演此角色.

> 每一次调用`ConcretePrototype`的`createClone`方法, 则会生成一个相应的`ConcretePrototype`的实例, 该实例是通过克隆生成的, 并不是new出来的.

# 通用UML图

{% plantuml %}
@startuml
package Framework {
    class Client

    interface Prototype <<interface>> {
        + createClone()
    }
}

class ConcretePrototype {
    - ulchar
    + use()
    + createClone()
}

Client -right-> Prototype : Uses >
ConcretePrototype .up.|> Prototype 
@enduml
{% endplantuml %}

# 使用原型方法的具体业务场景:

* 对象的种类繁多, 无法将他们整合到一个类中, 或者是继承同一个类, 因为使用的地方需要用抽象来进行(05. 依赖倒置原则（Dependency Inversion Principle，DIP）), 所以如果类的种类比较多的情况下,是无法一个一个来创建的, 或者创建的时候很麻烦.
* 创建一个类的对象的时候很麻烦, 如果一个实例的创建需要很多参数,或者很多步骤. 那么可以预先创建一个实例,然后使用原型模式克隆出来.
* 如果业务场景中需要解耦实例的创建和使用过程, 那么可以使用原型模式, 在上述的例子中, 可以看出,使用实例的时候, 是通过`createClone`来实现的, 具体实例的创建是被下方到`createClone`来进行. 这样就把使用和创建两个过程解耦了.

# 相关的设计模式

* 在使用享元模式(Flyweight)的时候,需要注意, 享元模式是在不同的地方使用同一个实例, 而原型模式则是生成一个与当前实例一毛一样的实例, 二者虽然内容相同,但是其实不是一样的.
* 在使用备忘录模式(Memento)的时候, 需要注意, 备忘录模式是创建一个当前实例的快照, 用于实现快照和撤销功能. 与原型模式一样使用了`Clone`方法,但是其实作用不一样.
* 在使用组合模式(Composite Pattern)和装饰器模式(Decorator Pattern)的时候, 经常需要动态的生成复杂结构的实例, 这个时候可以使用原型模式来方便的生成实例.
* 在使用命令模式(Command)的时候, 要复制其中的命令, 可以使用原型模式.
