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
      fullName () {
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

  ```javascript
  <input type="text" v-model="message">
      //等同于
        <input type="text"  
               v-bind:value="message"  
               v-on:input="message = $event.target.value"
        >
  ```

+ v-model 修饰符

  + lazy修饰符

    + 默认情况下，v-model默认是在input事件中同步输入框的数据的。
    + 也就是说，一旦有数据发生改变对应的data中的数据就会自动发生改变。
    + lazy修饰符可以让数据在失去焦点或者回车时才会更新：

  + number修饰符

    + 默认情况下，在输入框中无论我们输入的是字母还是数字，都会被当做字符串类型进行处理。
    + 但是如果我们希望处理的是数字类型，那么最好直接将内容当做数字处理。
    + number修饰符可以让在输入框中输入的内容自动转成数字类型

  + trim修饰符
    + 如果输入的内容首尾有很多空格，通常我们希望将其去除
    + trim修饰符可以过滤内容左右两边的空格

## 组件化开发

### 组件化

> 如果我们将一个页面中所有的处理逻辑全部放在一起，处理起来就会变得非常复杂，而且不利于后续的管理以及扩展。
> 如果，我们讲一个页面拆分成一个个小的功能块，每个功能块完成属于自己这部分独立的功能，那么之后整个页面的管理和维护就变得非常容易了。

+ 组件化是Vue.js中的重要思想
  + 它提供了一种抽象，让我们可以开发出一个个独立可复用的小组件来构造我们的应用。
  + 任何的应用都会被抽象成一颗组件树。
+ 组件化思想的应用
  + 有了组件化的思想，我们在之后的开发中就要充分的利用它
  + 尽可能的将页面拆分成一个个小的、可复用的组件
  + 这样让我们的代码更加方便组织和管理，并且扩展性也更强

### 注册组件

+ 组件的使用分成三个步骤
  + 创建组件构造器 Vue.extend()
    + Vue.extend()
      + 调用Vue.extend()创建的是一个组件构造器。
      + 通常在创建组件构造器时，传入template代表我们自定义组件的模板。
      + 该模板就是在使用到组件的地方，要显示的HTML代码。
      + 事实上，这种写法在Vue2.x的文档中几乎已经看不到了，它会直接使用下面我们会讲到的语法糖，但是在很多资料还是会提到这种方式，而且这种方式是学习后面方式的基础。
  + 注册组件 Vue.component()
    + Vue.component()
      + 调用Vue.component()是将刚才的组件构造器注册为一个组件，并且给它起一个组件的标签名称。
      + 所以需要传递两个参数：1、注册组件的标签名 2、组件构造器
  + 使用组件 在Vue实例的作用范围内使用组建
    + 组件必须挂载在某个Vue实例下，否则它不会生效

```javascript
<div id="app">
    <cpn></cpn>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    //1.创建组件构造器对象
    const cpn=Vue.extend({
      template:`
      <div>
      <h2>我是标题</h2>
      <p>我是文章内容</p>
      </div>
      `,

    })
    //2.注册组件
    Vue.component('cpn',cpn)
    //3.使用组建
  const app=new Vue({
    el:'#app',
    data: {

    }
  })
```

### 全局组建和局部组件

+ 当我们通过调用Vue.component()注册组件时，组件的注册是全局的
  + 这意味着该组件可以在任意Vue实例下使用

+ 如果我们注册的组件是挂载在某个实例中, 那么就是一个局部组件

```javascript
  //1.创建组件构造器对象
    const cpn=Vue.extend({
      template:`
      <div>
      <h2>我是标题</h2>
      <p>我是文章内容</p>
      </div>
      `,

    })
    //2.注册组件
    //Vue.component('cpn',cpn)
    //3.使用组建
  const app=new Vue({
    el:'#app',
    data: {

    },
    conponents:{
      //第一个是标签名 第二个是组件名字
      cpn:cpn
    }
  })
```

#### 父组件和子组件

+ 组件树中：
  + 组件和组件之间存在层级关系
  + 而其中一种非常重要的关系就是父子组件的关系

+ 父子组件错误用法：以子标签的形式在Vue实例中使用
  + 因为当子组件注册到父组件的components时，Vue会编译好父组件的模块
  + 该模板的内容已经决定了父组件将要渲染的HTML（相当于父组件中已经有了子组件中的内容了）
  + \<child-cpn></child-cpn>是只能在父组件中被识别的
  + 类似这种用法，\<child-cpn></child-cpn>是会被浏览器忽略的。

#### 注册组件语法糖

+ 在上面注册组件的方式，可能会有些繁琐
  + Vue为了简化这个过程，提供了注册的语法糖。
  + 主要是省去了调用Vue.extend()的步骤，而是可以直接使用一个对象来代替

```javascript
 //语法糖：注册全局组建
   Vue.component('cpn',{
     template:`<div>hhhhhhh</div>`
   })
  const app=new Vue({
    el:'#app',
    data: {

    },
    //注册子组件
    components:{
      'cpn1':{
        template:`<div>hhhhhhh</div>`
      }
    }
  })
```

#### 组件模板抽离的写法

```javascript
 <!-- 1.利用script标签写模板 -->
  <script type="text/x-template" id="cpn">
    <div>
      <h2>我是标题</h2>
      <p>我是文章内容哈哈哈</p>
    </div>
  </script>
  <!-- 2.使用template标签 -->
  <template id="cpn">
      <div>
          <h2>我是标题</h2>
          <p>我是文章内容哈哈哈</p>
        </div>
  </template>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    Vue.component('cpn',{
      template:'#cpn'
    })

   const app=new Vue({
     el:'#app',
     data: {

     }
   })
  </script>
```

### 组件数据存放

> 组件内部不能访问Vue实例的数据

+ 组件是一个单独功能模块的封装
  + 这个模块有属于自己的HTML模板，也应该有属性自己的数据data

+ 组件自己的数据存放在哪里？
  + 组件对象也有一个data属性(也可以有methods等属性，下面我们有用到)
  + 只是这个data属性必须是一个函数
  + 而且这个函数返回一个对象，对象内部保存着数据

#### 组件data为什么必须是函数

+ 为什么data在组件中必须是一个函数呢?
  + 首先，如果不是一个函数，Vue直接就会报错
  + 其次，原因是在于Vue让每个组件对象都返回一个新的对象，因为如果是同一个对象的，组件在多次使用后会相互影响。

### 父子组件的通信

+ 子组件是不能引用父组件或者Vue实例的数据的
+ 在开发中，往往一些数据确实需要从上层传递到下层
  + 比如在一个页面中，我们从服务器请求到了很多的数据
  + 其中一部分数据，并非是我们整个页面的大组件来展示的，而是需要下面的子组件进行展示
  + 这个时候，并不会让子组件再次发送一个网络请求，而是直接让大组件(父组件)将数据传递给小组件(子组件)
+ 如何进行父子组件间的通信呢？Vue官方提到
  + 如何进行父子组件间的通信呢？Vue官方提到
  + 通过事件向父组件发送消息

### 父级向子级传递

+ 在组件中，使用选项props来声明需要从父级接收到的数据
+ props的值有两种方式
  + 字符串数组，数组中的字符串就是传递时的名称
  + 对象，对象可以设置传递时的类型，也可以设置默认值等

```javascript
Vue.component('cpn',{
      template:'#cpn',
      //数组形式传递参数
      //props:["message"]
      //对象形式
      props:{  
        //类型是对象或者数组的话，默认值必须是一个函数
        messages: {
          //类型限制
          type: String,
          //默认值
          default: "aaa",
          //必须写的
          required: true
        }

      }
    })
    //props验证支持哪些类型呢？
    /*
    String
    number  
    Boolean
    array
    Object
    date
    function
    symbol
    */
   //如果我们要自定义验证呢？
      props:{  
      //基础的类型检查（如果null则匹配任何类型）
      propA:Number,
      //多个可能的类型用数组
      propB:[String,Number],
      //必须填写字符串
      propC:{
        type: String,
        required: true
      },
      //带有默认值的数字
      propD:{
        type:Number,
        default:100
      },
      //带有默认值的对象
      propE:{
        type:Object,
        //对象或者数组默认值必须从一个工厂函数获取
        default: function(){
          return {message:'hello'}
        }
      },
      //自定义验证函数
      propF:{
        validator: function(value){
          //这个值必须是匹配到下列字符串中的一个
          return ['success','warning','danger'].indexOf(value)!== -1
        }
      }
      }
```

### 子级向父级传递

+ 常见的是子组件传递数据或事件到父组件中，这个时候，我们需要使用自定义事件来完成
+ 什么时候需要自定义事件呢
  + 当子组件需要向父组件传递数据时，就要用到自定义事件了
  + 我们之前学习的v-on不仅仅可以用于监听DOM事件，也可以用于组件间的自定义事件

+ 自定义事件的流程
  + 在子组件中，通过$emit()来触发事件
  + 在父组件中，通过v-on来监听子组件事件

### 父子组件之间的访问方式

+ 有时候我们需要父组件直接访问子组件，子组件直接访问父组件，或者是子组件访问跟组件。
  + 父组件访问子组件：使用$children或$refs
  + 子组件访问父组件：使用$parent
+ 我们先来看下$children的访问
  + this.$children是一个数组类型，它包含所有子组件对象。
+ $children的缺陷
  + 通过$children访问子组件时，是一个数组类型，访问其中的子组件必须通过索引值
  + 但是当子组件过多，我们需要拿到其中一个时，往往不能确定它的索引值，甚至还可能会发生变化
  + 有时候，我们想明确获取其中一个特定的组件，这个时候就可以使用$refs

+ $refs的使用
  + $refs和ref指令通常是一起使用的
  + 首先，我们通过ref给某一个子组件绑定一个特定的ID
  + 其次，通过this.$refs.ID就可以访问到该组件了

+ 如果我们想在子组件中直接访问父组件，可以通过$parent
  + 尽管在Vue开发中，我们允许通过$parent来访问父组件，但是在真实开发中尽量不要这样做。
  + 子组件应该尽量避免直接访问父组件的数据，因为这样耦合度太高了
  + 如果我们将子组件放在另外一个组件之内，很可能该父组件没有对应的属性，往往会引起问题。
  + 另外，更不好做的是通过$parent直接修改父组件的状态，那么父组件中的状态将变得飘忽不定，很不利于我的调试和维护

### 插槽slot

+ slot翻译为插槽
  + 在生活中很多地方都有插槽，电脑的USB插槽，插板当中的电源插槽
  + 插槽的目的是让我们原来的设备具备更多的扩展性
  + 比如电脑的USB我们可以插入U盘、硬盘、手机、音响、键盘、鼠标等等

+ 组件的插槽
  + 组件的插槽也是为了让我们封装的组件更加具有扩展性
  + 让使用者可以决定组件内部的一些内容到底展示什么

+ 移动网站中的导航栏
  + 移动开发中，几乎每个页面都有导航栏
  + 导航栏我们必然会封装成一个插件，比如nav-bar组件
  + 一旦有了这个组件，我们就可以在多个页面中复用了

+ 如何去封装这类的组件呢
  + 抽取共性，保留不同
  + 最好的封装方式就是将共性抽取到组件中，将不同暴露为插槽
  + 一旦我们预留了插槽，就可以让使用者根据自己的需求，决定插槽中插入什么内容
  + 是搜索框，还是文字，还是菜单。由调用者自己来决定

+ 当子组件的功能复杂时，子组件的插槽可能并非是一个
  + 比如我们封装一个导航栏的子组件，可能就需要三个插槽，分别代表左边、中间、右边
  + 只要给slot元素一个name属性即可
  + \<slot name='myslot'></slot>

## 模块化开发

+ 随着ajax异步请求的出现，慢慢形成了前后端的分离
  + 客户端需要完成的事情越来越多，代码量也是与日俱增
  + 为了应对代码量的剧增，我们通常会将代码组织在多个js文件中，进行维护
  + 这种代码的编写方式对js文件的依赖顺序几乎是强制性的
  + 但是当js文件过多，比如有几十个的时候，弄清楚它们的顺序是一件比较同时的事情

+ 在匿名函数内部，定义一个对象
  + 给对象添加各种需要暴露到外面的属性和方法(不需要暴露的直接定义即可)
  + 最后将这个对象返回，并且在外面使用了一个MoudleA接受

+ 这就是模块最基础的封装，事实上模块的封装还有很多高级的话题
  + 但是我们这里就是要认识一下为什么需要模块，以及模块的原始雏形
  + 前端模块化开发已经有了很多既有的规范，以及对应的实现方案

### commonJS

+ 模块化有两个核心：导出和导入
  
  ```javascript
  //导出
  module.exports={
    flag:ture,
    test(a,b){
      return a+b
    }
  }
  //导入
  let aaa=require('module')
  let test=aaa.test;
  ```

### se6的export

```javascript
//导出变量
export let name='meng'
export let age=18

let name='meng'
let age=18
export{name,age}
//导出函数
export function test (content){
  console.log(tcontent)
}

export class Person{
  constructor(name,age){
    this.name=name;
    this.age=age;
  }
}
```

+ 某些情况下，一个模块中包含某个的功能，我们并不希望给这个功能命名，而且让导入者可以自己来命名
  + 这个时候就可以使用export default

```javascript
expor default function  (){
console.log(111)
}
//在别的地方导入我门就可以自定义名字了
import myFun from "module";
```

+ 另外，需要注意：export default在同一个模块中，不允许同时存在多个。

### es6的import

导入

## webpack

### 认识webpack

+ 什么是webpack
  + 这个webpack还真不是一两句话可以说清楚的

+ 我们先看看官方的解释
  + At its core, webpack is a static module bundler for modern JavaScript applications
  + 从本质上来讲，webpack是一个现代的JavaScript应用的静态模块打包工具

+ 用概念解释概念，还是不清晰
  + 我们从两个点来解释上面这句话：模块 和 打包

+ 前端模块化
  + 在ES6之前，我们要想进行模块化开发，就必须借助于其他的工具，让我们可以进行模块化开发
  + 并且在通过模块化开发完成了项目后，还需要处理模块间的各种依赖，并且将其进行整合打包
  + 而webpack其中一个核心就是让我们可能进行模块化开发，并且会帮助我们处理模块间的依赖关系
  + 而且不仅仅是JavaScript文件，我们的CSS、图片、json文件等等在webpack中都可以被当做模块来使用（在后续我们会看到）
  + 这就是webpack中模块化的概念

+ 打包如何理解
  + 理解了webpack可以帮助我们进行模块化，并且处理模块间的各种复杂关系后，打包的概念就非常好理解了
  + 就是将webpack中的各种资源模块进行打包合并成一个或多个包(Bundle)
  + 并且在打包的过程中，还可以对资源进行处理，比如压缩图片，将scss转成css，将ES6语法转成ES5语法，将TypeScript转成JavaScript等等操作
  + 但是打包的操作似乎grunt/gulp也可以帮助我们完成，他们的不同

+ grunt/gulp的核心是Task
  + 我们可以配置一系列的task，并且定义task要处理的事务（例如ES6、ts转化，图片压缩，scss转成css）
  + 之后让grunt/gulp来依次执行这些task，而且让整个流程自动化
  + 所以grunt/gulp也被称为前端自动化任务管理工具

+ 什么时候用grunt/gulp
  + 如果你的工程模块依赖非常简单，甚至是没有用到模块化的概念
  + 只需要进行简单的合并、压缩，就使用grunt/gulp即可
  + 但是如果整个项目使用了模块化管理，而且相互依赖非常强，我们就可以使用更加强大的webpack了

+ grunt/gulp和webpack有什么不同
  + grunt/gulp更加强调的是前端流程的自动化，模块化不是它的核心
  + webpack更加强调模块化开发管理，而文件压缩合并、预处理等功能，是他附带的功能

### webpack起步

+ 文件和文件夹解析
  + dist文件夹：用于存放之后打包的文件
  + src文件夹：用于存放我们写的源文件
  + index.html：浏览器打开展示的首页html
  + package.json：通过npm init生成的，npm包管理的文件

+ js文件的打包
  + webpack就是一个模块化的打包工具，所以它支持我们代码中写模块化，可以对模块化的代码进行处理
  + 如果在处理完所有模块之间的关系后，将多个js打包到一个js文件中，引入时就变得非常方便了
  + webpack/src/main.js dist/bundle.js

+ 打包后会在dist文件下，生成一个bundle.js文件
  + bundle.js文件，是webpack处理了项目直接文件依赖后生成的一个js文件，我们只需要将这个js文件在index.html中引入即可

### webpack配置

> 入口和出口的配置

+ 我们考虑一下，如果每次使用webpack的命令都需要写上入口和出口作为参数，就非常麻烦，有没有一种方法可以将这两个参数写到配置中，在运行时，直接读取呢？
+ 当然可以，就是创建一个webpack.config.js文件

```JavaScript
const  path=require('path')

module.exports={
  //入口：可以是字符串、数组、对象，这里我们的入口只有一个，所以写一个字符串即可
  entry:'./src/main.js',
  //出口：通常是一个对象，里面至少包含两个重要属性，path和filename
  output:{
    path:path.resolve(__dirname,'dist'),//path是一个绝对路径
    filename:'bundle.js'
  }
}
```

+ package.json中定义启动
  + 我们可以在package.json的scripts中定义自己的执行脚本
  + package.json中的scripts的脚本在执行时，会按照一定的顺序寻找命令对应的位置
  + 首先，会寻找本地的node_modules/.bin路径中对应的命令
  + 如果没有找到，会去全局的环境变量中寻找

### loader的使用

+ loader是webpack中一个非常核心的概念
+ webpack用来做什么呢
  + 在我们之前的实例中，我们主要是用webpack来处理我们写的js代码，并且webpack会自动处理js之间相关的依赖
  + 但是，在开发中我们不仅仅有基本的js代码处理，我们也需要加载css、图片，也包括一些高级的将ES6转成ES5代码，将TypeScript转成ES5代码，将scss、less转成css，将.jsx、.vue文件转成js文件等等
  + 对于webpack本身的能力来说，对于这些转化是不支持的
  + 那怎么办呢？给webpack扩展对应的loader就可以啦

+ loader使用过程
  + 通过npm安装需要使用的loader
  + 在webpack.config.js中的modules关键字下进行配置

```JavaScript
modul:{
  rules:[
    {
      test:/\.css$/,
      use:['style-loader','scc-loader']
    }
  ]
}




//less处理
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }]
    }
};
```

+ 图片文件处理 – 资源准备阶段

  + 图片处理，我们使用url-loader来处理，依然先安装url-loader

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //当加载的图片，小于limit时候。会将图片编译成base64字符串形式
              //当加载的图片大于limit时候，需要安装file-loader
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}
```

+ 我们发现webpack自动帮助我们生成一个非常长的名字
  + 这是一个32位hash值，目的是防止名字重复
  + 但是，真实开发中，我们可能对打包的图片名字有一定的要求
  + 比如，将所有的图片放在一个文件夹中，跟上图片原来的名称，同时也要防止重复
  
+ 我们可以在options中添加上如下选项
  + img：文件要打包到的文件夹
  + name：获取图片原来的名字，放在该位置
  + hash:8：为了防止图片名称冲突，依然使用hash，但是我们只保留8位
  + ext：使用图片原来的扩展名

+ 我们发现图片并没有显示出来，这是因为图片使用的路径不正确
  + 默认情况下，webpack会将生成的路径直接返回给使用者
  + 但是，我们整个程序是打包在dist文件夹下的，所以这里我们需要在出口路径下再添加一个publicPath:'dist/'

+ ES6语法处理
  + 如果希望将ES6的语法转成ES5，那么就需要使用babel
  + 而在webpack中，我们直接使用babel对应的loader就可以了
  + npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
  
```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      //排除node文件夹之内的js
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

