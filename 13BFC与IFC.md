# BFC与IFC的理解

## BFC(边距重叠解决方案)

### BFC的基本概念
Block fomatting context = block-level box + Formatting Context  
block-level box=块级元素  
Formatting context是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系、相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context(简称IFC)。  
BFC通俗讲就是块级格式化上下文

### BFC的原理
1. 在BFC的垂直方向的边距会发生重叠
2. BFC的区域不会与浮动元素box重叠
3. BFC在页面上是独立的容器，外面的元素不会影响里面的元素，里面的元素也不会影响外面的元素
4. 计算BFC高度的时候浮动的元素也会计算
5. 内部的Box会在垂直方向上一个接一个的放置
6. 垂直方向上的距离由margin决定。（完整的说法是：属于同一个BFC的两个相邻Box的margin会发生重叠（塌陷），与方向无关。）
7. 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明BFC中子元素不会超出他的包含块，而position为absolute的元素可以超出他的包含块边界）

### 怎么创建BFC
1. float值不为none
2. position的值不是static或者relative
3. display的值为inline-block、table-cell、table-caption
4. overflow的值不为visible
5. 根元素
### BFC的使用场景
#### 防止margin塌陷
```html
  <style>
    p{
        width: 100px;
        height: 100px;
        margin: 100px;
		background: red;
    }
    </style>
		<body>
		    <p>111</p>
		    <p>111</p>
		</body>
``` 
![15705114021a3d9e4bc767dd9c2.png](https://www.kanjiantu.com/images/2019/10/08/15705114021a3d9e4bc767dd9c2.png)  
两个p之间的距离为100px，发送了margin重叠（塌陷），以最大的为准，如果第一个P的margin为80的话，两个P之间的距离还是100，以最大的为准。  
根据BFC布局规则:  
Box垂直方向的距离由margin决定。属于同一个BFC(上例中是body根元素的BFC)的两个相邻Box的margin会发生重叠  
我们可以在p外面包裹一层容器，并触发该容器生成一个新BFC。那么两个P便不属于同一个BFC，就不会发生margin重叠了  
```html
<style>
			.wrap{
				overflow: hidden;
			}
    p{
        width: 100px;
        height: 100px;
        margin: 100px;
				background: red;
    }
    </style>
		<body>
		    <p>111</p>
			<div class="wrap">
				<p>111</p>
			</div>
		</body>
```  
![15705116771b90621825316d51c.png](https://www.kanjiantu.com/images/2019/10/08/15705116771b90621825316d51c.png)  

#### 清除浮动
为父元素添加overflow:hidden;

## IFC(行内格式化上下文)  
> 在行内格式化上下文中，框(boxes)一个接一个地水平排列，起点是包含块的顶部。水平方向上的 margin，border 和 padding在框之间得到保留。框在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。包含那些框的长方形区域，会形成一行，叫做行框。  
+ 内部的盒子会在水平方向，一个个地放置
+ IFC的高度，由里面最高盒子的高度决定
+ 当一行不够放置的时候会自动切换到下一行