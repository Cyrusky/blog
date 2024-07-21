---
title: 正则表达式和IndexOf函数的效率问题
tags:
  - 正则
  - replace
  - LeetCode
categories:
  - Development
  - JavaScript
toc: true
abbrlink: e2fcfc08
date: 2020-02-04 23:12:03
thumbnail: https://imgs.borgor.cn/imgs/20200205125342.png
---

# 事情的起因

事情的起因是一道LeetCode题目，具体如下：

> #### [1003. 检查替换后的词是否有效](https://leetcode-cn.com/problems/check-if-word-is-valid-after-substitutions/)

> 给定有效字符串 "abc"。
>
> 对于任何有效的字符串 V，我们可以将 V 分成两个部分 X 和 Y，使得 X + Y（X 与 Y 连接）等于 V。（X 或 Y 可以为空。）那么，X + "abc" + Y 也同样是有效的。
>
> 例如，如果 S = "abc"，则有效字符串的示例是："abc"，"aabcbc"，"abcabc"，"abcabcababcc"。无效字符串的示例是："abccba"，"ab"，"cababc"，"bac"。
>
> 如果给定字符串 S 有效，则返回 true；否则，返回 false。

<!-- more -->

我的解答：

```javascript
/**
 * @param {string} S
 * @return {boolean}
 */
var isValid = function(S) {
  while (S.indexOf('abc') >= 0) {
    S = S.replace('abc', '')
  }
  return !S
};
```

排名第一的解答：

```javascript
/**
 * @param {string} S
 * @return {boolean}
 */
var isValid = function(S) {
    let t = S
    while(/abc/.test(t)) {
        t = t.replace(/abc/g, '')
    }
    return !t
};
```

上述两种解答的思路都是一样的，但是其中一点区别就是，我使用了`indexOf`来查找和替换字符串中的`abc`，但是他用了正则表达式，导致的结果在时间上差了`4`倍。为了防止个例，我自己编写了一个测试用例来测试了一下，具体如下：

```javascript
let lengthOfABC = 1000000
/**
 * @param {string} S
 * @return {boolean}
 */
var isValid1 = function(S) {
  let t = S
  while (/abc/.test(t)) {
    t = t.replace(/abc/g, '')
  }
  return !t
}
var isValid2 = function(S) {
  while (S.indexOf('abc') >= 0) {
    S = S.replace('abc', '')
  }
  return !S
}

console.time('Time Of Generate Action')
let str = 'abc'
for (let i = 0; i < lengthOfABC; i++) {
  let index = Math.floor(Math.random() * 10000) % str.length
  if (index === 0) {
    index++
  }
  str = str.substr(0, index) + 'abc' + str.substr(index)
}
console.timeEnd('Time Of Generate Action')
console.time('Time of Regx function')
isValid1(str)
console.timeEnd('Time of Regx function')
console.time('Time of IndexOf function')
isValid12(str)
console.timeEnd('Time of IndexOf function')
```

其中，`lengthOfABC`表示含有`abc`的个数，运行结果如下：

```
When lengthOfABC = 10000（一万）
Time Of Generate Action: 21.323ms
Time of Regx function: 0.927ms
Time of IndexOf function: 17.561ms

When lengthOfABC = 100000（十万）
Time Of Generate Action: 7.237s
Time of Regx function: 9.172ms
Time of IndexOf function: 6.983s
```

从上述运行结果来看，这丫不是个例，在本例中，正则表达式的确要比`indexOf`快很多。

下面我们尝试分析一下原因。

# 正则表达式的原理

## 正则表达式的回溯

在使用贪婪匹配或者惰性匹配或者或匹配进入到匹配路径选择的时候，遇到失败的匹配路径，尝试走另外一个匹配路径的这种行为，称作回溯。

