---
title: DevOps之部署流水线
tags:
  - DevOps
categories:
  - DevOps
  - Concept
toc: true
cover: /assets/images/imgs20190712081253.webp
abbrlink: 5f93a57a
date: 2019-07-12T08:10:55.000Z
thumbnail: /assets/thumbnail/imgs20190712081253.webp
---

# 什么是部署流水线

部署流水线是指：<u>从版本控制库到用户手中这一过程的自动化表现形式</u>。对软件的每次变更都会经历一个复杂的流水线才能发布。

<!-- more -->

这一流水线包括构建软件以及后续一系列不同阶段的测试和部署，这需要多人或者多个团队之间的协作。

部署流水线是对这一流程的建模，在持续集成和发布管理工具上，它体现为支持查看并控制整个流程，包括每次变更从被提交到版本控制库开始，直到通过各类测试和部署，再到发布给用户的过程。

整个流程(从概念到概念兑现)可以用一个价值流图来描述。

![一个价值流图的样例](/assets/images/imgs20190712083831.webp)

![代码变更集经过部署流水线的过程](/assets/images/imgs20190712083945.webp)

> 越往后的阶段，其环境与生产环境越相似，其目的就是在这个过程中尽早发现那些不满足发布条件的构建版本，并尽快将失败根源反馈给团队。

> 只要某个构建使无论是这一流程中的哪个阶段失败了，它都不会进入下一个阶段。

## 最基本的部署流水线

![基本的部署流水线](/assets/images/imgs20190712084204.webp)

> 我们所做的这一切都是为了尽快得到反馈。为了加速这个反馈循环，就必须能够看到每个环境中都部署了哪个版本，每个构建版本在流水线中处于哪个阶段。

# 部署流水线的相关实践

## 只生成一次二进制包

> 二进制包：所有可执行代码的集合，如`jar`文件、`exe`文件、`so`文件等。

对于同一份源代码，每次都重新编译的话，会引入“编译结果不一致”的风险。在后续阶段里，其编译器的版本可能与提交阶段所用版本不一致。

如果每次都从源代码生成二进制包，则会导致一种相关的反模式：**从源重建反模式**。

这种反模式违反了两个重要原则：

* 保证部署流水线的高效性，使团队尽早得到反馈。
* 始终在已知可靠的基础上进行构建。

在很多实际使用的流水线里，每次生成二进制包时，都会存储其散列，并在后续每个阶段中利用这个散列对二进制包进行验证。假如重新创建二进制包，就会存在这样的风险，即从第一次创建二进制包到最后发布这两个时间点之间会引入某种变化，比如在不同阶段里，编译时所用的软件工具链有差异，此时这个即将发布的二进制包就不是我们曾经测试过的那个二进制包了。

二进制包应该只在构建流水线的提交阶段生成一次。这些二进制包应该保存在文件系统的某个位置上，让流水线的后续阶段能够轻松地访问到这个位置，但要<u>
注意不要放在版本控制库中</u>，因为它只是一个版本的衍生品，并不是原生态的定义。

## 对不同的环境采用统一部署方式

显然，部署风险与部署频率成反比。部署频率最低的环境(生产环境)却是最重要的。因此，只有在很多环境中对部署过程测试过数百次以后，我们才能消除那些由于部署脚本错误而导致的问题。

当然，每个环境多多少少都会有所不同，至少IP地址肯定是不一样的。通常还会有其他不同之处，比如操作系统和中间件的配置设置，数据库的安装位置和外部服务的位置，以及在部署时需要设置的其他配置信息。但这并不意味着你应该为每个环境都建立一个单独的部署脚本，而只要把那些与特定环境相关的特定配置分开放置就行了。

如果能做到这种程度的话，那么在版本即将发布前，部署流程就已经在其他环境中测试过数百次了。这是我们所知道的缓解软件发布风险的最好方法之一。

如果对于不同的环境，其部署脚本也不相同的话，你就无法知道某个测试过的脚本是否在上线部署时还能正常工作。相反，如果使用同一个脚本在所有的环境上进行部署，那么当在某个环境上部署失败时，就可以确定其原因一定来自以下三个方面:

* 与该环境相关的配置文件中，某项配置有问题;
* 基础设施或应用程序所依赖的某个服务有问题;
* 环境本身的配置有问题。

## 对部署进行冒烟测试

当做应用程序部署时，你应该用一个自动化脚本做一下冒烟测试，用来确保应用程序已经正常启动并运行了。这个测试应该非常简单，比如只要启动应用程序，检查一下，能看到主页面，并在主页面上能看到正确的内容就行了。这个冒烟测试还应该检查一下应用程序所依赖的服务是否都已经启动，并且正常运行了，比如数据库、消息总线或外部服务等。

