# Vue组件传递的几种方式

## 1. props和emit

### 父组件向子组件传递
```javascript
//父组件
<template>
  <div>
      <son :user="user"><son>//前面的user是子组件调用的名称，后面是要传递过去的数据
  </div>
</template>

<script>
import son from '../son'
export default {
    name:'father',
    components: {
        son
    },
    data(){
        return {
            user:[1,2,3]
        }
    }
}
</script>
//子组件
<template>
  <div>
      <ul>
          <li v-for="item of son" :key="item"></li>
      </ul>
  </div>
</template>

<script>
export default {
    name:'son',
    props:{
        son:{
            type:Array,
            required: true
        }
    }
}
</script>

<style>

</style>
```

### 子组件向父组件传值
```javascript
//子组件方法
methods:{
    change(){
        this.$emit('changed','子组件传递给父组件的值')//自定义事件
    }
}
//父组件方法
<son v-on:changed="updata"></son>
methods(){
    updata(e){//声明函数并接受传过来的值
        //做对应的处理
    }
}
```

## 2. $attrs　/ $listeners
> $attrs　/ $listeners 组要作用域多层嵌套传递
> $attrs与 $listeners 是两个对象， $attrs 里存放的是父组件中绑定的非 Props 属性， $listeners里存放的是父组件中绑定的非原生事件。  
> inheritAttrs：false 没有用到的数据不会在DOM树上显示
```javaScript
// 父组件
<template>
  <div>
    <h2>111</h2>
    <child-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="111"
    ></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import("./childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
        //父组件中的数据
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue"
    };
  }
};
</script>

//子组件
<template class="border">
  <div>
    <p>foo: {{ foo }}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2>//这里子组件只用了一个foo，剩下的用v-bind="$attrs"继续向孙子组件传递
  </div>
</template>
<script>
const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    foo: String // foo作为props属性绑定,foo用props接收后，$attr中就没有这个
  },
  created() {
    console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "111" } foo已经被props接收了 ，所以这里没有了
  }
};
</script>

// 孙子组件
<template>
  <div class="border">
    <p>boo: {{ boo }}</p>
    <p>childCom2: {{ $attrs }}</p>
    <child-com3 v-bind="$attrs"></child-com3>//继续向下传递
  </div>
</template>
<script>
const childCom3 = () => import("./childCom3.vue");
export default {
  components: {
    childCom3
  },
  inheritAttrs: false,
  props: {
    boo: String//boo被孙子组件接受了
  },
  created() {
    console.log(this.$attrs); // {"coo": "CSS", "doo": "Vue", "title": "111" }这里就没有boo了
  }
};
</script>

//重孙组件
<template>
  <div class="border">
    <p>childCom3: {{ $attrs }}</p>//剩下的都被接收了，只剩下doo了
  </div>
</template>
<script>
export default {
  props: {
    coo: String,//coo与title被props接收了
    title: String
  }
};
</script>
//$attrs表示没有继承数据的对象，格式为{属性名：属性值}。$attrs 里存放的是父组件中绑定的非 Props 属性
//$listeners
<template>
    <div>
        <childcom :name="name" :age="age" :sex="sex" @testChangeName="changeName"></childcom>//父组件接收
    </div>
</template>
<script>
export default {
    'name':'test',
    props:[],
    data(){
        return {
            'name':'张三',
            'age':'30',
            'sex':'男'
        }
    },
    components:{
        'childcom':{
            props:['name'],
            template:`<div>
                <div>我是子组件   {{name}}</div>
                <grandcom v-bind="$attrs" v-on="$listeners"></grandcom>//儿子组件继续往上传递
            </div>`,
           
            components: {
                'grandcom':{
                    template:`<div>我是孙子组件-------<button @click="grandChangeName">改变名字</button></div>`,
                    methods:{
                        grandChangeName(){
                           this.$emit('testChangeName','kkkkkk')//孙子组件发布方法
                        }
                    }
                }
            }
        }
    },
    methods:{
        changeName(val){//改变数据
            this.name = val
        }
    }
}
</script>
```

### $parent / $children与 ref
+ ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
+ $parent / $children：访问父 / 子实例

```javascript
// component-a 子组件
export default {
  data () {
    return {
      title: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      window.alert('Hello');
    }
  }
}
// 父组件
<template>
  <component-a ref="comA"></component-a>
</template>
<script>
  export default {
    mounted () {
      const comA = this.$refs.comA;
      console.log(comA.title);  // Vue.js
      comA.sayHello();  // 弹窗
    }
  }
</script>





<template>
    <div class="parent">
        <Childone></Childone>
    </div>
</template>
 
<script>
import Childone from './childone'
export default {
    components:{
        Childone
    },
    data(){
        return {
            parentMsg:'这是父组件的数据',
        }
    }
}
</script>


//子组件
<template>
    <div class="child">
        <p style="color:red;">{{msgFromParent}}</p>
        <button @click="getParentMsg()">点击使用$refs获取父组件的数据</button>
    </div>
</template>
 
<script>
export default {
    data(){
        return {
            msgFromParent:''
        }
    },
    methods:{
        getParentMsg(){
            this.$parent.parentMsg="子组件中可以修改父组件的内容，这是通过子组件修改所得"
            this.msgFromParent=this.$parent.parentMsg;
        }
    }
}
</script>
```


### Bus总线
> 在组件中，可以使用$emit， $on， $off 分别来分发、监听、取消监听事件：

```javascript
//分发事件的组件

// ...
methods: {
  todo: function () {
    this.$bus.$emit('todoSth', params);  //params是传递的参数
    //...
  }
}

//监听的组件

// ...
created() {
  this.$bus.$on('todoSth', (params) => {  //获取传递的参数并进行操作
      //todo something
  })
},
// 最好在组件销毁前
// 清除事件监听
beforeDestroy () {
  this.$bus.$off('todoSth');
}


//如果需要监听多个组件，只需要更改 bus 的 eventName:

// ...
created() {
  this.$bus.$on('firstTodo', this.firstTodo);
  this.$bus.$on('secondTodo', this.secondTodo);
},
// 清除事件监听
beforeDestroy () {
  this.$bus.$off('firstTodo', this.firstTodo);
  this.$bus.$off('secondTodo', this.secondTodo);
},
```