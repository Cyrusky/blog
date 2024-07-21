---
title: Numpy&Pandas基本操作(一)
tags:
  - Numpy
  - Pandas
  - Python
  - 科学计算
categories:
  - Development
  - Python
toc: true
abbrlink: 341bf49e
date: 2020-03-09 20:38:59
thumbnail: https://imgs.borgor.cn/imgs/20200310071132.png
---

# Numpy

## Numpy 中的属性

我们通过`dir(numpy)`可以看到,`numpy` 有很多的属性和方法,我们简单的介绍以下几种.

<!-- more -->

### 创建一个矩阵

我们可以使用`numpy.array`来创建一个矩阵,当然这个矩阵可以是 N 维的,创建的时候,需要传入一个数组,数组是多少维,创建的矩阵就是多少维. 创建矩阵的时候,也可以传入第二个参数(dtype), 指定数据类型.

```python
import numpy as np

array = np.array([[1,2,3],
                  [4,5,6],
                  [7,8,9]], dtype=np.float64)
# array([[1, 2, 3],
#        [4, 5, 6],
#        [7, 8, 9]])
type(array)
numpy.ndarray
```

### Numpy 中的数据类型(dtype)

#### 布尔（Booleans）：

| 类型   | 备注              | 字符代码 |
| ------ | ----------------- | -------- |
| bool\_ | 兼容：Python bool | '?'      |
| bool8  | 8 位              |          |

#### 整数（Integers）：

| 类型     | 备注                                         | 字符代码 |
| -------- | -------------------------------------------- | -------- |
| byte     | 兼容：C char                                 | 'b'      |
| short    | 兼容：C short                                | 'h'      |
| intc     | 兼容：C int                                  | 'i'      |
| int\_    | 兼容：Python int                             | 'l'      |
| longlong | 兼容：C long                                 | 'q'      |
| intp     | 以计算机的位数作为动态长度,保证能够存储指针. | 'p'      |
| int8     | 8 位                                         |          |
| int16    | 16 位                                        |          |
| int32    | 32 位                                        |          |
| int64    | 64 位                                        |          |

#### 无符号整数（Unsigned integers）：

| 类型      | 备注                                         | 字符代码 |
| --------- | -------------------------------------------- | -------- |
| ubyte     | 兼容：C unsigned char                        | 'B'      |
| ushort    | 兼容：C unsigned short                       | 'H'      |
| uintc     | 兼容：C unsigned int                         | 'I'      |
| uint      | 兼容：Python int                             | 'L'      |
| ulonglong | 兼容：C long                                 | 'Q'      |
| uintp     | 以计算机的位数作为动态长度,保证能够存储指针. | 'P'      |
| uint8     | 8 位                                         |          |
| uint16    | 16 位                                        |          |
| uint32    | 32 位                                        |          |
| uint64    | 64 位                                        |          |

#### 浮点数字（Floating-point numbers）：

| 类型      | 备注               | 字符代码 |
| --------- | ------------------ | -------- |
| half      |                    | 'e'      |
| single    | 兼容：C float      | 'f'      |
| double    | 兼容：C double     |          |
| float\_   | 兼容：Python float | 'd'      |
| longfloat | 兼容：C longfloat  | 'g'      |
| float16   | 16 位              |          |
| float32   | 32 位              |          |
| float64   | 64 位              |          |
| float96   | 96 位，与平台相关  |          |
| float128  | 128 位，与平台相关 |          |

#### 复数浮点数（Complex floating-point numbers）：

| 类型       | 备注                          | 字符代码 |
| ---------- | ----------------------------- | -------- |
| csingle    |                               | 'F'      |
| complex\_  | 兼容：Python 复数             | 'D'      |
| clongfloat |                               | 'G'      |
| complex64  | 两个 32 位浮点数              |          |
| complex128 | 两个 64 位浮点数              |          |
| complex192 | 两个 96 位浮动,与平台相关     |          |
| complex256 | 两个 128 位浮点数，与平台相关 |          |

#### 任何 Python 对象（Any Python object）：

| 类型     | 备注             | 字符代码 |
| -------- | ---------------- | -------- |
| object\_ | 任何 Python 对象 |          |

### 数组的常用属性

