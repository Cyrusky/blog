---
title: 使用vue+v-chart制作一个漂亮的饼状图
tags:
  - Vue
  - Echarts
categories:
  - Development
  - JavaScript
cover: '/assets/images/imgs20190625143130.webp'
abbrlink: cbd6d728
date: 2019-06-25 14:17:33
---

# 废话不说直接上代码

<!-- more -->

## HTML

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/v-charts/lib/index.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/v-charts/lib/style.min.css">
<div id="app">
  <ve-ring :data="contract_rate.data"
           :settings="contract_rate.settings.settings"
           :extend="contract_rate.settings.extend"
           height="200px"
           :colors="['#F8777A', '#FCB954', '#3A9DFF']"></ve-ring>
</div>
```

## JavaScript

```javascript
new Vue({
  el: '#app',
  data: function () {
    return {
      
      contract_rate: {
        settings: {
          settings: {
            radius: [5, 65],
            offsetY: '50%'
          },
          extend: {
            legend: {
              orient: 'vertical',
              top: 100,
              left: 0
            },
            series: (series) => {
              series.push({
                radius: ['67%', '69%'],
                type: 'pie',
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                animation: false,
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: '#3A9DFF'
                  }
                },
                data: [{
                  value: 1
                }]
              })
              series.push({
                radius: ['3%', '5%'],
                type: 'pie',
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                animation: false,
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: '#3A9DFF'
                  }
                },
                data: [{
                  value: 1
                }]
              })
              return series
            }
          }
        },
        data: {
          columns: ['类型', '数量'],
          rows: [
            { '类型': '资源', '数量': 54 },
            { '类型': '运维', '数量': 23 },
            { '类型': '安全', '数量': 23 }
          ],
          labelLine: { // 指示线状态
            show: true,
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        }
      }
    }
  }
})
```

# 关键点

1. 制作外框

使用`extend`中的`series`手动添加一个宽度为1%~2%的饼图

2. `legend`在左侧显示

3. 自定义颜色

# 效果

![](/assets/images/imgs20190625143604.webp)

# 链接

[饼图代码](https://codepen.io/cyrusky/pen/vqZbGW)

