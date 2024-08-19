---
title: 建造者模式(Builder Pattern)
tags:
  - Design Pattern
categories:
  - Development
  - Design Pattern
toc: true
cover: /assets/images/design-patterns/design-pattern.jpg
abbrlink: 3034f548
date: '2024-08-19 16:42:44'
---

# 一个例子

<!-- more -->

{% plantuml %}
@startuml
class Main

class Director {
    -builder: Builder
    +construct()
}

class Builder {
    +makeTitle()
    +makeString()
    +makeItems()
    +close()
}

class TextBuilder {
    +makeTitle()
    +makeString()
    +makeItems()
    +close()
}

class HTMLBuilder {
    +makeTitle()
    +makeString()
    +makeItems()
    +close()
}

Main -right-> Director: Uses >
Director o-right-> Builder
Builder <|-down- TextBuilder
Builder <|-- HTMLBuilder
Main -left-> TextBuilder: Uses >
Main -left-> HTMLBuilder: Uses >
@enduml
{% endplantuml %}

## 代码

```java
// Build interface
package cn.borgor.builder;

public abstract class Builder {
    public abstract void makeTitle(String title);

    public abstract void makeString(String str);

    public abstract void makeItems(String[] items);

    public abstract void close();
}

```

```java
// HTML Builder
package cn.borgor.builder;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class HTMLBuilder extends Builder {
    private String filename;
    private PrintWriter writer;

    @Override
    public void makeTitle(String title) {
        filename = title + ".html";
        try {
            writer = new PrintWriter(new FileWriter(filename));
        } catch (IOException e) {
            e.printStackTrace();
        }

        writer.println("<html><head><title>" + title + "</title></head><body>");
        writer.println("<h1>" + title + "</h1>");
    }

    @Override
    public void makeString(String str) {
        writer.println("<p>" + str + "</p>");
    }

    @Override
    public void makeItems(String[] items) {
        writer.println("<ul>");
        for (String item : items) {
            writer.println("<li>" + item + "</li>");
        }
        writer.println("</ul>");
    }

    @Override
    public void close() {
        writer.println("</body></html>");
        writer.close();
    }

    public String getResult() {
        return filename;
    }
}

```

```java
// TextBuilder
package cn.borgor.builder;

public class TextBuilder extends Builder {

    private final StringBuffer buffer = new StringBuffer();

    @Override
    public void makeTitle(String title) {
        buffer.append("==============================\n");
        buffer.append("[").append(title).append("]\n");
        buffer.append("\n");
    }

    @Override
    public void makeString(String str) {
        buffer.append("[_]").append(str).append("\n").append("\n");
    }

    @Override
    public void makeItems(String[] items) {
        for (String item : items) {
            buffer.append("  - ").append(item).append("\n");
        }
        buffer.append("\n");
    }

    @Override
    public void close() {
        buffer.append("==============================\n");
    }

    public String getResult() {
        return buffer.toString();
    }
}

```

```java
package cn.borgor.builder;

public class Director {
    private final Builder builder;

    public Director(Builder builder) {
        this.builder = builder;
    }

    public void constructor() {
        builder.makeTitle("Greeting");
        builder.makeString("From morning to afternoon");
        builder.makeItems(new String[]{
                "Good morning.",
                "Good afternoon."
        });
        builder.makeString("At night");
        builder.makeItems(new String[]{
                "Good evening.",
                "Good night.",
                "Goodbye."
        });
        builder.close();
    }

    public Builder getBuilder() {
        return builder;
    }
}

```

## 例子的说明

从上述的例子中可以看到, 我们再生成代码的时候, 只需要调用`Director`来进行构建,但是具体是如何构建的, Director并不关心, 而是有具体的`Builder`来执行.

具体的`Builder`比如: `TextBuilder`或者`HTMLBuilder`来实现,他们都继承了抽象`Builder`.

# 建造者模式中的角色

* `Builder`: 抽象建造者. 该角色规定了具体的建造者需要执行,或者提供的方法有哪些.
* `ConcreteBuilder`: 具体建造者, 具体建造者继承了抽象建造者,并且实现了了抽象建造者中规定的方法.
* `Director`: 监工, 监工角色只需要知道建造者需要的能力,也就是`Builder`抽象建造者中提供的能力即可,不需要关心具体的构建是如何完成的.
* `Client`:使用者,使用者新建一个`Director`, 而通过`Director`来调用具体的建造者去创建, 但是在具体的建造者模式中,并不包含该角色.该角色只是为了调用而创建, 在实际业务中,可以为任何程序逻辑.

# 该模式的类图

{% plantuml %}
skinparam linetype ortho

class Client
class Director {
	- builder
	+ construct()
}

interface Builder {
	protected builderPart1()
	protected builderPart2()
	protected builderPart3()
}

class ConcreteBuilder {
	protected builderPart1()
	protected builderPart2()
	protected builderPart3()
}
Builder <|.down.  ConcreteBuilder 
Client ---right---> Director: Use >
Director o-right-> Builder
Client -down-> ConcreteBuilder: Uses >
{% endplantuml %}

# 

# 相关的设计模式

* 在使用建造者模式的时候, `Director`实际上控制着`Builder`角色.而在模板方法模式(Template Method Pattern)中,是由父类控制子类的.
* 在使用组合模式(Composite Pattern)的时候, 可以有建造者模式生成的实例构建Composite模式.
* 工厂模式和抽象工厂模式(Abstract Factory)都用来生成复杂的实例.
* 在建造者模式中, 具体如何使用`Builder`提供的方法,是由`Director`来进行编排的,在上述的实例中相当于`construct`方法. 而在外观模式(Facade Pattern)中, 通过组合内部模块向外部模块提供简单的调用接口.