一旦有了单元测试之后，这种冒烟测试(部署测试)
可能就是你要马上着手做的最重要测试了，甚至可以说是最最重要的测试。因为它可以让你对“应用程序可以运行起来”建立信心。如果应用程序不能运行，这个冒烟测试应该能够告诉你一些最基本的诊断提示，比如应用程序无法运行是否是因为其依赖的外部服务无法正常工作。

## 向生产环境的副本中部署

很多团队实际部署应用上线时可能遇到的另一个主要问题是，生产环境与他们的开发环境或测试环境有非常大的差异。为了对系统上线充满信心，你要尽可能在与生产环境相似的环境中进行测试和持续集成。

理想情况下，如果生产环境非常简单，或者有足够多的预算，我们完全可以建立与生产环境一模一样的环境，用于运行手工测试或自动化测试。另外，要想确保所有的环境都一样，需要有很多纪律保障良好的配置管理实践。你要确保:

* 基础设施是相同的，比如网络拓扑和防火墙的配置等;
* 操作系统的配置(包括补丁版本)都是相同的;
* 应用程序所用的软件栈是相同的;
* 应用程序的数据处于一个已知且有效的状态。

## 每次变更都要立即在流水线中传递

一定要确保持续集成服务器支持这种调度方式(事实上，很多持续集成服务器都支持这种调度方式)
，而且要确保每次变更都能立即在流水线中传递，这样就不用按固定的时间表来执行不同的阶段了。

目前，这些策略只能用于那些完全自动化的阶段，比如包含自动化测试的阶段，而流水线中后续的那些为手工测试环境执行部署的阶段就要按需激活。

## 只要有环节失败，就停止整个流水线

每次提交代码到版本控制系统中后，都能够构建成功并通过所有的测试。对于整个部署流水线来说，都适用这一要求。假如在某个环境上的某次部署失败了，整个团队就要对这次失败负责，应该停下手头的工作，把它修复后再做其他事情。

# 提交阶段

在提交阶段，我们需要做以下几件事。这些任务通常作为一个工作集合运行在构建网格上(大多数持续集成服务器都提供类似功能)
，这样，提交阶段就能够在一个可接受的时间之内完成(最好在五分钟之内完成，最多不能超过十分钟)。一般来说，提交阶段包含以下步骤:

* 编译代码(如果所用开发语言需要的话);
* 运行一套提交测试;
* 为后续阶段创建二进制包;
* 执行代码分析来检查代码的健康状况;
* 为后续阶段做准备工作，比如准备一下后续测试所用的数据库。

第一步是编译源代码的最新版本。如果在编译过程中出现错误，就向在最后一次提交成功之后提交代码的所有人发送通知。如果这一步没有成功，就直接让整个提交阶段失败，不再考虑后续工作。

## 提交阶段的最佳实践

在理想情况下(无限的处理能力和无限的网络带宽)，我们希望开发人员能够一直等到所有测试(甚至是手工测试)
全部通过，这样一旦出现问题，就可以马上修复。然而，这并不现实，因为部署流水线的后续阶段(自动化验收测试、容量测试和手工验收测试)
都需要相对较长的时间。这也是规范测试流程的一个理由，因为当缺陷还比较容易修复时，尽快得到反馈是非常重要的，而不应花更大的代价得到全面的反馈。

# 自动化验收测试

部署流水线中的自动化验收测试阶段与功能验收测试之间的关系，和提交阶段与单元测试的关系相似。验收测试阶段中运行的大部分测试是功能验收测试，但并不全是。验收测试阶段的目标是断言应用程序交付了客户期望的价值，并满足了验收条件。
它也是一个回归测试套件，用于验证新的修改是否在现有功能中引入了回归缺陷。

至关重要的是，作为常规开发流程的一部分，验收测试一旦失败，开发团队就必须立即对其作出响应。团队必须确定这是一个回归缺陷，还是一个有意的应用行为变更，或是测试本身的问题，然后采取适当的行动使自动化验收测试能够重新回到成功状态。

如果一个候选版本不能满足所有的验收条件，就根本不会被交给用户。

## 自动化验收测试最佳实践

就像整个团队负责流水线的每一个阶段一样，整个团队都是验收测试的所有者。如果验收测试失败了，整个团队都要停下来，马上修复它。

