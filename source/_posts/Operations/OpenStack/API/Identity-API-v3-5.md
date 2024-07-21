---
title: Identity API v3 (CURRENT)(五)
tags:
  - OpenStackApi
  - Development
categories:
  - Operations
  - OpenStack
toc: true
abbrlink: 92740aa
date: 2017-09-11 15:18:28
---

### [原文地址](https://developer.openstack.org/api-ref/identity/v3/#roles)

## 角色（Role）

`OpenStack`的服务通常使用基于角色的访问控制来决定是否允许用户使用某个`API`。这意味着需要比较用户的角色（存在于令牌`token`中）和角色能够使用的`API`（在访问策略`polocy`中定义）。用户通过角色来使用相关的API。

<!-- more -->

首先需要为实体（用户等）创建角色，该角色一旦被创建，立即就能被分配。然后可以将这些角色分配给用户或者用户组、项目等，包括项目所拥有的其他域。还可以将角色分配给一个用户或者组内域`domains`，可以使用一个具有授权范围的`token`来调用API。

创建、查看、删除角色与分配每个属性都有特定的URL。例如讲一个角色分配给一个项目：

> ```
> PUT /v3/projects/{project_id}/users/{user_id}/roles/{role_id}
> ```

还可以列出一个指定域（`domain`）、项目（`project`）中的角色，或者能够使用该API的角色。不过，如果使用查询参数来过滤集合中返回的结果，则提供了一个更通用的调用API。例如:

* 列出指定用户的角色分配：

```
GET /role_assignments?user.id={user_id}
```

- 列出为某个项目分配的角色：

```
GET /role_assignments?scope.project.id={project_id}
```

从V3.6版API开始，你还可以列出项目树中的所有角色分配，例如，下面列出了指定项目及其子项目的所有角色分配:

```
GET /role_assignments?scope.project.id={project_id}&include_subtree=true

```

>  如果你指定了 `include_subtree=true`，你就必须同时指定`scope.project.id`。否则这个调用会返回一个`Bad Request (400)`错误。

集合中的每个角色分配实体都包含创建该实体时分配的链接。

如前所述，可以在特定的项目或领域中对用户或组进行角色分配。如果一个用户是一个有角色分配的小组成员，他也会被认为是由于他们的组成员关系而被分配的。一个用户的有效角色分配(在给定的项目或领域)，因此由他们拥有的任何直接的任务，加上他们通过在给定的项目或领域中有任务的组的成员来获得。这组有效的角色分配是由希望检查策略的服务来引用的。您可以使用有效的查询参数在用户、项目和域级别列出有效的角色分配:

