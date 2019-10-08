# Grid布局
## 1. 前言
网格布局（Grid）是最强大的 CSS 布局方案:   
它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。  

grid 布局与 Flex 布局有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。  

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。

## 2. 基本概念
### 2.1 网格容器(Grid Container)
应用 display: grid 的元素。这是所有 网格项（grid item）的直接父级元素。  
### 2.2 网格项(Grid Item)  
网格容器（Grid Container）的子元素（例如直接子元素）  
**注意：项目只能是容器的顶层子元素，不包含项目的子元素**  
### 2.3 行和列
容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）
### 2.4 网格线(Grid Line)
划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列  
正常情况下，n行有n + 1根水平网格线，m列有m + 1根垂直网格线，比如三行就有四根水平网格线

### 2.5 网格轨道(Grid Track)
两条相邻网格线之间的空间。你可以把它们想象成网格的列或行

### 2.6 网格单元格(Grid Cell)
行和列的交叉区域，称为"单元格"（cell）  
正常情况下，n行和m列会产生n x m个单元格。比如，3行3列会产生9个单元格

### 2.7 网格区域(Grid Area)
4条网格线包围的总空间。一个 网格区域(Grid Area) 可以由任意数量的 网格单元格(Grid Cell) 组成  

## 3. Grid(网格) 属性目录
### 3.1 网格容器(Grid Container) 属性
+ display
+ grid-template-columns
+ grid-template-rows
+ grid-template-areas
+ grid-template
+ grid-column-gap
+ grid-row-gap
+ grid-gap
+ justify-items
+ align-items
+ place-items
+ justify-content
+ align-content
+ place-content
+ grid-auto-columns
+ grid-auto-rows
+ grid-auto-flow
+ grid

### 3.2 网格项(Grid Items) 属性
+ grid-column-start
+ grid-column-end
+ grid-row-start
+ grid-row-end
+ grid-column
+ grid-row
+ grid-area
+ justify-self
+ align-self
+ place-self

## 4. 父元素 网格容器(Grid Container) 属性
### 4.1 display
将元素定义为网格容器，并为其内容建立新的网格格式上下文  
值：
+ grid ：生成一个块级网格
+ inline-grid ：生成一个内联网格

### 4.2 grid-template-columns / grid-template-rows
容器指定了网格布局以后，接着就要划分行和列。grid-template-columns属性定义每一列的列宽，grid-template-rows属性定义每一行的行高  
```css
.container {
  grid-template-columns: <track-size> ... | <line-name> <track-size> ...;
  grid-template-rows: <track-size> ... | <line-name> <track-size> ...;
}
```  
值：
+ \<track-size>： 可以是长度值，百分比，或者等份网格容器中可用空间（使用 fr 单位）
+ \<line-name>：你可以选择的任意名称


用px作单位示例：
```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
```
上面代码指定了一个三行三列的网格，列宽和行高都是100px  

用百分比作单位示例：
```css
.container {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```

#### 4.2.1 repeat()重复
有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用repeat()函数，简化重复的值。上面的代码用repeat()改写如下。  
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}
```
repeat()接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值  
repeat()重复某种模式也是可以的  
```
grid-template-columns: repeat(2, 100px 20px 80px);
```  
上面代码定义了6列，第一列和第四列的宽度为100px，第二列和第五列为20px，第三列和第六列为80px  

#### 4.2.2 auto-fill 关键字
有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充。  
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```  
上面代码表示每列宽度100px，然后自动填充，直到容器不能放置更多的列  

#### 4.2.3 fr 关键字
为了方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍  
```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```
上面代码表示两个相同宽度的列  

fr可以与绝对长度的单位结合使用，这时会非常方便:
```
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}
```
上面代码表示，第一列的宽度为150像素，第二列的宽度是第三列的一半  

#### 4.2.4 minmax()
minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值  
```css
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
```
上面代码中，minmax(100px, 1fr)表示列宽不小于100px，不大于1fr  

#### 4.2.5 auto 关键字
auto关键字表示由浏览器自己决定长度  
```css
grid-template-columns: 100px auto 100px;
```
上面代码中，第二列的宽度，基本上等于该列单元格在父容器中的最大宽度，除非单元格内容设置了min-width，且这个值大于最大宽度  

#### 4.2.6 网格线的名称
grid-template-columns属性和grid-template-rows属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。  
```css
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```
上面代码指定网格布局为3行 x 3列，因此有4根垂直网格线和4根水平网格线。方括号里面依次是这八根线的名字。  
网格布局允许同一根线有多个名字，比如[fifth-line row-5]。

