function f(ary) {
  ary[0]=ary[2]
}
function bar(a,b,c) {
  c=10
  f(arguments)
  return a+b+c
}
bar(1,1,1)





/*
* call做了什么？
* 将函数设为对象的属性
* 执行，删除这个属性
* 指定this到函数并传入给定参数执行函数
* 如果不穿参数，默认指向window
*
* */

  Function.prototype.myCall=function (obj,...args) {
    //判断传过来的对象 如果为空则指向window
    obj=obj || window
    //将调用call方法的函数绑定到传入的对象中的键值对中
    obj.fn=this
    //执行调用call方法的函数并且将返回值保存下来
    const result=obj.fn(...args)
    //删除这个属性
    delete obj.fn
    //将返回值返回出去
    return result
  }

  function consoleLog() {
    console.log('输出'+this.value)
  }
  let demo={
    value:'dylan'
  }
  consoleLog.myCall(demo)//输出dylan

  /*
  * 另一个问题：
  * 为什么一个call输出1 两个call输出2呢？
 */
function fn1(){
    console.log(1);
}
function fn2(){
    console.log(2);
}
fn1.call(fn2);     //输出 1
fn1.call.call(fn2);  //输出 2
  /**
   * 第一个fn1.call(fn2);执行结合上面我们自己实现的call走一下步骤：
   * 1.传入进来的fn2是个函数不为空
   * 2. fn2.fn=fn1
   * 3. fn1执行
   * 4. 删除fn2.fn
   * 5.返回fn1执行的返回值
   *
   * 第二个fn1.call.call(fn2);执行，执行之前先解决几个难点
	 * 1. fn1.call指的是什么？
	 * 当前实力（函数fn1）通过原型链的查找机制，找到Function.prototype上的call方法
	 * arr.slice==>...原型上的slice
	 * arr.__proto__.slice===>arr通过原型__proto__直接找到Array.prototype上面的slice
	 * 
	 * fn1.call ==>fn1.__proto__.call找到Function.prototype.call方法
	 * 
	 * 2.fn1.call()加个小括号指的是什么？
	 * 把找到的call方法执行
	 * 加小括号是函数执行  也就是指的是Function.prototype.call方法执行
	 * 
	 * 3. fn1.call.call(fn2);执行
	 * 3.1 去Function的原型上找到call方法，让这个方法执行call中的this是fn1.call
	 * 3.2 第一个参数是fn2(把fn1.call中的this变为fn2,在让fn1.call执行)==>fn1.call()
	 * 3.3 fn1.call执行(没有传参)：先找到原型上的call，让他执行，现在的this就是fn2
	*  3.4 让fn2中的this变为undefined，因为执行fn1.call没有传参 并执行fn2
	 * 
	 * 
	 * 
	 * 4.call方法执行的时候，内部处理了一些事情
		* 	首先把要操作的函数中的this变为call方法第一个传递的实参值
		* 	把call方法第二个及第二个以后的实参获取到
		* 	把要操作的函数执行，并且把第二个及以后传递进来的实参传递给操作的函数
		
		5. 每一次call执行，都有两件事情要做   
				1. 改变call函数中的this
				2. 执行this
   */

	
function myCall1(){
	let context =argument[0]
	content= content || window
	context.fn=this
	let arr=[]
	for ([let i=1;i<argument.length;i++]) {
		arr.push('arguments['+i+']')
	}
	var rusult=eval('context.fn('+arr+')')   
	delete context.fn
	return result
}


function fn (a,b){
	return a+b
}
fn.a=1

/**
 * apply方法和call方法一样只是传入的参数不一样
 */
Function.prototype.myApply=function(obj,arr){
	obj=obj || window
	obj.fn=this
	let result=null;
	if(!arr){
		result=obj.fn()
	}else{
		var ary=[]
		for (var i=0;i<arr.length;i++) {
			
		}
	}
	delete obj.fn
	return result
}