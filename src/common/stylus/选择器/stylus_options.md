* 没有分号和大括号 { } ; 
* 采用缩排和凹排
```stylus
body
    background #fff
    color white
```
* 可以加上:便于阅读
```stylus
body
    background: #fff
    color: white
```
* 为多个选择器t同时定义属性
```stylus
textarea, input
  border 1px solid #eee
```
* 也可以使用新行
```stylus
textarea
input
  border 1px solid #eee
```
等同于
```css
textarea,
input {
  border: 1px solid #eee;
}
```
* 父级引用

字符&指向父选择器。下面这个例子，我们两个选择器(textarea和input)在:hover伪类选择器上都改变了color值

```stylus
textarea
input
  color #A7A7A7
  &:hover
    color #000

```
等同于
```css
textarea,
input {
  color: #a7a7a7;
}
textarea:hover,
input:hover {
  color: #000;
}
```
* 消除歧义 如：padding - n

然而只有在函数中才会这样做
```stylus
pad (n)
    padding (-n)

body
    pad(5px)
```
等同于
```css
body{
    padding:-5px;
}
```
或者直接
```stylus
body
    padding -5px
```
* 对于stylus无法处理的属性值用unquote()

```stylus
filter unquote('progid:DXImageTransform.Microsoft.BasicImage(rotation=1)')
```
生成为
```
filter progid:DXImageTransform.Microsoft.BasicImage(rotation=1)
```