### 4.3 grid-template-areas 属性
网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。grid-template-areas属性用于定义区域。  
```css
.container {
  grid-template-areas: 
    "<grid-area-name> | . | none | ..."
    "...";
}
```
值：
+ <grid-area-name>：由网格项的 grid-area 指定的网格区域名称
+ .（点号） ：代表一个空的网格单元
+ none：不定义网格区域

示例：
```css
.container {
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```
上面的代码将创建一个 4 列宽 3 行高的网格。整个顶行将由 header 区域组成。中间一排将由两个 main 区域，一个是空单元格，一个 sidebar 区域组成。最后一行全是 footer 区域组成。  

注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end。

比如，区域名为header，则起始位置的水平网格线和垂直网格线叫做header-start，终止位置的水平网格线和垂直网格线叫做header-end。  

这意味着某些网格线可能有多个名字，如上例中最左边的网格线，它将有三个名称：header-start，main-start 和 footer-start 。

### 4.4 grid-template
用于定义grid-template-rows ，grid-template-columns ，grid-template-areas 简写属性  
```css
.container {
  grid-template: none | <grid-template-rows> / <grid-template-columns>;
}
```
值：
+ none：将所有三个属性设置为其初始值
+ \<grid-template-rows> / \<grid-template-columns>：将 grid-template-columns 和 grid-template-rows 设置为相应地特定的值，并且设置grid-template-areas为none  

示例：
```css
.container {
  grid-template:
    [row1-start] "header header header" 25px [row1-end]
    [row2-start] "footer footer footer" 25px [row2-end]
    / auto 50px auto;
}
等价于
.container {
  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
  grid-template-columns: auto 50px auto;
  grid-template-areas: 
    "header header header" 
    "footer footer footer";
}
```

### 4.5 grid-row-gap 属性，grid-column-gap 属性，grid-gap 属性
grid-row-gap属性设置行与行的间隔（行间距），grid-column-gap属性设置列与列的间隔（列间距）。  
```
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
```
上面代码中，grid-row-gap用于设置行间距，grid-column-gap用于设置列间距。  

grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式，语法如下。  
```css
grid-gap: <grid-row-gap> <grid-column-gap>;
.container {
  grid-gap: 20px 20px;
}
```
**如果grid-gap省略了第二个值，浏览器认为第二个值等于第一个值**  
**根据最新标准，上面三个属性名的grid-前缀已经删除，grid-column-gap和grid-row-gap写成column-gap和row-gap，grid-gap写成gap。**

### 4.6 justify-items 属性，align-items 属性，place-items 属性
justify-items属性设置单元格内容的水平位置（左中右），align-items属性设置单元格内容的垂直位置（上中下）。  
语法如下：
```css
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```
这两个属性的写法完全相同，都可以取下面这些值：  
+ start：对齐单元格的起始边缘
+ end：对齐单元格的结束边缘
+ center：单元格内部居中
+ stretch：拉伸，占满单元格的整个宽度（默认值）  
place-items 是设置 align-items 和 justify-items 的简写形式。  
```css
place-items: <align-items> <justify-items>;
下面是一个例子
place-items: start end;
```
如果省略第二个值，则浏览器认为与第一个值相等  

### 4.7 justify-content 属性，align-content 属性，place-content 属性
justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）  
```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```
这两个属性的写法完全相同，都可以取下面这些值:
+ start - 对齐容器的起始边框
+ end - 对齐容器的结束边框
+ center - 容器内部居中
+ stretch - 项目大小没有指定时，拉伸占据整个网格容器
+ space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍
+ space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔
+ space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。  
place-content属性是align-content属性和justify-content属性的合并简写形式  
```css
place-content: <align-content> <justify-content>

place-content: space-around space-evenly;
```
如果省略第二个值，浏览器就会假定第二个值等于第一个值  

### 4.8 grid-auto-columns 属性，grid-auto-rows 属性
有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目。  
grid-auto-columns属性和grid-auto-rows属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与grid-template-columns和grid-template-rows完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。  
语法：
```css
值：
<track-size>：可以是长度值，百分比，或者等份网格容器中可用空间的分数（使用 fr 单位）
.container {
  grid-auto-columns: <track-size> ...;
  grid-auto-rows: <track-size> ...;
}

.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-rows: 50px; 
}
```
上面代码指定新增的行高统一为50px（原始的行高为100px）。

### 4.9 grid-auto-flow属性  
如果你有一些没有明确放置在网格上的网格项(grid items)，自动放置算法 会自动放置这些网格项。该属性控制自动布局算法如何工作。  
```css
值：
row：告诉自动布局算法依次填充每行，根据需要添加新行 （默认）
column：告诉自动布局算法依次填入每列，根据需要添加新列
dense：告诉自动布局算法在稍后出现较小的网格项时，尝试填充网格中较早的空缺
.container {
  grid-auto-flow: row | column | row dense | column dense
}
```

