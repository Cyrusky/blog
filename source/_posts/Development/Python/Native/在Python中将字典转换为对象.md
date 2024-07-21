---
title: 在Python中将字典转换为对象
tags:
  - 开发
categories:
  - Development
  - Python
cover: /assets/images/imgs20190705153652.webp
abbrlink: 8761a3c5
date: 2019-07-05T15:33:15.000Z
thumbnail: /assets/thumbnail/imgs20190705153652.webp
---

# 起因

涉及到这个问题的原因是因为从YAML文件中读取到的属性，被保存到了一个字典中，如下：

```python
import yaml
import os

from Utils.utils import _dict_to_object

yml_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'config.yml')
with open(yml_file, 'r') as f:
    try:
        config = yaml.load(f, Loader=yaml.Loader)
    except:
        config = {}
```

<!-- more -->

后续调用config变量中的配置时，必须要使用：

```python
config.get('属性名', "默认值")
```

但是这样写太麻烦。

# 解决办法

将config从字典转成一个对象，所有的属性就可以通过点操作，直接拿到：

```python
config.属性名
```

# 使用到的技术

## python：self.\_\_dict\_\_

> `__dict__`是一个字典，键为属性名，值为属性值；

所有对象中的成员方法、成员变量等，都可以在这个地方找到。

## dict.update()

可以更新字典的值。

## 具体代码

```python
class Struct:
    def __init__(self, **entries):
        self.__dict__.update(entries)


def _dict_to_object(dict_obj):
    res = Struct(**dict_obj)
    return res
# 这样通过_dict_to_object方法，就可以将字典转换为一个对象了。
```

