# 数据劫持+发布订阅模式

## 原理
Vue数据双向绑定通过‘数据劫持’ + 订阅发布模式实现

## 数据劫持
指的是在访问或者修改对象的某个属性时，通过一段代码拦截这个行为，进行额外的操作或者修改返回结果  

典型的操作有：
1. Object.defineProperty()
2. es6中的Proxy对象

## 发布订阅模式  
义：对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知  
订阅发布模式中事件统一由处理中心处理，订阅者发布者互不干扰。  
优点：实现更多的控制，做权限处理，节流控制之类，例如：发布了很多消息，但是不是所有订阅者都要接收

```javascript
//实现一个发布订阅
let event = {
  clientList: {}, // 订阅事件列表
  // 订阅
  on(key, fn){
    // 如果这个事件没有被订阅，那么创建一个列表用来存放事件
    if(!this.clientList[key]) {
      this.clientList[key] = []
    }
    // 将事件放入已有的事件列表中
    this.clientList[key].push(fn);
  },
  // 发布
  trigger(type, args){
    let fns = this.clientList[type] // 拿到这个事件的所有监听
    if(!fns || fns.length === 0){  // 如果没有这条消息的订阅者
      return false
    }
    // 如果存在这个事件的订阅，那么遍历事件列表，触发对应监听
    fns.forEach(fn => {
      // 可以在此处添加过滤等处理
      fn(args)
    })
  }
}
```