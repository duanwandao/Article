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




