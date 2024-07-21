---
title: DevOps团队结构类型汇总
tags:
  - DevOps
  - Team
categories:
  - DevOps
  - TeamWorks
toc: true
thumbnail: 'https://imgs.borgor.cn/imgs20190715153100.png'
reprint: 'https://www.infoq.cn/article/DcIUD_gi17sQjvSt5XSS'
abbrlink: fcfa8d17
date: 2019-07-15 15:30:06
---

## 前言

组织中任何 DevOps 工作的主要目标都是改进客户和业务的价值交付，而不是降低成本、提升自动化或者通过配置管理驱动一切；这意味着，为了实现有效的 Dev 和 Ops 协同，不同的组织可能需要不同的团队结构。

<!-- more -->

## 概述

具体哪种 DevOps 团队结构或拓扑适合组织取决于以下几个方面：

- 组织的产品集：产品越少协同越简单，就像康威定律预言的那样，自然形成的筒仓就越少；
- 技术领导者的职责范围、实力和有效性；Dev 和 Ops 是否有共同的目标；
- 组织是否有能力或意愿变革其 IT 运维部门，使其不再只是“上架硬件”和“配置服务器”，而是成为真正与价值流一致的部门，使运维特性为软件团队所重视；
- 组织是否有能力或技能主导运维。

当然，这里列出的主题有些差异；这些拓扑和类型可作为参考指南用于评估某个模式是否恰当。实际上，组合多个模式或将一个模式转换为另一个模式通常是最好的方法。

那么，什么样的团队结构适合采用 DevOps 呢？显然，不存在适合每个组织的神奇结构或团队拓扑。然而，介绍几种不同的团队结构模型是有用处的，其中一些模型比其他模型更适合某些组织。通过探索这些团队结构（或“拓扑”）的优缺点，我们可以确定自己的组织中最适合 DevOps 实践的团队结构，并考虑康威定律。

下面为你一一介绍 DevOps 实践的各种团队结构。

### DevOps 的反类型

了解一些糟糕的做法是有用处的，我们可以叫它们“反类型（anti-types）”（这个叫法源于我们常见的“反模式”）。

#### 反类型 A：Dev 和 Ops 筒仓

这是典型的 Dev 和 Ops“各管一摊”。这意味着可以尽早声明故事点“完工”（意味着“特性完成”，但还没应用到生产中），而软件可操作性受损，因为 Dev 没有足够的有关运维特性的上下文信息，而 Ops 人员没有时间或无意为了软件上线前解决问题而参与开发。

我们可能都知道这种拓扑不好，但我认为，还有实际上更糟糕的拓扑；对于反类型 A（Dev 和 Ops 筒仓），我们至少知道这其中寻在问题。

