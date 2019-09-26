/**
 * 1.call和apply的区别是什么，那个性能更好一点？
 * 1. call和apply都是function原型上的方法，都可以让函数执行都是用来改变this指向的
 * 2. call的参数是一个个传递给函数 apply要求我们把传递给函数的参数以数组的形式直接传进来 
 * 3. bind不是直接执行函数，而是预先的处理this问题
 * 4. 指定了this指向，传递参数在三个及三个以内的时候，call和apply的性能差不多，如果传递参数超过三个以上，call的性能要比apply的性能好一点
 * 5. console.time('A')可以测试一段程序的执行的时间结束consoletimeEnd('A')
 */
let arr = [10, 20, 30]
fn.call(obj, 10, 20, 30)
//fn.call(obj,...arr)基于es6的展开运算符可以
fn.apply(obj, [10, 20, 30])

/**
 * 实现数字(5).add(3).minus(2) 使其输出结果为6
 */
~function () {
  //方法执行完都要返回Number这个类的实例，这样才能继续调用Number类原型中的方法（链式写法）
  //增加容错性 判断数字
  function check(n) {
    n = Number(n);
    return isNaN(n)?0:n
  }
  function add(n) {
    n=check(n)
    return this + n
  }
  function minus(n) {
    n=check(n)
    return this - n
  }
  // ['add','minus'].forEach(item=>{
  //   Number.prototype[item]= eval(item)
  // })
  Number.prototype.add = add
  Number.prototype.minus = minus
}()


/**
 * 箭头函数与普通函数（function）的区别是什么？构造函数（Function）可以使用new生成实例，那么箭头函数可以吗？为什么？
 */
/**
 * 箭头函数和普通函数的区别
 * 1. 箭头函数语法洪昂比普通函数更加简洁（es6中每一种函数都可以使用形参赋默认值和剩余运算符）
 * 2. 箭头函数中没有自己的this，它里面的this是继承函数所处的上下文的this（使用call、apply方式都无法改变this的指向）
 * ===>回调函数：把一个函数B作为实参传递给另一个函数A，函数A在执行的时候，可以把传递进来的函数B去执行(执行N次,可传值，可改变this，可以传递返回值)
 * 3. 箭头函数里面没有arguments类数组，只能基于...arg获取传递的参数（数组）
 * 4. 箭头函数不能被new执行（原因：箭头函数没有this也没有prototype）
 */

function each (arr,callBack){
  //callBack==>function(item,index){}
  for(var i = 0; i<arr.length; i++){
    // let item=arr[i]
    // let index=i
    let flag=callBack.call(arr,arr[i],i)
    //接受回调函数返回的结果，如果是false我们结束循环
    if (flaf === false ) {
      break
    }
  }
}
each([10,20,30,40],function  (item,index){
return false
})

/**思考题？ */
//each
let arr=[10,20,30,'AA',40],
obj={}
arr=arr.each(function(item,index){
//==>this==obj (each第二个参数不传，this是window)
if(isNaN(item)){
return false
}
return item*10//=>返回的结果是什么，就把数组中的结果替换成什么
},obj)
// arr=[100,200,300,'AA',40]



/**重写replace方法 */
let str='dylan2019dylan2020'
str=str.replace(/dylan/g,function(...arg){
//ARG中存储了每一次大正则匹配的信息和小分组匹配的信息
return '@'// ==>返回的是啥就把当前正则匹配的内容替换啥
})




/**
 * 如何把一个字符串的大小写取反（大写变小写，小写变大写）例如'aBc'变成'AbC'
 */
let str='dylan孟洋！哈哈哈*100'
