<!--<template>
  <div>
      <son :user="user"><son>
  </div>
</template>--> 

/* <script>
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
</script> */

/* <style>

</style> */


<!--
<template>
  <div>
      <ul>
          <li v-for="item of son" :key="item"></li>
      </ul>
  </div>
</template> -->

/* <script>
export default {
    name:'son',
    props:{
        son:{
            type:Array,
            required: true
        }
    }
}
</script> */

/* <style>

</style> */



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
    console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "111" }
  }
};
</script>

// 孙子组件
<template>
  <div class="border">
    <p>boo: {{ boo }}</p>
    <p>childCom2: {{ $attrs }}</p>
    <child-com3 v-bind="$attrs"></child-com3>
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
    boo: String
  },
  created() {
    console.log(this.$attrs); // {"coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  }
};
</script>