![图片地址：https://matthewskelton.files.wordpress.com/2013/10/slide2.png?w=700](https://static.geekbang.org/infoq/5c6a607ed1501.png?imageView2/0/w/800)

#### 反类型 B：DevOps 团队筒仓

DevOps 团队筒仓（反类型 B）的形成通常是因为经理或主管认定他们“需要一点 DevOps 的东西”并创建了一个“DevOps 团队”（可能其中全是被称为“DevOp”的人）。DevOps 团队的成员迅速形成另一个筒仓，Dev 和 Ops 远比以往任何时候都注意保持距离，因为他们要捍卫自己的老窝、技能和工具集，不被那些“一无所知的 Dev”和“守旧落伍的 Ops”所破坏。

一个单独的 DevOps 筒仓只在一种情况下是真正有意义的，就是该团队为临时团队，存在时间不超过 12 或 18 个月，其目的是为了让 Dev 和 Ops 团结起来，而且很明确，过了这段时间，该 DevOps 团队就是多余的了；这是我下文所说的[5 型 DevOps 拓扑](https://web.devopstopologies.com/#type-five)。

![图片地址：https://matthewskelton.files.wordpress.com/2013/10/slide3.png?w=700](https://static.geekbang.org/infoq/5c6a60b49df47.png?imageView2/0/w/800)

#### 反类型 C：Dev 不需要 Ops

这种拓扑诞生于开发人员和开发经理的天真和傲慢，特别是当开始新项目或系统时。假设 Ops 现在已经成为过去（“我们现在有云，对吧?”），开发人员严重低估了运维技能和活动的复杂性和重要性，并相信可以没有他们，或者只在空闲时间涉及他们。

这种反类型 C 的 DevOps 拓扑可能最终需要下文说到的[3 型（Ops 即 IaaS）](https://web.devopstopologies.com/#type-three)或[4 型 （DevOps 即服务）的拓扑](https://web.devopstopologies.com/#type-four)，因为他们的软件变得更加复杂，并且运维活动开始占用“开发”（即编码）时间。要是这样的团队认识到，运维作为一门学科的重要性与软件开发同等重要和有价值，他们就能够避免许多痛苦和不必要的（非常基本的）运维错误。

![图片地址：https://matthewskelton.files.wordpress.com/2013/10/slide4.png?w=700](https://static.geekbang.org/infoq/5c6a60ed59154.png?imageView2/0/w/800)

#### 反类型 D：DevOps 作为工具团队

为了“成为 DevOps”而又不影响当前 Dev 团队的速度（或者说功能点交付），创建一个 DevOps 团队致力于部署管道、配置管理、环境管理等所需的工具。同时，运维人员继续孤立工作，而 Dev 团队继续把应用程序从“墙上”扔给他们。

尽管这个专门小组的成果就改进工具链而言可能是有好处的，但其影响很有限。在应用程序开发生命周期中 Ops 人员未能早期参与和协作的基本问题仍然没有改变。

![图片](https://web.devopstopologies.com/images/anti-type-d.png)

#### 反类型 E：换个名的 SysAdmin

这种反类型在工程成熟度较低的组织中很典型。他们想要提高实践并降低成本，然而，他们并没有将 IT 视为业务的核心推动力。因为 DevOps 在行业内取得的成功现在已经显而易见，所以他们想“做 DevOps”。不幸的是，他们没有反思当前的结构和关系存在什么差距就去为 Ops 团队招聘“DevOps 工程师”，这很难达到目的。

DevOps 只是对以前的 SysAdmin 角色改了个名，没有真正的文化 / 组织变革发生。这种反类型正变得越来越普遍，因为为了招揽人才而无所不为的招聘人员会赶时髦，寻找具有自动化和工具技能的求职者。遗憾的是，人类的沟通技巧可以让 DevOps 在组织中茁壮成长。

![图片](https://web.devopstopologies.com/images/anti-type-e.png)

#### 反类型 F：Ops 嵌入到 Dev 团队

组织不希望保留一个单独的运维团队，因此，开发团队会负责基础设施、管理环境、监控等。然而，在项目或产品导向的方式中，这样做意味着这些工作会受到资源限制和优先级重排的影响，导致低于标准的方法和不成熟的解决方案。

这种反类型表明，组织对有效 IT 运维的重要性和所需的技能缺乏认识。特别地，开发人员将其视为一种烦恼，Ops 的价值因此被贬低（Ops 是由开发团队的管理者管理的，而开发团队往往有其他的优先级事项）。

![图片](https://web.devopstopologies.com/images/anti-type-f.png)

#### 反类型 G：Dev 和 DBA 筒仓

这是[反类型 A （Dev 和 Ops 筒仓）](https://web.devopstopologies.com/#anti-type-a)的一种形式，在中大型公司中非常突出，在这些公司中，多个遗留系统依赖于相同的核心数据集。因为这些数据库对于业务而言非常重要，在 Ops 保护伞下会有一个专门的 DBA 团队，负责它们的维护、性能调优和灾难恢复。这是可以理解的。问题是，当这个团队成为任何数据库变更的守门人时，它实际上就成为频繁的小规模部署（DevOps 和持续交付的核心原则）的障碍。

此外，就像[反类型 A](https://web.devopstopologies.com/#anti-type-a)中的 Ops，DBA 团队并不参与应用程序的早期开发，因此，在交付周期中会发现数据问题（迁移、性能等）。再加上需要负责多个应用程序的数据库，最终的结果是不断地灭火和越来越大的交付压力。

![图片](https://web.devopstopologies.com/images/anti-type-g.png)

### DevOps 团队拓扑

与反类型相反，让我们看一些有效的 DevOps 拓扑。

#### 1 型：Dev 与 Ops 协作

这是 DevOps 的“应许之地”：Dev 团队和 Ops 团队之间顺畅协作，各自专注于自己的工作，并在必要的时候互相分担。可能有许多单独的 Dev 团队，每个团队致力于一个独立或半独立的产品栈。

我的感觉是，这种 1 型模型的建立需要相当大量的组织变革，并且要求技术管理团队的高层具有一定的能力。Dev 和 Ops 必须有一个清晰描述且明显有效的共同目标（提供可靠而频繁的变更，诸如此类）。Ops 人员必须适应与 Dev 人员搭配，掌握测试驱动编码和 Git，而 Dev 人员必须认真对待运维特性，从 Ops 人员那里获得日志实现的输入，等等，所有这些都需要相当大的文化变革。

![图片来源：https://matthewskelton.files.wordpress.com/2013/10/slide5.png?w=700](https://static.geekbang.org/infoq/5c6a630bdaa45.png?imageView2/0/w/800)

**1 型适用于具有强力技术领导者的组织**。
**潜在有效性：高**

#### 2 型：完全共担 Ops 职责

运维人员已经被整合到产品开发团队，我们看到了一个 2 型拓扑。Dev 和 Ops 之间几乎密不可分，所有人都高度关注同一个目标，这是一种有争议的[1 型（Dev 和 Ops 协作）](https://web.devopstopologies.com/#type-one)形式，但它有一些自己的特点。

像 Netflix 和 Facebook 这种实际上只有一种 Web 产品的组织已经实现了这种 2 型拓扑，但我认为，如果不是只关注少量核心产品，这种模式可能不是非常适用，因为在拥有多个产品流的组织中，预算限制和上下文切换很可能会迫使 Dev 和 Ops 进一步分开（比如说回到[1 型模型](https://web.devopstopologies.com/#type-one)）。由于没有明显的或可见的运维团队，所以这种拓扑可能也被称为“NoOps”，(尽管 Netflix NoOps 也可以是下文的[3 型（Ops 即 IaaS）](https://web.devopstopologies.com/#type-three))。

![图片来源：https://matthewskelton.files.wordpress.com/2013/10/slide6.png?w=700](https://static.geekbang.org/infoq/5c6a62e4194f2.png?imageView2/0/w/800)

**2 型适用于具有单一主要 Web 产品或服务的组织**。
**潜在有效性：高**

#### 3 型：Ops 即 IaaS（平台）

对于具有传统 IT 运维部门（不能或不愿做出足够迅速的变更）的组织，以及将所有应用程序运行在公有云（Amazon EC2、Rackspace、Azure 等等）上的组织，这可能有助于将运维视为一个团队，他们只是提供了弹性基础设施供应用程序在上面部署和运行；为此，内部 Ops 团队直接就相当于 Amazon EC2 或“基础设施即服务（IaaS）”。

然后，Dev 中的一个团队（也许是一个虚拟团队）可以作为运维特性、指标、监控、服务器配置等方面的专家组，可能负责大部分与 IaaS 团队的沟通。然而，这个团队仍然是一个 Dev 团队，遵循 TDD、CI、迭代开发等标准实践。

IaaS 拓扑的潜在效益是实现更容易（不必和 Ops 人员直接协作）完成，可能比尝试[1 型（Dev 和 Ops 协作）拓扑](https://web.devopstopologies.com/#type-one)更快地获得价值，至于 1 型，可以后续再试。

![图片来源：https://matthewskelton.files.wordpress.com/2013/10/slide7.png?w=700](https://static.geekbang.org/infoq/5c6a63242c97a.png?imageView2/0/w/800)

**3 型适用于有多个不同的产品和服务以及传统 Ops 部门的组织，或者应用程序全部在公有云上运行的组织**。
**潜在有效性：中**

#### 4 型：DevOps 作为外部服务

有些组织，特别是较小的组织，可能没有财力、经验或人力可以运维其开发的软件。Dev 团队可能会联系服务提供者，如 Rackspace，帮助他们构建测试环境及自动化基础设施和监控，并就他们在软件开发周期中实现何种运维特性提供建议。

对于小型组织或团队，如果他们想要学习自动化、监控和配置管理，然后随着他们的发展，会有更多的人专注于运维，他们可能发展成[3 型（Ops 即 IaaS）](https://web.devopstopologies.com/#type-three)甚至[1 型（Dev 和 Ops 协作）](https://web.devopstopologies.com/#type-one)模型，那么 DevOps 即服务可能是一个有效而务实的方式。

![图片来源：https://matthewskelton.files.wordpress.com/2013/10/slide8.png?w=700](https://static.geekbang.org/infoq/5c6a541f98398.png?imageView2/0/w/800)

**4 型适用于运维问题相关经验比较有限的小型团队或组织**。
**潜在有效性：中**

#### 5 型：具有截止日期的 DevOps 团队

具有截止日期的 DevOps 团队（5 型）看上去非常像[反类型 B（DevOps 团队筒仓）](https://web.devopstopologies.com/#anti-type-b)，但它的意图和期限有很大的不同。这个临时团队的使命是让 Dev 和 Ops 更紧密地联系在一起，在理想的情况下向[1 型（Dev 和 Ops 协作）](https://web.devopstopologies.com/#type-one)或[2 型](https://web.devopstopologies.com/#type-two)[（](https://web.devopstopologies.com/#anti-type-b)[完全共担](https://web.devopstopologies.com/#type-two)[Ops 职责](https://web.devopstopologies.com/#type-two)[）](https://web.devopstopologies.com/#anti-type-b)模型转化，并最终会淘汰掉。

临时团队的成员将“翻译”Dev 语言和 Ops 语言，引入大胆的想法，像站立会议和运维团队看板，考虑讨人厌的细节，如负载均衡、管理 NIC 以及为 Dev 团队进行 SSL 减负（offloading ）。如果有足够多的人开始看到 Dev 和 Ops 一起协作带来的价值，那么临时团队就真正获得了一个达成目标的机会，至关重要的是，部署和生产诊断的长期职责不应该给临时团队，否则它就可能会成为一个[DevOps 团队筒仓（反类型 B）](https://web.devopstopologies.com/#anti-type-b)。

![图片来源：[https://matthewskelton.files.wordpress.com/2013/10/slide9.png?w=700]](https://static.geekbang.org/infoq/5c6a54b1c74c3.png?imageView2/0/w/800)

**5 型是1 型拓扑的前身，但要注意反类型 B的危险**。
**潜在有效性：低到高**

#### 6 型：DevOps 布道团队

在 Dev 和 Ops 之间存在巨大鸿沟（或者差距有变得很大的趋势）的组织里，它可以有效地“促进”DevOps 团队，保证 Dev 和 Ops 之间的对话。这是[5 型](https://web.devopstopologies.com/#type-five)**（**[具有截止日期的 DevOps 团队](https://web.devopstopologies.com/#type-five)**）**的一个版本，但这里的 DevOps 团队是一直存在的，其具体职责是促进 Dev 团队和 Ops 团队之间的协作。这个团队的成员有时也被称作“DevOps 布道者”，因为他们帮助宣传 DevOps 实践。

> “DevOps 团队”的目标应该是通过赋能组织的其他部分来让自己脱离业务。
>
> ——EricMinick

![图片](https://web.devopstopologies.com/images/type-6.png)

**6 型适用于 Dev 和 Ops 之间有疏远趋势的组织。注意反类型 B的危险**。
**潜在有效性：中到高**

#### 7 型：SRE 团队（谷歌模型）

DevOps 经常建议 Dev 团队加入值班轮换，但这不是必要的。事实上，有些组织（包括谷歌）运行一个不同的模型，软件由开发团队显式“交接给”运行软件的团队，即网站可靠性工程团队（SRE）。在这个模型中，Dev 团队需要向 SRE 团队提供测试证据（日志、指标等），证明他们的软件已经达到一个 SRE 团队认为足够好的标准。

至关重要的是，SRE 团队可以拒绝不符合运维标准的软件，要求开发人员在投入生产之前改进代码。Dev 和 SRE 之间的协作围绕着运维标准展开，但是，一旦 SRE 团队对代码满意，他们（而不是 Dev 团队）就会在生产环境中提供支持。

![图片](https://web.devopstopologies.com/images/type-7.png)

**7 型只适用于工程和组织成熟度较高的组织。如果 SRE/Ops 团队被告知进行“JFDI”部署，则要注意不要回到反类型 A**。
**潜在有效性：低到高**

#### 8 型：容器驱动协作

容器将应用程序的部署和运行要求封装到了容器中，消除了 Dev 和 Ops 之间的某些协作需求。在这种情况下，容器充当了 Dev 和 Ops 的责任边界。在良好的工程文化中，容器驱动协作模型运转良好，但是，如果 Dev 开始忽视运维注意事项，那么，这个模型就会向敌对的“我们和他们”回归。

![图片](https://web.devopstopologies.com/images/type-8.png)

**8 型适用性：容器可以很好地发挥作用，但要注意反类型 A，不要期望 Ops 团队运行 Dev 扔给他们的任何东西**。
**潜在有效性：中到高**

#### 9 型：Dev 和 DBA 协作

为了消除 Dev 和 DBA 之间的鸿沟，有些组织已经尝试使用类似 9 型的模型，DBA 团队的数据库能力与 Dev 团队的数据库能力（或专长）可以很好地互补。这似乎有助于将以 Dev 为中心的数据库视图（基本上就是作为应用程序笨拙的持久性存储）和以 DBA 为中心的数据库视图（智能丰富的业务价值源）之间的转换。

![图片](https://web.devopstopologies.com/images/type-9.png)

**9 型只适用于有一个或多个大型中心数据库连接多个应用程序的组织**。
**潜在有效性：中**

英文原文： https://web.devopstopologies.com/