### webpack中配置vue

+ 安装vue-loader和vue-template-compiler

```JavaScript
resolve:{
//配置别名
alias:{
'vue$':'vue/dist/vue.esm.js'
},
extensions:['.js','.css','.vue']
}
```

### plugin的使用

+ plugin是什么
  + plugin是插件的意思，通常是用于对某个现有的架构进行扩展
  + webpack中的插件，就是对webpack现有功能的各种扩展，比如打包优化，文件压缩等等

+ loader和plugin区别
  + loader主要用于转换某些类型的模块，它是一个转换器
  + plugin是插件，它是对webpack本身的扩展，是一个扩展器
  
+ plugin的使用过程
  + 步骤一：通过npm安装需要使用的plugins(某些webpack已经内置的插件不需要安装)
  + 步骤二：在webpack.config.js中的plugins中配置插件
  
+ 添加版权的Plugin
  + 我们先来使用一个最简单的插件，为打包的文件添加版权声明该插件名字叫BannerPlugin，属于webpack自带的插件。
  
```javascript
module.exports={
    plugins:[
        new webpack.BannerPlugin('最终版权归Dylan所有')
    ]
}
```

+ 打包html的plugin
  + 目前，我们的index.html文件是存放在项目的根目录下的
  + 我们知道，在真实发布项目时，发布的是dist文件夹中的内容，但是dist文件夹中如果没有index.html文件，那么打包的js等文件也就没有意义了
  + 所以，我们需要将index.html文件打包到dist文件夹中，这个时候就可以使用HtmlWebpackPlugin插件
  
