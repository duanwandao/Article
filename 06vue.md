# vue

## 邂逅Vue

### Vue中的MVVM

+ view层

  + 视图层
  + 在我们前端开发中，通常就是DOM层
  + 主要的作用是给用户展示各种信息

+ Model层
  
  + 数据层
  + 数据可能是我们固定的思数据，更多的是来自我们服务器，从网络上请求下来的数据

+ VueModel层

  + 视图模型层
  + 视图模型层是view和model沟通的桥梁
  + 一方面他实现了Data Binding，也就是数据绑定，将Model的改编实例的反映到View中
  + 另一方面他实现了DOM Listener，也就是DOM监听，当DOM发生一些事件（点击、滚动、touch等等）的时候，可以监听到，并在需要的情况下改变对应的Data

### 创建Vue实例传入的options  

+ el

  + 类型string|HTMLElement
  + 作用：决定之后Vue实例会管理哪一个DOM

+ data

  + 类型Object|Function
  + 作用：Vue实例对应的数据对象
+ el

  + 类型{[key:string]:Functionj}
  + 作用：定义属于Vue的一些方法，可以在其他地方调用，也可以在指令使用

### 生命周期

> 事物从诞生到消亡的整个过程  

+ beforeCreate 创建实例之前执行的钩子函数
+ created 实例创建完成后执行的钩子
+ beforeMount 将编译完成的HTML挂载到对应虚拟dom时候出发的钩子（此时页面并没有内容）
+ mounted 编译好的HTML挂载到页面完成后之后执行的事件钩子，次钩子函数中一般会做一些ajax请求获取数据进行数据初始化（mounted在整个实例中只执行一次）
+ beforeUpdate 更新之前的钩子
+ updated 更新之后的钩子
+ beforeDestroy 实例销毁之前执行的钩子
+ destroyed 实例销毁完成执行的钩子

## Vue基础语法

+ Mustache语法

  > Mustache:胡须 差值表达式
  > mustache语法中，不仅仅可以直接写变量，也可以写简单的表达式

+ v-once  

  > 在某些情况下，我们可能不希望界面随意的跟随改变,这个时候，我们就可以使用一个Vue的指令
  > 该指令后面不需要跟任何表达式(比如之前的v-for后面是由跟表达式的)
  > 该指令表示元素和组件(组件后面才会学习)只渲染一次，不会随着数据的改变而改变。

+ v-html

  > 某些情况下，我们从服务器请求到的数据本身就是一个HTML代码
  > 如果我们直接通过{{}}来输出，会将HTML代码也一起输出。
  > 但是我们可能希望的是按照HTML格式进行解析，并且显示对应的内容。
  > 如果我们希望解析出HTML展示,可以使用v-html指令,该指令后面往往会跟上一个string类型,会将string的html解析出来并且进行渲染

+ v-text  

  > v-text作用和Mustache一致
  > v-text通常情况下，接受一个string类型

+ v-pre

  > v-pre用于跳过这个元素和它子元素的编译过程，用于显示原本的Mustache语法。

+ v-cloak 斗篷

  > 在某些情况下，我们浏览器可能会直接显然出未编译的Mustache标签。
  > 网速不好的情况下，Vue渲染不出来，会出现闪动的效果

+ v-bind
  > 除了内容需要动态来决定外，某些属性我们也希望动态来绑定:比如动态绑定a元素的href属性,比如动态绑定img元素的src属性,这个时候，我们可以使用v-bind指令：
  + 作用：动态绑定属性
  + 缩写：:
  + 预期：any (with argument) | Object (without argument)
  + 参数：attrOrProp (optional)
  
