---
title: 模板方法模式(Template Method Pattern)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: a8139d13
date: '2024-08-19 16:42:44'
---

模板方法模式（Template Method Pattern）是一种行为设计模式，它定义了一个操作的算法框架，而将一些步骤的执行延迟到子类中。模板方法使得子类可以在**不改变算法结构**的情况下，**重新定义算法的某些特定步骤**。


<!-- more -->
## UML类图

{% plantuml %}
class AbstractClass <<Abstract>> 
class ConcreteClassA extends AbstractClass
class ConcreteClassB extends AbstractClass
class (~~~) extends AbstractClass
{% endplantuml %}



## 实现一个抽象类:

```java
package cn.borgor.template_method;

public abstract class AbstractDisplay {
    public abstract void open();

    public abstract void print();

    public abstract void close();

    public final void display() {
        open();
        for (int i = 0; i < 5; i++) {
            print();
        }
        close();
    }
}
```

## 然后通过这个抽象类去实现不同的具体业务方法,如:

```java
package cn.borgor.template_method;

public class CharDisplay extends AbstractDisplay {
    @Override
    public void open() {
        System.out.println("<<");
    }

    @Override
    public void print() {
        System.out.println("A");
    }

    @Override
    public void close() {
        System.out.println(">>");
    }
}

```

```java
package cn.borgor.template_method;

public class StringDisplay extends AbstractDisplay {

    private final String string;
    private final int width;

    public StringDisplay(String string) {
        this.string = string;
        this.width = string.getBytes().length;
    }

    @Override
    public void open() {
        printLine();
    }

    @Override
    public void print() {
        System.out.println("|" + string + "|");
    }

    @Override
    public void close() {
        printLine();
    }

    private void printLine() {
        System.out.print("+");
        for (int i = 0; i < width; i++) {
            System.out.print("-");
        }
        System.out.println("+");
    }
}

```

# 模板方法模式中涉及的角色

* **抽象类（Abstract Class）** ：定义了算法的框架和扩展点。它包含一个模板方法和若干个基本方法（抽象方法和具体方法）。
* **具体类（Concrete Class）** ：继承抽象类并实现抽象方法，完成算法的特定步骤。

# 模板方法模式的特点

1. **封装不变部分**：模板方法模式将算法的不变部分封装在父类中，而将可变部分留给子类实现。
2. **扩展性**：通过继承父类并重写某些方法，可以很容易地扩展新的子类，实现算法的特定步骤。
3. **代码复用**：模板方法模式可以提高代码复用性，减少代码重复.

# 应用场景：

* 当需要在多个子类中复用相同的算法框架时。
* 当需要控制算法的扩展，但又希望在不修改现有代码的基础上进行扩展时。

> 1. 模板方法模式在不知道父类的具体实现方法的时候,子类的编写是非常困难的, 所以需要父类和子类密切配合才可以.
> 2. 模板方法模式是完全遵循03. 里氏替换原则（Liskov Substitution Principle，LSP）的.

# 相关的设计模式

1. 工厂方法模式(Factory Method Pattern), 工厂方法模式是一个使用模板方法模式的典型例子.
2. 工厂方法模式使用业务类继承抽象类的方式来改变或者多样化程序的行为, 因为具体的程序结构或者程序框架已经在父类中定义好了. 无法在继承中进行变化. 而策略模式(Strategy Pattern)则是通过委托的方式来改变程序的行为, 策略模式用来整体替换业务及算法.


