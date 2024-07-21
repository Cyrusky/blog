---
title: AngularJS的基本架构与相关概念
tags:
  - 开发
categories:
  - Development
  - JavaScript
toc: true
cover: /assets/images/imgs20190625083120.webp
abbrlink: 124bd80f
date: 2018-06-21T11:37:35.000Z
thumbnail: /assets/thumbnail/imgs20190625083120.webp
---

# Base Architecture of AngularJS

Official diagram of introduction for AngularJS：

<!-- more -->

![](/assets/images/imgs-AngularJS基础架构与相关概念-2019-6-25-10-58-22.webp)

其中包括了一些主要的部分，列表如下：

| Concept                                                               | Description                                                                                                                      |
|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| [Template](https://docs.angularjs.org/guide/concepts#template)        | HTML with additional markup                                                                                                      |
| [Directives](https://docs.angularjs.org/guide/concepts#directive)     | extend HTML with custom attributes and elements                                                                                  |
| [Model](https://docs.angularjs.org/guide/concepts#model)              | the data shown to the user in the view and with which the user interacts                                                         |
| [Scope](https://docs.angularjs.org/guide/concepts#scope)              | context where the model is stored so that controllers, directives and expressions can access it                                  |
| [Expressions](https://docs.angularjs.org/guide/concepts#expression)   | access variables and functions from the scope                                                                                    |
| [Compiler](https://docs.angularjs.org/guide/concepts#compiler)        | parses the template and instantiates directives and expressions                                                                  |
| [Filter](https://docs.angularjs.org/guide/concepts#filter)            | formats the value of an expression for display to the user                                                                       |
| [View](https://docs.angularjs.org/guide/concepts#view)                | what the user sees (the DOM)                                                                                                     |
| [Data Binding](https://docs.angularjs.org/guide/concepts#databinding) | sync data between the model and the view                                                                                         |
| [Controller](https://docs.angularjs.org/guide/concepts#controller)    | the business logic behind views                                                                                                  |
| [Dependency Injection](https://docs.angularjs.org/guide/concepts#di)  | Creates and wires objects and functions                                                                                          |
| [Injector](https://docs.angularjs.org/guide/concepts#injector)        | dependency injection container                                                                                                   |
| [Module](https://docs.angularjs.org/guide/concepts#module)            | a container for the different parts of an app including controllers, services, filters, directives which configures the Injector |
| [Service](https://docs.angularjs.org/guide/concepts#service)          | reusable business logic independent of views                                                                                     |

## 1. Module

You can think of a module as a container for the different parts of your app – controllers, services, filters,
directives, etc.

Most applications have a main method that instantiates and wires together the different parts of the application.

AngularJS apps don't have a main method. Instead modules declaratively specify how an application should be
bootstrapped. There are several advantages to this approach:

- The declarative process is easier to understand.
- You can package code as reusable modules.
- The modules can be loaded in any order (or even in parallel) because modules delay execution.
- Unit tests only have to load relevant modules, which keeps them fast.
- End-to-end tests can use modules to override configuration.

## 2. Scope

### 2.1 Scope characteristics

- Scopes provide APIs ([$watch](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch)) to observe model
  mutations.

- Scopes provide APIs ([$apply](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$apply)) to propagate any model
  changes through the system into the view from outside of the "AngularJS realm" (controllers, services, AngularJS event
  handlers).

- Scopes can be nested to limit access to the properties of application components while providing access to shared
  model properties. Nested scopes are either "child scopes" or "isolate scopes". A "child scope" (prototypically)
  inherits properties from its parent scope. An "isolate scope" does not.
  See [isolated scopes](https://docs.angularjs.org/guide/directive#isolating-the-scope-of-a-directive) for more
  information.

- Scopes provide context against which [expressions](https://docs.angularjs.org/guide/expression) are evaluated. For
  example `{{username}}` expression is meaningless, unless it is evaluated against a specific scope which defines
  the `username` property.

### 2.2 Scope as Data-Model

Scope is the glue between application controller and the view. During the
template [linking](https://docs.angularjs.org/guide/compiler) phase
the [directives](https://docs.angularjs.org/api/ng/provider/$compileProvider#directive) set
up [`$watch`](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch) expressions on the scope. The `$watch`
allows the directives to be notified of property changes, which allows the directive to render the updated value to the
DOM.

Both controllers and directives have reference to the scope, but not to each other. This arrangement isolates the
controller from the directive as well as from the DOM. This is an important point since it makes the controllers view
agnostic, which greatly improves the testing story of the applications.

```javascript
angular.module('scopeExample', [])
.controller('MyController', ['$scope', function($scope) {
  $scope.username = 'World';

  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.username + '!';
  };
}]);
```

```html
<div ng-controller="MyController">
  Your name:
    <input type="text" ng-model="username">
    <button ng-click='sayHello()'>greet</button>
  <hr>
  {{greeting}}
</div>
```

In the above example notice that the `MyController` assigns `World` to the `username` property of the scope. The scope
then notifies the `input` of the assignment, which then renders the input with username pre-filled. This demonstrates
how a controller can write data into the scope.

Similarly the controller can assign behavior to scope as seen by the `sayHello` method, which is invoked when the user
clicks on the 'greet' button. The `sayHello` method can read the `username` property and create a `greeting` property.
This demonstrates that the properties on scope update automatically when they are bound to HTML input widgets.

Logically the rendering of `{{greeting}}` involves:

- retrieval of the scope associated with DOM node where `{{greeting}}` is defined in template. In this example this is
  the same scope as the scope which was passed into `MyController`. (We will discuss scope hierarchies later.)
- Evaluate the `greeting` [expression](https://docs.angularjs.org/guide/expression) against the scope retrieved above,
  and assign the result to the text of the enclosing DOM element.

You can think of the scope and its properties as the data which is used to render the view. The scope is the single
source-of-truth for all things view related.

From a testability point of view, the separation of the controller and the view is desirable, because it allows us to
test the behavior without being distracted by the rendering details.

```javascript
it('should say hello', function() {
  var scopeMock = {};
  var cntl = new MyController(scopeMock);

  // Assert that username is pre-filled
  expect(scopeMock.username).toEqual('World');

  // Assert that we read new username and greet
  scopeMock.username = 'angular';
  scopeMock.sayHello();
  expect(scopeMock.greeting).toEqual('Hello angular!');
  });
```

### 2.3 Scope Hierarchies

Each AngularJS application has exactly one [root scope](https://docs.angularjs.org/api/ng/service/$rootScope), but may
have any number of child scopes.

The application can have multiple scopes, because [directives](https://docs.angularjs.org/guide/directive) can create
new child scopes. When new scopes are created, they are added as children of their parent scope. This creates a tree
structure which parallels the DOM where they're attached.

The section [Directives that Create Scopes](https://docs.angularjs.org/guide/scope#directives-that-create-scopes) has
more info about which directives create scopes.

When AngularJS evaluates `{{name}}`, it first looks at the scope associated with the given element for the `name`
property. If no such property is found, it searches the parent scope and so on until the root scope is reached. In
JavaScript this behavior is known as prototypical inheritance, and child scopes prototypically inherit from their
parents.

This example illustrates scopes in application, and prototypical inheritance of properties. The example is followed by a
diagram depicting the scope boundaries.

![](/assets/images/imgs-AngularJS基础架构与相关概念-2019-6-25-11-1-11.webp)

### 2.4 Scope Life Cycle

The normal flow of a browser receiving an event is that it executes a corresponding JavaScript callback. Once the
callback completes the browser re-renders the DOM and returns to waiting for more events.

When the browser calls into JavaScript the code executes outside the AngularJS execution context, which means that
AngularJS is unaware of model modifications. To properly process model modifications the execution has to enter the
AngularJS execution context using the [`$apply`](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$apply) method.
Only model modifications which execute inside the `$apply` method will be properly accounted for by AngularJS. For
example if a directive listens on DOM events, such as [`ng-click`](https://docs.angularjs.org/api/ng/directive/ngClick)
it must evaluate the expression inside the `$apply`method.

After evaluating the expression, the `$apply` method performs
a [`$digest`](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$digest). In the $digest phase the scope examines
all of the `$watch`expressions and compares them with the previous value. This dirty checking is done asynchronously.
This means that assignment such as `$scope.username="angular"` will not immediately cause a `$watch` to be notified,
instead the `$watch` notification is delayed until the `$digest` phase. This delay is desirable, since it coalesces
multiple model updates into one `$watch` notification as well as guarantees that during the `$watch` notification no
other `$watch`es are running. If a `$watch` changes the value of the model, it will force additional`$digest` cycle.

1. **Creation**

   The [root scope](https://docs.angularjs.org/api/ng/service/$rootScope) is created during the application bootstrap by
   the [$injector](https://docs.angularjs.org/api/auto/service/$injector). During template linking, some directives
   create new child scopes.

2. **Watcher registration**

   During template linking, directives
   register [watches](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch) on the scope. These watches will
   be used to propagate model values to the DOM.

3. **Model mutation**

   For mutations to be properly observed, you should make them only within
   the [scope.$apply()](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$apply). AngularJS APIs do this
   implicitly, so no extra `$apply` call is needed when doing synchronous work in controllers, or asynchronous work
   with [$http](https://docs.angularjs.org/api/ng/service/$http), [$timeout](https://docs.angularjs.org/api/ng/service/$timeout)
   or [$interval](https://docs.angularjs.org/api/ng/service/$interval)services.

4. **Mutation observation**

   At the end of `$apply`, AngularJS performs
   a [$digest](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$digest) cycle on the root scope, which then
   propagates throughout all child scopes. During the `$digest` cycle, all `$watch`ed expressions or functions are
   checked for model mutation and if a mutation is detected, the `$watch` listener is called.

5. **Scope destruction**

   When child scopes are no longer needed, it is the responsibility of the child scope creator to destroy them
   via [scope.$destroy()](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$destroy) API. This will stop
   propagation of `$digest` calls into the child scope and allow for memory used by the child scope models to be
   reclaimed by the garbage collector.

## 3. Controller

In AngularJS, a Controller is defined by a JavaScript **constructor function** that is used to augment
the [AngularJS Scope](https://docs.angularjs.org/guide/scope).

Controllers can be attached to the DOM in different ways. For each of them, AngularJS will instantiate a new Controller
object, using the specified Controller's **constructor function**:

- the [ngController](https://docs.angularjs.org/api/ng/directive/ngController) directive. A new **child scope** will be
  created and made available as an injectable parameter to the Controller's constructor function as `$scope`.
- a route controller in a [$route definition](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider).
- the controller of a [regular directive](https://docs.angularjs.org/guide/directive), or
  a [component directive](https://docs.angularjs.org/guide/component).

If the controller has been attached using the `controller as` syntax then the controller instance will be assigned to a
property on the scope.

Use controllers to:

- Set up the initial state of the `$scope` object.
- Add behavior to the `$scope` object.

Do not use controllers to:

- Manipulate DOM — Controllers should contain only business logic. Putting any presentation logic into Controllers
  significantly affects its testability. AngularJS has [databinding](https://docs.angularjs.org/guide/databinding) for
  most cases and [directives](https://docs.angularjs.org/guide/directive) to encapsulate manual DOM manipulation.
- Format input — Use [AngularJS form controls](https://docs.angularjs.org/guide/forms) instead.
- Filter output — Use [AngularJS filters](https://docs.angularjs.org/guide/filter) instead.
- Share code or state across controllers — Use [AngularJS services](https://docs.angularjs.org/guide/services) instead.
- Manage the life-cycle of other components (for example, to create service instances).

In general, a Controller shouldn't try to do too much. It should contain only the business logic needed for a single
view.

The most common way to keep Controllers slim is by encapsulating work that doesn't belong to controllers into services
and then using these services in Controllers via dependency injection. This is discussed in
the [Dependency Injection](https://docs.angularjs.org/guide/di)
and [Services](https://docs.angularjs.org/guide/services) sections of this guide.

## 4. Directive

At a high level, directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that
tell AngularJS's **HTML compiler** ([`$compile`](https://docs.angularjs.org/api/ng/service/$compile)) to attach a
specified behavior to that DOM element (e.g. via event listeners), or even to transform the DOM element and its
children.

AngularJS comes with a set of these directives built-in, like `ngBind`, `ngModel`, and `ngClass`. Much like you create
controllers and services, you can create your own directives for AngularJS to use. When
AngularJS [bootstraps](https://docs.angularjs.org/guide/bootstrap) your application,
the [HTML compiler](https://docs.angularjs.org/guide/compiler)traverses the DOM matching directives against the DOM
elements.

### 4.1 Creating Directives

First let's talk about
the [API for registering directives](https://docs.angularjs.org/api/ng/provider/$compileProvider#directive). Much like
controllers, directives are registered on modules. To register a directive, you use the `module.directive`
API. `module.directive` takes the [normalized](https://docs.angularjs.org/guide/directive#matching-directives) directive
name followed by a **factory function.** This factory function should return an object with the different options to
tell `$compile` how the directive should behave when matched.

The factory function is invoked only once when the [compiler](https://docs.angularjs.org/api/ng/service/$compile)
matches the directive for the first time. You can perform any initialization work here. The function is invoked
using [$injector.invoke](https://docs.angularjs.org/api/auto/service/$injector#invoke) which makes it injectable just
like a controller.

We'll go over a few common examples of directives, then dive deep into the different options and compilation process.

> **Best Practice:** In order to avoid collisions with some future standard, it's best to prefix your own directive
> names. For instance, if you created a `<carousel>` directive, it would be problematic if HTML7 introduced the same
> element. A two or three letter prefix (e.g. `btfCarousel`) works well. Similarly, do not prefix your own directives
> with `ng` or they might conflict with directives included in a future version of AngularJS.

For the following examples, we'll use the prefix `my` (e.g. `myCustomer`).

For the following examples, we'll use the prefix `my` (e.g. `myCustomer`).

### Template-expanding directive

Let's say you have a chunk of your template that represents a customer's information. This template is repeated many
times in your code. When you change it in one place, you have to change it in several others. This is a good opportunity
to use a directive to simplify your template.

Let's create a directive that simply replaces its contents with a static template:

```javascript
angular.module('docsSimpleDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
}])
.directive('myCustomer', function() {
  return {
    template: 'Name: {{customer.name}} Address: {{customer.address}}'
  };
});
```

```html
<div ng-controller="Controller">
  <div my-customer></div>
</div>
```

Notice that we have bindings in this directive. After`$compile`compiles and links`<div my-customer></div>`, it will try
to match directives on the element's children. This means you can compose directives of other directives. We'll see how
to do that in[an example](https://docs.angularjs.org/guide/directive#creating-directives-that-communicate)below.

In the example above we in-lined the value of the `template` option, but this will become annoying as the size of your
template grows.

> **Best Practice:** Unless your template is very small, it's typically better to break it apart into its own HTML file
> and load it with the `templateUrl` option.

If you are familiar with `ngInclude`, `templateUrl` works just like it. Here's the same example using `templateUrl`
instead:

```javascript
angular.module('docsTemplateUrlDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
}])
.directive('myCustomer', function() {
  return {
    templateUrl: 'my-customer.html'
  };
});
```

```html
<div ng-controller="Controller">
  <div my-customer></div>
</div>
```

```html
Name: {{customer.name}} Address: {{customer.address}}
```

`templateUrl`can also be a function which returns the URL of an HTML template to be loaded and used for the directive.
AngularJS will call the`templateUrl`function with two parameters: the element that the directive was called on, and
an`attr`object associated with that element.

> The `restrict` option is typically set to:
>
> - `'A'` - only matches attribute name
> - `'E'` - only matches element name
> - `'C'` - only matches class name
> - `'M'` - only matches comment
>
> These restrictions can all be combined as needed:
>
> - `'AEC'` - matches either attribute or element or class name
>
> Let's change our directive to use `restrict: 'E'`:

## 6. Filter

Filters format the value of an expression for display to the user. They can be used in view templates, controllers or
services. AngularJS comes with a collection of [built-in filters](https://docs.angularjs.org/api/ng/filter), but it is
easy to define your own as well.

The underlying API is the [`$filterProvider`](https://docs.angularjs.org/api/ng/provider/$filterProvider).

Using filters in view templates

Filters can be applied to expressions in view templates using the following syntax:

```javascript
{{ expression | filter }}
```

E.g. the markup

`````
{{ 12 | currency }}
`````

formats the number 12 as a currency using the [`currency`](https://docs.angularjs.org/api/ng/filter/currency) filter.
The resulting value is `$12.00`.

Filters can be applied to the result of another filter. This is called "chaining" and uses the following syntax:

```javascript
{{ expression | filter1 | filter2 | ... }}
```

Filters may have arguments. The syntax for this is

```javascript
{{ expression | filter:argument1:argument2:... }}
```

E.g. the markup

```
 {{ 1234 | number:2 }} 
```

formats the number 1234 with 2 decimal points using the [`number`](https://docs.angularjs.org/api/ng/filter/number)
filter. The resulting value is `1,234.00`.

---

### When filters are executed

In templates, filters are only executed when their inputs have changed. This is more performant than executing a filter
on each [`$digest`](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$digest) as is the case
with [expressions](https://docs.angularjs.org/guide/expression).

There are two exceptions to this rule:

1. In general, this applies only to filters that
   take [primitive values](https://developer.mozilla.org/docs/Glossary/Primitive) as inputs. Filters that
   receive [Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Objects) as input are
   executed on each `$digest`, as it would be too costly to track if the inputs have changed.
2. Filters that are marked as `$stateful` are also executed on each \$digest.
   See [Stateful filters](https://docs.angularjs.org/guide/filter#stateful-filters) for more information. Note that no
   AngularJS core filters are $stateful.

### Filter components in `ng`

| Name                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                      |
|-----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [filter](https://docs.angularjs.org/api/ng/filter/filter)       | Selects a subset of items from `array` and returns it as a new array.                                                                                                                                                                                                                                                                                                                                                            |
| [currency](https://docs.angularjs.org/api/ng/filter/currency)   | Formats a number as a currency (ie $1,234.56). When no currency symbol is provided, default symbol for current locale is used.                                                                                                                                                                                                                                                                                                   |
| [number](https://docs.angularjs.org/api/ng/filter/number)       | Formats a number as text.                                                                                                                                                                                                                                                                                                                                                                                                        |
| [date](https://docs.angularjs.org/api/ng/filter/date)           | Formats `date` to a string based on the requested `format`.                                                                                                                                                                                                                                                                                                                                                                      |
| [json](https://docs.angularjs.org/api/ng/filter/json)           | Allows you to convert a JavaScript object into JSON string.                                                                                                                                                                                                                                                                                                                                                                      |
| [lowercase](https://docs.angularjs.org/api/ng/filter/lowercase) | Converts string to lowercase.                                                                                                                                                                                                                                                                                                                                                                                                    |
| [uppercase](https://docs.angularjs.org/api/ng/filter/uppercase) | Converts string to uppercase.                                                                                                                                                                                                                                                                                                                                                                                                    |
| [limitTo](https://docs.angularjs.org/api/ng/filter/limitTo)     | Creates a new array or string containing only a specified number of elements. The elements are taken from either the beginning or the end of the source array, string or number, as specified by the value and sign (positive or negative) of `limit`. Other array-like objects are also supported (e.g. array subclasses, NodeLists, jqLite/jQuery collections etc). If a number is used as input, it is converted to a string. |
| [orderBy](https://docs.angularjs.org/api/ng/filter/orderBy)     | Returns an array containing the items from the specified `collection`, ordered by a `comparator` function based on the values computed using the `expression` predicate.                                                                                                                                                                                                                                                         |

## 7. Service

### Service components in `ng`

| Name                                                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [$anchorScroll](https://docs.angularjs.org/api/ng/service/$anchorScroll)                           | When called, it scrolls to the element related to the specified `hash` or (if omitted) to the current value of [$location.hash()](https://docs.angularjs.org/api/ng/service/$location#hash), according to the rules specified in the [HTML5 spec](http://www.w3.org/html/wg/drafts/html/master/browsers.html#an-indicated-part-of-the-document).                                                                                                                                                                                                                    |
| [$animate](https://docs.angularjs.org/api/ng/service/$animate)                                     | The $animate service exposes a series of DOM utility methods that provide support for animation hooks. The default behavior is the application of DOM operations, however, when an animation is detected (and animations are enabled), $animate will do the heavy lifting to ensure that animation runs with the triggered DOM operation.                                                                                                                                                                                                                           |
| [$animateCss](https://docs.angularjs.org/api/ng/service/$animateCss)                               | This is the core version of `$animateCss`. By default, only when the `ngAnimate` is included, then the `$animateCss` service will actually perform animations.                                                                                                                                                                                                                                                                                                                                                                                                      |
| [$cacheFactory](https://docs.angularjs.org/api/ng/service/$cacheFactory)                           | Factory that constructs [Cache](https://docs.angularjs.org/api/ng/type/$cacheFactory.Cache) objects and gives access to them.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [$templateCache](https://docs.angularjs.org/api/ng/service/$templateCache)                         | `$templateCache` is a [Cache object](https://docs.angularjs.org/api/ng/type/$cacheFactory.Cache) created by the [$cacheFactory](https://docs.angularjs.org/api/ng/service/$cacheFactory).                                                                                                                                                                                                                                                                                                                                                                           |
| [$compile](https://docs.angularjs.org/api/ng/service/$compile)                                     | Compiles an HTML string or DOM into a template and produces a template function, which can then be used to link [`scope`](https://docs.angularjs.org/api/ng/type/$rootScope.Scope) and the template together.                                                                                                                                                                                                                                                                                                                                                       |
| [$controller](https://docs.angularjs.org/api/ng/service/$controller)                               | `$controller` service is responsible for instantiating controllers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [$document](https://docs.angularjs.org/api/ng/service/$document)                                   | A [jQuery or jqLite](https://docs.angularjs.org/api/ng/function/angular.element) wrapper for the browser's `window.document` object.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [$exceptionHandler](https://docs.angularjs.org/api/ng/service/$exceptionHandler)                   | Any uncaught exception in AngularJS expressions is delegated to this service. The default implementation simply delegates to `$log.error` which logs it into the browser console.                                                                                                                                                                                                                                                                                                                                                                                   |
| [$filter](https://docs.angularjs.org/api/ng/service/$filter)                                       | Filters are used for formatting data displayed to the user.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [$httpParamSerializer](https://docs.angularjs.org/api/ng/service/$httpParamSerializer)             | Default [`$http`](https://docs.angularjs.org/api/ng/service/$http) params serializer that converts objects to strings according to the following rules:                                                                                                                                                                                                                                                                                                                                                                                                             |
| [$httpParamSerializerJQLike](https://docs.angularjs.org/api/ng/service/$httpParamSerializerJQLike) | Alternative [`$http`](https://docs.angularjs.org/api/ng/service/$http) params serializer that follows jQuery's [`param()`](http://api.jquery.com/jquery.param/) method logic. The serializer will also sort the params alphabetically.                                                                                                                                                                                                                                                                                                                              |
| [$http](https://docs.angularjs.org/api/ng/service/$http)                                           | The `$http` service is a core AngularJS service that facilitates communication with the remote HTTP servers via the browser's [XMLHttpRequest](https://developer.mozilla.org/en/xmlhttprequest) object or via [JSONP](http://en.wikipedia.org/wiki/JSONP).                                                                                                                                                                                                                                                                                                          |
| [$xhrFactory](https://docs.angularjs.org/api/ng/service/$xhrFactory)                               | Factory function used to create XMLHttpRequest objects.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [$httpBackend](https://docs.angularjs.org/api/ng/service/$httpBackend)                             | HTTP backend used by the [service](https://docs.angularjs.org/api/ng/service/$http) that delegates to XMLHttpRequest object or JSONP and deals with browser incompatibilities.                                                                                                                                                                                                                                                                                                                                                                                      |
| [$interpolate](https://docs.angularjs.org/api/ng/service/$interpolate)                             | Compiles a string with markup into an interpolation function. This service is used by the HTML [$compile](https://docs.angularjs.org/api/ng/service/$compile)service for data binding. See [$interpolateProvider](https://docs.angularjs.org/api/ng/provider/$interpolateProvider) for configuring the interpolation markup.                                                                                                                                                                                                                                        |
| [$interval](https://docs.angularjs.org/api/ng/service/$interval)                                   | AngularJS's wrapper for `window.setInterval`. The `fn` function is executed every `delay`milliseconds.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [$jsonpCallbacks](https://docs.angularjs.org/api/ng/service/$jsonpCallbacks)                       | This service handles the lifecycle of callbacks to handle JSONP requests. Override this service if you wish to customise where the callbacks are stored and how they vary compared to the requested url.                                                                                                                                                                                                                                                                                                                                                            |
| [$locale](https://docs.angularjs.org/api/ng/service/$locale)                                       | $locale service provides localization rules for various AngularJS components. As of right now the only public api is:                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [$location](https://docs.angularjs.org/api/ng/service/$location)                                   | The $location service parses the URL in the browser address bar (based on the [window.location](https://developer.mozilla.org/en/window.location)) and makes the URL available to your application. Changes to the URL in the address bar are reflected into $location service and changes to $location are reflected into the browser address bar.                                                                                                                                                                                                                 |
| [$log](https://docs.angularjs.org/api/ng/service/$log)                                             | Simple service for logging. Default implementation safely writes the message into the browser's console (if present).                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [$parse](https://docs.angularjs.org/api/ng/service/$parse)                                         | Converts AngularJS [expression](https://docs.angularjs.org/guide/expression) into a function.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [$q](https://docs.angularjs.org/api/ng/service/$q)                                                 | A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [$rootElement](https://docs.angularjs.org/api/ng/service/$rootElement)                             | The root element of AngularJS application. This is either the element where [ngApp](https://docs.angularjs.org/api/ng/directive/ngApp) was declared or the element passed into [`angular.bootstrap`](https://docs.angularjs.org/api/ng/function/angular.bootstrap). The element represents the root element of application. It is also the location where the application's [$injector](https://docs.angularjs.org/api/auto/service/$injector) service gets published, and can be retrieved using `$rootElement.injector()`.                                        |
| [$rootScope](https://docs.angularjs.org/api/ng/service/$rootScope)                                 | Every application has a single root [scope](https://docs.angularjs.org/api/ng/type/$rootScope.Scope). All other scopes are descendant scopes of the root scope. Scopes provide separation between the model and the view, via a mechanism for watching the model for changes. They also provide event emission/broadcast and subscription facility. See the [developer guide on scopes](https://docs.angularjs.org/guide/scope).                                                                                                                                    |
| [$sceDelegate](https://docs.angularjs.org/api/ng/service/$sceDelegate)                             | `$sceDelegate` is a service that is used by the `$sce` service to provide [Strict Contextual Escaping (SCE)](https://docs.angularjs.org/api/ng/service/$sce) services to AngularJS.                                                                                                                                                                                                                                                                                                                                                                                 |
| [$sce](https://docs.angularjs.org/api/ng/service/$sce)                                             | `$sce` is a service that provides Strict Contextual Escaping services to AngularJS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [$templateRequest](https://docs.angularjs.org/api/ng/service/$templateRequest)                     | The `$templateRequest` service runs security checks then downloads the provided template using`$http` and, upon success, stores the contents inside of `$templateCache`. If the HTTP request fails or the response data of the HTTP request is empty, a `$compile` error will be thrown (the exception can be thwarted by setting the 2nd parameter of the function to true). Note that the contents of `$templateCache` are trusted, so the call to `$sce.getTrustedUrl(tpl)` is omitted when `tpl` is of type string and `$templateCache` has the matching entry. |
| [$timeout](https://docs.angularjs.org/api/ng/service/$timeout)                                     | AngularJS's wrapper for `window.setTimeout`. The `fn` function is wrapped into a try/catch block and delegates any exceptions to [$exceptionHandler](https://docs.angularjs.org/api/ng/service/$exceptionHandler) service.                                                                                                                                                                                                                                                                                                                                          |
| [$window](https://docs.angularjs.org/api/ng/service/$window)                                       | A reference to the browser's `window` object. While `window` is globally available in JavaScript, it causes testability problems, because it is a global variable. In AngularJS we always refer to it through the`$window` service, so it may be overridden, removed or mocked for testing.                                                                                                                                                                                                                                                                         |

# More

[Guide to AngularJS Documentation](https://docs.angularjs.org/guide/)

