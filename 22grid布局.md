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

### 网格单元格(Grid Cell)
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

### 4.6 