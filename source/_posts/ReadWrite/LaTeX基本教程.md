---
title: Hexo中的LaTeX基本教程
tags:
  - 写作
categories:
  - Reading&Writing
  - Hexo
toc: true
cover: /assets/images/20190807105826.webp
abbrlink: 81a83d60
date: 2019-08-06T21:24:47.000Z
thumbnail: /assets/thumbnail/20190807105826.webp
---

# 在Hexo中使用LaTeX

## 单行中使用

```text
$[LaTeX内容]$
```

如：$E=mC^2$

<!-- more -->

## 在多行中使用

```text
$$
	[LaTeX内容]
$$
```

如：
$$
I=
\left|\begin{array} \\
1 & 0 & 0 \\\\
0 & 1 & 0 \\\\
0 & 0 & 1 \\\\
\end{array}\right|
$$

## LaTeX内部换行

```latex
a  b \\ c  d
```

> 注：由于Hexo中会先将Markdown转换为html，然后由MathJax渲染数学公式，所以换行需要写成四个`\`
> ，这样能确保MathJax能够看到两个连续的`\`。

$$
a b \\\\ c d
$$

## LaTeX公式与文本的间隔

```latex
a \quad b \quad c 
```

$$
a \qquad b \qquad c
$$

## LaTex公式编号

直接使用块级代码`$$x^n+y^n=z^n$$`不会生成编号，而使用`\tag{...}`标签就可以生成对应的编号。

```latex
I_3=\left|\begin{array} \\
    1 & 0 & 0 \\\\ 
		0 & 1 & 0 \\\\ 
		0 & 0 & 1 \\\\ 
