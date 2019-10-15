var x=1,
y=2;
function fn (x){
 y+=x;
 return function (z){
  console.log(z+(++x)+(--y))
 }
}
var f=fn(3);
f(4);
fn(5)(6)
f(7)




/**
 * new操作符做了哪些事情？
 * 1. 创建一个空对象
 * 2. 设置原型链
 * 3. 让this指向新创建的空对象，并且执行类的主体
 * 4. 判断返回值的类型，如果是值类型就返回新创建的对象，如果是引用类型，就返回这个引用类型的对象
 * //如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用
 */
/**
 * 
 * @param {*} obj 类
 * @param  {...any} args 剩余的参数
 */

function capyNew(obj,...args) {
    //1.创建一个空对象
     const newObj={};
     //2.让这个空对象的原型指向构造函数的prototype
     newObj.__proto=obj.prototype;
     //3.将obj的this改为新创建的这个对象
     let result=obj.apply(newObj,args)
     //4.判断类里面有返回值吗？返回值是对象吗?如果是的那那就返回类中的返回值，如果不是的话那就返回新创建的对象
     return typeof result === 'object' ? result : newObj
 }

//如果构造函数返回了一个“对象”，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象。（一般情况下构造函数不返回任何值，不过用户如果想覆盖这个返回值，可以自己选择返回一个普通对象来覆盖。当然，返回数组也会覆盖，因为数组也是对象。


//prototype继承

//父类
function A(x) {
    this.x=x
}
A.prototype.getX=function(){
    console.log(this.x)
}
//子类
function B(x) {
    this.y=y
}
//B的原型指向A的实例
B.prototype=new A()
B.prototype.getY = function(){
    console.log(this.y)
}
let b1=new B(100)
b1.y
b1.getX()
//子类的实例想用父类上的方法该怎么做？
b1.getX()





//call继承




//父类
function A(x) {
    this.x=x
}
A.prototype.getX=function(){
    console.log(this.x)
}
//子类
function B(y) {
    A.call(this,y)
    this.y=y
}

B.prototype.getY = function(){
    console.log(this.y)
}
let b1=new B(100)
b1.y
b1.getX()
//子类的实例想用父类上的方法该怎么做？
b1.getX()




//寄生组合继承

//父类
function A(x) {
    this.x=x
}
A.prototype.getX=function(){
    console.log(this.x)
}
//子类
function B(y) {
    A.call(this,y)
    this.y=y
}
//Object.create创建一个空对象，让空对象的__proto__指向A.prototype
B.prototype=Object.create(A.prototype)
B.prototype.constructor = B
B.prototype.getY = function(){
    console.log(this.y)
}
let b1=new B(100)
b1.y
b1.getX()
//子类的实例想用父类上的方法该怎么做？
b1.getX()




//实现Object.create
Object.create=function (obj) {
    function F(){

    }
    Fn.prototype=obj;
    return new Fn()
}



//es6中继承

class A {
    constructor(x){
        this.x=x
    }
    getX(){
        console.log(this.x)
    }
}

class B extends A {
    //子类只要继承父类，可以不写constructor，一旦写了就要在第一句话中协商super（）
    //不写constructor 浏览器会自动默认创建constructor（...arg）{}
    constructor(y) {
        //把父类当做普通方法执行，给方法传递参数，让方法中的this是子类的实例
        super()
        this.y=y
    }
    getY(){
        console.log(y)
    }
}




//自己实现发布订阅模式
let _sub=function(){
    //sub发布订阅类
    class Sub{
        constructor(){
            //创建一个事件池，用来存储后期需要执行的方法
            this.pond=[]
        }
        //向事件池中追加方法
        add(func) {
            //重复处理
            let flag=this.pond.some(itme=>{
                return item === func
            })
            !flag?this.pond.push(func):null
        }
        //从事件池中移除方法
        remove(func) {
            let pond =this.pond
            for(let i=0;i<pond.length;i++){
                let item =pond[i]
                if (item === func) {
                    //移除（顺序不能变只能用splice）
                    //这样写会导致数组塌陷的问题，我们不能真的移除，只能把当前项赋值为null
                    // pond.splice(i,1)
                    pond[i]=null
                    break
                }
            }
        }
        //通知事件池中的方法，按照顺序依次执行
        fire(...args){
            let pond=this.pond
            for(let i=0;i<pond.length; i++){
                let item=pond[i]
                if (typeof item !== 'function') {
                    //此时再删除
                    pond.splice(i,1)
                    i--
                    continue
                }
                item.call(this,...args)
            }
        }
    }
    return function subscribe(){
        return new Sub()
    }
}()
let s1=_sub()




for(var i=0;i<10;i++){
    (function (num){
        setTimeout(function(){
            console.log(num)
        },10)
    })(i)
}





/**
 * apply方法的实现
 * 
 */


/**
 * bind方法的实现
 * bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。
 * 特点：
 * 1. 返回一个函数
   2. 可以传入参数
 */
//返回函数的实现
var foo={
	value:1
}
function bar(){
	console.log(this.value);
}

var bindFoo=bar.bind(foo)
bindFoo()//1

//根据此我们可以得出
Function.prototype.myBind=function(context){
	var self=this
	return function(){
	    //之所以 return self.apply(context)，是考虑到绑定函数可能是有返回值的
		return self.apply(context)
	}
}
/**
 * 在bind的时候可以传递参数，在执行bind返回的函数的时候也是可以传递参数的
 */

//第二版传参处理

Function.prototype.bind2=function (context) {
    var selt=this
    var args=Array.prototype.slice.call(arguments,1)
    
    return function () {
        var bindArgs=Array.prototype.slice.call(arguments)
        return self.apply(context,args.concat(bindArgs))
    }
}

//构造函数效果的模拟实现
/**
 * 完成了这两点，最难的部分到啦！因为 bind 还有一个特点，就是：一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数
 * 也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效
 */
//第三版
Function.prototype.bind3=function (context) {
    var self=this
    var args=Array.prototype.slice.call(arguments,1)
    
    var fbound=function () {
        var bindArgs=Array.prototype.slice.call(arguments)
        // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fbound?this:context,args.concat(bindArgs))
    }
}

//构造函数效果的优化实现
// 第四版
Function.prototype.bind4 = function (context) {
    
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    
    var fNOP = function () {};
    
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}


//最终代码
Function.prototype.bind5 = function (context) {
    
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    
    var fNOP = function () {};
    
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}




let p1=new Promise(resolve=>{
	setTimeout(()=>{
		resolve('p1')
	},1000)
})
let p1=new Promise(resolve=>{
	setTimeout(()=>{
		resolve('p2')
	},2000)
})

Promise.race([p1,p2]).then(value=>{
	console.log(value);
})