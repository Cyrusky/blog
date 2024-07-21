---
title: React源码解读-事件注册
tags:
  - React
  - 源码
  - 思维导图
  - outline
categories:
  - Development
  - JavaScript
toc: true
cover: '/assets/images/20200103164155.webp'
abbrlink: 3f56f8e0
date: 2020-01-03 15:48:10
---

本文主要通过OutLine和思维导图的方式展现React中事件注册的流程。

<!-- more -->

点击放大查看高清图片，如果还不够清晰，请戳：[原图](/assets/imgs/React源码解读-事件绑定.png)

![](/assets/images/20200103154917.webp)

# setInitialProperties(事件绑定开始)

# setInitialDOMProperties

```typescript
参数:
params (
	tag: string,
	domElement: Element,  
	rootContainerElement: Element | Document,  
	nextProps: Object,  
	isCustomComponentTag: boolean
)
循环遍历nextProps中的props，主要的Props类型如下：
	const DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML'; 
	const SUPPRESS_CONTENT_EDITABLE_WARNING = 'suppressContentEditableWarning'; 
	const SUPPRESS_HYDRATION_WARNING = 'suppressHydrationWarning'; 
	const AUTOFOCUS = 'autoFocus'; 
	const CHILDREN = 'children'; 
	const STYLE = 'style'; 
	const HTML = '__html';
```

## 判断Props类型

### STYLE

- 为Node配置Style样式

方式为：

```javascript
const style = node.style;
style.setProperty(styleName, styleValue);
```

### DANGEROUSLY_SET_INNER_HTML

如果Node存在InnerHTML属性（他是一个可以配置InnerHTML的HTML标签）则直接使用：node.innerHTML =
html;否则，会返回县创建一个DIV，然后在其内部创建一个SVG，然后在SVG中写入html文本

### CHILDREN

如果nextProp的类型为string

- 排除空值和tag为textarea的情况
- 通过setTextContent来配置文本

如果nextProp的类型为number

- 转换成string再设置TextContent

还有一种情况，是直接被忽略了的（就是IF条件中直接忽略）

```jsx
<div className="App">
   <button onClick={() => console.log(123)}>
    Button-Text
    <div style={{ color: 'red' }}>abc</div>
   </button>
</div>
```

- 上面这种情况，Button的CHILDREN的类型为Array，这种情况其实在递归调用的时候，其子节点已经是被setInitialDOMProperities处理过的，所以直接忽略掉

### SUPPRESS_CONTENT_EDITABLE_WARNING

### SUPPRESS_HYDRATION_WARNING

### AUTOFOCUS

直接忽略

### registrationNameModules.hasOwnProperty(propKey)

如propKey名称在已注册的事件列表中，则会直接绑定事件。事件列表见:

```javascript
const interactiveEventTypeNames: Array<EventTuple> = [
    [DOMTopLevelEventTypes.TOP_BLUR, 'blur'],  
    [DOMTopLevelEventTypes.TOP_CANCEL, 'cancel'],  
    [DOMTopLevelEventTypes.TOP_CLICK, 'click'],  
    [DOMTopLevelEventTypes.TOP_CLOSE, 'close'],  
    [DOMTopLevelEventTypes.TOP_CONTEXT_MENU, 'contextMenu'],  
    [DOMTopLevelEventTypes.TOP_COPY, 'copy'],  
    [DOMTopLevelEventTypes.TOP_CUT, 'cut'],  
    [DOMTopLevelEventTypes.TOP_AUX_CLICK, 'auxClick'],  
    [DOMTopLevelEventTypes.TOP_DOUBLE_CLICK, 'doubleClick'],  
    [DOMTopLevelEventTypes.TOP_DRAG_END, 'dragEnd'],  
    [DOMTopLevelEventTypes.TOP_DRAG_START, 'dragStart'],  
    [DOMTopLevelEventTypes.TOP_DROP, 'drop'],  
    [DOMTopLevelEventTypes.TOP_FOCUS, 'focus'],  
    [DOMTopLevelEventTypes.TOP_INPUT, 'input'],  
    [DOMTopLevelEventTypes.TOP_INVALID, 'invalid'],  
    [DOMTopLevelEventTypes.TOP_KEY_DOWN, 'keyDown'],  
    [DOMTopLevelEventTypes.TOP_KEY_PRESS, 'keyPress'],  
    [DOMTopLevelEventTypes.TOP_KEY_UP, 'keyUp'],  
    [DOMTopLevelEventTypes.TOP_MOUSE_DOWN, 'mouseDown'],  
    [DOMTopLevelEventTypes.TOP_MOUSE_UP, 'mouseUp'],  
    [DOMTopLevelEventTypes.TOP_PASTE, 'paste'],  
    [DOMTopLevelEventTypes.TOP_PAUSE, 'pause'],  
    [DOMTopLevelEventTypes.TOP_PLAY, 'play'],  
    [DOMTopLevelEventTypes.TOP_POINTER_CANCEL, 'pointerCancel'],  
    [DOMTopLevelEventTypes.TOP_POINTER_DOWN, 'pointerDown'],  
    [DOMTopLevelEventTypes.TOP_POINTER_UP, 'pointerUp'],  
    [DOMTopLevelEventTypes.TOP_RATE_CHANGE, 'rateChange'],  
    [DOMTopLevelEventTypes.TOP_RESET, 'reset'],  
    [DOMTopLevelEventTypes.TOP_SEEKED, 'seeked'],  
    [DOMTopLevelEventTypes.TOP_SUBMIT, 'submit'],  
    [DOMTopLevelEventTypes.TOP_TOUCH_CANCEL, 'touchCancel'],  
    [DOMTopLevelEventTypes.TOP_TOUCH_END, 'touchEnd'],  
    [DOMTopLevelEventTypes.TOP_TOUCH_START, 'touchStart'],  
    [DOMTopLevelEventTypes.TOP_VOLUME_CHANGE, 'volumeChange'], 
];  
const nonInteractiveEventTypeNames: Array<EventTuple> = [  
    [DOMTopLevelEventTypes.TOP_ABORT, 'abort'],  
    [DOMTopLevelEventTypes.TOP_ANIMATION_END, 'animationEnd'],  
    [DOMTopLevelEventTypes.TOP_ANIMATION_ITERATION, 'animationIteration'],  
    [DOMTopLevelEventTypes.TOP_ANIMATION_START, 'animationStart'],  
    [DOMTopLevelEventTypes.TOP_CAN_PLAY, 'canPlay'],  
    [DOMTopLevelEventTypes.TOP_CAN_PLAY_THROUGH, 'canPlayThrough'],  
    [DOMTopLevelEventTypes.TOP_DRAG, 'drag'],  
    [DOMTopLevelEventTypes.TOP_DRAG_ENTER, 'dragEnter'],  
    [DOMTopLevelEventTypes.TOP_DRAG_EXIT, 'dragExit'],  
    [DOMTopLevelEventTypes.TOP_DRAG_LEAVE, 'dragLeave'],  
    [DOMTopLevelEventTypes.TOP_DRAG_OVER, 'dragOver'],  
    [DOMTopLevelEventTypes.TOP_DURATION_CHANGE, 'durationChange'],  
    [DOMTopLevelEventTypes.TOP_EMPTIED, 'emptied'],  
    [DOMTopLevelEventTypes.TOP_ENCRYPTED, 'encrypted'],  
    [DOMTopLevelEventTypes.TOP_ENDED, 'ended'],  
    [DOMTopLevelEventTypes.TOP_ERROR, 'error'],  
    [DOMTopLevelEventTypes.TOP_GOT_POINTER_CAPTURE, 'gotPointerCapture'],  
    [DOMTopLevelEventTypes.TOP_LOAD, 'load'],  
    [DOMTopLevelEventTypes.TOP_LOADED_DATA, 'loadedData'],  
    [DOMTopLevelEventTypes.TOP_LOADED_METADATA, 'loadedMetadata'],  
    [DOMTopLevelEventTypes.TOP_LOAD_START, 'loadStart'],  
    [DOMTopLevelEventTypes.TOP_LOST_POINTER_CAPTURE, 'lostPointerCapture'],  
    [DOMTopLevelEventTypes.TOP_MOUSE_MOVE, 'mouseMove'],  
    [DOMTopLevelEventTypes.TOP_MOUSE_OUT, 'mouseOut'],  
    [DOMTopLevelEventTypes.TOP_MOUSE_OVER, 'mouseOver'],  
    [DOMTopLevelEventTypes.TOP_PLAYING, 'playing'],  
    [DOMTopLevelEventTypes.TOP_POINTER_MOVE, 'pointerMove'],  
    [DOMTopLevelEventTypes.TOP_POINTER_OUT, 'pointerOut'],  
    [DOMTopLevelEventTypes.TOP_POINTER_OVER, 'pointerOver'],  
    [DOMTopLevelEventTypes.TOP_PROGRESS, 'progress'],  
    [DOMTopLevelEventTypes.TOP_SCROLL, 'scroll'],  
    [DOMTopLevelEventTypes.TOP_SEEKING, 'seeking'],  
    [DOMTopLevelEventTypes.TOP_STALLED, 'stalled'],  
    [DOMTopLevelEventTypes.TOP_SUSPEND, 'suspend'],  
    [DOMTopLevelEventTypes.TOP_TIME_UPDATE, 'timeUpdate'],  
    [DOMTopLevelEventTypes.TOP_TOGGLE, 'toggle'],  
    [DOMTopLevelEventTypes.TOP_TOUCH_MOVE, 'touchMove'],  
    [DOMTopLevelEventTypes.TOP_TRANSITION_END, 'transitionEnd'],  
    [DOMTopLevelEventTypes.TOP_WAITING, 'waiting'],  
    [DOMTopLevelEventTypes.TOP_WHEEL, 'wheel']
];
```