+ HtmlWebpackPlugin插件可以为我们做这些事情
  + 自动生成一个index.html文件(可以指定模板来生成)
  + 将打包的js文件，自动通过script标签插入到body中
  
```javascript
    plugins:[
    new webpack.BannerPlugin('最终版权归Dylan所有'),
    new htmlWebpackPlugin({
    //这里的template表示根据什么模板来生成index.html
    //我们需要删除之前在output中添加的publicPath属性,否则插入的script标签中的src可能会有问题
    template:'index.thml'
    })
    ]
```

+ js压缩的Plugin
  + 在项目发布之前，我们必然需要对js等文件进行压缩处理
  + 这里，我们就对打包的js文件进行压缩
  + 我们使用一个第三方的插件uglifyjs-webpack-plugin，并且版本号指定1.1.1，和CLI2保持一致

```javascript
plugins:[
    new uglifyJsPlugin()
]
```

### 搭建本地服务器

+ webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js搭建，内部使用express框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果
+ 不过它是一个单独的模块，在webpack中使用之前需要先安装它

`npm install --save-dev webpack-dev-server@2.9.1`

+ devserver也是作为webpack中的一个选项，选项本身可以设置如下属性
  + contentBase：为哪一个文件夹提供本地服务，默认是根文件夹，我们这里要填写./dist
  + port：端口号
  + inline：页面实时刷新
  + historyApiFallback：在SPA页面中，依赖HTML5的history模式

