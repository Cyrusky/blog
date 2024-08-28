---
title: 单例模式(Singleton Pattern)
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

单例模式是一种常见的创建型设计模式，它确保一个类只有一个实例，并提供一个全局访问点。以下是一些单例模式的应用场景：

<!-- more -->
1. **配置管理器**：当配置信息需要在多个组件之间共享时，可以使用单例模式来确保配置信息的一致性。
2. **连接池**<span data-type="text" style="background-color: var(--b3-font-background9);">：数据库连接池通常使用单例模式，以确保应用程序在运行期间只有一个连接池实例，从而有效管理数据库连接。</span>
3. **硬件管理器**：对于需要访问特定硬件资源（如打印机、扫描仪等）的应用程序，可以使用单例模式来确保对这些资源的集中管理。
4. **日志记录器**：日志系统通常需要全局访问，以便在应用程序的任何地方记录信息。单例模式可以确保日志记录器的单实例访问。
5. **应用程序设置**：应用程序设置（如主题、语言等）通常在应用程序的整个生命周期内保持不变，适合使用单例模式。
6. **资源管理器**：对于需要管理有限资源（如内存、文件句柄等）的系统，单例模式可以确保资源的有效分配和回收。
7. **GUI 应用程序中的窗口管理**：在某些GUI应用程序中，可能需要确保某些窗口类型在整个应用程序中只有一个实例，例如设置窗口或帮助窗口。
8. **线程管理**：在多线程应用程序中，可以使用单例模式来管理线程的创建和执行，例如，一个应用程序可能只需要一个后台线程来处理特定的任务。
9. **缓存管理器**：缓存系统可以使用单例模式来确保缓存数据的一致性和有效管理。
10. **注册表管理器**：在需要全局访问注册表或配置信息的系统中，单例模式可以确保这些信息的集中管理和访问。
11. **状态监视器**：在需要监控应用程序状态（如在线用户数、系统负载等）的系统中，单例模式可以确保状态信息的一致性和准确性。
12. **服务定位器**：服务定位器模式中，可以使用单例模式来提供一个集中的访问点，用于查找和访问应用程序中的服务。

使用单例模式时，需要注意确保**线程安全和懒加载**（如果需要的话），以避免潜在的性能问题和资源竞争。此外，**单例模式可能会使单元测试变得复杂**，因此在某些情况下可能需要考虑使用其他设计模式或方法。

# 单例模式的类图

{% plantuml %}
class Singleton {
	- static instance
	- Singleton()
	+ static getInstance()
}
{% endplantuml %}

```java
package cn.borgor.singleton;

public class Singleton {
    private static final Singleton singleton = new Singleton();

    private Singleton() {
        System.out.println("Create instance");
    }

    public static Singleton getInstance() {
        return singleton;
    }
}

{% endplantuml %}


