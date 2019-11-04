# css3动画

`animation: name duration timing-function delay iteration-count direction;`  
动画名字 动画所花时间 动画速度曲线 动画延迟 播放次数 轮流反向播放动画 
一个小球从向右匀速移动 200px，然后移动回来，再移动过去，最后停留在 200px 处
```css
div {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #0ff;
        animation: move 2s linear 3 alternate both;
      }
      @keyframes move {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(200px, 0);
        }
      }
```

动画共有8个属性，分别如下：

| 属性                      | 描述                                                    |
| ------------------------- | ------------------------------------------------------- |
| animation-duration        | 指定动画完成一个周期所需要时间，单位秒或者毫秒，默认是0 |
| animation-timing-function | 指定动画计时函数，即动画的速度曲线，默认是ease          |
| animation-delay           | 指定动画延迟时间，即动画何时开始，默认是0               |
| animation-iteration-count | 指定动画播放的次数，默认是1                             |
| animation-direction       | 指定动画播放的方向，默认是normal                        |
| animation-fill-mode       | 指定动画填充模式，默认是none                            |
| animation-play-state      | 指定动画播放状态，正在运行或暂停，默认是running         |
| animation-name            | 指定@keyframes动画的名称                                |

比如我们一个 div 旋转一圈，只需要定义开始和结束两帧即可：  
```css
@keyframes rotate{
from{
    transform:rotate(0deg)
}
to{
    transform:rotate(360deg)
}
}
```
rotate 是我给这个动画起的名字，from 表示最开始的那一帧，to 表示结束时的那一帧  
CSS 动画用百分比来刻画一个动画周期，from 其实是 0% 的别称，to 是 100% 的别称。因此关键帧 rotate 等价于:  
```css
@keyframes rotate{
0%{
    transform:rotate(0deg)
}
100%{
    transform:rotate(360deg)
}
}
```
定义了关键帧之后就可以使用了：  
`animation: rotate 2s;`  
或者：  
```css
animation-name: rotate;
animation-duration: 2s;
```
animation-timing-function 常见值有：linear、ease、ease-in、ease-out、ease-in-out  

animation-fill-mode直译为动画填充模式@keyframes 只是定义了动画过程中每一帧的值，然而在动画开始前和动画结束后，元素改处于什么状态呢？animation-fill-mode 说的就是这个事情。除了默认值 none 外，还有另外 3 个值：  
+ forwards，表示，动画完成后，元素状态保持为最后一帧的状态。
+ backwards，表示，有动画延迟时，动画开始前，元素状态保持为第一帧的状态。
+ both，表示上述二者效果都有。

animation-delay 设置延迟时间。不为大家注意的是，延迟可以为负数。负延迟表示动画仿佛开始前就已经运行过了那么长时间。  
CSS 动画是可以暂停的。属性 animation-play-state 表示动画播放状态，默认值 running 表示播放， paused 表示暂停  
播放方向 animation-direction，它的意思说指定动画按照指定顺序来播放 @keyframes 定义的关键帧。其值有： 
+ normal 默认值。
+ reverse 表示动画反向播放。
+ alternate 表示正向和反向交叉进行。
+ alternate-reverse 表示反向和正向交叉进行。