## Vue-cli

### Vue CLI

+ 如果你在开发大型项目, 那么你需要, 并且必然需要使用Vue CLI

  + 使用Vue.js开发大型应用时，我们需要考虑代码目录结构、项目结构和部署、热加载、代码单元测试等事情
  + 如果每个项目都要手动完成这些工作，那无以效率比较低效，所以通常我们会使用一些脚手架工具来帮助完成这些事情。

+ CLI是什么意思
  + CLI是Command-Line Interface, 翻译为命令行界面, 但是俗称脚手架
  + Vue CLI是一个官方发布 vue.js 项目脚手架
  + 使用 vue-cli 可以快速搭建Vue开发环境以及对应的webpack配置

```javascript
//脚手架3的安装方法
npm install @vue/cli -g
//脚手架3创建项目
vue create my-project
//脚手架2需要从3的模板里面拉取
npm install @vue/cli-init -g  
//脚手架2创建项目
vue init webpack my-project
```

### Vue CLI2

[![10b52fe060a1b0be6.png](https://www.kanjiantu.com/images/2019/09/15/10b52fe060a1b0be6.png)](https://www.kanjiantu.com/image/dpBSaz)

[![290c5c3aca171f19e.png](https://www.kanjiantu.com/images/2019/09/15/290c5c3aca171f19e.png)](https://www.kanjiantu.com/image/dpBLqP)

#### Runtime-Compiler和Runtime-only的区别

+ 如果在之后的开发中，你依然使用template，就需要选择Runtime-Compiler
+ 如果你之后的开发中，使用的是.vue文件夹开发，那么可以选择Runtime-only

![图片2.png](http://ww1.sinaimg.cn/large/00611hkHly1g706la6hdvj30ib0hlgp1.jpg)

![图片1.png](http://ww1.sinaimg.cn/large/00611hkHly1g706mbh7nwj31zv12in8j.jpg)

```javascript
new Vue({
el:'#app',
conponents:{app},
template:'<app/>'
})
// tempalte-->ast-->render-->vdom-->UI

new Vue({
el:'#app',
render:h=>h(app)
})
//那么 Vue中的template谁处理了？
//是由vue-template-compiler
// render-->vdom-->UI  速度更快，文件更小


const cpn=Vue.component('cpn',{
  template:'<div>我是cpn组件</div>',
  data () {
    return{

    }
  }
})

//render函数的使用
new Vue({
el:'#app',
render:(createElement)=>{
  //使用方法1
  //return createElement('标签'，'相关数据对象（可以不传）',['内容数组'])
  return createElement('div',{class:'box'},['dylan'])
  //嵌套render函数
  return createElement('div',{class:'box'},createElement('h2'),['标题呀'])
  //使用方法2传入组件
  return createElement(cpn)
}
})
```

![图片3.png](http://ww1.sinaimg.cn/large/00611hkHly1g706mpojsnj327o132tfq.jpg)

![图片4.png](http://ww1.sinaimg.cn/large/00611hkHly1g706mycr9nj323f10i0z2.jpg)

### Vue CLI3

+ vue-cli 3 与 2 版本有很大区别
  + vue-cli 3 是基于 webpack 4 打造，vue-cli 2 还是 webapck 3
  + vue-cli 3 的设计原则是“0配置”，移除的配置文件根目录下的，build和config等目录
  + vue-cli 3 提供了 vue ui 命令，提供了可视化配置，更加人性化
  + 移除了static文件夹，新增了public文件夹，并且index.html移动到public中

#### vue cli3配置文件的查看和修改

1. 启动配置服务器vue ui
2. node_modules-->@vue-->cli-service-->webpack.cpnfig.js-->lib-->service
3. 创建vue.config.js

```javascript
//会自动与隐藏起来的webpack配置进行合并
module.exports={

}
```

## Vue-router

### 认识路由

+ 路由器提供了两种机制: 路由和转送
  + 路由是决定数据包从来源到目的地的路径
  + 转送将输入端的数据转移到合适的输出端
  
+ 路由中有一个非常重要的概念叫路由表
  + 路由表本质上就是一个映射表, 决定了数据包的指向

### 后端渲染和前端渲染

#### 后端渲染阶段

+ 早期的网站开发整个HTML页面是由服务器来渲染的
  + 服务器直接生产渲染好对应的HTML页面, 返回给客户端进行展示
  
+ 一个网站, 这么多页面服务器如何处理呢
  + 一个页面有自己对应的网址, 也就是URL
  + URL会发送到服务器, 服务器会通过正则对该URL进行匹配, 并且最后交给一个Controller进行处理
  + Controller进行各种处理, 最终生成HTML或者数据, 返回给前端
  + 这就完成了一个IO操作.
  
+ 上面的这种操作, 就是后端路由
  + 当我们页面中需要请求不同的路径内容时, 交给服务器来进行处理, 服务器渲染好整个页面, 并且将页面返回给客户端
  + 这种情况下渲染好的页面, 不需要单独加载任何的js和css, 可以直接交给浏览器展示, 这样也有利于SEO的优化
  
+ 后端路由的缺点:
  + 一种情况是整个页面的模块由后端人员来编写和维护的
  + 另一种情况是前端开发人员如果要开发页面, 需要通过PHP和Java等语言来编写页面代码
  + 另一种情况是前端开发人员如果要开发页面, 需要通过PHP和Java等语言来编写页面代码
  
#### 前端渲染阶段

+ 前后端分离阶段
  + 随着Ajax的出现, 有了前后端分离的开发模式后端只提供API来返回数据, 前端通过Ajax获取数据, 并且可以通过JavaScript将数据渲染到页面中
  + 这样做最大的优点就是前后端责任的清晰, 后端专注于数据上, 前端专注于交互和可视化上
  + 并且当移动端(iOS/Android)出现后, 后端不需要进行任何处理, 依然使用之前的一套API即可
  +目前很多的网站依然采用这种模式开发  

+ 单页面富应用阶段
  + 其实SPA最主要的特点就是在前后端分离的基础上加了一层前端路由
  + 也就是前端来维护一套路由规则

+ 前端路由的核心是什么呢
  + 改变URL，但是页面不进行整体的刷新

+ URL的hash
  + URL的hash也就是锚点(#), 本质上是改变window.location的href属性
  + 我们可以通过直接赋值location.hash来改变href, 但是页面不发生刷新

```javascript
loaction.href
'http://192.168.1.101:8000/examples/urlChange/'
loaction.hash='/'
'/'
location.href
'http://192.168.1.101:8000/examples/urlChange/#/'
location.hash='/foo'
'/foo'
location.href
'http://192.168.1.101:8000/examples/urlChange/#/foo'
```

+ HTML5的history模式：pushState
+ history接口是HTML5新增的, 它有五种模式改变URL而不刷新页面
+ 第一种history.pushState() 类似于出栈进栈

```javascript
location.href
'http://192.168.1.101:8000/'
history.pushState(({},'','/foo'))
location.href
'http://192.168.1.101:8000/foo'
history.pushState({},'','/')
location.href
'http://192.168.1.101:8000/'
```

+ history.replaceState() 替换 不能点击返回

```javascript
location.href
'http://192.168.1.101:8000/'
history.replaceState(({},'','/foo'))
location.href
'http://192.168.1.101:8000/foo'
history.pushState({},'','/foo/bar')
location.href
'http://192.168.1.101:8000/foo/bar'
```

+ history.go()

```javascript
location.href
'http://192.168.1.101:8000/'
history.go(-1)
location.href
'http://192.168.1.101:8000/foo'
history.go(-1)
location.href
'http://192.168.1.101:8000/examples/urlChange/'
history.go(1)
location.href
'http://192.168.1.101:8000/foo'
```

+ 上面只演示了三个方法  
+ 因为 history.back() 等价于 history.go(-1)
+ history.forward() 则等价于 history.go(1)
+ 这三个接口等同于浏览器界面的前进后退

### Vue-router基本使用

+ vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用
+ vue-router是基于路由和组件的
  + 路由用于设定访问路径, 将路径和组件映射起来
  + 在vue-router的单页面应用中, 页面的路径的改变就是组件的切换
  
#### vue-router安装

+ 步骤一: 安装vue-router
  + npm install vue-router --save

+ 步骤二: 在模块化工程中使用它(因为是一个插件, 所以可以通过Vue.use()来安装路由功能)
  + 第一步：导入路由对象，并且调用 Vue.use(VueRouter)
  + 第二步：创建路由实例，并且传入路由映射配置
  + 第三步：在Vue实例中挂载创建的路由实例

+ 使用vue-router的步骤
  + 第一步: 创建路由组件
  + 第二步: 配置路由映射: 组件和路径映射关系
  + 第三步: 使用路由: 通过<router-link>和<router-view>

```javascript
//创建router文件夹创建index.js
import Vue from 'vue'
import  VueRouter from 'vue-router'

//1.注册插件
Vue.use(VueRouter)

//2.定义路由映射表
const routes=[]

//3.创建router实例
const router=new VueRouter({

})

//4.到出router实例
export default router

//5.挂在到Vue实例中
import router from './router'
new Vue({
el:'#app',
router,
data:{
  
}
})
```

#### 组件和路径的映射关系

```javascript
import Home from '../components/home'
import About from '../components/about'
const routes=[
    {
      path:'/home',
      component:Home
    },
    {
      path:'/about',
      component:About
    }
]
```

#### 使用路由

+ <router-link>: 该标签是一个vue-router中已经内置的组件, 它会被渲染成一个<a>标签
+ <router-view>: 该标签会根据当前的路径, 动态渲染出不同的组件
+ 网页的其他内容, 比如顶部的标题/导航, 或者底部的一些版权信息等会和<router-view>处于同一个等级
+ 在路由切换时, 切换的是<router-view>挂载的组件, 其他内容不会发生改变

```javascript
<router-link>首页</ruoter-link>
<router-link>关于</ruoter-link>
<router-view></router-view>
```

### 细节处理

#### 路由的默认路径

+ 默认情况下, 进入网站的首页, 我们希望<router-view>渲染首页的内容
+ 如何可以让路径默认跳到到首页, 并且<router-view>渲染首页组件呢
+ 我们只需要配置多配置一个映射就可以了
+ 配置解析
  + 我们在routes中又配置了一个映射
  + path配置的是根路径: /
  + edirect是重定向, 也就是我们将根路径重定向到/home的路径下, 这样就可以得到我们想要的结果了
  
```javascript
const routes=[
    {
      path:'/',
      redirct:'/home'
    }
]
```

#### HTML5的History模式

+ 我们前面说过改变路径的方式有两种
  + URL的hash
  + HTML5的history
  + 默认情况下, 路径的改变使用的URL的hash

+ 如果希望使用HTML5的history模式, 非常简单, 进行如下配置即可

```javascript
const router=new VueRouter({
routes,
mode:'history'
})
```

#### router-link补充

+ 在前面的<router-link>中, 我们只是使用了一个属性: to, 用于指定跳转的路径
+ <router-link>还有一些其他属性
  + tag: tag可以指定<router-link>之后渲染成什么组件, 比如上面的代码会被渲染成一个<li>元素, 而不是<a>
  + replace: replace不会留下history记录, 所以指定replace的情况下, 后退键返回不能返回到上一个页面中
  + active-class: 当<router-link>对应的路由匹配成功时, 会自动给当前元素设置一个router-link-active的class, 设置active-class可以修改默认的名称.

```javascript
<router-link to='/home' tag='li' replace active-class='active'></router-link>
```

#### 修改linkActiveClass

```javascript
//单个路由修改activeclass
<router-link to='/home' tag='li' replace active-class='active'></router-link>
//router-link-exact-active   router-link-active
const router=new VueRouter({
routes,
mode:'history',
//在这里更改路由所有的都会改变
linkActiveClass='active'
})
```

#### 路由代码跳转

```javascript
<button @click='linkToHome'></button>
<button @click='linkToAbout'></button>
//设置方法，更改路由跳转
methods：{
  linkToHome(){
    this.$router.push('/home')
  }
  linkToAbout(){
    this.$router.push('/about')
  }
}
```

#### 动态路由

+ 在某些情况下，一个页面的path路径可能是不确定的，比如我们进入用户界面时，希望是如下的路径
  + /user/aaaa或/user/bbbb
  + 除了有前面的/user之外，后面还跟上了用户的ID
  + 这种path和Component的匹配关系，我们称之为动态路由(也是路由传递数据的一种方式)
  
```javascript
{
  path:'/user/:id'
}
<router-link to='/user/123'></router-link>
<h2>{{$route/params.id}}<h2>
```

### 路由懒加载

+ 官方给出了解释
  + 当打包构建应用时，Javascript 包会变得非常大，影响页面加载
  + 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了
  
+ 首先, 我们知道路由中通常会定义很多不同的页面
+ 这个页面最后被打包在哪里呢? 一般情况下, 是放在一个js文件中
+ 但是, 页面这么多放在一个js文件中, 必然会造成这个页面非常的大
+ 如果我们一次性从服务器请求下来这个页面, 可能需要花费一定的时间, 甚至用户的电脑上还出现了短暂空白的情况
+ 如何避免这种情况呢? 使用路由懒加载就可以了
+ 路由懒加载做了什么
  + 路由懒加载的主要作用就是将路由对应的组件打包成一个个的js代码块
  + 只有在这个路由被访问到的时候, 才加载对应的组件
  
```javascript
// 方式一: 结合Vue的异步组件和Webpack的代码分析.
const Home = resolve => { require.ensure(['../components/Home.vue'], () => { resolve(require('../components/Home.vue')) })};
// 方式二: AMD写法
const About = resolve => require(['../components/About.vue'], resolve);
// 方式三: 在ES6中, 我们可以有更加简单的写法来组织Vue异步组件和Webpack的代码分割
const Home = () => import('../components/Home.vue')

//为了统一管理应该这样写，这样代码更加的清晰
const Home=()=>import('../components/home')
const About=()=>import('../components/about')

const routes=[
    {
      path:'/home',
      component:Home
    }
] 
```

### Vue-router嵌套路由

+ 嵌套路由是一个很常见的功能
  + 比如在home页面中, 我们希望通过/home/news和/home/message访问一些内容
  + 一个路径映射一个组件, 访问这两个路径也会分别渲染两个组件
  
```javascript
const routes=[
    {
      path:'/home',
      component:Home,
      children:[
          {
            //不需要加/,拼接的时候会自动添加
            path:'news'，
            component:News
          },
          {
            ppath:'',
            component:Message
          }
      ]
    }
]
```

### Vue-router参数传递

#### 传递参数

+ 传递参数主要有两种类型: params和query
+ params的类型
  + 配置路由格式: /router/:id
  + 传递的方式: 在path后面跟上对应的值
  + 传递后形成的路径: /router/123, /router/abc

+ query的类型
  + 配置路由格式: /router, 也就是普通配置
  + 传递的方式: 对象中使用query的key作为传递方式
  + 传递后形成的路径: /router?id=123, /router?id=abc
  
```javascript
<router-link
:to="{
path:'/profile/'+123,
query:{name:dylan,age:18}
 }"
></router-link>


//用JavaScript代码传递参数
methods:{
  toProfile(){
    this.#router.push({
    path:'/profile/'+123,
    query:{name:dylan,age:18}
    })
  }
}
```

#### 获取参数

+ 获取参数通过$route对象获取的
  + 在使用了 vue-router 的应用中，路由对象会被注入每个组件中，赋值为 this.$route ，并且当路由切换时，路由对象会被更新
  + 通过$route获取传递的信息如下：

```javascript
<p>{{$route.params}}</p>
<p>{{$route.query}}</p>
```

#### $router和$route的区别

+ $route和$router是有区别的
  + $router为VueRouter实例，想要导航到不同URL，则使用$router.push方法
  + $route为当前router跳转对象里面可以获取name、path、query、params等 

### Vue-router导航守卫

+ 我们来考虑一个需求: 在一个SPA应用中, 如何改变网页的标题呢?
  + 网页标题是通过<title>来显示的, 但是SPA只有一个固定的HTML, 切换不同的页面时, 标题并不会改变
  + 但是我们可以通过JavaScript来修改<title>的内容.window.document.title = '新的标题'
  + 那么在Vue项目中, 在哪里修改? 什么时候修改比较合适呢?

+ 普通的修改方式
  + 我们比较容易想到的修改标题的位置是每一个路由对应的组件.vue文件中
  + 通过mounted声明周期函数, 执行对应的代码进行修改即可
  + 但是当页面比较多时, 这种方式不容易维护(因为需要在多个页面执行类似的代码)
  
+ 什么是导航守卫
  + vue-router提供的导航守卫主要用来监听监听路由的进入和离开的
  + vue-router提供了beforeEach和afterEach的钩子函数, 它们会在路由即将改变前和改变后触发
  
+ vue-router提供了beforeEach和afterEach的钩子函数, 它们会在路由即将改变前和改变后触发
  + 首先, 我们可以在钩子当中定义一些标题, 可以利用meta来定义
  + 其次, 利用导航守卫,修改我们的标题.
  
```javascript
const routes=[
    {
      path:'/home',
      component:Home,
      //meta:元数据（描述数据的数据）
      meta:{
        //定义标题
        title:'首页'
      }
    },
    {
          path:'/about',
          component:About,
          meta:{
            title:'关于'
          }
        }
]

//使用钩子函数
// 1. 导航钩子的三个参数解析
//    to: 即将要进入的目标的路由对象
//    from: 当前导航即将要离开的路由对象
//    next: 调用该方法后, 才能进入下一个钩子

//前置守卫（guard）
router.beforeEach((to,from,next)=>{
  window.document.title=to.meta.title
  next()
})
```

+ 补充一: 如果是后置钩子, 也就是afterEach, 不需要主动调用next()函数
+ 补充二: 上面我们使用的导航守卫, 被称之为全局守卫
  + 路由独享的守卫
  + 组件内的守卫
  
```javascript
//后置钩子hook
router.afterEach((to,from)=>{
  
})
```

### keep-alive

+ keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染
  + 它们有两个非常重要的属性
  + include - 字符串或正则表达，只有匹配的组件会被缓存
  + exclude - 字符串或正则表达式，任何匹配的组件都不会被缓存
  
+ router-view 也是一个组件，如果直接被包在 keep-alive 里面，所有路径匹配到的视图组件都会被缓存
+ router-view 也是一个组件，如果直接被包在 keep-alive 里面，所有路径匹配到的视图组件都会被缓存

```javascript
<keep-alive>
<router-view>
//所有路径匹配到的视图都会被缓存
</router-view>
</keep-alive>
```

## Promise

### 什么是Promise

+ ES6中一个非常重要和好用的特性就是Promise
+ Promise到底是做什么的呢？
+ 那什么时候我们会来处理异步事件呢？
  + 一种很常见的场景应该就是网络请求了。
  + 我们封装一个网络请求的函数，因为不能立即拿到结果，所以不能像简单的3+4=7一样将结果返回
  + 所以往往我们会传入另外一个函数，在数据请求成功时，将数据通过传入的函数回调出去
  + 如果只是一个简单的网络请求，那么这种方案不会给我们带来很大的麻烦

+ 当网络请求非常复杂时，就会出现回调地狱
  + Promise可以以一种非常优雅的方式来解决这个问题。
  
### 定时器的异步事件

+ 我们先来看看Promise最基本的语法
+ 这里，我们用一个定时器来模拟异步事件
  + 假设下面的data是从网络上1秒后请求的数据
  + console.log就是我们的处理方式
  
+ 这是我们过去的处理方式，我们将它换成Promise代码

```javascript
setTimeout(function(){
  let data = 'Hello world'
  console.log(content);
},1000)

//改成promise模式
new Promise((resolve,reject)=>{
  setTimeout(function() {
    resolve('hello world')
    reject('Error Data')
  },1000)
}).then(data=>{
  console.log(data);
}).catch(error=>{
  console.log(error);
})
```

+ new Promise很明显是创建一个Promise对象
+ 小括号中((resolve, reject) => {})也很明显就是一个函数，而且我们这里用的是之前刚刚学习过的箭头函数
  + 但是resolve, reject它们是什么呢？
  + 我们先知道一个事实：在创建Promise时，传入的这个箭头函数是固定的（一般我们都会这样写)
  + resolve和reject它们两个也是函数，通常情况下，我们会根据请求数据的成功和失败来决定调用哪一个
  
+ 成功还是失败？
  + 如果是成功的，那么通常我们会调用resolve(messsage)，这个时候，我们后续的then会被回调
  + 如果是失败的，那么通常我们会调用reject(error)，这个时候，我们后续的catch会被回调
  
+ 这就是Promise最基本的使用了

### promise的三种状态

+ 当我们开发中有异步操作时, 就可以给异步操作包装一个Promise
  + 当我们开发中有异步操作时, 就可以给异步操作包装一个Promise

+ 我们一起来看一下这三种状态
  + pending：等待状态，比如正在进行网络请求，或者定时器没有到时间
  + fulfill：满足状态，当我们主动回调了resolve时，就处于该状态，并且会回调.then()
  + reject：拒绝状态，当我们主动回调了reject时，就处于该状态，并且会回调.catch()

### Promise的链式调用

+ 我们在看Promise的流程图时，发现无论是then还是catch都可以返回一个Promise对象
+ 所以，我们的代码其实是可以进行链式调用的
+ 这里我们直接通过Promise包装了一下新的数据，将Promise对象返回了
  + Promise.resovle()：将数据包装成Promise对象，并且在内部回调resolve()函数
  + Promise.reject()：将数据包装成Promise对象，并且在内部回调reject()函数

```javascript
return new Promise(resolve => {
  resolve(res+'111')
})
//简写如下
return Promise.resolve(res+'111')
//继续简写
return res+'111'
```

## vuex

### 认识vuex

#### Vuex是做什么的？

+ 官方解释：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
  + 它采用 集中式存储管理 应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
  Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能
  
+ 状态管理到底是什么？
  + 状态管理模式、集中式存储管理这些名词听起来就非常高大上，让人捉摸不透
  + 其实，你可以简单的将其看成把需要多个组件共享的变量全部存储在一个对象里面
  + 然后，将这个对象放在顶层的Vue实例中，让其他组件可以使用
  + 那么，多个组件是不是就可以共享这个对象中的所有变量属性了呢
 
 + 等等，如果是这样的话，为什么官方还要专门出一个插件Vuex呢？难道我们不能自己封装一个对象来管理吗？
  + 当然可以，只是我们要先想想VueJS带给我们最大的便利是什么呢？没错，就是响应式
  如果你自己封装实现一个对象能不能保证它里面所有的属性做到响应式呢？当然也可以，只是自己封装可能稍微麻烦一些
  + 不用怀疑，Vuex就是为了提供这样一个在多个组件间共享状态的插件，用它就可以了

#### 管理什么状态呢?

+ 有什么状态时需要我们在多个组件间共享的呢？
  + 如果你做过大型开放，你一定遇到过多个状态，在多个界面间的共享问题
  + 比如用户的登录状态、用户名称、头像、地理位置信息等等
  + 比如商品的收藏、购物车中的物品等等
  + 些状态信息，我们都可以放在统一的地方，对它进行保存和管理，而且它们还是响应式的
  
#### 单界面的状态管理

+ 我们知道，要在单个组件中进行状态管理是一件非常简单的事情
  + State：不用多说，就是我们的状态。（你姑且可以当做就是data中的属性）
  + View：视图层，可以针对State的变化，显示不同的信息。（这个好理解吧？）
  + Actions：这里的Actions主要是用户的各种操作：点击、输入等等，会导致状态的改变。
  
#### 多界面状态管理

+ Vue已经帮我们做好了单个界面的状态管理，但是如果是多个界面呢？
  + Vue已经帮我们做好了单个界面的状态管理，但是如果是多个界面呢？
  + 不同界面的Actions都想修改同一个状态（Home.vue需要修改，Profile.vue也需要修改这个状态）
  
+ 也就是说对于某些状态(状态1/状态2/状态3)来说只属于我们某一个试图，但是也有一些状态(状态a/状态b/状态c)属于多个试图共同想要维护的
  + 也就是说对于某些状态(状态1/状态2/状态3)来说只属于我们某一个试图，但是也有一些状态(状态a/状态b/状态c)属于多个试图共同想要维护的
  + 但是状态a/状态b/状态c我们希望交给一个大管家来统一帮助我们管理
  + 没错，Vuex就是为我们提供这个大管家的工具
  
+ 全局单例模式（大管家）
  + 我们现在要做的就是将共享的状态抽取出来，交给我们的大管家，统一进行管理
  + 我们现在要做的就是将共享的状态抽取出来，交给我们的大管家，统一进行管理
  + 这就是Vuex背后的基本思想。  



### vuex的基本使用

+ 实现一下之前简单的案例，首先，我们需要在某个地方存放我们的Vuex代码
  + 这里，我们先创建一个文件夹store，并且在其中创建一个index.js文件
  
+ 其次，我们让所有的Vue组件都可以使用这个store对象
  + 来到main.js文件，导入store对象，并且放在new Vue中
  + 这样，在其他Vue组件中，我们就可以通过this.$store的方式，获取到这个store对象了
  
```javascript
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store=new Vuex.store({
  state:{
    count:0
  },
  mutations:{
    increment(state){
      state.count++
    },
    decrement(state){
      state.count--
    }
  }
})
//导出store对象
export  default store

//引入store对象
import Vue from 'vue'
import App from './App'
import store from './store'

new Vue({
el:'#app',
store,
render:h=>h(app)
})

//在app这个组件中使用
<template>
    <div id="app">
        <p>{{count}}</p>
        <button @click="increment"></button>
        <button @click="decrement"></button>
    </div>
</template>

<script>
  export default {
    name: "App",
    components:{

    },
    computed:{
      count:function () {
        return this.$store.state.count
      }
    },
    methods:{
      increment:function () {
        this.$store.commit('increment')
      },
      decrement:function () {
        this.$store.cmomit('decrement')
      }
    }
  }
</script>

<style scoped>

</style>
```

+ 我们来对使用步骤，做一个简单的小节
  1. 提取出一个公共的store对象，用于保存在多个组件中共享的状态
  2. 将store对象放置在new Vue对象中，这样可以保证在所有的组件中都可以使用到
  3. 在其他组件中使用store对象中保存的状态即可
  
+ 通过this.$store.state.属性的方式来访问状态
+ 通过this.$store.commit('mutation中方法')来修改状态
+ 注意事项
  + 我们通过提交mutation的方式，而非直接改变store.state.count
  + 这是因为Vuex可以更明确的追踪状态的变化，所以不要直接改变store.state.count的值


### vuex的核心改变

1. State
2. Getters
3. Mutation
4. Action
5. Module

### State

+ Vuex提出使用单一状态树, 什么是单一状态树呢
  + 英文名称是Single Source of Truth，也可以翻译成单一数据源
  
+ 它是什么呢？我们来看一个生活中的例子
  + 如果你的状态信息是保存到多个Store对象中的，那么之后的管理和维护等等都会变得特别困难
  + 所以Vuex也使用了单一状态树来管理应用层级的全部状态
  + 一状态树能够让我们最直接的方式找到某个状态的片段，而且在之后的维护和调试过程中，也可以非常方便的管理和维护

### Gatters

+ 有时候，我们需要从store中获取一些state变异后的状态，比如下面的Store中
  + 获取学生年龄大于20的个数

### Mutation

### Action

### Module

### 项目结构

## axios

### 认识axios

+ 支持多种请求方式
  + axios(config)
  + axios.request(config)
  + axios.get(url[, config])
  + axios.delete(url[, config])
  + axios.head(url[, config])
  + axios.post(url[, data[, config]])
  + axios.put(url[, data[, config]])
  + axios.patch(url[, data[, config]])

### 发送基本请求

#### 发送get请求

```javascript
import axios from 'axios'


```

### axios创建实例

### axios拦截器