> 有关数组内存布局的信息。

具体的解释,可以看[这里(英文)](https://numpy.org/devdocs/reference/generated/numpy.ndarray.flags.html#numpy.ndarray.flags)和[这里(中文)](https://www.numpy.org.cn/reference/arrays/scalars.html#%E5%86%85%E7%BD%AE%E6%A0%87%E9%87%8F%E7%B1%BB%E5%9E%8B), 内置的标量类型.

这里具体解释一下`C_CONTIGUOUS`和`F_CONTIGUOUS`, `numpy`在内存中存储矩阵的方式有两种,一种是`C.style`, 一种是`Fortran.style`, 可以通过`ndarray.setflags`来修改.

> Fortran 和 matlab 语言中的多维数组存储方式为列优先原则，内循环最好是列循环；而 c 语言中的多维数组存储方式为行优先原则，内循环最好是行循环。编写程序的时候,让循环方式和存储方式匹配可以有效地提高程序的运行速度.

```python
ndarray.flags
# C_CONTIGUOUS : True
# F_CONTIGUOUS : False
# OWNDATA : True
# WRITEABLE : True
# ALIGNED : True
# WRITEBACKIFCOPY : False
# UPDATEIFCOPY : False
```

> 数组维度信息(是一个元组)。

```python
ndarray.shape
# (3, 3)
```

> 遍历数组时每个维度中的字节元组。

```python
array.strides
# (24, 8)
```

> 数组维数。

```python
array.ndim
# 2
```

> Python 缓冲区对象指向数组的数据的开头。

```python
array.data
# <memory at 0x11072fad0>
```

> 数组中的元素数。

```python
array.size
# 9
```

> 一个数组元素的长度，以字节为单位

```python
array.itemsize
# 8
```

> 数组元素消耗的总字节数。

```python
array.nbytes
# 72
```

> 如果内存来自其他对象，则为基础对象, 否则为空

```python
array.base
```

### 数组的常用方法

#### 数组转换

| 方法                                                                                                                                       | 描述                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| [ndarray.item](https://numpy.org/devdocs/reference/generated/numpy.ndarray.item.html#numpy.ndarray.item)(\*args)                           | 将数组元素复制到标准 Python 标量并返回它。                                 |
| [ndarray.tolist](https://numpy.org/devdocs/reference/generated/numpy.ndarray.tolist.html#numpy.ndarray.tolist)()                           | 将数组作为 a.ndim-levels 深层嵌套的 Python 标量列表返回。                  |
| [ndarray.itemset](https://numpy.org/devdocs/reference/generated/numpy.ndarray.itemset.html#numpy.ndarray.itemset)(\*args)                  | 将标量插入数组（如果可能，将标量转换为数组的 dtype）                       |
| [ndarray.tostring](https://numpy.org/devdocs/reference/generated/numpy.ndarray.tostring.html#numpy.ndarray.tostring)([order])              | 构造包含数组中原始数据字节的 Python 字节。                                 |
| [ndarray.tobytes](https://numpy.org/devdocs/reference/generated/numpy.ndarray.tobytes.html#numpy.ndarray.tobytes)([order])                 | 构造包含数组中原始数据字节的 Python 字节。                                 |
| [ndarray.tofile](https://numpy.org/devdocs/reference/generated/numpy.ndarray.tofile.html#numpy.ndarray.tofile)(fid[, sep, format])         | 将数组作为文本或二进制写入文件（默认）。                                   |
| [ndarray.dump](https://numpy.org/devdocs/reference/generated/numpy.ndarray.dump.html#numpy.ndarray.dump)(file)                             | 将数组的 pickle 转储到指定的文件。                                         |
| [ndarray.dumps](https://numpy.org/devdocs/reference/generated/numpy.ndarray.dumps.html#numpy.ndarray.dumps)()                              | 以字符串形式返回数组的 pickle。                                            |
| [ndarray.astype](https://numpy.org/devdocs/reference/generated/numpy.ndarray.astype.html#numpy.ndarray.astype)(dtype[, order, casting, …]) | 数组的副本，强制转换为指定的类型。                                         |
| [ndarray.byteswap](https://numpy.org/devdocs/reference/generated/numpy.ndarray.byteswap.html#numpy.ndarray.byteswap)([inplace])            | 交换数组元素的字节                                                         |
| [ndarray.copy](https://numpy.org/devdocs/reference/generated/numpy.ndarray.copy.html#numpy.ndarray.copy)([order])                          | 返回数组的副本。                                                           |
| [ndarray.view](https://numpy.org/devdocs/reference/generated/numpy.ndarray.view.html#numpy.ndarray.view)([dtype, type])                    | 具有相同数据的数组的新视图。                                               |
| [ndarray.getfield](https://numpy.org/devdocs/reference/generated/numpy.ndarray.getfield.html#numpy.ndarray.getfield)(dtype[, offset])      | 返回给定数组的字段作为特定类型。                                           |
| [ndarray.setflags](https://numpy.org/devdocs/reference/generated/numpy.ndarray.setflags.html#numpy.ndarray.setflags)([write, align, uic])  | 分别设置数组标志 WRITEABLE，ALIGNED，（WRITEBACKIFCOPY 和 UPDATEIFCOPY）。 |
| [ndarray.fill](https://numpy.org/devdocs/reference/generated/numpy.ndarray.fill.html#numpy.ndarray.fill)(value)                            | 使用标量值填充数组。                                                       |

#### 形状操作

对于重新`n`整形，调整大小和转置，单个元组参数可以用将被解释为 n 元组的整数替换。

| 方法                                                                                                                                  | 描述                                       |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [ndarray.reshape](https://numpy.org/devdocs/reference/generated/numpy.ndarray.reshape.html#numpy.ndarray.reshape)(shape[, order])     | 返回包含具有新形状的相同数据的数组。       |
| [ndarray.resize](https://numpy.org/devdocs/reference/generated/numpy.ndarray.resize.html#numpy.ndarray.resize)(new_shape[, refcheck]) | 就地更改数组的形状和大小。                 |
| [ndarray.transpose](https://numpy.org/devdocs/reference/generated/numpy.ndarray.transpose.html#numpy.ndarray.transpose)(\*axes)       | 返回轴转置的数组视图。                     |
| [ndarray.swapaxes](https://numpy.org/devdocs/reference/generated/numpy.ndarray.swapaxes.html#numpy.ndarray.swapaxes)(axis1, axis2)    | 返回数组的视图，其中 axis1 和 axis2 互换。 |
| [ndarray.flatten](https://numpy.org/devdocs/reference/generated/numpy.ndarray.flatten.html#numpy.ndarray.flatten)([order])            | 将折叠的数组的副本返回到一个维度。         |
| [ndarray.ravel](https://numpy.org/devdocs/reference/generated/numpy.ndarray.ravel.html#numpy.ndarray.ravel)([order])                  | 返回一个扁平的数组。                       |
| [ndarray.squeeze](https://numpy.org/devdocs/reference/generated/numpy.ndarray.squeeze.html#numpy.ndarray.squeeze)([axis])             | 从形状除去单维输入一个。                   |

#### 项目选择和操作

对于采用 _axis_ 关键字的数组方法，默认为 `None`。 如果 axis 为 _None_ ，则将数组视为 1-D 数组。 _轴的_ 任何其他值表示操作应继续进行的维度。

| 方法                                                                                                                                                       | 描述                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [ndarray.take](https://numpy.org/devdocs/reference/generated/numpy.ndarray.take.html#numpy.ndarray.take)(indices[, axis, out, mode])                       | 返回由给定索引处的 a 元素组成的数组。                               |
| [ndarray.put](https://numpy.org/devdocs/reference/generated/numpy.ndarray.put.html#numpy.ndarray.put)(indices, values[, mode])                             | 为索引中的所有 n 设置。a.flat[n] = values[n]                        |
| [ndarray.repeat](https://numpy.org/devdocs/reference/generated/numpy.ndarray.repeat.html#numpy.ndarray.repeat)(repeats[, axis])                            | 重复数组的元素。                                                    |
| [ndarray.choose](https://numpy.org/devdocs/reference/generated/numpy.ndarray.choose.html#numpy.ndarray.choose)(choices[, out, mode])                       | 使用索引数组从一组选项中构造新数组。                                |
| [ndarray.sort](https://numpy.org/devdocs/reference/generated/numpy.ndarray.sort.html#numpy.ndarray.sort)([axis, kind, order])                              | 对数组进行就地排序。                                                |
| [ndarray.argsort](https://numpy.org/devdocs/reference/generated/numpy.ndarray.argsort.html#numpy.ndarray.argsort)([axis, kind, order])                     | 返回将对此数组进行排序的索引。                                      |
| [ndarray.partition](https://numpy.org/devdocs/reference/generated/numpy.ndarray.partition.html#numpy.ndarray.partition)(kth[, axis, kind, order])          | 重新排列数组中的元素，使得第 k 个位置的元素值位于排序数组中的位置。 |
| [ndarray.argpartition](https://numpy.org/devdocs/reference/generated/numpy.ndarray.argpartition.html#numpy.ndarray.argpartition)(kth[, axis, kind, order]) | 返回将对此数组进行分区的索引。                                      |
| [ndarray.searchsorted](https://numpy.org/devdocs/reference/generated/numpy.ndarray.searchsorted.html#numpy.ndarray.searchsorted)(v[, side, sorter])        | 查找应在其中插入 v 的元素以维护顺序的索引。                         |
| [ndarray.nonzero](https://numpy.org/devdocs/reference/generated/numpy.ndarray.nonzero.html#numpy.ndarray.nonzero)()                                        | 返回非零元素的索引。                                                |
| [ndarray.compress](https://numpy.org/devdocs/reference/generated/numpy.ndarray.compress.html#numpy.ndarray.compress)(condition[, axis, out])               | 沿给定轴返回此数组的选定切片。                                      |
| [ndarray.diagonal](https://numpy.org/devdocs/reference/generated/numpy.ndarray.diagonal.html#numpy.ndarray.diagonal)([offset, axis1, axis2])               | 返回指定的对角线。                                                  |

#### 数组计算

| 方法                                                                                                                                            | 描述                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [ndarray.max](https://numpy.org/devdocs/reference/generated/numpy.ndarray.max.html#numpy.ndarray.max)([axis，out，keepdims，initial，...]）     | 沿给定轴返回最大值。                         |
| [ndarray.argmax](https://numpy.org/devdocs/reference/generated/numpy.ndarray.argmax.html#numpy.ndarray.argmax)([axis, out])                     | 返回给定轴上的最大值的索引。                 |
| [ndarray.min](https://numpy.org/devdocs/reference/generated/numpy.ndarray.min.html#numpy.ndarray.min)([axis，out，keepdims，initial，...])      | 沿给定轴返回最小值。                         |
| [ndarray.argmin](https://numpy.org/devdocs/reference/generated/numpy.ndarray.argmin.html#numpy.ndarray.argmin)([axis, out])                     | 沿给定一个轴线返回最小值的索引。             |
| [ndarray.ptp](https://numpy.org/devdocs/reference/generated/numpy.ndarray.ptp.html#numpy.ndarray.ptp)([axis, out, keepdims])                    | 沿给定轴的峰峰值（最大值 - 最小值）。        |
| [ndarray.clip](https://numpy.org/devdocs/reference/generated/numpy.ndarray.clip.html#numpy.ndarray.clip)([min，max，out])                       | 返回值限制为的数组。$[\min, \max]$           |
| [ndarray.conj](https://numpy.org/devdocs/reference/generated/numpy.ndarray.conj.html#numpy.ndarray.conj)()                                      | 复合共轭所有元素。                           |
| [ndarray.round](https://numpy.org/devdocs/reference/generated/numpy.ndarray.round.html#numpy.ndarray.round)([decimals, out])                    | 返回 a，每个元素四舍五入到给定的小数位数。   |
| [ndarray.trace](https://numpy.org/devdocs/reference/generated/numpy.ndarray.trace.html#numpy.ndarray.trace)([offset, axis1, axis2, dtype, out]) | 返回数组对角线的总和。                       |
| [ndarray.sum](https://numpy.org/devdocs/reference/generated/numpy.ndarray.sum.html#numpy.ndarray.sum)([axis, dtype, out, keepdims, …])          | 返回给定轴上的数组元素的总和。相当于$\sum$   |
| [ndarray.cumsum](https://numpy.org/devdocs/reference/generated/numpy.ndarray.cumsum.html#numpy.ndarray.cumsum)([axis, dtype, out])              | 返回给定轴上元素的累积和。                   |
| [ndarray.mean](https://numpy.org/devdocs/reference/generated/numpy.ndarray.mean.html#numpy.ndarray.mean)([axis, dtype, out, keepdims])          | 返回给定轴上数组元素的平均值。               |
| [ndarray.var](https://numpy.org/devdocs/reference/generated/numpy.ndarray.var.html#numpy.ndarray.var)([axis, dtype, out, ddof, keepdims])       | 返回给定轴的数组元素的方差。                 |
| [ndarray.std](https://numpy.org/devdocs/reference/generated/numpy.ndarray.std.html#numpy.ndarray.std)([axis, dtype, out, ddof, keepdims])       | 返回沿给定轴的数组元素的标准偏差。           |
| [ndarray.prod](https://numpy.org/devdocs/reference/generated/numpy.ndarray.prod.html#numpy.ndarray.prod)([axis, dtype, out, keepdims, …])       | 返回给定轴上的数组元素的乘积。相当于$\prod$  |
| [ndarray.cumprod](https://numpy.org/devdocs/reference/generated/numpy.ndarray.cumprod.html#numpy.ndarray.cumprod)([axis, dtype, out])           | 返回沿给定轴的元素的累积乘积。               |
| [ndarray.all](https://numpy.org/devdocs/reference/generated/numpy.ndarray.all.html#numpy.ndarray.all)([axis, out, keepdims])                    | 如果所有元素都计算为 True，则返回 True。     |
| [ndarray.any](https://numpy.org/devdocs/reference/generated/numpy.ndarray.any.html#numpy.ndarray.any)([axis, out, keepdims])                    | 如果有任何一个元素计算为 True，则返回 true。 |

#### 算术、矩阵乘法和比较运算

`numpy`对于大多数的`运算符`也都做了重写，具体如下：

> 比较运算符：

| 方法                                                                                                                           | 描述               |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| [ndarray._*lt*_](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__lt__.html#numpy.ndarray.__lt__)(self, value, /) | 返回 self<value.   |
| [ndarray._*le*_](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__le__.html#numpy.ndarray.__le__)(self, value, /) | 返回 self<=value.  |
| [ndarray._*gt*_](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__gt__.html#numpy.ndarray.__gt__)(self, value, /) | 返回 self>value.   |
| [ndarray._*ge*_](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__ge__.html#numpy.ndarray.__ge__)(self, value, /) | 返回 self>=value.  |
| [ndarray._*eq*_](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__eq__.html#numpy.ndarray.__eq__)(self, value, /) | 返回 self==value.  |
| [ndarray._*ne*_](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__ne__.html#numpy.ndarray.__ne__)(self, value, /) | ;返回 self!=value. |

> array（`bool`）的真值测试:

| 方法                                                                                                                          | 描述      |
| ----------------------------------------------------------------------------------------------------------------------------- | --------- |
| [ndarray.**bool**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__bool__.html#numpy.ndarray.__bool__)(self, /) | self != 0 |

> 一元操作：

| 方法                                                                                                                                | 描述  |
| ----------------------------------------------------------------------------------------------------------------------------------- | ----- |
| [ndarray.**neg**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__neg__.html#numpy.ndarray.__neg__)(self, /)          | -self |
| [ndarray.**pos**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__pos__.html#numpy.ndarray.__pos__)(self, /)          | +self |
| [ndarray.**abs**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__abs__.html#numpy.ndarray.__abs__)(self)             |       |
| [ndarray.**invert**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__invert__.html#numpy.ndarray.__invert__)(self, /) | ~self |

> 一元操作：

| 方法                                                                                                                                | 描述  |
| ----------------------------------------------------------------------------------------------------------------------------------- | ----- |
| [ndarray.**neg**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__neg__.html#numpy.ndarray.__neg__)(self, /)          | -self |
| [ndarray.**pos**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__pos__.html#numpy.ndarray.__pos__)(self, /)          | +self |
| [ndarray.**abs**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__abs__.html#numpy.ndarray.__abs__)(self)             |       |
| [ndarray.**invert**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__invert__.html#numpy.ndarray.__invert__)(self, /) | ~self |

> 算术：

| 方法                                                                                                                                             | 描述                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| [ndarray.**add**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__add__.html#numpy.ndarray.__add__)(self, value, /)                | 返回 self+value.            |
| [ndarray.**sub**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__sub__.html#numpy.ndarray.__sub__)(self, value, /)                | 返回 self-value.            |
| [ndarray.**mul**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__mul__.html#numpy.ndarray.__mul__)(self, value, /)                | 返回 self\*value.           |
| [ndarray.**truediv**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__truediv__.html#numpy.ndarray.__truediv__)(self, value, /)    | 返回 self/value.            |
| [ndarray.**floordiv**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__floordiv__.html#numpy.ndarray.__floordiv__)(self, value, /) | 返回 self//value.           |
| [ndarray.**mod**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__mod__.html#numpy.ndarray.__mod__)(self, value, /)                | 返回 self%value.            |
| [ndarray.**divmod**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__divmod__.html#numpy.ndarray.__divmod__)(self, value, /)       | 返回 divmod(self, value).   |
| [ndarray.**pow**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__pow__.html#numpy.ndarray.__pow__)(self, value[, mod])            | 返回 pow(self, value, mod). |
| [ndarray.**lshift**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__lshift__.html#numpy.ndarray.__lshift__)(self, value, /)       | 返回 self<<value.           |
| [ndarray.**rshift**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__rshift__.html#numpy.ndarray.__rshift__)(self, value, /)       | 返回 self>>value.           |
| [ndarray.**and**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__and__.html#numpy.ndarray.__and__)(self, value, /)                | 返回 self&value.            |
| [ndarray.**or**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__or__.html#numpy.ndarray.__or__)(self, value, /)                   | 返回 self                   |
| [ndarray.**xor**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__xor__.html#numpy.ndarray.__xor__)(self, value, /)                |                             |

> 就地算术运算方法：

| 方法                                                                                                                                                | 描述                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| [ndarray.**iadd**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__iadd__.html#numpy.ndarray.__iadd__)(self, value, /)                | 返回 self+=value。    |
| [ndarray.**isub**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__isub__.html#numpy.ndarray.__isub__)(self, value, /)                | 返回 self==value。    |
| [ndarray.**imul**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__imul__.html#numpy.ndarray.__imul__)(self, value, /)                | 返回 self\*=value。   |
| [ndarray.**itruediv**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__itruediv__.html#numpy.ndarray.__itruediv__)(self, value, /)    | 返回 self/=value。    |
| [ndarray.**ifloordiv**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__ifloordiv__.html#numpy.ndarray.__ifloordiv__)(self, value, /) | 返回 self//=value。   |
| [ndarray.**imod**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__imod__.html#numpy.ndarray.__imod__)(self, value, /)                | 返回 self％=value。   |
| [ndarray.**ipow**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__ipow__.html#numpy.ndarray.__ipow__)(self, value, /)                | 返回 self\*\*=value。 |
| [ndarray.**ilshift**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__ilshift__.html#numpy.ndarray.__ilshift__)(self, value, /)       | 返回 self<<=value。   |
| [ndarray.**irshift**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__irshift__.html#numpy.ndarray.__irshift__)(self, value, /)       | 返回 self>>=value。   |
| [ndarray.**iand**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__iand__.html#numpy.ndarray.__iand__)(self, value, /)                | 返回 self&=value。    |
| [ndarray.**ior**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__ior__.html#numpy.ndarray.__ior__)(self, value, /)                   | 返回 self             |
| [ndarray.**ixor**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__ixor__.html#numpy.ndarray.__ixor__)(self, value, /)                | 返回 self^=value。    |

> 矩阵乘法：

| 方法                                                                                                                                       | 描述                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| [ndarray.**matmul**](https://numpy.org/devdocs/reference/generated/numpy.ndarray.__matmul__.html#numpy.ndarray.__matmul__)(self, value, /) | 返回 [self@value](mailto:self%40value)。 |

# Pandas

## 下一篇再写吧