![](https://imgs.borgor.cn/imgs/20200205114638.png)

> 图片来自：https://juejin.im/post/5d2bf92ef265da1b7c6148ca

因为正则表达式中，会有模糊匹配，比如：`.|*|+`等，所以，模糊匹配的时候回造成很大概率的多次回溯问题。

减少回溯或者避免回溯的方式是：

1. 优化正则表达式：时刻注意回溯造成的性能影响。
2. 使用DFA正则引擎的正则表达式。

传统正则引擎分为`NFA`（非确定性有限状态自动机），和`DFA`（确定性有限状态自动机）。

### DFA

> **对于给定的任意一个状态和输入字符，DFA只会转移到一个确定的状态。并且DFA不允许出现没有输入字符的状态转移。**

![](https://imgs.borgor.cn/imgs/20200205115521.png)

正则里面的DFA引擎实际上就是把正则表达式转换成一个图的邻接表，然后通过跳表的形式判断一个字符串是否匹配该正则。

>  **优点：不管正则表达式写的再烂，匹配速度都很快**
>
> **缺点：高级功能比如捕获组和断言都不支持**

### NFA

**对于任意一个状态和输入字符，NFA所能转移的状态是一个非空集合。**

![](https://imgs.borgor.cn/imgs/20200205115556.png)

**优点：功能强大，可以拿到匹配的上下文信息，支持各种断言捕获组环视之类的功能**

**缺点：对开发正则功底要求较高，需要注意回溯造成的性能问题**

在平常写正则的时候，少写模糊匹配，越精确越好，模糊匹配、贪婪匹配、惰性匹配都会带来回溯问题，选一个影响尽可能小的方式就好。

# String.IndexOf源码分析

```javascript
public int indexOf(String str, int fromIndex) {
    return indexOf(value, 0, value.length,
            str.value, 0, str.value.length, fromIndex);
}
static int indexOf(char[] source, int sourceOffset, int sourceCount,
        char[] target, int targetOffset, int targetCount,
        int fromIndex) {
    if (fromIndex >= sourceCount) {
        return (targetCount == 0 ? sourceCount : -1);
    }
    if (fromIndex < 0) {
        fromIndex = 0;
    }
    if (targetCount == 0) {
        return fromIndex;
    }
 
    char first = target[targetOffset];
    //找到需要遍历的最大位置，因为我们可能不需要一直遍历到最后
    int max = sourceOffset + (sourceCount - targetCount);
 
    for (int i = sourceOffset + fromIndex; i <= max; i++) {
        /* Look for first character. */
        //这里我觉得写的比较好，找到第一个相等字符的位置，不相等就一直加，注意边界
        if (source[i] != first) {
            while (++i <= max && source[i] != first);
        }
 
        /* Found first character, now look at the rest of v2 */
        //再次判断下边界，如果大于边界就可以直接返回-1了
        if (i <= max) {
            int j = i + 1;
            int end = j + targetCount - 1;
            //这个循环找到和目标字符串完全相等的长度
            for (int k = targetOffset + 1; j < end && source[j]
                    == target[k]; j++, k++);
           //如果完全相等的长度和目标字符串长度相等，那么就认为找到了
            if (j == end) {
                /* Found whole string. */
                return i - sourceOffset;
            }
        }
    }
    return -1;
}
```
### [ECMA 262 -String.Prototype.indexOf]( https://tc39.es/ecma262/#sec-string.prototype.indexof)

> 1. Let O be ? [RequireObjectCoercible](https://tc39.es/ecma262/#sec-requireobjectcoercible)(this value).
> 2. Let S be ? [ToString](https://tc39.es/ecma262/#sec-tostring)(O).
> 3. Let searchStr be ? [ToString](https://tc39.es/ecma262/#sec-tostring)(searchString).
> 4. Let pos be ? [ToInteger](https://tc39.es/ecma262/#sec-tointeger)(position).
> 5. [Assert](https://tc39.es/ecma262/#assert): If position is undefined, then pos is 0.
> 6. Let len be the length of S.
> 7. Let start be [min](https://tc39.es/ecma262/#eqn-min)([max](https://tc39.es/ecma262/#eqn-max)(pos, 0), len).
> 8. Let searchLen be the length of searchStr.
> 9. Return the smallest possible [integer](https://tc39.es/ecma262/#integer) k not smaller than start such that k + searchLen is not greater than len, and for all nonnegative integers j less than searchLen, the code unit at index k + j within S is the same as the code unit at index j within searchStr; but if there is no such [integer](https://tc39.es/ecma262/#integer) k, return the value -1.

### [RegExp.prototype [ @@replace ] ( string, replaceValue )](https://tc39.es/ecma262/#sec-regexp.prototype-@@replace)

> 1. Let rx be the this value.
>
> 2. If [Type](https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values)(rx) is not Object, throw a TypeError exception.
>
> 3. Let S be ? [ToString](https://tc39.es/ecma262/#sec-tostring)(string).
>
> 4. Let lengthS be the number of code unit elements in S.
>
> 5. Let functionalReplace be [IsCallable](https://tc39.es/ecma262/#sec-iscallable)(replaceValue).
>
> 6. If **functionalReplace** is **false**, then
>
>    1. Set replaceValue to ? [ToString](https://tc39.es/ecma262/#sec-tostring)(replaceValue).
>
> 7. Let global be ! [ToBoolean](https://tc39.es/ecma262/#sec-toboolean)(? [Get](https://tc39.es/ecma262/#sec-get-o-p)(rx, "global")).
>
> 8. If **global** is **true** , then
>
>    1. Let fullUnicode be ! [ToBoolean](https://tc39.es/ecma262/#sec-toboolean)(? [Get](https://tc39.es/ecma262/#sec-get-o-p)(rx, "unicode")).
>    2. Perform ? [Set](https://tc39.es/ecma262/#sec-set-o-p-v-throw)(rx, "lastIndex", 0, true).
>
> 9. Let results be a new empty [List](https://tc39.es/ecma262/#sec-list-and-record-specification-type).
>
> 10. Let done be false.
>
> 11. Repeat, while **done** is **false**
>
>     1. Let result be ? [RegExpExec](https://tc39.es/ecma262/#sec-regexpexec)(rx, S).
>     2. If result is null, set done to true.
>     3. Else,
>        1. Append result to the end of results.
>        2. If global is false, set done to true.
>        3. Else,
>           1. Let matchStr be ? [ToString](https://tc39.es/ecma262/#sec-tostring)(? [Get](https://tc39.es/ecma262/#sec-get-o-p)(result, "0")).
>           2. If **matchStr** is the empty String, then
>              1. Let thisIndex be ? [ToLength](https://tc39.es/ecma262/#sec-tolength)(? [Get](https://tc39.es/ecma262/#sec-get-o-p)(rx, "lastIndex")).
>              2. Let nextIndex be [AdvanceStringIndex](https://tc39.es/ecma262/#sec-advancestringindex)(S, thisIndex, fullUnicode).
>              3. Perform ? [Set](https://tc39.es/ecma262/#sec-set-o-p-v-throw)(rx, "lastIndex", nextIndex, true).
>
> 12. Let accumulatedResult be the empty String value.
>
> 13. Let nextSourcePosition be 0.
>
> 14. For each **result** in **results** , do
>
>     1. Let nCaptures be ? [LengthOfArrayLike](https://tc39.es/ecma262/#sec-lengthofarraylike)(result).
>
>     2. Set nCaptures to [max](https://tc39.es/ecma262/#eqn-max)(nCaptures - 1, 0).
>
>     3. Let matched be ? [ToString](https://tc39.es/ecma262/#sec-tostring)(? [Get](https://tc39.es/ecma262/#sec-get-o-p)(result, "0")).
>
>     4. Let matchLength be the number of code units in matched.
>
>     5. Let position be ? [ToInteger](https://tc39.es/ecma262/#sec-tointeger)(? [Get](https://tc39.es/ecma262/#sec-get-o-p)(result, "index")).
>
>     6. Set position to [max](https://tc39.es/ecma262/#eqn-max)([min](https://tc39.es/ecma262/#eqn-min)(position, lengthS), 0).
>
>     7. Let n be 1.
>
>     8. Let captures be a new empty [List](https://tc39.es/ecma262/#sec-list-and-record-specification-type).
>
>     9. Repeat, while n ≤ nCaptures
>
>        1. Let **capN** be ? [Get](https://tc39.es/ecma262/#sec-get-o-p)(result, ! [ToString](https://tc39.es/ecma262/#sec-tostring)(n)).
>        2. If **capN** is not **undefined** , then
>           1. Set capN to ? [ToString](https://tc39.es/ecma262/#sec-tostring)(capN).
>        3. Append capN as the last element of captures.
>        4. Set n to n + 1.
>
>     10. Let namedCaptures be ? [Get](https://tc39.es/ecma262/#sec-get-o-p)(result, "groups").
>
>     11. If functionalReplace is true , then
>
>         1. Let replacerArgs be « matched ».
>         2. Append in list order the elements of captures to the end of the [List](https://tc39.es/ecma262/#sec-list-and-record-specification-type) replacerArgs.
>         3. Append position and S to replacerArgs.
>         4. If namedCaptures is not undefined , then
>            1. Append namedCaptures as the last element of replacerArgs.
>         5. Let replValue be ? [Call](https://tc39.es/ecma262/#sec-call)(replaceValue, undefined, replacerArgs).
>         6. Let replacement be ? [ToString](https://tc39.es/ecma262/#sec-tostring)(replValue).
>
>     12. Else,
>
>         1. If namedCaptures is not undefined
>
>            , then
>
>            1. Set namedCaptures to ? [ToObject](https://tc39.es/ecma262/#sec-toobject)(namedCaptures).
>
>         2. Let replacement be ? [GetSubstitution](https://tc39.es/ecma262/#sec-getsubstitution)(matched, S, position, captures, namedCaptures, replaceValue).
>
>     13. If position ≥ nextSourcePosition , then
>
>         1. NOTE: position should not normally move backwards. If it does, it is an indication of an ill-behaving RegExp subclass or use of an access triggered side-effect to change the global flag or other characteristics of rx. In such cases, the corresponding substitution is ignored.
>         2. Set accumulatedResult to the [string-concatenation](https://tc39.es/ecma262/#sec-ecmascript-language-types-string-type) of the current value of accumulatedResult, the substring of S consisting of the code units from nextSourcePosition (inclusive) up to position (exclusive), and replacement.
>         3. Set nextSourcePosition to position + matchLength.
>
> 15. If nextSourcePosition ≥ lengthS, return accumulatedResult.
>
> 16. Return the [string-concatenation](https://tc39.es/ecma262/#sec-ecmascript-language-types-string-type) of accumulatedResult and the substring of S consisting of the code units from nextSourcePosition (inclusive) up through the final code unit of S (inclusive).

# 总结

之所以正则表达式比较快的原因，是因为，在最优解中，正则表达式是一个确定值，也就是不管DFA和NFA中，状态和搜索图中的节点均只有一个。所以比较快。

结论：

1. 在编写正则表达式的编写过程中，不要写过多的通配符，尽量写的确切一点，比如说：能写`\d`就不要写`.`，能写`.`就不要写`*`。
2. 在确定或者较为确定关键词的大文本搜索或者替换时，使用正则表达式代替`String.prototype.indexOf`，可以达到较快的速度。
3. 如果对于自己的正则水平不是特别自信，而且需要实现的功能较为简单，请使用DFA正则引擎。否则，可以使用NFA引擎。