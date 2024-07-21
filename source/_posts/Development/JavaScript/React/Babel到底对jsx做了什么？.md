---
title: Babel到底对jsx做了什么？
tags:
  - 源码阅读
  - React
  - Babel
categories:
  - Development
  - React
toc: true
abbrlink: 655734a7
date: 2019-11-25 16:31:21
cover: /assets/images/20191125204901.webp
---

# JSX是个啥？

`jsx`其实不是个新鲜东西，就是`react`的一个语法糖。他提供了一种方式，让我们可以在`JavaScript`代码中编写类似于`html`
标签的内容，并且会在最终编译的过程中自动将这些`HTML`标签转换为`React`可以处理的代码。

<!-- more -->

示例（[示例链接](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABAYTgWwA4IKZigCgEoBvAKEQCdsoQKl9yAeAExgDdEIAbAQwGc-AXgDk3fnwByPNNmGIYzEQqky5fKAE8u2ERDhc4FAFxVmwgHxM-GHmHPFiKBFFxREAX3eIAtJ2evGAHprW0tEINY2MMJSdyA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.7.4&externalPlugins=)）：

```jsx
function Component(){
 return ( 
    <div class='className' id='idName' style='color:red'>
      <span>{{ Content }} - content</span>
    </div>
   )
}
```

最终形成的`React`代码如下：

```javascript
"use strict";

function Component() {
  return React.createElement("div", {
    class: "className",
    id: "idName",
    style: "color:red"
  }, React.createElement("span", null, {
    Content: Content
  }, " - content"));
}
```

我们观察一下，其实是将内部返回的类html标签，转换为了一个createElement方法。

# createElement干了些什么？

我们观察一下`createElement`的源码，具体的理解已经添加到了源码的注释中了：

> 以下源码包含于`packages/react/src/ReactElement.js`
> 中，源码中没有中文注释。[源码链接]([https://github.com/facebook/react/blob/54f66731c84e3f141a1c0bc5d32be7cc5d4b9bbf/packages/react/src/ReactElement.js#L312](https://github.com/facebook/react/blob/54f66731c84e3f141a1c0bc5d32be7cc5d4b9bbf/packages/react/src/ReactElement.js#L312)

```javascript
export function createElement(type, config, children) {
  let propName;
  const props = {};
  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  // 在这段if代码中，createElement将config中传入的一些参数，
  // 也就是翻译之前类html标签中的那些组件属性（html attribute）过滤了一下，传入了props中，
  // 过滤的依据就是，属性值是否是在保留属性列表中，保留属性共有四个：key、ref、__self、__source
  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // 下面的这段代码是判断标签的子标签，并且构造一个子标签的数组。
  // 此处，react构造标签（组件，以后都称为组件）的时候并不是通过一个数组进行的，而是通过传入多个参数的方法，通过javascript中提供的arguments属性来获取额外的子组件。
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (__DEV__) {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // 为组件添加默认的一些属性
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (__DEV__) {
    if (key || ref) {
      const displayName =
        typeof type === 'function'
          ? type.displayName || type.name || 'Unknown'
          : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  // 最终，通过构造上述传入的一系列的参数，返回一个构造号的ReactElement组件
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```

# ReactElement包含的内容

`ReactElement`实则为一个方法，返回了一个`element`对象，具体如下：

```javascript
const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner,
  };
```

上面混入了一个比较奇怪的东西`$$typeof`，他是一个`ES6`新增的`Symbel`
类型，具体的作用可以参考这篇文章：[https://overreacted.io/why-do-react-elements-have-typeof-property/](https://overreacted.io/why-do-react-elements-have-typeof-property/)

而其他的几个属性具体如下：

* `type`: 组件的类型，如`div`等

* `key`：组件的标识符，标识符主要是为了优化代码的执行，如果没有`key`的话，`React`在更新`Dom`树的时候会相当的粗暴，会有很大的性能开销。

* `ref`：提供组件的引用，具体的使用会在后续讲到。

* `props`：组件的属性，包括子组件等。

* `_owner`：主要是记住创建者，这样的话可以实现组件之间的通信等功能。

# 注

在编写实验代码的时候，我注意到，如果是下面的代码：

```javascript
function Component1(){
 return (
   <div class='className' id='idName' style='color:red'>
       <span>{{ Content }} - content</span>
   </div>
 )
}

function Component2(){
 return (
   <Div class='className' id='idName' style='color:red'>
       <span>{{ Content }} - content</span>
   </Div>
 )
}
```

`Babel`会对`Component1`和`Component2`进行如下的编译转换：

```javascript
"use strict";

function Component1() {
  return React.createElement("div", {
    class: "className",
    id: "idName",
    style: "color:red"
  }, React.createElement("span", null, {
    Content: Content
  }, " - content"));
}

function Component2() {
  return React.createElement(Div, {
    class: "className",
    id: "idName",
    style: "color:red"
  }, React.createElement("span", null, {
    Content: Content
  }, " - content"));
}
```

区别在什么地方？区别在于`Component1`中，`createElement`中，第一个参数是一个字符串，`Component2`
中，第一个参数是一个组件。这样的区别意味着，`Component1`中，React会将`div`识别成一个`HTML`原生组件，`Component2`
中会在上下文中去寻找一个自定义的`Div`组件，必然是找不到的，就会抛出异常，报错。这种规定是源自于`Babel`的，原因就是`Babel`
会将大写字母开头的组件当做是自定义组件，所以我们约定，所有自定组件都要首字母大写，而原生组件则必须首字母小写。
