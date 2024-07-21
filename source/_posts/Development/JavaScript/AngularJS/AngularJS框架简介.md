---
title: AngularJS框架简介
tags:
  - Front End
  - Develop
  - Angularjs
categories:
  - Development
  - JavaScript
toc: true
thumbnail: 'https://imgs.borgor.cn/imgs20190625083120.png'
abbrlink: 5e5f1d48
date: 2018-07-04 13:59:05
---

# MVC模式 

* ***M***：`Model`是数据的表述，`Model`并不是真正的数据，而是数据的接⼝;
* ***V***：`View`是`Model`的表现层，在`Web应⽤`用中表现为在浏览器中看到的⻚面;
* ***C***：`Controller`用来控制`Model`和`View`之间的数据流动。 (由于`MVC`模式的松耦合性，可以认为它是目前开发`C/S`和`B/S`应⽤的最佳模式) 

<!-- more -->

## AngularJS下的MVC模式

`AngularJS`通过`MVC`模式增强了了`HTML`，即`AngularJS`通过指令扩展了`HTML`，并通过表达式绑定数据到`HTML`

主要体现在: 

* 在`AngularJS`中，作用域`$scope`和`$rootScope`充当`Model`层
* 在`AngularJS`中，`html`和指令`directive`充当`View`层
* 在`AngularJS`中，控制器`controller`充当`Controller`层 

# AngularJS

## AngularJS简介

1. `AngularJS`是一个`Web应用`开发框架，主要用于构建单⻚面Web应⽤
2. `AngularJS`完全使用`JavaScript`编写，可直接在浏览器端运行 
3. `AngularJS`基于`MVC`模式设计，实现应⽤逻辑、数据模型和视图的解耦，从⽽而降低了了构建复杂应⽤的难度 
4. 开发者⽆需关注`DOM`的操作(与`jQuery`的不不同之处)，从⽽专注于业务逻辑的处理。 
5. 数据双向绑定 

## AngularJS第一个应⽤

![](https://imgs.borgor.cn/imgs/imgs-AngularJS框架简介-2019-6-25-11-1-19.png)


1. 通过`script`标签将`AngularJS`引⼊到`Web`应⽤中

```html
<script src=“https://cdn.bootcss.com/angular.js/1.4.6/angular.min.js”></script>
```

2. 定义`AngularJS`模块，定义模块控制器，为控制器注⼊`$scope`，`$scope`充当数据模型的作⽤， 定义在`$scope`上的数据可在视图中直接访问

```javascript
angular.module('myApp', [])
	.controller('myCtrl', functi**on**($scope) {
 		$scope.hello = 'hello world';
	});
```

3. 在`html`中，通过指令（`ng-app`、`ng-controller`）实例化`AngularJS`应⽤和控制器，从⽽使视图可以引⽤数据模型中的值

```html
<div ng-controller="myCtrl">
 <p>{{ hello }}</p>
</div>
```

## AngularJS模块和作⽤域

* 模块：

  在`AngularJS`，模块是定义应⽤的最佳⽅式 模块是`AngularJS`应⽤程序中的顶层组件

  ⼀个`AngularJS`应⽤可包含多个模块

* 使⽤模块的好处：

  1. 保持全局命名空间的整洁
  2. 易于在不同应⽤间复⽤代码（通过依赖注⼊）
  3. 使应⽤能以任意顺序加载代码的各部分（调整依赖注⼊的顺序来控制代码的加载）

* 模块定义⽅法：

  ```javascript
  angular.module(name, requires, config)
  ```

  > -`name`：模块的名称
  >
  > -`requires`：模块所依赖的其他模块的集合
  >
  > -`config`：模块的配置，等效于module.config()⽅法 注：

* 注意：

  1. 创建⼀个模块时，必须同时指定`name`和`requires`参数，当`requires`为空时，传⼊⼀个空数组
  2. `angular.module(name)`表示查找之前已创建的`name`模块，当查找的模块不存在时，抛出错误
  3. `ng-app`指令⽤于将⼀个模块设置为`AngularJS`应⽤的主模块，起初始化作⽤

* 示例代码

```html
<!DOCTYPE html>
<html lang="en" ng-app="myApp"> <head>
    <title>AngularJS App</title> </head>
    <body>
        <div ng-controller="myCtrl">
            <p>{{ hello }}</p>
            <p>{{ testService }}</p>
        </div>
        <script src="https://cdn.bootcss.com/angular.js/1.4.6/angular.min.js"></script>
        <script>
            /**
            * 通过模块将不同的业务逻辑封装在不同的命名空间中
            * 通过依赖注⼊将模块注⼊到另⼀模块中，从⽽可以在另⼀模块中使⽤该模块中定义的服务
            **/
            angular.module('myApp', ['testApp'])
                .controller('myCtrl', function($scope, testService) {
                $scope.hello = 'hello world';
                $scope.testService = testService;
            });
            angular.module('testApp', [])
                .factory('testService', function() {
                return {
                    name: 'ryan'
                };
            });
        </script>
    </body>
</html>
```

* 作⽤域（`scope`）：

  作⽤域是构成`AngularJS`应⽤的核⼼基础，在`AngularJS`中表现为`$scope`对象

  作⽤域是和数据模型相关联的，同时也是表达式执⾏的上下⽂

  `$scope`可以进⾏嵌套，因此可以引⽤⽗级`$scope`中的属性

  `AngularJS`的作⽤域是基于动态绑定的，因此可以在视图修改数据时⽴即更新`$scope`，也可以 在`$scope`发⽣变化时⽴即重新渲染视图，即`AngularJS`的双向数据绑定

  `AngularJS`启动并⽣成视图时，会将根`ng-app`元素同`$rootScope`进⾏绑定，`$rootScope`是所有 `$scope`对象的最上层

* `$scope`的⽣命周期

  `$scope`对象的⽣命周期有4个阶段：

  1. 创建

     在创建控制器或指令时，`AngularJS`调⽤`$injector`创建⼀个新的作⽤域，并在这个新建的控制器或指令运⾏时将作⽤域传递进去

  2. 链接

     `AngularJS`开始运⾏时，所有`$scope`对象都会附加或链接到视图中，这些`$scope`对象将会注册当`AngularJS`应⽤上下⽂发⽣变化时需要运⾏的函数

  3. 更新

     当事件循环执⾏时，它通常执⾏在`$rootScope`对象上，每个⼦作⽤域都执⾏⾃⼰的脏值检测，每个监控函数都会检查变化，如果检测到任意变化， `$scope`对象就会触发制定的回调函数

  4. 销毁

     当⼀个`$scope`在视图中不再需要时，这个作⽤域将会清理和销毁⾃⼰

## AngularJS控制器、指令、服务

* 控制器（`controller`）

  `AngularJS`的控制器本质上是⼀个函数，其作⽤是通过作⽤域（`$scope`）向视图提供数据和逻 辑，以增强视图

  控制器应保持尽量精简，不适合执⾏`DOM`操作、数据格式化和数据处理等，`DOM`操作应放在`directive`中、数据格式化应放在`filter`中、数据处理应封装到`service`中

  控制器可以进⾏嵌套，内层控制器的作⽤域继承⾃外层作⽤域

