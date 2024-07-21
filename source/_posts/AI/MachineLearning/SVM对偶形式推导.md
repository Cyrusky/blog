---
title: SVM对偶形式推导
tags:
  - 公式
  - 推导
  - SVM
categories:
  - AI
  - 公式推导
toc: true
cover: '/assets/images/20191023140547.webp'
abbrlink: 63ab4995
date: 2019-10-23 21:04:33
---

# 拉格朗日函数的介绍

## 优化问题的一般形式

**形式一：**
$$
\begin{align}
\min_x \quad & f_0(x) \\\\
s.t.\quad & f_i(x) \le 0 , \quad i = 1,\dots,m \\\\
& h_i(x) = 0, \quad i = 1,\dots,p
\end{align}
\tag{1}
$$

<!-- more -->

**形式二：**
$$
\begin{align}
\min_x \quad & f_0(x) \\\\
s.t.\quad & f_i(x) \ge 0 , \quad i = 1,\dots,m \\\\
& h_i(x) = 0, \quad i = 1,\dots,p
\end{align}
\tag{2}
$$

> **形式二**中在约束条件熵加一个负号就变成了**形式一**

**形式三：**
$$
\begin{align}
\max_x \quad & f_0(x) \\\\
s.t.\quad & f_i(x) \le 0 , \quad i = 1,\dots,m \\\\
& h_i(x) = 0, \quad i = 1,\dots,p
\end{align}
\tag{3}
$$

> **形式三**中在目标函数上加负号就变成了**形式一**

> 拉格朗日函数是拉格朗日乘子法的核心部分，其主要思想就是将约束条件加到目标函数上，使目标函数转变为等价的无约束条件的优化问题形式（形式上转变）。

## 拉格朗日函数与原始问题的关系

$$
\begin{align}
\min_x & f_0(x) \\\\
s.t. & \quad f_i(x) \le 0, \quad i = 1,\dots,m \\\\
& \quad h_i(x) = 0, \quad i = 1,\dots, p
\end{align}
\tag{4}
$$

其对应的拉格朗日函数为：

$$
\mathcal{L} (x, \lambda, \mathcal{v}) = f_0(x) + \sum_{i=1}^m \lambda_i f_i (x) + \sum_{i=1}^p \mathcal{v}_i h_i(x) \\\\
s.t. \quad \lambda_i \gt 0, \quad i = 1,\dots,m
\tag{5}
$$

则，原问题可以对应为：

$$
\min_x \max_{\lambda, \mathcal{v}} \mathcal{L}(x, \lambda, \mathcal{v}) \\\\
s.t. \quad \lambda_i \gt 0, \quad i = 1,\dots,m
\tag{6}
$$

### 对二者关系的证明

记

$$
\theta_p(x) = \max_{\lambda, \mathcal{v}} \mathcal{L} (x, \lambda, \mathcal{v}) \\\\
s.t. \quad \lambda_i \ge 0, \quad i = 1,\dots,m
\tag{7}
$$

则有:

$$
\theta_p(x) = \left \lbrace
\begin{align}
f_0(x) ;\quad & for\ x\ that\ satisfied\ the\ origin\ constraint
\\\\ + \infty; \quad & otherwise
\end{align}
\right .
\tag{8}
$$

> 关于以上$(8)$式的证明:
>
> 1. 若存在$x$是的某个$f_i(x) \gt 0$ 则我们可令$0 \le \lambda_i \to + \infty$, 进而有$\theta_p(x) = + \infty$.
> 2. 若存在$x$是的某个$h_i(x) \ne 0$ 则我们可令$\mathcal{v}_i h_i(x) \to + \infty$, 进而有$\theta_p(x) = + \infty$.
> 3. 若存在:
>
> $$
> x \in \lbrace x | \forall i, \mathcal{v}_i, \lambda_i \ge 0 , \lambda_i f_i(x) \le 0, \mathcal{v}_i h_i(x) = 0 \rbrace
> $$
>
> 则有:
>
> $$
>
> \max\_{\lambda,\mathcal{v}} \mathcal{L}(x, \lambda, \mathcal{v}) = f_0 (x)
> $$

## 拉格朗日乘数法在SVM问题上的应用

**原始形式**

$$
\min_{\omega, b} = \frac{1}{2} ||\omega||^2 \\\\
s.t. \quad y_i (\omega^T x_i + b) \ge 1, \quad i = 1,\dots,m
$$

转换成一般形式的拉格朗日函数

$$
\min_{\omega, b} = \frac{1}{2} ||\omega||^2 \\\\
s.t. \quad 1 - y_i (\omega^T x_i + b) \le 1, \quad i = 1,\dots,m
\tag{9,6.6}
$$

对应的拉格朗日函数为

