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
	~ function() {
		//方法执行完都要返回Number这个类的实例，这样才能继续调用Number类原型中的方法（链式写法）
		//增加容错性 判断数字
		function check(n) {
			n = Number(n);
			return isNaN(n) ? 0 : n
		}

		function add(n) {
			n = check(n)
			return this + n
		}

		function minus(n) {
			n = check(n)
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

function each(arr, callBack) {
	//callBack==>function(item,index){}
	for (var i = 0; i < arr.length; i++) {
		// let item=arr[i]
		// let index=i
		let flag = callBack.call(arr, arr[i], i)
		//接受回调函数返回的结果，如果是false我们结束循环
		if (flaf === false) {
			break
		}
	}
}
each([10, 20, 30, 40], function(item, index) {
	return false
})

/**思考题？ */
//each
let arr = [10, 20, 30, 'AA', 40],
	obj = {}
arr = arr.each(function(item, index) {
	//==>this==obj (each第二个参数不传，this是window)
	if (isNaN(item)) {
		return false
	}
	return item * 10 //=>返回的结果是什么，就把数组中的结果替换成什么
}, obj)
// arr=[100,200,300,'AA',40]



/**重写replace方法 */
let str = 'dylan2019dylan2020'
str = str.replace(/dylan/g, function(...arg) {
	//ARG中存储了每一次大正则匹配的信息和小分组匹配的信息
	return '@' // ==>返回的是啥就把当前正则匹配的内容替换啥
})




/**
 * 如何把一个字符串的大小写取反（大写变小写，小写变大写）例如'aBc'变成'AbC'
 */
let str = 'dylan孟洋！哈哈哈*100'
str = str.replace(/[a-zA-Z]/g, content => {
		//==> content是每一项正则匹配的结果
		//验证是否为大写：把字母转化为大写后看和之前的是否一样，如果一样，之前也是大写，在ASCII表中找到大写字母的取值范围判断
		// content.toUpperCase() === content
		// content.charCodeAt()>=65 && content.charCodeAt()<=90
		return content.toUpperCase() === content ? content.toLowerCase() : content.toUpperCase()
	})


	/**
	 * 实现一个字符串匹配算法，从字符串S中查找是否存在字符串T，若存在返回所在位置，不存在返回-1（不能使用jindexOf/includes等方法）
	 */
	~ function() {
		//循环原始字符串中的每一项，让每一项从当前位置向后截取T.length个字符，然后和T进行比较，如果不一样，继续循环，如果一样返回当前索引即可（循环结束）
		// function myIndexOf (T){
		// let lenT=T.length
		// let lenS=this.length  
		// res=-1
		// if(lenT>lenS) return -1
		// for(var i = 0; i<lenS-lenT+1; i++){
		// if(this.substr(i,lenT) === T){
		//   res=i
		//   break
		// }
		// }
		// return res
		// }
		/**
		 * 正则处理
		 */
		function myIndexOf(T) {
			let reg = new RegExp(T),
				res = reg.exec(this)
			return res === null ? -1 : res.index
		}
		String.prototype.myIndexOf = myIndexOf
	}()

let S = 'dklsajdskladylanjkdsjka',
	T = 'dylan'
console.log(S.myIndexOf(T))

/**
 * example1
 */
var a = {},
	b = '123',
	c = 123;
//a[100]与a['100']是一样的
// a['123']='b'
a[b] = 'b';
//a[123]='c' 这一步相当于把a['123']='b'改了
a[c] = 'c';
console.log(a[b]) //'c'

/**
 * example2
 */
var a = {},
	b = Symbol('123'),
	c = Symbol('123');
a[b] = 'b';
a[c] = 'c';
console.log(a[b]) //Symbol是es6中新增的数据类型， 它创建出来的值时唯一值

/*
 * example3
 * 1. 一个对象的属性名字不能是对象（遇到对象属性名会默认转化为字符串）
 * 2. 普通对象.toString ==>[object object]
 */
var a = {},
	b = {
		ley: '123'
	},
	c = {
		key: '456'
	}
a[b] = 'b';
a[c] = 'c';
console.log(a[b]) //c



/*
 * 在输入框中如何判断输入的是一个正确的网址例如：用户输入一个字符串，验证是否符合url网址格式
 */
let str = "http://www.zhufengpeixun.cn/?lx=1&from=wx#video"











/**
 * JavaScript-questions form github
 */
/**
 * 1.
 */
function sayHi() {
	console.log(name)
	console.log(age)
	var name = 'Lydia'
	let age = 21
}
sayHi()
//undefined and ReferenceError
/**
 * var关键字声明的变量会预解析，也就是变量提升，
 * 通过let 和const也会变量提升，但是不会初始化，在声明之前我们是不能访问的，这个行为被称为暂时性死区
 */

/*
 2.
 */
for (var i = 0; i < 3; i++) {
	setTimeout(() => console.log(i), 1)
}

for (let i = 0; i < 3; i++) {
	setTimeout(() => console.log(i), 1)
}
//3,3,3 and 0,1,2
/**
 * 异步操作，作用域
 */
/**
 * 3. 
 */
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2
  },
  perimeter: () => 2 * Math.PI * this.radius
}

