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

## Vue-cli

## Vue-router

## vuex