+ v-bind动态绑定class属性

  > 很多时候，我们希望动态的来切换class，比如当数据为某个状态时，字体显示红色,当数据另一个状态时，字体显示黑色

  + 对象语法
  
    > 对象语法的含义是:class后面跟的是一个对象

    + 用法一：直接通过{}绑定一个类

      `<h2 :class="{'active': isActive}">Hello World</h2>`
    + 用法二：也可以通过判断，传入多个值

      `<h2 :class="{'active': isActive, 'line': isLine}">Hello World</h2>`
    + 用法三：和普通的类同时存在，并不冲突

      `<h2 class="title" :class="{'active': isActive, 'line': isLine}">Hello World</h2>`
    + 用法四：如果过于复杂，可以放在一个methods或者computed中

      `<h2 class="title" :class="classes">Hello World</h2>`
  + 数组语法
    + 用法一：直接通过{}绑定一个类

      `<h2 :class="['active']">Hello World</h2>`
    + 用法二：也可以传入多个值

      `<h2 :class=“[‘active’, 'line']">Hello World</h2>`
    + 用法三：和普通的类同时存在，并不冲突

      `<h2 class="title" :class=“[‘active’, 'line']">Hello World</h2>`
    + 用法四：如果过于复杂，可以放在一个methods或者computed中

      `<h2 class="title" :class="classes">Hello World</h2>`

+ v-bind绑定style样式

  + 对象语法

    > style后面跟的是一个对象类型，对象的key是CSS属性名称，对象的value是具体赋的值，值可以来自于data中的属性

      `:style="{color: currentColor, fontSize: fontSize + 'px'}"` 

  + 数组语法

    > style后面跟的是一个数组类型,多个值以，分割即可

    `<div v-bind:style="[baseStyles, overridingStyles]"></div>`

+ 计算属性

  > 在某些情况，我们可能需要对数据进行一些转化后再显示，或者需要将多个数据结合起来进行显示，这样在标签中写就不合适了，需要计算属性的出现。

  ```javascript
    conputed:{
      fullName(){
        return this.firstName+this.lastName
      }
    }
  ```

+ 计算属性的setter和getter

  + 每个计算属性都包含一个getter和一个setter
  + 在上面的例子中，我们只是使用getter来读取。
  + 在某些情况下，你也可以提供一个setter方法（不常用）。

  ```javascript
    conputed:{
      fullName:{
        get(){
          console.log('调用了fullName')
        },
        set(newValue){
          console.log('调用了fullName')
        }
      }
    }
  ```

+ 为什么计算属性中写的函数用起来当个普通属性使用就可以？

  > 计算属性中的函数其实是一个对象，其中有两个方法时get与set但是一般计算属性中都是没有set方法的，get只是一个只读属性

+ 计算属性的缓存  

  > methods和computed看起来都可以实现我们的功能,那么为什么还要多一个计算属性这个东西呢？原因：计算属性会进行缓存，如果多次使用时，计算属性只会调用一次。

+ 对象增强写法

  > ES6中，对对象字面量进行了很多增强。

  ```javascript
  //属性的简写
  let obj={
    name:name,
    age:age
  }
  //可以简写为
  let obj={
    name,
    age
  }
  //方法的简写
  let obj={
    test:function(){
      console.log(111)
    }
    //可以简写为
    let obj={
      test(){
        console.log(111)
      }
    }
  }
  ```
+ 事件监听

  > 在前端开发中，我们需要经常和用于交互。这个时候，我们就必须监听用户发生的时间，比如点击、拖拽、键盘事件等等,在Vue中使用v-on指令监听事件

  + v-on介绍
  + 作用：绑定事件监听器
  + 缩写：@
  + 预期：Function | Inline Statement | Object
  + 参数：event  

  + v-on参数
    + 当通过methods中定义方法，以供@click调用时，需要注意参数问题：
    + 情况一：如果该方法不需要额外参数，那么方法后的()可以不添加。
    + 但是注意：如果方法本身中有一个参数，那么会默认将原生事件event参数传递进去
    + 情况二：如果需要同时传入某个参数，同时需要event时，可以通过$event传入事件。

  + v-on修饰符
    + .stop - 调用 event.stopPropagation()阻止冒泡
    + .prevent - 调用 event.preventDefault()阻止默认行为
    + .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
    + .native - 监听组件根元素的原生事件。
    + .once - 只触发一次回调。