## 其他PropsKey不为空的情况

### setValueForProperty

- 直接在Node上调用setAttribute

# ensureListeningTo

确保一件事情：保证其事件是绑定到RootContainer上的，如果当前的rootContainerElement是一个DOCUMENT_NODE或者一个DOCUMENT_FRAGMENT_NODE，那么将事件绑定到自身元素的rootContainerElement上，否则去寻找其ownerDocument，并绑定。

> rootContainerElement是哪里来的？
>
> ​ 在CreateElement的时候第二个参数就是rootContainerElement，其实就是一个原生的DOM节点。

## publishRegistrationName

用于获取事件的依赖，也就是dependence

```javascript
export function listenTo(
	registrationName: string,  mountAt: Document | Element
) // 此处的mountAt就是上面说的rootContainerElement
```

> listenTo会将所有react事件的Dependence绑定到rootContainerElement上。

> 在js中可以这么写，但是在其他的语言中，比如python，数组（列表）长度的获取是有一定的消耗的，不建议写在循环体中。
>
> ```javascript
>  for (let i = 0; i < dependencies.length; i++) {
>    ....
>  }
> ```

### 事件捕获

- trapCapturedEvent

### 事件冒泡

- trapBubbledEvent

### isInteractiveTopLevelEventType

· 判断一个事件是不是交互事件，从而提供不同的`dispatch`

- 具体是否信息是在addEventTypeNameToConfig中添加的，而判断依据为：
    - addEventCaptureListener添加捕获绑定

      ```typescript
      export function addEventCaptureListener(
       element: Document | Element,
       eventType: string,
       listener: Function,
      ): void {
       element.addEventListener(eventType, listener, true);
      }
      ```

    - addEventBubbleListener添加冒泡绑定

      ```typescript
      export function addEventBubbleListener(
       element: Document | Element,
       eventType: string,
       listener: Function,
      ): void {
       element.addEventListener(eventType, listener, false);
      }
      ```

· 事件绑定结束

• 事实上，每次绑定的时候都会去创建一个新的dispatchEvent方法，并将其绑定到FiberNode上面，在事件发生时，直接调用该dispatchEvent。

• export function dispatchEvent(
topLevelType: DOMTopLevelEventType,
nativeEvent: AnyNativeEvent,
)

# EventType

