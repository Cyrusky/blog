---
title: 组合模式(Composite Pattern)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: af4817e5
date: '2024-08-19 16:42:44'
---

# 一个例子

<!-- more -->
{% plantuml %}
@startuml
skinparam linetype ortho
class Entity {
    + getName()
    + getSize()
    + printList()
    + add()
}

class File extends Entity {
    - name
    - size
    + getName()
    + getSize()
    + printList()
}

class Directory extends Entity {
    - name
    - size
    + getName()
    + getSize()
    + printList()
    + add()
}

Directory o-up-> Entity

@enduml
{% endplantuml %}

# Composite模式中的角色

* `Leaf`, 树叶，该角色不能放入其他角色中。
* `Composite`，复合物，复合物中，可以递归包含`Composite`或者包含`Leaf`。
* `Component`，这是一个父类，用于定义复合物和一致性角色，也就是说，`Leaf`和`Composite`继承了这个类。
* `Client`，用于调用`Component`

# Composite模式的类图

{% plantuml %}
@startuml
class Client
class Component {
    + method1()
    + method2()
    + add()
    + remove()
    + getChild()
}

class Leaf extends Component
class Composite extends Component

Composite o--> Component
Client -right-> Component: Uses >
@enduml
{% endplantuml %}

# 相关的设计模式

* 命令模式(Command), 命令模式中，在编写宏命令时会使用到Composite模式
* 访问者模式(Visitor)， 可以使用Visitor模式来访问Composite模式中的地柜结构。
* 装饰器模式(Decorator Pattern)，装饰器模式中，使装饰框和内容具有一致性，Composite模式是Composite和Leaf具有一致性。

# 装饰器模式的类图

{% plantuml %}
@startuml
class Component <<abstract>> {
    + method1()
    + method2()
    + method3()
}

class ConcreteComponent extends Component
class Decorator extends Component {
    - component
}
class ConcreteDecorator extends Decorator

Decorator o--> Component
@enduml
{% endplantuml %}

# 装饰器模式中涉及的角色

* `Component`，增加功能的时候的核心角色，所有内容都应该继承自该角色。
* `ConcreteComponent`，具体的被装饰对象，`Decorator`角色中会持有一个该角色的实例。
* `Decorator`，装饰器角色，装饰器角色具有与`Component`相同的`api`，在内部都持有了被装饰的对象。
* `ConcreteDecorator`，具体的装饰器对象，继承了`Decorator`角色，但是实现了不同的装饰方法。

# 装饰器模式的特性

* 接口的透明性。
* 在不改变被装饰物的情况下增加新的功能。
* 可以动态的增加功能。
* 只需要一些装饰物就可以添加许多功能。
* 在使用装饰器模式的时候需要由节制，但是会增加很多的类。

# 相关的设计模式

* 适配器模式(Adapter Pattern)， 装饰器模式不会改变接口的前提下添加功能，而适配器模式是用于组合不同的功能。
* 策略模式(Strategy Pattern)，策略模式可以通过改变整体的算法来改变类的功能，装饰器模式通过添加装饰框来添加功能。
* 
