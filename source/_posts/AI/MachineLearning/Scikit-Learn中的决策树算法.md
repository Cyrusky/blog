---
title: Scikit-Learn中的决策树算法
tags:
  - scikit-learn
  - 决策树
categories:
  - AI
  - Scikit-Learn
toc: true
abbrlink: 9711289d
date: 2020-03-19 08:03:02
thumbnail: https://imgs.borgor.cn/imgs/reading-4330761_960_720.jpg
---

# Scikit-Learn 中的决策树

在`sklearn`中，决策树在以下位置：

> `sklearn.tree`

主要包含这么几种树：

| 包                            | 作用                                    |
| ----------------------------- | --------------------------------------- |
| `tree.DecisionTreeClassifier` | 分类树                                  |
| `tree.DecisionTreeRegressor`  | 回归树                                  |
| `tree.export_graphviz`        | 将生成的决策树导出为 DOT 格式，画图专用 |
| `tree.ExtraTreeClassifier`    | 高随机版本的分类树                      |
| `tree.ExtraTreeRegressor`     | 高随机版本的回归树                      |

<!-- more -->

本次主要介绍一下`tree.DecisionTreeClassifier`，也就是分类树，分类树的本体调用方法如下：

```python
class sklearn.tree.DecisionTreeClassifier (
  criterion=’gini’,
  splitter=’best’,
  max_depth=None,
  min_samples_split=2,
  min_samples_leaf=1,
  min_weight_fraction_leaf=0.0,
  max_features=None,
  random_state=None,
  max_leaf_nodes=None,
  min_impurity_decrease=0.0,
  min_impurity_split=None,
  class_weight=None,
  presort=False
)
```

我们下面主要介绍一下这些参数的使用。

# 参数说明

## 构建决策树的参数

### 不纯度计算方式（`criterion` ）

> 重要程度：★★★★★
>
> 取值：
>
> > `['entropy' | 'gini']`

在通常情况下，决策树中不纯度的计算方式有以下三种：

1. 信息熵（这里的熵要和热力学里面的熵要分开）,信息熵对应的是**ID3算法**

   信息增益(infomation gain)是指父节点的熵减去所有子节点的熵的和。
   $$
   Entropy(t) = - \sum_{i=0}^{c-1} p(i|t) \log_2 p(i|t) \tag{1}
   $$

2. Gini系数

$$
Gini(t) = 1 - \sum_{i=0}^{c-1} p(i|t) ^2\tag{2}
$$

