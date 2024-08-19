---
title: 迭代器模式(Iterator Pattern)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: 72d314b7
date: '2024-08-19 16:42:43'
---

迭代器模式可以用如下的结构来表示：

<!-- more -->
{% plantuml %}
interface Aggregate <<Interface>> {
+iterator()
}

interface Iterator <<interface>> {
+ hasNext()
+ next()
}

class BookShelf implements Aggregate {
	- books
	- last
	+ getBookAt()
	+ appendBook()
	+ getLength()
	+ iterator()
}

class BookShelfIterator implements Iterator {
	bookShelf
	index
	+ hasNext()
	+ next()
}

class Book {
	- name
	+ getName()
}

Aggregate -right-> Iterator: Creates >
BookShelfIterator o-left- BookShelf
BookShelf o-down- Book
{% endplantuml %}

迭代器模式中有如下几个角色：

1. `Iterator`接口，规范了迭代器本身具备`hasNext`和`next`两个方法。
2. `Iterator`的具体实现类，在上述模型中，为`BookShelfIterator`，这是个类，用于执行具体的操作。
3. `Aggregate`接口，用于提供一个方法，返回迭代器，该方法在上图中为`iterator()`，他是一个迭代器的`build`方法。这里可能会使用到工厂方法（Factory Method）模式
4. `Aggregate`接口的具体实现类，需要具体到创建什么样的迭代器。

在上述的模型中，迭代和循环的过程不再依赖于具体的类实现，本身的功能全部由接口实现，这里符合了两个原则：

1. 01. 单一职责原则（Single Responsibility Principle，SRP），迭代器本身只专注于迭代，而具体的业务类，比如`Book`和`BookShelf`只需要关注自身的业务逻辑就可。
2. 02. 开放封闭原则（Open-Closed Principle，OCP），在业务发生变化的时候，无需关注循环过程，比如：如果将`BookShelf`中的`books`集合，从数组修改为一个对象或者一个`Vector`，则无需修改`Book`和`BookShelf`的代码，只需要新增一个关于`Vector`或者是对象的迭代器`Iterator`实现方法即可。
3. 04. 接口隔离原则（Interface Segregation Principle，ISP），将独立的功能模块抽离为单独的接口，并且进行实现，无需将其他的内容填充到该接口中。


