# HTML5新特性


## 1. 语义标签：语义化标签使得页面的内容结构化，见名知义  

+ header  定义了文档的头部区域
+ foonter 定义了文档的尾部区域
+ nav 定义文档的导航
+ section  定义文档中的节（section、区段）
+ article  定义页面独立的内容区域
+ aside 定义页面的侧边栏内容
+ detailes 用于描述文档或文档某个部分的细节
+ summary 标签包含 details 元素的标题
+ dialog 定义对话框，比如提示框

## 2. 增强型表单：HTML5 拥有多个新的表单 Input 输入类型。这些新特性提供了更好的输入控制和验证。

+ color 选取颜色
+ date 从日期选择器中选择一个时间
+ datetime 选择一个日期
+ datetime-local 选择一个日期和时间
+ email 包含 e-mail 地址的输入域
+ month 选择一个月份
+ number 数值的输入域
+ range 一定范围内数字值的输入域
+ search 搜索框
+ tel 定义输入电话号码字段
+ time 选择一个时间
+ url  URL 地址的输入域
+ week 选择周和年

## 3. 表单元素
+ datalist  元素规定输入域的选项列表，使用 \<input> 元素的 list 属性与 \<datalist> 元素的 id 绑定
+ keygen 提供一种验证用户的可靠方法,标签规定用于表单的密钥对生成器字段。
+ output 用于不同类型的输出,比如计算或脚本输出

## 4. HTML5 新增的表单属性

+ placehoder 属性，简短的提示在用户输入值前会显示在输入域上。即我们常见的输入框默认提示，在用户输入后消失。
+ required  属性，是一个 boolean 属性。要求填写的输入域不能为空
+ pattern 属性，描述了一个正则表达式用于验证<input> 元素的值。
+ min 和 max 属性，设置元素最小值与最大值
+ step 属性，为输入域规定合法的数字间隔
+ height 和 width 属性，用于 image 类型的 <input> 标签的图像高度和宽度
+ autofocus 属性，是一个 boolean 属性。规定在页面加载时，域自动地获得焦点
+ multiple 属性 ，是一个 boolean 属性。规定<input> 元素中可选择多个值

## 5. 视频和音频

+ HTML5 提供了播放音频文件的标准，即使用 <audio> 元素

```html
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
您的浏览器不支持 audio 元素。
</audio>
```
control 属性供添加播放、暂停和音量控件。  
在\<audio> 与 \</audio> 之间你需要插入浏览器不支持的\<audio>元素的提示文本。
\<audio> 元素允许使用多个 \<source> 元素. \<source> 元素可以链接不同的音频文件，浏览器将使用第一个支持的音频文件

+  HTML5 规定了一种通过 video 元素来包含视频的标准方法 

```JavaScript
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
您的浏览器不支持Video标签。
</video>
```

 control 提供了 播放、暂停和音量控件来控制视频。也可以使用dom操作来控制视频的播放暂停，如 play() 和 pause() 方法   

同时 video 元素也提供了 width 和 height 属性控制视频的尺寸.如果设置的高度和宽度，所需的视频空间会在页面加载时保留。如果没有设置这些属性，浏览器不知道大小的视频，浏览器就不能再加载时保留特定的空间，页面就会根据原始视频的大小而改变   

与 标签之间插入的内容是提供给不支持 video 元素的浏览器显示的   

 video 元素支持多个source 元素. 元素可以链接不同的视频文件。浏览器将使用第一个可识别的格式（ MP4, WebM, 和 Ogg） 

## 6.  Canvas绘图 

 标签只是图形容器，必须使用脚本来绘制图形   

### 6.1 Canvas - 图形

1.  创建一个画布，一个画布在网页中是一个矩形框，通过 <canvas> 元素来绘制。默认情况下 元素没有边框和内容 
2. ` ``"myCanvas"` `width=``"200"` `height=``"100"` `style=``"border:1px solid #000000;"``>` `
3.  标签通常需要指定一个id属性 (脚本中经常引用), width 和 height 属性定义的画布的大小，使用 style 属性来添加边框。你可以在HTML页面中使用多个 <canvas> 元素 
4.  使用Javascript来绘制图像，canvas 元素本身是没有绘图能力的。所有的绘制工作必须在 JavaScript 内部完成 

```javascript
<script>
　　var c=document.getElementById("myCanvas");
　　var ctx=c.getContext("2d");
　　ctx.fillStyle="#FF0000";
　　ctx.fillRect(0,0,150,75);
//getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
//设置 fillStyle 属性可以是CSS颜色，渐变，或图案。fillStyle默认设置是#000000（黑色）。fillRect(x,y,width,height) 方法定义了矩形当前的填充方式。意思是：在画布上绘制 150x75 的矩形，从左上角开始 (0,0)
</script>
```

### 6.2 Canvas - 路径

在Canvas上画线，我们将使用以下两种方法：

moveTo(*x,y*) 定义线条开始坐标

lineTo(*x,y*) 定义线条结束坐标

绘制线条我们必须使用到 "ink" 的方法，就像stroke()。

<script>
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.moveTo(0,0);
    ctx.lineTo(200,100);
    ctx.stroke();
</script>

 定义开始坐标(0,0), 和结束坐标 (200,100). 然后使用 stroke() 方法来绘制线条 

### 6.3 Canvas - 文本

使用 canvas 绘制文本，重要的属性和方法如下：

　　font - 定义字体

　　fillText(*text,x,y*) - 在 canvas 上绘制实心的文本

　　strokeText(*text,x,y*) - 在 canvas 上绘制空心的文本

使用 fillText():

```javascript
`var` `c=document.getElementById(``"myCanvas"``);``var` `ctx=c.getContext(``"2d"``);``ctx.font=``"30px Arial"``;``ctx.fillText(``"Hello World"``,10,50);`
```

使用 "Arial" 字体在画布上绘制一个高 30px 的文字（实心）

### 6.4 Canvas - 渐变
渐变可以填充在矩形, 圆形, 线条, 文本等等, 各种形状可以自己定义不同的颜色。

以下有两种不同的方式来设置Canvas渐变：

　　createLinearGradient(x,y,x1,y1) - 创建线条渐变

　　createRadialGradient(x,y,r,x1,y1,r1) - 创建一个径向/圆渐变

当我们使用渐变对象，必须使用两种或两种以上的停止颜色。

addColorStop()方法指定颜色停止，参数使用坐标来描述，可以是0至1.

使用渐变，设置fillStyle或strokeStyle的值为渐变，然后绘制形状，如矩形，文本，或一条线。

```javascript
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
 
