---
title: 访问者模式(Visitor)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: 83036ccf
date: '2024-08-19 16:42:43'
thumbnail: /assets/thumbnail/design-patterns/design-pattern.jpg
---

要理解Visitor模式,其实他的类图比较简单,如下:

<!-- more -->
{% plantuml %}
interface Visitor {
	+ visit(ConcreteElementA)
	+ visit(ConcreteElementB)
}

note right of Visitor: 这个接口需要依赖于具体要访问的对象. 实现了方法的重载,语言层面的特性.

class ConcreteVIsitor extends Visitor {
	+ visit(ConcreteElementA)
	+ visit(ConcreteElementB)
}


class Element {
	+ accept()
}

class ConcreteElementA extends Element {
	+ accept()
}

class ConcreteElementB extends Element {
	+ accept()
}

class ObjectStructure {}

Element  <-right-o ObjectStructure 
{% endplantuml %}



但是如果要理解具体的执行流程,还是得要看下面的时序图:

{% plantuml %}
participant Main
participant ListVisitor
participant Directory
participant FileA
participant FileB

activate Main

Main --> ListVisitor: new
Main --> Directory: accept
activate Directory
Directory -> ListVisitor: visit
activate ListVisitor
ListVisitor --> FileA: accept
activate FileA
FileA -> ListVisitor: visit
activate ListVisitor
ListVisitor --> FileA
deactivate ListVisitor
deactivate FileA

ListVisitor --> FileB: accept
activate FileB
FileB --> ListVisitor: visit
activate ListVisitor
ListVisitor -> FileB
deactivate ListVisitor
deactivate FileB

ListVisitor --> Directory
deactivate ListVisitor
Directory --> Main
deactivate Directory
{% endplantuml %}



从上图可以看出, 其实访问者模式,是创建了一个访问器,并且将访问器对象传入具体要访问的对象, 要访问的对象其实是一个具有一致性结构. 可以通过访问器的`visit`方法来进行访问

总体来说,就是将Entity的访问,委托给访问器,访问器会自行决定以何种方式来访问具体的`Entity`.

# 访问者模式的角色.

* `Visitor` 访问者, 访问者负定义如何访问每一个具体的`ConcreteElement`角色.(通过`visit`方法, 而实现这个`visit`方法的角色叫做`ConcreteVisitor`.
* `ConcreteVisitor`, 具体的访问者, 实现了`Visitor`抽象方法. 针对每一个被访问对象, 定义访问方法.
* `Element`角色, 该角色定义了可以使用`Visitor`来进行访问, 使用`accept`方法来定义.
* `ConcreteElement`方法.实现了`accept`方法, 一般的做法来说,需要再`accept`方法中持有一个`Visitor`的实例, 这样的话, 可以使用该访问者来进行访问.
* `ObjectStructure`对象结构角色.该角色负责处理`Element`角色的集合. 虽然说`ConcreteVIsitor`角色可以便利每一个`Element`角色. 但是还是需要有一个具体的数据结构来存储这些`Element`角色.

> 上述的结构中,可以看出, Visitor模式中, Element角色调用了`accept`方法, 而visitor角色调用了`visit`方法, 这就是为什么再时序图中会有一个连串双向的调用关系. 这种调用关系叫做: 消息的双重分发

> Visitor模式的主要作用是将数据结构的定义和数据结构的调用和处理进行分离, 对于上述的结构来说, 数据结构的定义由`Element`角色和`ConcreteElement`角色来决定, 但是数据的处理和调用由`VIsitor`和`ConcreteVisitor`来决定. 两处地方的分离可以让整个程序符合04. 接口隔离原则（Interface Segregation Principle，ISP）. 同时, 数据的访问和数据的定义也都符合依赖于抽象的原则,这样就符合可03. 里氏替换原则（Liskov Substitution Principle，LSP）和02. 开放封闭原则（Open-Closed Principle，OCP）. 其中的`ConcreteVisitor`和`ConcreteElement`角色都会很容易被扩展.

# 相关的设计模式

* 迭代器模式(Iterator Pattern), 迭代器模式用于逐个便利保存的数据. 但是他的数据保存(定义)和数据的访问是在一个角色中进行的.但是访问者模式对于数据的梳理进行了抽离.
* 组合模式(Composite Pattern),可以看出, 在访问者模式的`Element`定义中, 使用了组合模式, 让所有的数据结构都可以遵循一定的结构. 并且进行互访.
* 解释器模式(Interpreter), 解释器模式中, 生成了语法树之后, 会使用访问者模式来访问语法树中的每一个节点.