- SimpleEventPlugin
    - interactiveEventTypeNames
        - [DOMTopLevelEventTypes.TOP_BLUR, 'blur'],
        - [DOMTopLevelEventTypes.TOP_CANCEL, 'cancel'],
        - [DOMTopLevelEventTypes.TOP_CLICK, 'click'],
        - [DOMTopLevelEventTypes.TOP_CLOSE, 'close'],
        - [DOMTopLevelEventTypes.TOP_CONTEXT_MENU, 'contextMenu'],
        - [DOMTopLevelEventTypes.TOP_COPY, 'copy'],
        - [DOMTopLevelEventTypes.TOP_CUT, 'cut'],
        - [DOMTopLevelEventTypes.TOP_AUX_CLICK, 'auxClick'],
        - [DOMTopLevelEventTypes.TOP_DOUBLE_CLICK, 'doubleClick'],
        - [DOMTopLevelEventTypes.TOP_DRAG_END, 'dragEnd'],
        - [DOMTopLevelEventTypes.TOP_DRAG_START, 'dragStart'],
        - [DOMTopLevelEventTypes.TOP_DROP, 'drop'],
        - [DOMTopLevelEventTypes.TOP_FOCUS, 'focus'],
        - [DOMTopLevelEventTypes.TOP_INPUT, 'input'],
        - [DOMTopLevelEventTypes.TOP_INVALID, 'invalid'],
        - [DOMTopLevelEventTypes.TOP_KEY_DOWN, 'keyDown'],
        - [DOMTopLevelEventTypes.TOP_KEY_PRESS, 'keyPress'],
        - [DOMTopLevelEventTypes.TOP_KEY_UP, 'keyUp'],
        - [DOMTopLevelEventTypes.TOP_MOUSE_DOWN, 'mouseDown'],
        - [DOMTopLevelEventTypes.TOP_MOUSE_UP, 'mouseUp'],
        - [DOMTopLevelEventTypes.TOP_PASTE, 'paste'],
        - [DOMTopLevelEventTypes.TOP_PAUSE, 'pause'],
        - [DOMTopLevelEventTypes.TOP_PLAY, 'play'],
        - [DOMTopLevelEventTypes.TOP_POINTER_CANCEL, 'pointerCancel'],
        - [DOMTopLevelEventTypes.TOP_POINTER_DOWN, 'pointerDown'],
        - [DOMTopLevelEventTypes.TOP_POINTER_UP, 'pointerUp'],
        - [DOMTopLevelEventTypes.TOP_RATE_CHANGE, 'rateChange'],
        - [DOMTopLevelEventTypes.TOP_RESET, 'reset'],
        - [DOMTopLevelEventTypes.TOP_SEEKED, 'seeked'],
        - [DOMTopLevelEventTypes.TOP_SUBMIT, 'submit'],
        - [DOMTopLevelEventTypes.TOP_TOUCH_CANCEL, 'touchCancel'],
        - [DOMTopLevelEventTypes.TOP_TOUCH_END, 'touchEnd'],
        - [DOMTopLevelEventTypes.TOP_TOUCH_START, 'touchStart'],
        - [DOMTopLevelEventTypes.TOP_VOLUME_CHANGE, 'volumeChange']
    - nonInteractiveEventTypeNames
        - [DOMTopLevelEventTypes.TOP_ABORT, 'abort'],
        - [DOMTopLevelEventTypes.TOP_ANIMATION_END, 'animationEnd'],
        - [DOMTopLevelEventTypes.TOP_ANIMATION_ITERATION, 'animationIteration'],
        - [DOMTopLevelEventTypes.TOP_ANIMATION_START, 'animationStart'],
        - [DOMTopLevelEventTypes.TOP_CAN_PLAY, 'canPlay'],
        - [DOMTopLevelEventTypes.TOP_CAN_PLAY_THROUGH, 'canPlayThrough'],
        - [DOMTopLevelEventTypes.TOP_DRAG, 'drag'],
        - [DOMTopLevelEventTypes.TOP_DRAG_ENTER, 'dragEnter'],
        - [DOMTopLevelEventTypes.TOP_DRAG_EXIT, 'dragExit'],
        - [DOMTopLevelEventTypes.TOP_DRAG_LEAVE, 'dragLeave'],
        - [DOMTopLevelEventTypes.TOP_DRAG_OVER, 'dragOver'],
        - [DOMTopLevelEventTypes.TOP_DURATION_CHANGE, 'durationChange'],
        - [DOMTopLevelEventTypes.TOP_EMPTIED, 'emptied'],
        - [DOMTopLevelEventTypes.TOP_ENCRYPTED, 'encrypted'],
        - [DOMTopLevelEventTypes.TOP_ENDED, 'ended'],
        - [DOMTopLevelEventTypes.TOP_ERROR, 'error'],
        - [DOMTopLevelEventTypes.TOP_GOT_POINTER_CAPTURE, 'gotPointerCapture'],
        - [DOMTopLevelEventTypes.TOP_LOAD, 'load'],
        - [DOMTopLevelEventTypes.TOP_LOADED_DATA, 'loadedData'],
        - [DOMTopLevelEventTypes.TOP_LOADED_METADATA, 'loadedMetadata'],
        - [DOMTopLevelEventTypes.TOP_LOAD_START, 'loadStart'],
        - [DOMTopLevelEventTypes.TOP_LOST_POINTER_CAPTURE, 'lostPointerCapture'],
        - [DOMTopLevelEventTypes.TOP_MOUSE_MOVE, 'mouseMove'],
        - [DOMTopLevelEventTypes.TOP_MOUSE_OUT, 'mouseOut'],
        - [DOMTopLevelEventTypes.TOP_MOUSE_OVER, 'mouseOver'],
        - [DOMTopLevelEventTypes.TOP_PLAYING, 'playing'],
        - [DOMTopLevelEventTypes.TOP_POINTER_MOVE, 'pointerMove'],
        - [DOMTopLevelEventTypes.TOP_POINTER_OUT, 'pointerOut'],
        - [DOMTopLevelEventTypes.TOP_POINTER_OVER, 'pointerOver'],
        - [DOMTopLevelEventTypes.TOP_PROGRESS, 'progress'],
        - [DOMTopLevelEventTypes.TOP_SCROLL, 'scroll'],
        - [DOMTopLevelEventTypes.TOP_SEEKING, 'seeking'],
        - [DOMTopLevelEventTypes.TOP_STALLED, 'stalled'],
        - [DOMTopLevelEventTypes.TOP_SUSPEND, 'suspend'],
        - [DOMTopLevelEventTypes.TOP_TIME_UPDATE, 'timeUpdate'],
        - [DOMTopLevelEventTypes.TOP_TOGGLE, 'toggle'],
        - [DOMTopLevelEventTypes.TOP_TOUCH_MOVE, 'touchMove'],
        - [DOMTopLevelEventTypes.TOP_TRANSITION_END, 'transitionEnd'],
        - [DOMTopLevelEventTypes.TOP_WAITING, 'waiting'],
        - [DOMTopLevelEventTypes.TOP_WHEEL, 'wheel']
