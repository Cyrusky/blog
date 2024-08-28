---
title: 命令模式(Command)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: bbc59605
date: '2024-08-19 16:42:43'
thumbnail: /assets/thumbnail/design-patterns/design-pattern.jpg
---

命令模式（Command Pattern）是一种行为设计模式，它将请求封装为一个对象，从而允许用户使用不同的请求、队列或日志请求来参数化其他对象，并支持可撤销的操作。命令模式通常用于以下场景：

<!-- more -->
1. **需要将操作请求与执行操作的对象分离**：这样，调用者和接收者不需要直接交互。
2. **需要对操作进行排队、记录、撤销或重做**：命令模式允许将这些操作作为对象存储和管理。
3. **需要支持宏操作**：即单个请求触发一系列操作。

### 命令模式的基本组成：

* **Command（命令）** ：定义命令的接口，声明执行操作的方法。
* **ConcreteCommand（具体命令）** ：实现Command接口，对应于具体的行为和接收者。
* **Client（客户端）** ：创建具体命令对象，并设置其接收者。
* **Invoker（调用者）** ：要求该命令执行这个请求。
* **Receiver（接收者）** ：知道如何实施与执行一个请求相关的操作。

### 命令模式的实现步骤：

1. 定义命令接口，声明一个执行操作的方法。
2. 创建具体命令类，实现命令接口，并包含一个接收者引用。
3. 创建调用者类，它聚合命令对象，并提供一个方法来执行命令。
4. 创建接收者类，它执行与请求相关的操作。

### 命令模式的优点：

* **解耦调用者和接收者**：命令对象作为调用者和接收者之间的中介。
* **扩展性**：可以很容易地添加新命令，而不需要修改现有代码。
* **支持撤销操作**：可以通过维护命令历史来实现撤销操作。
* **支持宏命令**：可以创建一个命令来封装多个命令。

### 命令模式的缺点：

* **增加系统复杂性**：可能会为系统引入更多的对象和层次。
* **命令的实现可能很复杂**：特别是当命令的实现涉及到多个类时。

# 命令模式的类图

{% plantuml %}
class Client

class ConcreteCommand {
	+ receiver
	+ execute()
}

class Receiver {
	+ action()
}

class Command {
	+ execute()
}

class Invoker {
}

Client -up-> ConcreteCommand : Creates >
ConcreteCommand o-left-|> Receiver
ConcreteCommand -up-|> Command
Command <-right-o Invoker
{% endplantuml %}
