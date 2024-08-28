---
title: 桥接模式(Bridge Pattern)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: d4a89402
date: '2024-08-19 16:42:44'
thumbnail: /assets/thumbnail/design-patterns/design-pattern.jpg
---

# 一个例子

<!-- more -->
{% plantuml %}
@startuml
skinparam linetype ortho
class Display {
    - impl
    + open()
    + print()
    + close()
    + display()
}

class DisplayImpl <<Abstract>> {
    + rawOpen()
    + rawPrint()
    + rawClose()
}

class CountDisplay {
    + multiDisplay()
}

class StringDisplayImpl {
    + rawOpen()
    + rawPrint()
    + rawClose()
}

Display o-right-> DisplayImpl
Display <|-down- CountDisplay
DisplayImpl <|-down- StringDisplayImpl
@enduml
{% endplantuml %}

## 代码：

```java
package cn.borgor.bridge;

public class Display {

    private final DisplayImpl impl;

    public Display(DisplayImpl impl) {
        this.impl = impl;
    }

    public void open() {
        impl.rawOpen();
    }

    public void print() {
        impl.rawPrint();
    }

    public void close() {
        impl.rawClose();
    }

    public final void display() {
        open();
        print();
        close();
    }

}

```

```java
package cn.borgor.bridge;

public abstract class DisplayImpl {
    public abstract void rawOpen();

    public abstract void rawPrint();

    public abstract void rawClose();
}

```



```java
package cn.borgor.bridge;

public class CountDisplay extends Display {
    public CountDisplay(DisplayImpl impl) {
        super(impl);
    }

    public void multiDisplay(int times) {
        open();
        for (int i = 0; i < times; i++) {
            print();
        }
        close();
    }
}

```

```java
package cn.borgor.bridge;

public class StringDisplayImpl extends DisplayImpl {

    private final String string;
    private final int width;

    public StringDisplayImpl(String string) {
        this.string = string;
        this.width = string.getBytes().length;
    }

    @Override
    public void rawOpen() {
        printLine();
    }

    private void printLine() {
        System.out.print("+");
        for (int i = 0; i < width; i++) {
            System.out.print("-");
        }
        System.out.println("+");
    }

    @Override
    public void rawPrint() {
        System.out.println("|" + string + "|");
    }

    @Override
    public void rawClose() {
        printLine();
    }
}

```

# Bridge模式中涉及的角色

* `Abstraction`, 抽象化，它使用`Implementor`角色的方法定义了基本操作，并且保存了`Implementor`角色的实例。我们想要调用`Implementor`角色的方法时，通过这个方法来调用。
* `RefinedAbstraction`，改善后的抽象化，在`Abstraction`的基础上新增了功能。
* `Implementor`，实现者，定义了`Abstraction`角色的接口。
* `ConcreteImplementor`，具体实现者，该角色实现`Implementor`的接口。

## Bridge模式的特征

Bridge模式主要的功能就是将类的定义和类的实现分开，并且可以分开扩展。

比如：如果一个程序想要做成跨平台的，那么我们需要定义一个类的定义，也就是`Implementor`，然后分别实现不同平台的具体实现类，也就是`ConcreteImplementor`，那么无论系统添加多少功能，只需要分别实现，那么这个系统仍然可以在不同的系统上很好的工作。

在桥接模式中，虽然说使用了`extends`关键字，但是他和一般的继承关系不一样，而是一种委托关系。这样，任务就发生了转移，比如说：

* 调用`open()`的时候，实际上调用的是`impl.rawOpen()`。
* 调用`print()`的时候，实际上调用的是`impl.rawPrint()`。
* 调用`close()`的时候，实际上调用的是`impl.rawClose()`。

这样就对类的定义进行了桥接。



# 相关的设计模式

* 模板方法模式(Template Method Pattern), 在模板方法模式中，实现了累的层次结构，父类调用抽象，而子类实现抽象。而在抽象中，父类调用的也是实现，只不过这个实现对具体的实现进行了一次委托。
* 抽象工厂模式(Abstract Factory):在部分情况下，桥接模式中的`ConcreteImplementor`角色需要通过抽象工厂来实现。
* 适配器模式(Adapter Pattern)，适配器模式和桥接模式都实现了委托，但是适配器模式可以组合多个功能结构，桥接模式一般情况下只会实现定义的方法。