// Create gradient
var grd=ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");
 
// Fill with gradient
ctx.fillStyle=grd;
ctx.fillRect(10,10,150,80);
```
创建了一个线性渐变，使用渐变填充矩形  

### 6.5 Canvas - 图像
　把一幅图像放置到画布上, 使用 drawImage(image,x,y) 方法

```javascript
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var img=document.getElementById("scream");
ctx.drawImage(img,10,10);
```
把一幅图像放置到了画布上

## 7. 地理定位
HTML5 Geolocation（地理定位）用于定位用户的位置  
```javascript
window.navigator.geolocation {
    getCurrentPosition:  fn  用于获取当前的位置数据
    watchPosition: fn  监视用户位置的改变
    clearWatch: fn  清除定位监视
}　
```
获取用户定位信息:  
```javascript
navigator.geolocation.getCurrentPosition(
    function(pos){
　　　　console.log('用户定位数据获取成功')
　　　　//console.log(arguments);
　　　　console.log('定位时间：',pos.timestamp)
　　　　console.log('经度：',pos.coords.longitude)
　　　　console.log('纬度：',pos.coords.latitude)
　　　　console.log('海拔：',pos.coords.altitude)
　　　　console.log('速度：',pos.coords.speed)

},    //定位成功的回调
function(err){ 
　　　　console.log('用户定位数据获取失败')
　　　　//console.log(arguments);

}        //定位失败的回调
)
```

## 8. 拖放API
拖放是一种常见的特性，即抓取对象以后拖到另一个位置。在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。

拖放的过程分为源对象和目标对象。源对象是指你即将拖动元素，而目标对象则是指拖动之后要放置的目标位置。

拖放的源对象(可能发生移动的)可以触发的事件——3个：

dragstart：拖动开始

drag：拖动中

dragend：拖动结束

整个拖动过程的组成： dragstart*1 + drag*n + dragend*1

拖放的目标对象(不会发生移动)可以触发的事件——4个：

dragenter：拖动着进入

dragover：拖动着悬停

dragleave：拖动着离开

drop：释放

整个拖动过程的组成1： dragenter*1 + dragover*n + dragleave*1

整个拖动过程的组成2： dragenter*1 + dragover*n + drop*1

dataTransfer：用于数据传递的“拖拉机”对象；

在拖动源对象事件中使用e.dataTransfer属性保存数据：

e.dataTransfer.setData( k,  v )

在拖动目标对象事件中使用e.dataTransfer属性读取数据：

var value = e.dataTransfer.getData( k )

## 9. Web Storage存储
使用HTML5可以在本地存储用户的浏览数据。早些时候,本地存储使用的是cookies。但是Web 存储需要更加的安全与快速. 这些数据不会被保存在服务器上，但是这些数据只用于用户请求网站数据上.它也可以存储大量的数据，而不影响网站的性能。数据以 键/值 对存在, web网页的数据只允许该网页访问使用。

客户端存储数据的两个对象为：

localStorage - 没有时间限制的数据存储
sessionStorage - 针对一个 session 的数据存储, 当用户关闭浏览器窗口后，数据会被删除。
　　在使用 web 存储前,应检查浏览器是否支持 localStorage 和sessionStorage

```javascript
if(typeof(Storage)!=="undefined")
   {
   // 是的! 支持 localStorage  sessionStorage 对象!
   // 一些代码.....
   }
 else
   {
   // 抱歉! 不支持 web 存储。
   }
```

不管是 localStorage，还是 sessionStorage，可使用的API都相同，常用的有如下几个（以localStorage为例）：  

保存数据：localStorage.setItem(key,value);  
读取数据：localStorage.getItem(key);  
删除单个数据：localStorage.removeItem(key);  
删除所有数据：localStorage.clear();  
得到某个索引的key：localStorage.key(index);

## 10. HTML5 离线Web应用（应用程序缓存）
HTML5 引入了应用程序缓存，这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。

应用程序缓存为应用带来三个优势：

离线浏览 - 用户可在应用离线时使用它们
速度 - 已缓存资源加载得更快  
减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。
HTML5 Cache Manifest 实例

下面的例子展示了带有 cache manifest 的 HTML 文档（供离线浏览）：
```html
<!DOCTYPE HTML>
<html manifest="demo.appcache">
<body>
The content of the document......
</body>
</html>
```
**Manifest 文件**

manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）。

manifest 文件可分为三个部分：

+ CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
+ NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
+ FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面
CACHE MANIFEST
```
# 2012-02-21 v1.0.0
/theme.css
/logo.gif
/main.js
NETWORK:
login.php
FALLBACK:
/html/ /offline.html
```