这一实践的一个重要推论是，开发人员必须能在自己的开发环境中运行自动化验收测试。这样，开发人员在发现验收测试失败后，就很容易在自己的机器上修复它，然后在本地再次运行验收测试来验证修复。

尽管验收测试非常有价值，但它们的创建和维护成本也是非常高的。所以要时刻牢记，自动化验收测试也是回归测试。不要幼稚地对照着验收测试条件，盲目地把所有东西都自动化了。

# 后续的测试

重要的是，部署流水线应该能让测试人员根据自己的需求将任意一个版本部署到自己的测试环境上。这就替代了“每日构建”，即测试人员不需要依赖从开发人员那里得到的一个不确定的修正版(
开发人员在回家前刚刚提交的那个版本)
，而是可以轻松找到那些已经通过自动化测试的版本，而且还可查看每个版本中都有哪些修改，最后选择一个他们想要的版本。假如发现这个构建版本在某种程度上不太令人满意(
比如这个版本中并不包含正确的修改，或者有某个影响测试稳定性的缺陷)，测试人员只要自己再选一个版本重新部署就行了。

## 手工测试

在迭代开发过程中，验收测试之后一定会有一些手工的探索性测试、易用性测试和演示。在此之前，开发人员可能已经向分析师和测试人员演示了应用程序的功能，但一定是在自动化测试通过之后。在这个过程中，测试人员所扮演的角色并不是回归测试该系统，而是首先通过手工证明验收条件已被满足，从而确保这些验收测试的确是验证了系统行为。

之后，测试人员会做一些机器不太擅长而人比较擅长的测试。他们做探索性测试、易用性测试，在不同平台上测试程序的界面是否正确，并着眼于一些不可控制的最坏情况进行测试。自动化验收测试使测试人员节省出更多的时间做那些高价值的活动，而不是测试脚本的人力执行器。

## 非功能测试

在定义部署流水线结构时，必须回答一个问题，即容量测试阶段的结果是可以作
为一个门槛，还是需要由人来决定?对于高性能应用来说，可以在验收测试阶段通过之后，就运行容量测试，作为该版本整个自动化测试的输出结果。如果这个版本不能通过容量测试，就不能把它看成是可部署的版本。

# 发布准备

* 让参与项目交付过程的人共同创建并维护一个发布计划(包括开发人员和测试 人员，以及运维人员，基础设施和支持人员);
* 通过尽可能多的自动化过程最小化人为错误发生的可能性，并从最容易出错的 环节开始实现自动化;
* 在类生产环境中经常做发布流程演练，这样就可以对这个流程及其所使用的技 术进行调试;
* 如果事情并没有按计划执行，要有撤销某次发布的能力;
* 作为升级和撤销过程的一部分，制定配置迁移和数据迁移的策略。

## 自动化部署与发布

* 选择一些具有代表性的目标环境，并分别在这些样本环境上执行自动化验收测试套件。这样就能通过收集结果数据发现哪些测试在哪些平台上无法正常运行了。
* 管理生产环境的流程也应该用于测试环境，比如试运行环境、集成环境等。通过这种方式，就可以利用自动化变更管理系统来为手工测试环境创建一个完全一致的配置信息。

风险降低的一个重要原因是，此时此刻，发布流程本身已经做过很多次演练、测试并被完善过了。由于在每个环境中都使用相同的部署流程，并使用同样的流程来发布应用，所以这个部署流程会被极频繁地测试，可能一天中就有好几次测试。假如第五十次，甚至是第一百次成功部署了一个复杂系统，对你来说部署就应该是驾轻就熟啦。我们的目标就是尽快地达到这种状态。和系统中的其他方面一样，如果想对发布过程和使用的技术建立起充分的信心，我们就必须定期使用它，证明它是好用的。让每次变更都在尽可能短的时间里通过部署流水线最终部署到生产环境中，这是完全可以做到的。我们应该持续地评估和改进自己的发布流程，尽可能在问题被引入时就发现它们。

## 变更的撤销

通常，最好的撤销策略是在发布新版本时，让旧版本仍旧处于可用状态，并在发布后保持一段时间。

另一种比较好的撤销策略是从头开始重新部署旧版本。

## 在成功的基础上构建

当一个候选发布版本能够部署到生产环境时，我们就确信:

- 代码可以编译;

- 代码能够按开发人员的预期运行，因为它通过了单元测试;

- 系统能够满足分析人员或用户预期，因为它通过了所有的验收测试;

- 基础设施的配置和基线环境被恰当地管理了，因为应用程序在模拟的生产环境 上通过了测试;

- 系统所有的正确组件都就绪了，因为它是可以部署的;

