# promise

## 1. promise是做什么？
1. 主要用于异步计算
2. 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
3. 可以在对象之间传递和操作promise，帮助我们处理队列

## 2. 为什么要有promise
处理异步操作

>异步：则是将耗时很长的A交付的工作交给系统之后，就去继续做B交付的工作，。等到系统完成了前面的工作之后，再通过回调或者事件，继续做A剩下的工作。AB工作的完成顺序，和交付他们的时间顺序无关，所以叫“异步”。

## 3. 异步操作的常见语法
1. 事件监听
```javascript
document.getElementById('#start').addEventListener('click', start, false);
function start() {
  // 响应事件，进行相应的操作
}
// jquery on 监听
$('#start').on('click', start)
```
2. 回调函数

```javascript
// 比较常见的有ajax
$.ajax('http://www.wyunfei.com/', {
 success (res) {
   // 这里可以监听res返回的数据做回调逻辑的处理
 }
})

// 或者在页面加载完毕后回调
$(function() {
 // 页面结构加载完成，做回调逻辑处理
})
```

3. 异步回调的问题

+ 之前处理异步是通过纯粹的回调函数的形式进行处理
+ 很容易进入到回调地狱中，剥夺了函数return的能力
+ 问题可以解决，但是难以读懂，维护困难
+ 稍有不慎就会踏入回调地狱 - 嵌套层次深，不好维护

## 4. promise的出现
+ promise是一个对象，对象和函数的区别就是对象可以保存状态，函数不可以（闭包除外）
+ 并未剥夺函数return的能力，因此无需层层传递callback，进行回调获取数据
+ 代码风格，容易理解，便于维护
+ 多个异步等待合并便于解决

## 5. promise详解

```javascript
new Promise(
  function (resolve, reject) {
    // 一段耗时的异步操作
    resolve('成功') // 数据处理完成
    // reject('失败') // 数据处理出错
  }
).then(
  (res) => {console.log(res)},  // 成功
  (err) => {console.log(err)} // 失败
)
```
+ resolve作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
+ eject作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去
+ promise有三个状态

1. pending[待定]初始状态
2. fulfilled[实现]操作成功
3. rejected[被否决]操作失败

+ 当promise状态发生改变，就会触发then()里的响应函数处理后续步骤
+ promise状态一经改变，不会再变
+ Promise对象的状态改变，只有两种可能：
  + 从pending变为fulfilled
  + 从pending变为rejected

示例：
```javascript
new Promise(resolve => {
  setTimeout(() => {
    resolve('hello')
  }, 2000)
}).then(res => {
  console.log(res)
})
```

分两次执行：
```javascript
new Promise(resolve => {
    setTimeout(() => {
      resolve('hello')
    }, 2000)
  }).then(val => {
    console.log(val) //  参数val = 'hello'
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('world')
      }, 2000)
    })
  }).then(val => {
    console.log(val) // 参数val = 'world'
  })
```
promise之后的then：
```javascript
let pro = new Promise(resolve => {
   setTimeout(() => {
     resolve('hello world')
   }, 2000)
 })
 setTimeout(() => {
   pro.then(value => {
   console.log(value) // hello world
 })
 }, 2000)
```

> promise作为队列最为重要的特性，我们在任何一个地方生成了一个promise队列之后，我们可以把他作为一个变量传递到其他地方。  

## 6. then()
1. 接收两个函数作为参数，分别代表fulfilled（成功）和rejected（失败）
2. then()返回一个新的Promise实例，所以它可以链式调用
3. 当前面的Promise状态改变时，.then()根据其最终状态，选择特定的状态响应函数执行
4. 状态响应函数可以返回新的promise，或其他值，不返回值也可以我们可以认为它返回了一个null；
5. 如果返回新的promise，那么下一级.then()会在新的promise状态改变之后执行
6. 如果返回其他任何值，则会立即执行下一级.then()

## 7. .then()里面有.then()的情况
1. 因为.then()返回的还是Promise实例
2. 会等里面的then()执行完，再执行外面的

```javascript
new Promise(resolve=>{
			console.log('step 1')
			setTimeout(()=>{
				resolve(100)
			},1000)
		}).then((value)=>{
			return new Promise(resolve => {
				console.log('step 2')
				setTimeout(()=>{
					resolve(200)
				},1000)
			})
		}).then((value) => {
			console.log('step 3')
			return value
		}).then((value) => {
			console.log('step 4')
			return value
		}).then((value) => {
			console.log('step 5')
			console.log(value)
		})
```

## 8. 错误处理

Promise会自动捕获内部异常，并交给rejected响应函数处理  
第一种：
```javascript
new Promise(resolve=>{
			setTimeout(()=>{
				throw new Error('bye')
			},1000)
		}).then(val=>{
			console.log(val)
		}).catch(err => {
			console.log('error',error)
		})
    //Uncaught Error: bye at 01.html:36

//第二种
new Promise(function(resolve, reject) {
			setTimeout(() => {
				reject('bye')
			}, 1000)
		}).then(()=>{
			console.log(val)
		},(err)=>{
			console.log('error:'+err)
		})
		//error:bye
```
+ 错误处理两种做法
  + 第一种：reject('错误信息').then(() => {}, () => {错误处理逻辑})
  + 第二种：throw new Error('错误信息').catch( () => {错误处理逻辑})
  + 推荐使用第二种方式，更加清晰好读，并且可以捕获前面所有的错误（可以捕获N个then回调错误）

## 9. Promise.all() 批量执行
+ Promise.all([p1, p2, p3])用于将多个promise实例，包装成一个新的Promise实例，返回的实例就是普通的promise
+ 它接收一个数组作为参数
+ 数组里可以是Promise对象，也可以是别的值，只有Promise会等待状态改变
+ 当所有的子Promise都完成，该Promise完成，返回值是全部值得数组
+ 有任何一个失败，该Promise失败，返回值是第一个失败的子Promise结果

```javascript
//切菜
		function cutUp() {
			console.log('开始切菜')
			var p=new Promise(function(resolve, reject) {
				setTimeout(() => {
					console.log('切菜完毕')
					resolve('切好的菜')
				}, 1000);
			})
			return p
		}
		//烧水
		function boil(params) {
			console.log('开始烧水')
			var p=new Promise(function(resolve, reject) {
				setTimeout(() => {
					console.log('烧水完毕')
					resolve('烧好的水')
				}, 1000);
			})
			return p
		}
		//汇总，切好菜 烧好水才做下一步
		Promise.all([cutUp(),boil()])
		.then(results => {
			console.log('准备工作完毕')
			console.log(results)
		})
		//开始切菜
		//开始烧水
		//切菜完毕
		//烧水完毕
		//准备工作完毕
		// ["切好的菜", "烧好的水"]
```

## 10. Promise.race() 
> 类似于Promise.all() ，区别在于它有任意一个完成就算完成  
```javascript
let p1=new Promise(resolve=>{
		setTimeout(()=>{
			resolve('p1')
		},1000)
	})
	let p2=new Promise(resolve=>{
		setTimeout(()=>{
			resolve('p2')
		},500)
	})
	
	Promise.race([p1,p2]).then(value=>{
		console.log(value);//p2
	})
```

实战：
```javascript

```
