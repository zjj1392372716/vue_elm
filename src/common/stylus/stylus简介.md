###学习stylus

-------------
* css预处理器，stylus使用.styl作为后缀名
* 功能上更强，因为他与js更加紧密联系

 一、 全局安装
```
npm install stylus -g
```

二、生成css

1.  建立一个stylusExample文件夹
2.  在该文件夹下创建一个src文件夹，这个文件夹用于创建自己的样式文件
3.  cd src
    创建一个stylus.styl的文件，在里面写入stylus样式
```stylus
html,body
    width 100%
    height 100%
    background #ffffff
    font size 15px
```
4.  执行 `stylus --compress src/`
    该命令会将src目录下的styl文件转换并另外生成为一个.css文件

5. 终端输出`compiled src/example.css`表示你已经成功了。
带上`--compress`表示你要生成一个压缩后的css文件，里面内容如下：
```css
html,body{widows:100%;height:100%;background:#fff;font:size 15px}
```
6. 也可以将单个styl文件转换为css文件
    使用`stylus --compress styl.styl`
    输出`compiled styl.css`表示成功了,这样你就可以在stylusExample目录下看到一个styl.css文件，这就是编译之后的css文件

7. 将css文件转换为styl文件
    运行`stylus --css src/css.css`表示转换src目录下面的css.css文件
    没啥反应表示你已经成功了，这样你就会在src目录下看到一个css.styl
