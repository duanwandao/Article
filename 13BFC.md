# BFC(边距重叠解决方案)

## BFC的基本概念
块级格式化上下文

## BFC的原理

1. 在BFC的垂直方向的边距会发生重叠
2. BFC的区域不会与浮动元素box重叠
3. BFC在页面上是独立的容器，外面的元素不会影响里面的元素，里面的元素也不会影响外面的元素
4. 计算BFC高度的时候浮动的元素也会计算

## 怎么创建BFC
1. float值不为none
2. position的值不是static或者relative
3. display的值inline、table
4. overflow不为
## BFC的使用场景