shape.diameter()
shape.perimeter()

//20 and NaN
//普通函数中的this是指的是调用它的对象 箭头函数的this指向包裹他的常规函数作用域

/**
 * 4
 */

+true;
!"Lydia";

//1 and false

/**
 * 5.
 */
const bird = {
  size: 'small'
}

const mouse = {
  name: 'Mickey',
  small: true
}
/**
A: mouse.bird.size
B: mouse[bird.size]
C: mouse[bird["size"]]
D: All of them are valid
不能使用点语法
 */

let c = { greeting: 'Hey!' }
let d
d = c
c.greeting = 'Hello'
console.log(d.greeting)
/**
 * hello
 */

let a = 3
let b = new Number(3)
let c = 3

console.log(a == b)
console.log(a === b)
console.log(b === c)
/**
 * 用new Nunber创建的虽然看着像是一个数字但是实际上是一个对象
 */

class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor
    return this.newColor
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor
  }
}

const freddie = new Chameleon({ newColor: 'purple' })
freddie.colorChange('orange')
/**
 * 出错 static定义的是类的方法 实例并不能调用
 */

let greeting
greetign = {} // Typo!
console.log(greetign)
/**
 * 不加var、let 等声明变量的关键字 会在全局声明window.greetign = {}
 */

function bark() {
  console.log('Woof!')
}

bark.animal = 'dog'
/**
 * 函数也是一个对象，对象拥有属性，所以就可以设置和改变
 */

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}

console.log(member.getFullName());
/**
 * 报错
 * 不能直接给构造函数添加方法，如果想添加的话给原型添加prototype
 */

function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

const lydia = new Person('Lydia', 'Hallie')
const sarah = Person('Sarah', 'Smith')

console.log(lydia)
console.log(sarah)

/**
 * Person {firstName: "Lydia", lastName: "Hallie"} and undefined
 * 没有使用new关键字的时候 构造函数里面的this指向的是全局，意思就是在全局定义两个属性 但是和sarah没有关系  undefined
 */

/**
 * 事件传播的三个阶段是什么？
 * 捕获--> 目标--> 冒泡
 */

/**
 * 所有对象都有原型
 * 除了基本对象以外所有的对象都有原型
 */

function sum(a, b) {
  return a + b
}

sum(1, '2')

/**
 * '12'
 */


let number = 0
console.log(number++)//0
console.log(++number)//2
console.log(number)//2



function getPersonInfo(one, two, three) {
  console.log(one)
  console.log(two)
  console.log(three)
}

const person = 'Lydia'
const age = 21

getPersonInfo`${person} is ${age} years old`
/**
 * 使用模板字符串的时候，第一个参数总是除了变量以外的所有字符组成的字符串，剩下的参数是变量
 */

function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!')
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.')
  } else {
    console.log(`Hmm.. You don't have an age I guess`)
  }
}

checkAge({ age: 18 })
/**
 * 对象引用地址并不相同
 */

function getAge(...args) {
  console.log(typeof args)
}

getAge(21)

/**
 ...arg是一个数组 展开运算符 数组的typeof是'object'
 */

function getAge() {
  'use strict'
  age = 21
  console.log(age)
}

getAge()

/**
 * 严格模式下因为我们没有声明age这个变量所以抛出一个引用错误
 */

const sum = eval('10*10+5')

//105


var num = 8
var num = 10

console.log(num)//10

/**
 * 使用var声明的变量可以用相同的名称声明多个变量，然后将变量的值保存为最新的
 * 用let与const不能实现这一点，因为他们是有块级作用域的
 */

const obj = { 1: 'a', 2: 'b', 3: 'c' }
const set = new Set([1, 2, 3, 4, 5])

obj.hasOwnProperty('1')
obj.hasOwnProperty(1)
set.has('1')
set.has(1)

//true true false true




const obj = { a: 'one', b: 'two', a: 'three' }
console.log(obj)

//{ a: "three", b: "two" }



for (let i = 1; i < 5; i++) {
  if (i === 3) continue
  console.log(i)
}
//continue是跳过此次循环继续下一次循环  break是直接跳出循环

String.prototype.giveLydiaPizza = () => {
  return 'Just give Lydia pizza already!'
}

const name = 'Lydia'

name.giveLydiaPizza()
//在字符串原型上添加了一个方法所有的字符串都可以使用


const a = {}
const b = { key: 'b' }
const c = { key: 'c' }

a[b] = 123
a[c] = 456

console.log(a[b])