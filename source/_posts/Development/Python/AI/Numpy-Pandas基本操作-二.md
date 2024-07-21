---
title: Numpy&Pandas基本操作(二)
tags:
  - Numpy
  - Pandas
  - Python
  - 科学计算
categories:
  - Development
  - Python
toc: true
thumbnail: 'https://imgs.borgor.cn/imgs/20200310114635.png'
abbrlink: bfa8d6bd
date: 2020-03-10 11:45:29
---

# Pandas

## Pandas 简介

`Pandas`是一个基于`Numpy`的科学计算包,他将`Numpy`封装成一个更加易于用户使用的方式.

> 如果用 python 的列表和字典来作比较, 那么可以说 Numpy 是列表形式的，没有数值标签，而 Pandas 就是字典形式。Pandas 是基于 Numpy 构建的，让 Numpy 为中心的应用变得更加简单。 -- <莫凡 Python-Pandas 简介>

<!-- more -->

## 两种基本数据结构`Series`和`DataFrame`

### `Series`

```python
pd.Series([1,2,3,4])
# 0    1
# 1    2
# 2    3
# 3    4
# dtype: int64
```

可以看得出来,`Series`数据结构其实是将`Numpy`的`ndarray`封装了一下,让使用者更加直接的去使用.

### `DataFrame`

`DataFrame`是一个表格型的数据结构，它包含有一组有序的列，每列可以是不同的值类型（数值，字符串，布尔值等）。`DataFrame`既有行索引也有列索引， 它可以被看做由`Series`组成的大字典。

我们可以根据每一个不同的索引来挑选数据:

```python

d = pd.date_range('20200301',periods=6)
# DatetimeIndex(['2020-03-01', '2020-03-02', '2020-03-03', '2020-03-04',
#                '2020-03-05', '2020-03-06'],
#               dtype='datetime64[ns]', freq='D')

df = pd.DataFrame(np.random.randn(6,4),index=d,columns=['a','b','c','d'])
#                    a         b         c         d
# 2020-03-01  0.146927  1.502298  0.347304 -0.041707
# 2020-03-02 -1.430349  0.946254  0.354297 -2.076855
# 2020-03-03  0.534247  1.028356  0.403737  0.650875
# 2020-03-04  1.493758 -1.456223  2.071205  1.865286
# 2020-03-05 -0.564882  0.421414  0.795685 -0.129383
# 2020-03-06  1.016868 -1.152248 -0.917758 -0.168378
```

我们可以将`DataFrame`简单的看做上一篇中提到过的`Numpy.ndarray`. 其具体操作:

### DataFrame 的基本操作

#### 去某列数据(通过索引)

```python
df['d']
# 2020-03-01   -0.041707
# 2020-03-02   -2.076855
# 2020-03-03    0.650875
# 2020-03-04    1.865286
# 2020-03-05   -0.129383
# 2020-03-06   -0.168378
# Freq: D, Name: d, dtype: float64
type(df['d'])
# pandas.core.series.Series
```

我们可以看出,其实`DataFrame`中的单一列就是一个`Series`