3. 信息增益比（Gain Ratio），信息增益比实为了搞定那些比较偏的数据。

   > 注1. 这里打一个比方，比如说我们的数据集中，一共有100条数据，其中99条的`label`是`True`，只有一条的`label`是`False`， 我们现在有一个算法，这个算法的作用就是将所有的数据分类为`True`， 看起来十分不合理，但是这个算法在该数据集上的正确率确实为$99\%$，这就是因为数据有偏差的缘故。而信息增益比的计算方式可以解决这个问题（[具体可以参照：目标权重参数](#目标权重参数-（class-weight-amp-min-weight-fraction-leaf）)）。
   >
   > 注2：但是，在`scikit-learn`中，自动的将所有的`label`做了平衡，所以，不会出现这种问题。

使用时的注意：

1. 信息熵对于不纯度更加敏感，所以，如果想要决策树生长的更加精细一些，就可以使用信息熵来构建决策树。
2. 具体的实际操作中，信息熵和Gini指数对于决策树的效果基本相同。
3. 因为信息熵更加的“精细”，所以，会过多地学习到数据集中的噪声，所以，在噪声比较大的数据集中，使用基尼系数作为不纯度的计算方式更为合理和有效。

### 设置随机种子 （`random_state`）

> 重要程度：★★★★
>
> 取值：
>
> > `[int]`


在`SciKit-learn`中，对于一个数据集，并不是会将所有的属性（数据的维度）都拿来使用。在每次训练的时候，会随机获取一些属性来进行构建树，对于`random_state`这个参数来说，只要给这个参数添加一个整数值，那么随机性就会被干预，填入的整数会作为随机数种子，将随机选取的那些属性确定下来。

这个参数的调整和调优，在数据具有很高的维度的时候，会有更好地效果。

### 节点的分裂策略（ `splitter`）

> 重要程度：★★★★
>
> 取值：
>
> > `['best' | 'random']`


> The strategy used to choose the split at each node. Supported strategies are “best” to choose the best split and “random” to choose the best random split.

特征划分标准，``[best | random]``。``best`在特征的所有划分点中找出最优的划分点，random随机的在部分划分点中找局部最优的划分点。**默认的‘best’适合样本量不大**的时候，而如果样本数据量非常大，此时决策树构建推荐‘random’。

## 剪枝参数

### 决策树的最大深度（ `max_depth`）

> 重要程度：★★★★
>
> 取值：
>
> > `[int]`


一般情况下，对于决策树的剪枝，我们第一个考虑的就是控制最大深度，一般从5开始尝试，一方面防止过拟合，一方面可以有效地减少计算量（在某些已经不需要计算下去或者分裂的节点上，省去计算）。

### 限制分裂（ `min_samples_split` &  `min_samples_leaf`）

> 重要程度：★★★
>
> 取值：
>
> > `[int]`

* `min_samples_leaf`：一个节点在分枝后的每个子节点都必须包含至少`min_samples_leaf`个训练样本，否则分枝就不会发生，或者，分枝会朝着满足每个子节点都包含min_samples_leaf个样本的方向去发生（比如说，一个节点会给另一个节点匀一些数据），一般搭配`max_depth`使用，在回归树中有神奇的效果，可以让模型变得更加平滑。这个参数的数量设置得太小会引起过拟合，设置得太大就会阻止模型学习数据。一般来说，建议从`=5`开始使用。如果叶节点中含有的样本量变化很 大，建议输入浮点数作为样本量的百分比来使用。同时，这个参数可以保证每个叶子的最小尺寸，可以在回归问题 中避免低方差，过拟合的叶子节点出现。对于类别不多的分类问题，`=1`通常就是最佳选择。 `min_samples_split`限定，一个节点必须要包含至少`min_samples_split`个训练样本，这个节点才允许被分枝，否则 分枝就不会发生。
* `min_samples_split`: 一个节点必须要包含至少`min_samples_split`个训练样本，这个节点才允许被分枝，否则 分枝就不会发生。

### 限制生长 (`max_features` & `min_impurity_decrease` & `max_leaf_nodes` & `min_impurity_split`)

> 注：一般配合`max_depth`使用，用作树的”精修“ 

* max_features：限制分枝时考虑的特征个数，超过限制个数的特征都会被舍弃。和``max_depth`异曲同工， `max_features`是用来限制高维度数据的过拟合的剪枝参数，但其方法比较暴力，是直接限制可以使用的特征数量 而强行使决策树停下的参数，在不知道决策树中的各个特征的重要性的情况下，强行设定这个参数可能会导致模型 学习不足。如果希望通过降维的方式防止过拟合，建议使用`PCA`，`ICA`或者特征选择模块中的降维算法。
* `min_impurity_decrease`：限制信息增益（或者说是不纯度）的大小，信息增益小于设定数值的分枝不会发生。这是在0.19版本种更新的 功能，在0.19版本之前时使用`min_impurity_split`。

## 目标权重参数 （`class_weight` & `min_weight_fraction_leaf`）

完成样本标签平衡的参数。样本不平衡是指在一组数据集中，标签的一类天生占有很大的比例。比如说，在银行要 判断“一个办了信用卡的人是否会违约”，就是是vs否`（1%：99%）`的比例。这种分类状况下，即便模型什么也不 做，全把结果预测成“否”，正确率也能有`99%`。因此我们要使用`class_weight`参数对样本标签进行一定的均衡，给 少量的标签更多的权重，让模型更偏向少数类，向捕获少数类的方向建模。该参数默认`None`，此模式表示自动给 与数据集中的所有标签相同的权重。 有了权重之后，样本量就不再是单纯地记录数目，而是受输入的权重影响了，因此这时候剪枝，就需要搭配`min_weight_fraction_leaf`这个基于权重的剪枝参数来使用。另请注意，基于权重的剪枝参数（例如`min_weight_fraction_leaf`）将比不知道样本权重的标准（比如`min_samples_leaf`）更少偏向主导类。如果样本是加权的，则使 用基于权重的预修剪标准来更容易优化树结构，这确保叶节点至少包含样本权重的总和的一小部分。

## 过期参数就不讨论了：`presort`

# 接口和属性

##  属性：feature_importances_

这个属性里面存放的是一个列表，用于存放各个属性（维度）对于决策树的重要程度。一方面可以看权重，另一方面也可以看`random_state`参数随机用到的一些属性值。

## 接口：fit

这个不多说，就是开练的意思。

```python
clf = clf.fit(XTrain, YTrain) 
# 传入训练集数据和训练集标签
# 返回一个训练好的模型实例
```

## 接口：score

```python
clf.score(Xtest)
# 这个是打分的接口，可以用于给测试集打分，对于分类来说，其分数就是准确率，对于回归来说，回归树的分数为R平方。
```



## 接口：apply

```python
clf.apply(Xtest)
# 返回每个测试样本所在的叶子节点的索引
```



## 接口：predict

```python
clf.predict(Xtest)
# 返回每个测试样本的分类/回归结果 
```

# 其他

对于其他的树，比如：`tree.DecisionTreeRegressor`，回归树来说，参数都大同小异，接口和属性也都差不多，只不过有两点区别：

* 就是因为是连续的标签，所以就没有`class_weight`参数了。
* 评分的标准不一样，无法使用准确率来作为打分标准，所以评分标准使用`R平方`来做。具体找个时间再写。