- EnterLeaveEventPlugin
    - onMouseEnter
    - onMouseLeave
    - onPointerEnter
    - onPointerLeave
- ChangeEventPlugin
    - onChange
- SelectEventPlugin
    - onSelect
- BeforeInputEventPlugin
    - onBeforeInput
    - onCompositionEnd
    - onCompositionStart
    - onCompositionUpdate

# setInitialProperties

将Element的事件Props按照相应的规则，绑定到RootContainerElement上

# createElement

```javascript
export function createElement(
    type: string,  
    props: Object,
    rootContainerElement: Element | Document,  
    parentNamespace: string, 
): Element
```

- 判断是否为HTML元素，getIntrinsicNamespace

- 判断是否为HTML元素，除此之外，还有SVG和Math元素

  ```javascript
  const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  const MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  ```
    - Script元素，创建一个DIV标签，并将其InnerHTML写为空script标签

    - 如果props.is === string， 会将该props传入原生DOM创建中

    - 其他，即为customComponentTag

    - 最终都会调用原生的DOM创建语法创建DOM

        - > https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement

- 否则创建相应的Element，包括SVG和MATH

# EventPluginHub

## injection

### injectEventPluginOrder

- InjectedOrder
    - 'ResponderEventPlugin',
    - 'SimpleEventPlugin',
    - 'EnterLeaveEventPlugin',
    - 'ChangeEventPlugin',
    - 'SelectEventPlugin',
    - 'BeforeInputEventPlugin',

### injectEventPluginsByName

按照上面的顺序，将所有的时间插件（`EventPlugins`）注册到`namesToPlugins`
中，在过程中，如果顺序发生了变化，需要调用`recomputePluginOrdering`重新排序

其中，`namesToPlugins`（对象）来存放`eventPluginName->eventPlugin的映射，而plugins`（Array）中，保持`eventPlugin的`顺序

### getListener

```javascript
export function getListener(
   inst: Fiber, 
   registrationName: string
)
```

获取到Fiber中的StateNode，然后获取StateNode的Props中的registrationName为名的Listener
