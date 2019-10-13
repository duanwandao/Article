# Vue中生命周期
各个生命周期的作用

|生命周期|描述|
|:-:|:-:|:-:|
|beforeCreate|组件实例被创建之初，组件的属性生效之前|
|created|组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用|
|beforeMount|在挂载开始之前被调用：相关的 render 函数首次被调用|
|mounted|el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子|
|beforeUpdate|组件数据更新之前调用，发生在虚拟 DOM 打补丁之前|
|update|组件数据更新之后|
|activited|keep-alive 专属，组件被激活时调用|
|deadctivated|keep-alive 专属，组件被销毁时调用|
|beforeDestory|组件销毁前调用
|
|destoryed|组件销毁后调用|
|errorCaptured|当捕获一个来自子孙组件的错误时被调用|

## Vue 的父组件和子组件生命周期钩子函数执行顺序？
Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

加载渲染过程

父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

子组件更新过程

父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

父组件更新过程

父 beforeUpdate -> 父 updated

销毁过程

父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed  

## 在哪个生命周期内调用异步请求？
可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。但是本人推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：  
1. 能更快获取到服务端数据，减少页面 loading 时间
2. ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性

## 在什么阶段才能访问操作DOM
在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。