$$
\mathcal{L}(\omega, b, \alpha) = \frac{1}{2} ||\omega||^ 2 + \sum_{i=1}^m \alpha_i(1 - y_i (\omega^T x_i + b)) \\\\
s.t. \quad \alpha \ge 0 \quad i = 1,\dots, m
\tag{10,6.8}
$$

这就将原问题转换为等价的

$$
\min_{\omega, b} \max_\alpha \mathcal{L} (\omega, b, \alpha) \\\\
s.t. \quad \alpha \ge 0 \quad i = 1,\dots,m
\tag{11}
$$

# "对偶"概念的介绍

对于SVM问题来说,队友就是将原来的问题$(11)$式形式,转换为下面的形式:

$$
\max_\alpha \min_{\omega, b} \mathcal{L} (\omega, b, \alpha) \\\\
s.t. \quad \alpha \ge 0 \quad i = 1,\dots,m
\tag{11}
$$

可以看出,其实就是将$\max$和$\min$换了个位置.

其必要条件如下:

$$
\frac{\partial \mathcal{L}}{\partial \omega} = 0 \Rightarrow \omega = \sum_{i=1}^m \alpha_i y_i x_i
\tag{12,6.9}
$$

$$
\frac{\partial \mathcal{L}}{\partial b} = 0 \Rightarrow \sum_{i=1}^m \alpha_i y_i = 0
\tag{13, 6.10}
$$

将$(12)$式和$(13)$式回代,则会得到下面的式子:

$$
\max_\alpha \sum_{i=1}^m \alpha_i - \frac{1}{2} \sum_{i=1}^m \sum_{j=1}^m \alpha_i \alpha_j y_i y_j x_i^Tx_j \\\\
\begin{align}
s.t. & \quad \sum_{i=1}^m \alpha_i y_i = 0 \\\\  
& \alpha \ge 0 ,\quad i = 1,\dots, m
\end{align}
\tag{14, 6.11}
$$

> 关于$(6.9)$和$(6.10)$的求偏导过程就不具体写了,比较简单.

我们假设有唯一的超平面$(\omega^\star, b^\star)$是最优解(证明过程请见上一篇文章),则会有:

$$
\omega^\star = \sum_{i=1}^m \alpha_i y_i x_i \\\\
b^\star = y_j - \sum_{i=1}^m \alpha_i y_i (x_i^Tx_j)
$$

理论上,$b^\star$只能取一个最优值.所以在求得$\alpha$以后,可以挑选出任意支持向量,其满足:

$$
y_i(\omega{*T}x_j + b^\star) - 1 = 0 \Rightarrow y_i y_j(\omega^{\star T}x_j + b) - y_i = 0 \\\\
\Rightarrow b^\star = y_j - \omega^{\star T}x_j = y_j - \sum_{i=1}^m \alpha_i y_i (x_I^Tx_j)
$$

# KKT 条件

KKT条件就是一组方程,用于部分最优化问题的求解.

现有如下的优化问题

$$
\begin{align}
opetimize & \quad f_0(x)  \\\\
s.t.& \quad g_i(x) \le 0 \\\\
& \quad h_j(x)
\end{align}
\tag{15}
$$

有如下的KKT条件

$$
\begin{align}
\nabla_x \mathcal{L} = 0 & \qquad stationary\ equation \\\\
g_j(x) = 0, \quad j = 1,\dots,m & \qquad primal\ feasibility\\\\
h_k(x) \le 0 &\qquad primal\ feasibility \\\\
\lambda_k \ge 0 & \qquad dual\ feasibility\\\\
\lambda_k h_k(x) = 0, \quad k = q,\dots,p & \qquad complementary\ feasibility\\\\
\end{align}
$$

## 使用方法如下:

1. 假设待优化的函数为$f: \mathbb{R}^n \to \mathbb{R}$,其约束为$g_i:\mathbb{R}^n \to \mathbb{R}$, 并且优化问题满足regularity
   condition.那么,若$x^\star$是局部最优值,其必然满足KKT条件(必要性)

2. 假设待优化的函数$f(x)$和不等式约束$g_i(x)$是凸函数,等式约束$h_i(x)$是仿射函数,且不等式约束等号能够成立(
   Slater条件,严格可行),那么满足KKT条件的$x$点就是全局最优解(充分条件).

> 正则条件（regularity condition）是指在陈述某一个定理时，常常需要限定这些定理的使用范围。如果超出这个范围，则会导致定理所描述的内容不成立。用于限定这个使用范围的限定条件被称为“正则条件”。
>
> 仿射函数: 能够写成$\mathit{Ax}+b$形式的函数.

# 参考资料

[机器学习,第六章.6.2节](https://book.douban.com/subject/26708119/)