\end{array}\right|
\tag{1.1}
```

$$
I_3 = \left|\begin{array} \\
1 & 0 & 0 \\\\
0 & 1 & 0 \\\\
0 & 0 & 1 \\\\
\end{array}\right|
\tag{1.1}
$$

# 常用的数学符号与格式

## 上下标

```latex
a^2 A_i
```

$$
a^2 \qquad A_i
$$

## 方根

平方根（square root）的输入命令为：**\sqrt**，n 次方根相应地为: **\sqrt[n]**。方根符号的大小由**LaTeX**自动加以调整。也可用\surd
仅给出符号。

```latex
\sqrt{x} \sqrt[3]{x^3}
```

$$
\sqrt{x} \qquad \sqrt[3]{x^3}
\qquad \surd(a^2+b^2)
$$

## 上划线和下划线

命令\overline 和\underline 在表达式的上、下方画出水平线。

```latex
\overline{AB} \\ \underline{m+n}
```

$$
\overline{AB} \qquad \underline{m+n}
$$

## 向量的表示

向量（Vectors）通常用上方有小箭头（arrow symbols）的变量表示。这可由\vec 得到。另两个命令\overrightarrow 和\overleftarrow在定义从A
到B 的向量时非常有用。

```latex
\vec a \quad \overrightarrow{AB} \quad \overleftarrow{CD}
```

$$
\vec a \quad \overrightarrow{AB} \quad \overleftarrow{CD}
$$

## 分数

分数（fraction）使用\frac{...}{...} 排版。一般来说，1/2 这种形式更受欢迎，因为对于少量的分式，它看起来更好些。

```latex
\frac{1}{2} \\ 
```

$$
\frac{1}{2} \\\\
$$

对于简单的公式，则直接可以使用`\over`这种形式：

```latex
1 \over 2
```

$$
1 \over 2
$$

## 积分

积分运算符（integral operator）用\int 来生成。求和运算符（sum operator）由\sum 生成。乘积运算符（product operator）由\prod
生成。上限和下限用^ 和_来生成，类似于上标和下标。

```latex
\sum_{n=1}^\infty \frac{1}{n} \\
\int_0^\frac{\pi}{2} sin(\theta) d \theta \\
\prod_\epsilon
```

$$
\sum_{n=1}^\infty \frac{1}{n} \\\\
\int_0^\frac{\pi}{2} sin(\theta) d \theta \\\\
\prod_\epsilon
$$

## 极限

```latex
\lim_{x \to 2} 
```

$$
\lim_{x \to 2}
$$

# 符号表

## 数学模式重音符

```latex
\hat{a}     \grave{a}       \bar{a}     \check{a} 
\dot{a}     \vec{a}         \tilde{a}   \ddot{a} 
\widehat{A} \acute{a}       \breve{a}   \widetilde{A}
```

$$
\begin{align}
\hat{a} & \qquad \grave{a} \qquad \bar{a} \qquad \check{a} \\\\ \dot{a} & \qquad \vec{a} \qquad \tilde{a} \qquad
\ddot{a} \\\\ \widehat{A} & \qquad \acute{a} \qquad \breve{a} \qquad \widetilde{A}
\end{align}
$$

## 小写希腊字母

```latex
\alpha			\theta		o 				\upsilon \\
\beta 			\vartheta \pi 			\phi \\
\gamma 			\iota 		\varpi 		\varphi \\
\delta 			\kappa 		\rho 			\chi \\
\epsilon 		\lambda 	\varrho 	\psi \\
\varepsilon \mu 			\sigma 		\omega \\
\zeta 			\nu 			\varsigma \\
\eta 				\xi 			\tau
```

$$
\begin{align}
\alpha & \qquad \theta \qquad o \qquad \upsilon \\\\
\beta & \qquad \vartheta \qquad \pi \qquad \phi \\\\
\gamma & \qquad \iota \qquad \varpi \qquad \varphi \\\\
\delta & \qquad \kappa \qquad \rho \qquad \chi \\\\
\epsilon & \qquad \lambda \qquad \varrho \qquad \psi \\\\
\varepsilon & \qquad \mu \qquad \sigma \qquad \omega \\\\
\zeta & \qquad \nu \qquad \varsigma \\\\
\eta & \qquad \xi \qquad \tau
\end{align}
$$

## 大写希腊字母

```latex
\Gamma			\Lambda			\Sigma			\Psi	\\
\Delta			\Xi					\Upsilon		\Omega	\\
\Theta			\Pi					\Phi
```

$$
\begin{align}
\Gamma & \qquad \Lambda \qquad \Sigma \qquad \Psi \\\\
\Delta & \qquad \Xi \qquad \Upsilon \qquad \Omega \\\\
\Theta & \qquad \Pi \qquad \Phi
\end{align}
$$

## 二元关系

|             |             |             |
|:-----------:|:-----------:|:-----------:|
|      <      |      >      |      =      |
| \leq or \le | \geq or \ge |   \equiv    |
|     \ll     |     \gg     |   \equiv    |
|    \prec    |    \succ    |    \sim     |
|   \preceq   |   \succeq   |   \simeq    |
|   \subset   |   \supset   |   \approx   |
|  \subseteq  |  \supseteq  |    \cong    |
|  \sqsubset  |  \sqsupset  |    \Join    |
| \sqsubseteq | \sqsubseteq |   \bowtie   |
|     \in     | \ni, \owns  |   \propto   |
|   \vdash    |   \dashv    |   \models   |
|    \mid     |  \parallel  |    \perp    |
|   \smile    |   \frown    |   \asymp    |
|      :      |   \notin    | \neq or \ne |

$$
\begin{align}
< &\qquad > & = \\\\
\leq &\qquad \geq & \equiv \\\\
\ll&\qquad \gg& \doteq \\\\
\prec&\qquad \succ& \sim \\\\
\preceq&\qquad \succeq& \simeq \\\\
\subset&\qquad \supset& \approx \\\\
\subseteq&\qquad \supseteq&\cong \\\\
\sqsubset&\qquad \sqsupset&\Join \\\\
\sqsubseteq&\qquad \sqsubseteq&\bowtie \\\\
\in&\qquad \ni&\propto \\\\
\vdash&\qquad \dashv&\models \\\\
\mid&\qquad \parallel&\perp \\\\
\smile&\qquad \frown&\asymp \\\\
:&\qquad \notin&\neq
\end{align}
$$

## 二元运算符

|                |                  |                |
|----------------|------------------|----------------|
| +              | -                |                |
| \pm            | \mp              | \triangleleft  |
| \cdot          | \div             | \triangleright |
| \times         | \setminus        | \star          |
| \cup           | \cap             | \ast           |
| \sqcup         | \sqcap           | \circ          |
| \vee, \lor     | \wedge, \land    | \bullet        |
| \oplus         | \ominus          | \diamond       |
| \odot          | \oslash          | \uplus         |
| \otimes        | \bigcirc         | \amalg         |
| \bigtriangleup | \bigtriangledown | \dagger        |
| \lhd           | \rhd             | \ddagger       |
| \unlhd         | \unrhd           | \wr            |

$$
\begin{align}
\+ & \qquad - & \\\\
\pm & \qquad \mp & \triangleleft \\\\
\cdot& \qquad \div& \triangleright \\\\
\times& \qquad \setminus& \star \\\\
\cup& \qquad \cap& \ast \\\\
\sqcup& \qquad \sqcap& \circ \\\\
\vee & \qquad \wedge & \bullet \\\\
\oplus& \qquad \ominus & \diamond \\\\
\odot& \qquad \oslash& \uplus \\\\
\otimes& \qquad \bigcirc& \amalg \\\\
\bigtriangleup& \qquad \bigtriangledown& \dagger \\\\
\lhd& \qquad \rhd& \ddagger \\\\
\unlhd& \qquad \unrhd& \wr
\end{align}
$$

## 大尺寸运算符

|         |           |           |            |
|---------|-----------|-----------|------------|
| \sum    | \bigcup   | \bigvee   | \bigoplus  |
| \prod   | \bigcap   | \bigwedge | \bigotimes |
| \coprod | \bigsqcup |           | \bigodot   |
| \int    | \oint     |           | \biguplus  |

$$
\begin{align}
\sum & \qquad \bigcup & \bigvee &\qquad \bigoplus \\\\
\prod & \qquad \bigcap & \bigwedge &\qquad \bigotimes \\\\
\coprod& \qquad \bigsqcup &&\qquad \bigodot \\\\
\int & \qquad \oint &\qquad &\qquad \biguplus
\end{align}
$$

## 箭头

|                     |                      |              |
|---------------------|----------------------|--------------|
| \leftarrow or \gets | \longleftarrow       | \uparrow     |
| \rightarrow or \to  | \longrightarrow      | \downarrow   |
| \leftrightarrow     | \longleftrightarrow  | \updownarrow |
| \Leftarrow          | \Longleftarrow       | \Uparrow     |
| \Rightarrow         | \Longrightarrow      | \Downarrow   |
| \Leftrightarrow     | \Longleftrightarrow  | \Updownarrow |
| \mapsto             | \longmapsto          | \nearrow     |
| \hookleftarrow      | \hookrightarrow      | \searrow     |
| \leftharpoonup      | \rightharpoonup      | \swarrow     |
| \leftharpoondown    | \rightharpoondown    | \nwarrow     |
| \rightleftharpoons  | \iff (bigger spaces) | \leadsto     |

$$
\begin{align}
\leftarrow &\qquad \longleftarrow &\qquad \uparrow &\qquad \\\\
\rightarrow &\qquad \longrightarrow &\qquad \downarrow &\qquad \\\\
\leftrightarrow &\qquad \longleftrightarrow &\qquad \updownarrow &\qquad \\\\
\Leftarrow &\qquad \Longleftarrow &\qquad \Uparrow &\qquad \\\\
\Rightarrow &\qquad \Longrightarrow &\qquad \Downarrow &\qquad \\\\
\Leftrightarrow &\qquad \Longleftrightarrow &\qquad \Updownarrow &\qquad \\\\
\mapsto &\qquad \longmapsto &\qquad \nearrow &\qquad \\\\
\hookleftarrow &\qquad \hookrightarrow &\qquad \searrow &\qquad \\\\
\leftharpoonup &\qquad \rightharpoonup &\qquad \swarrow &\qquad \\\\
\leftharpoondown &\qquad \rightharpoondown &\qquad \nwarrow &\qquad \\\\
\rightleftharpoons&\qquad \iff &\qquad \leadsto &\qquad \\\\\end{align}
$$

## 界定符

|               |                             |              |
|---------------|-----------------------------|--------------|
| (             | )  \uparrow                 | \Uparrow     |
| [ or \lbrack  | ] or \rbrack  \downarrow    | \Downarrow   |
| \{ or \lbrace | \} or \rbrace  \updownarrow | \Updownarrow |
| \langle       | \rangle                     | or \vert     | \| or \Vert  |
| \lfloor       | \rfloor  \lceil             | \rceil       |
| /             | \backslash  . (dual. empty) |              |

$$
\begin{align}
( &\qquad ) &\qquad \uparrow &\qquad \Uparrow \\\\
[ &\qquad ] &\qquad \downarrow &\qquad \Downarrow \\\\
\lbrace &\qquad \rbrace &\qquad \updownarrow &\qquad \Updownarrow \\\\
\langle &\qquad \rangle &\qquad \vert &\qquad \Vert \\\\
\lfloor &\qquad \rfloor &\qquad \lceil &\qquad \rceil \\\\
/ &\qquad \backslash &\qquad &\qquad   
\end{align}
$$

## 大尺寸界定符

|            |            |             |             |
|------------|------------|-------------|-------------|
| \lgroup    | \rgroup    | \lmoustache | \rmoustache |
| \arrowvert | \Arrowvert | \bracevert  |             |

$$
\begin{align}
\lgroup & \qquad \rgroup& \qquad \lmoustache & \qquad \rmoustache \\\\
\arrowvert & \qquad \Arrowvert & \qquad \bracevert
\end{align}
$$

## 其他符号

|               |            |             |             |
|---------------|------------|-------------|-------------|
| \lgroup       | \rgroup    | \lmoustache | \rmoustache |
| \dots         | \cdots     | \vdots      | \ddots      |
| \hbar         | \imath     | \jmath      | \ell        |
| \Re           | \Im        | \aleph      | \wp         |
| \forall       | \exists    | \mho a      | \partial    |
| ’             | \prime     | \emptyset   | \infty      |
| \nabla        | \triangle  | \Box a      | \Diamond    |
| \bot          | \top       | \angle      | \surd       |
| \diamondsuit  | \heartsuit | \clubsuit   | \spadesuit  |
| \neg or \lnot | \flat      | \natural    | \sharp      |

$$
\begin{align}
\dots &\qquad \cdots &\qquad \vdots &\qquad \ddots &\qquad \\\\
\hbar &\qquad \imath &\qquad \jmath &\qquad \ell &\qquad \\\\
\Re &\qquad \Im &\qquad \aleph &\qquad \wp &\qquad \\\\
\forall &\qquad \exists &\qquad \mho &\qquad \partial &\qquad \\\\
’ &\qquad \prime &\qquad \emptyset &\qquad \infty &\qquad \\\\
\nabla &\qquad \triangle &\qquad \Box &\qquad \Diamond &\qquad \\\\
\bot &\qquad \top &\qquad \angle &\qquad \surd &\qquad \\\\
\diamondsuit &\qquad \heartsuit &\qquad \clubsuit &\qquad \spadesuit &\qquad \\\\
\neg &\qquad \flat &\qquad \natural &\qquad \sharp &\qquad \\\\
\end{align}
$$