- 部署脚本也是可以工作的，因为在该版本到这一阶段之前，部署脚本至少在开发环境中用过一次，在验收测试阶段用过一次，在测试环境中用过一次;

- 我们需要部署的所有内容都在版本控制库中，而且不需要手工干预，因为我们已经部署这个系统好几次了。

这种“在成功的基础上构建”的方法, 完全符合我们常挂在嘴边的口头禅“尽快让这个流程或其任何环节失败”，这在任何层次都是有用的。

# 如何实现一个部署流水线

## 对价值流进行建模并创建简单的可工作框架

一旦有了价值流图，就可以用持续集成和发布管理工具对流程建模了。如果所用工具不支持直接对价值流建模的话，可以使用“项目间依赖”来模拟它。

假如项目已经全面展开，那么把已有的构建、测试和部署脚本放进去就可以了。如果还没有的话，就先创建一个“从头到尾的轮廓”，即用最少的工作量将所有的关键元素准备就绪。

## 构建和部署过程的自动化

构建过程的输入是源代码，输出结果是二进制包。“二进制包”是我们故意含糊使用的一个词，因为由于所用开发技术的不同，构建过程的输出也不相同。

一旦持续构建流程建立并运行起来了，接下来就要做自动化部署了。

部署活动可能包含:

1. 为应用程序打包，而如果应用程序的不同组件需要部署在不同的机器上，就要分别打包;
2. 安装和配置过程应该实现自动化;
3. 写自动化部署测试脚本来验证部署是否成功了。部署流程的可靠性是非常重要的，因为它是自动化验收测试的前提条件。

## 自动化单元测试和代码分析

开发部署流水线的下一步就是实现全面的提交阶段，也就是运行单元测试、进行代码分析，并对每次提交都运行那些挑选出来的验收测试和集成测试。运行单元测试应该不需要太复杂的步骤，因为根据单元测试的定义，它并不需要运行整个应用程序，只需要运行在一个xUnit风格的单元测试框架上。

## 自动化验收测试

验收测试可分为两种类型:功能测试和非功能测试。在项目初期就开始非功能需求测试(比如测试容量和可扩展性等)
是非常关键的，这样你就能得到一些数据，用来分析当前的应用程序是否满足这些非功能需求。关于安装和部署，我们可以使用与功能验收测试同样的方法。但是，测试内容有所不同。刚开始时，你完全可以把验收测试和性测试放在同一个阶段里接连运行。

之后，为了能很容易知道哪类测试失败了，你可以再将它们分开。一套好的自动化验收测试会帮助你追查随机问题和难以重现的问题，如竞争条件、死锁，以及资源争夺。这些问题在应用发布之后，就很难再被发现。

当然，在部署流水线中，提交测试阶段和验收阶段需要运行哪些测试取决于你的测试策略。在项目初期，应该至少有每种测试的一到两个测试可以自动化运行，并把它们放到部署流水线中。这样，初步框架就建好了，今后随着项目的进展，就比较容易增加测试了。

## 部署流水线的演进

尽管每个项目流水线的实现技术或细节都会有很大不同，但对于大多数项目来说，每个阶段的目标都是一样的。把它作为一种模式使用的话，可以加速构建和部署流水线的创建。当然，部署流水线最终是为了对软件的构建、部署、测试和发布流程进行建模，并确保每次修改都能以一种尽可能自动化的方式走过整个流程。

当实现了部署流水线后，你会发现与相关人士的谈话以及效率的提高反过来又会 对你的流程有影响。所以，一定要记住三件事。

* 首先，并不需要一次实现整个流水线，而应该是增量式实现。
* 其次，部署流水线是构建、部署、测试和发布应用程序整个流程中有效的，也是
  最重要的统计数据来源。
* 最后，部署流水线是一个有生命的系统。

# 度量

根据精益思想，应该做整体优化，而不是局部优化。如果你花很多时间去解决某个瓶颈，而这个瓶颈在整个交付流程中并不是一个真正约束的话，整个交付流程并不会有什么根本性的变化。因此，应该对整个流程进行度量，从而判定这个交付流程作为一个整体是否存在问题。

这些度量项如下所示:

- 自动化测试覆盖率。
- 代码库的某些特征，比如重复代码量、圈复杂度、输入耦合度、输出耦合度、 代码风格问题等。
- 缺陷的数量。
- 交付速度，即团队交付可工作、已测试过并可以使用的代码的速率。
- 每天提交到版本控制库的次数。
- 每天构建的次数。
- 每天构建失败的次数。
- 每次构建所花的时间，包括自动化测试的时间。 