### 4.10 grid属性  
在一个声明中设置所有以下属性的简写： grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, 和 grid-auto-flow 。（注意：您只能在单个网格声明中指定显式或隐式网格属性）。  
```css
值：
none：将所有子属性设置为其初始值。
<grid-template>：与grid-template 简写的工作方式相同。
<grid-template-rows> / [ auto-flow && dense? ] <grid-auto-columns>? ：将grid-template-rows 设置为指定的值。 如果 auto-flow 关键字位于斜杠的右侧，则会将 grid-auto-flow 设置为 column。 如果另外指定了 dense 关键字，则自动放置算法使用 “dense” 算法。 如果省略 grid-auto-columns ，则将其设置为 auto。
[ auto-flow && dense? ] <grid-auto-rows>? / <grid-template-columns>：将 grid-template-columns 设置为指定值。 如果 auto-flow 关键字位于斜杠的左侧，则会将grid-auto-flow 设置为 row 。 如果另外指定了 dense 关键字，则自动放置算法使用 “dense” 打包算法。 如果省略 grid-auto-rows ，则将其设置为 auto。
以下代码是等效的：
.container {
  grid: 100px 300px / 3fr 1fr;
}
.container {
  grid-template-rows: 100px 300px;
  grid-template-columns: 3fr 1fr;
}

.container {
  grid: auto-flow / 200px 1fr;
}
.container {
  grid-auto-flow: row;
  grid-template-columns: 200px 1fr;
}
```

## 5. 子元素 网格项(Grid Items) 属性
> 注意：float，display: inline-block，display: table-cell，vertical-align 和 column-* 属性对网格项无效。  

### 5.1 grid-column-start / grid-column-end / grid-row-start / grid-row-end
项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线
```css
grid-column-start属性：左边框所在的垂直网格线
grid-column-end属性：右边框所在的垂直网格线
grid-row-start属性：上边框所在的水平网格线
grid-row-end属性：下边框所在的水平网格线
这四个属性的值还可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。
值：
<line> ：可以是一个数字引用一个编号的网格线，或者一个名字来引用一个命名的网格线
span <number> ：该网格项将跨越所提供的网格轨道数量
span <name> ：该网格项将跨越到它与提供的名称位置
auto：表示自动放置，自动跨度，默认会扩展一个网格轨道的宽度或者高度
.item {
  grid-column-start: <number> | <name> | span <number> | span <name> | auto
  grid-column-end: <number> | <name> | span <number> | span <name> | auto
  grid-row-start: <number> | <name> | span <number> | span <name> | auto
  grid-row-end: <number> | <name> | span <number> | span <name> | auto
}
使用这四个属性，如果产生了项目的重叠，则使用z-index属性指定项目的重叠顺序。
```

### 5.2 grid-column 属性，grid-row 属性
grid-column属性是grid-column-start和grid-column-end的合并简写形式，grid-row属性是grid-row-start属性和grid-row-end的合并简写形式  
```css
值：
<start-line> / <end-line>：每个网格项都接受所有相同的值，作为普通书写的版本，包括跨度
.item {
  grid-column: <start-line> / <end-line> | <start-line> / span <value>;
  grid-row: <start-line> / <end-line> | <start-line> / span <value>;
}
.item-c {
  grid-column: 3 / span 2;
  grid-row: 3 / 4;
}
上面代码表示从第三条列网格线开始跨两列，从第三条网格线开始到第四条
```

### 5.3 grid-area
grid-area属性指定项目放在哪一个区域，grid-area属性还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置。  
```css
.item {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
.item-1 {
  grid-area: 1 / 1 / 3 / 3;
}
```

### 5.4 justify-self 属性，align-self 属性，place-self 属性
justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。  
align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。
```css
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
这两个属性都可以取下面四个值:
start：对齐单元格的起始边缘。
end：对齐单元格的结束边缘。
center：单元格内部居中。
stretch：拉伸，占满单元格的整个宽度（默认值）。
```
place-self属性是align-self属性和justify-self属性的合并简写形式  
```css
值：
auto – 布局模式的 “默认” 对齐方式。
<align-self> <justify-self>：第一个值设置 align-self 属性，第二个值设置 justify-self 属性。如果省略第二个值，则将第一个值同时分配给这两个属性。
.item-a {
  place-self: center;
}
.item-a {
  place-self: center stretch;
}
```











## 6. 参考链接：  
[阮一峰CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)  
[CSS Grid 布局完全指南(图解 Grid 详细教程)](https://www.html.cn/archives/8510/)