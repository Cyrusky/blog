---
title: 在Django中使用migrate初始化数据库数据
tags:
  - Django
  - migrate
categories:
  - Development
  - Python
thumbnail: 'https://imgs.borgor.cn/imgs20190710084259.png'
reprint: 'https://cloud.tencent.com/developer/article/1005694'
abbrlink: 54af093c
date: 2019-07-10 08:40:41
---

`django` 提供了`fixtures`来完成对应的需求，具体可参考[官方文档](https://docs.djangoproject.com/en/1.11/howto/initial-data/)。其核心是写一个 `fixtures` 文件，然后命令行通过 `loaddata` 来完成数据表的初始化操作。但是我们并不能在蓝鲸的线上环境中操作命令行（也许有，但是我不太了解），线上环境是通过读取迁移文件来完成数据库的迁移操作的，所以可以通过把对应的代码写入`migration` 文件来完成数据库的初始操作。具体的操作方法如下：

<!-- more -->

**home_application/models.py**

```javascript
class Person(models.Model):
    age = models.IntegerField()
    name = models.CharField(max_length=255)
    def __unicode__(self):
        return "age: {}; name: {}".format(self.age, self.name)
```

我们需要往 `Person`表中插入两条数据

```javascript
age: 23, name: "zhangsan",
age: 24, name: "lisi"
```

在插入数据之前，需要先产生对应的表结构，在命令行运行

> `python manage.py makemigrations app_name` 

这条命令会产生对应的 `migration` 文件

然后，我们需要我们自己的迁移文件来初始化我们自己的数据。命令行运行

> `python manage.py makemigrations --empty app_name` 

这条命令会在刚才的 `migration` 文件夹下产生一个新的文件，我们的插入数据的方法就是在这里填写

[官方文档](https://docs.djangoproject.com/en/1.11/ref/migration-operations/#django.db.migrations.operations.RunPython)给出了文件格式。我们需要给出两个可调用对象，`forwards_func` 用来执行插入数据的操作， `reverse_func` 用来执行回滚操作。方法的实现如下

**app_name/migrations/0002_auto_20170728_2303.py**

```python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


def forwards_func(apps, schema_editor):
    Person = apps.get_model("home_application", "Person")
    db_alias = schema_editor.connection.alias
    Person.objects.using(db_alias).bulk_create([
        Person(age=23, name="zhangsan"),
        Person(age=24, name="lisi"),
    ])


def reverse_func(apps, schema_editor):
    Person = apps.get_model("home_application", "Person")
    db_alias = schema_editor.connection.alias
    Person.objects.using(db_alias).filter(age=23).filter(name="zhangsan").delete()
    Person.objects.using(db_alias).filter(age=24).filter(name="lisi").delete()


class Migration(migrations.Migration):
    # 注明依赖的文件，一定要写
    dependencies = [
        ('home_application', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(forwards_func, reverse_func),
    ]
```

然后执行

> `python manage.py migrate` 

对应的表和数据就都创建好了