+ v-if/v-else/v-else-if

  > 这三个指令与JavaScript的条件语句if、else、else if类似。Vue的条件指令可以根据表达式的值在DOM中渲染或销毁元素或组件

  + 原理
    + v-if后面的条件为false时，对应的元素以及其子元素不会渲染
    + 也就是根本没有不会有对应的标签出现在DOM中

  ```javascript
  /*
  小问题：
    如果我们在有输入内容的情况下，切换了类型，我们会发现文字依然显示之前的输入的内容。
    但是按道理讲，我们应该切换到另外一个input元素中了。
    在另一个input元素中，我们并没有输入内容。
    为什么会出现这个问题呢？
  问题解答：
    这是因为Vue在进行DOM渲染时，出于性能考虑，会尽可能的复用已经存在的元素，而不是重新创建新的元素。
    在上面的案例中，Vue内部会发现原来的input元素不再使用，直接作为else中的input来使用了。
  解决方案：
    如果我们不希望Vue出现类似重复利用的问题，可以给对应的input添加key
    并且我们需要保证key的不同
  */
  ```

+ v-show  

  ```javascript
  /*
  v-show的用法和v-if非常相似，也用于决定一个元素是否渲染：
    v-if和v-show对比
    v-if和v-show都可以决定一个元素是否渲染，那么开发中我们如何选择呢？
    v-if当条件为false时，压根不会有对应的元素在DOM中。
    v-show当条件为false时，仅仅是将元素的display属性设置为none而已。
  开发中如何选择呢？
    当需要在显示与隐藏之间切片很频繁时，使用v-show
    当只有一次切换时，通过使用v-if
  */
  ```

+ v-for

  + 当我们有一组数据需要进行渲染时，我们就可以使用v-for来完成
    + v-for的语法类似于JavaScript中的for循环
    + 格式如下：item in items的形式

+ 组件的可以属性

  ```JavaScript
  /*
  官方推荐我们在使用v-for时，给对应的元素或组件添加上一个:key属性。
  为什么需要这个key属性呢（了解）？
    这个其实和Vue的虚拟DOM的Diff算法有关系。
    这里我们借用React’s diff algorithm中的一张图来简单说明一下：
  当某一层有很多相同的节点时，也就是列表节点时，我们希望插入一个新的节点
    我们希望可以在B和C之间加一个F，Diff算法默认执行起来是这样的。
    即把C更新成F，D更新成C，E更新成D，最后再插入E，是不是很没有效率？
  所以我们需要使用key来给每个节点做一个唯一标识
    Diff算法就可以正确的识别此节点
    找到正确的位置区插入新的节点。
  所以一句话，key的作用主要是为了高效的更新虚拟DOM。
  */
  ```
+ 那些数组的方法是响应式的

  > 因为Vue是响应式的，所以当数据发生变化时，Vue会自动检测数据变化，视图会发生对应的更新
  
  + push()
  + pop()
  + shift()
  + unshift()
  + splice()
  + sort()
  + reverse()

+ v-model  

  > 表单控件在实际开发中是非常常见的。特别是对于用户信息的提交，需要大量的表单。Vue中使用v-model指令来实现表单元素和数据的双向绑定。

  > v-model其实是一个语法糖，它的背后本质上是包含两个操作：
    1. v-bind绑定一个value属性
    2. v-on指令给当前元素绑定input事件
    3. 也就是说下面的代码：等同于下面的代码：
      ```vue
        <input type="text" v-model="message">
      //等同于
        <input type="text" 
               v-bind:value="message" 
               v-on:input="message = $event.target.value"
        >

      ```
 





## 组件化开发

## Vuecli

## Vue-router

## vuex