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
~ function () {
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
each([10, 20, 30, 40], function (item, index) {
	return false
})

/**思考题？ */
//each
let arr = [10, 20, 30, 'AA', 40],
	obj = {}
arr = arr.each(function (item, index) {
	//==>this==obj (each第二个参数不传，this是window)
	if (isNaN(item)) {
		return false
	}
	return item * 10 //=>返回的结果是什么，就把数组中的结果替换成什么
}, obj)
// arr=[100,200,300,'AA',40]



/**重写replace方法 */
let str = 'dylan2019dylan2020'
str = str.replace(/dylan/g, function (...arg) {
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
~ function () {
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
let reg=/^((http|https|ftp):\/\/)?(([\w-]+\.)+[a-z0-9]+)((\/[^/]*)+)?(\?[^#]+)?(#.+)?$/i;
//url格式
//1. 协议：// http/https/ftp
//2. 域名 
//www.xxx.xx
//xxx.xx
//xxx.xxx.xx.xxx.xxx
//3. 请求路径
// /index.html
//4. 问号传参
//？xxx=xxx&xxx=xxx
//5. 哈希值
// #xxx

function Foo (){
Foo.a=function  (){
console.log(1)
}
this.a=function  (){
console.log(2)
}
}
//把Foo当做类，在原型上设置共有方法
Foo.prototype.a = function(){
	console.log(3)
}
//把Foo当做普通对象设置私有的属性方法
Foo.a=function  (){
console.log(4)
}
Foo.a()//4
let obj=new Foo()
obj.a()//2
Foo.a()//1

/**
 * 编写代码实现图片懒加载
 * 为什么做图片的懒加载？
 * 1. 前端性能优化的重要方案，通过图片或者数据的延时加载，可以加快页面的渲染速度
 * 2. 只有滑动到某个区域，我们才加载真实的图片，这样也可以节省加载的流量
 */

/**
 * 编写一条正则，用来验证此规则，一个6-16位的字符串，必须同时包含有大小写字母和数字
 */


/**
 * 实现一个$attr(name,value)遍历
 * 属性为name
 * 值为value的元素集合
 */
let arr=$attr('class','box')//获取页面中所有class为box的元素


















































































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

	+ true;
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

console.log(a[b])//456
/**
 * 对象的键会被自动的转化为字符串，当字符串为一个对象的时候，会变为"[object Object]"
 */


const foo = () => console.log('First')
const bar = () => setTimeout(() => console.log('Second'))
const baz = () => console.log('Third')

bar()
foo()
baz()
/**
 * 虽然bar()先执行但是有一个定时器所以是最后执行的
 */

/**
 * 当点击按钮的时候event.target是什么
 */
//  <div onclick="console.log('first div')">
//   <div onclick="console.log('second div')">
//     <button onclick="console.log('button')">
//       Click!
//     </button>
//   </div>
// </div>
/**
 * event.target是导致事件的最深嵌套的元素
 */

const person = { name: 'Lydia' }

function sayHi(age) {
	console.log(`${this.name} is ${age}`)
}

sayHi.call(person, 21)
sayHi.bind(person, 21)
/**
 * Lydia is 21 function
 * 用着两种方法，都可以传递我们希望传递的this关键字引用的对象，但是call是立即执行的 bind返回函数的副本，但是带有绑定的上下文，它不是立即执行的
 */

function sayHi() {
	return (() => 0)()
}

typeof sayHi()//'number'
/**
 * sayHi方法返回的是立即执行函数的返回值，此时执行函数返回值是0
 * 只有7种内置类型：null，undefined，boolean，number，string，object 和 symbol。 function 不是一种类型，函数是对象，它的类型是object
 */

//下面那些值是false
0
new Number(0)
	('')
	(' ')
new Boolean(false)
undefined

//0 ('')空字符串并且长度为0是false new出来的都算是一个对象


console.log(typeof typeof 1)
//'string'



const numbers = [1, 2, 3]
numbers[10] = 11
console.log(numbers)
	//[1, 2, 3, 7 x empty, 11]
	/**
	 * 当为数组设置超过数组长度的值的时候，js会创建名为 "empty slots"的东西，它的值是undefined
	 */

	(() => {
		let x, y
		try {
			throw new Error()
		} catch (x) {
			(x = 1), (y = 2)
			console.log(x)
		}
		console.log(x)
		console.log(y)
	})()

//1 undefined 2


[[0, 1], [2, 3]].reduce(
	(acc, cur) => {
		return acc.concat(cur)
	},
	[1, 2]
)
/**
 * [1, 2]是初始值。初始值将会作为首次调用时第一个参数 acc 的值。
 * 在第一次执行时， acc 的值是 [1, 2]， cur 的值是 [0, 1]。
 * 合并它们，结果为 [1, 2, 0, 1]。 
 * 第二次执行， acc 的值是 [1, 2, 0, 1]， cur 的值是 [2, 3]。
 * 合并它们，最终结果为 [1, 2, 0, 1, 2, 3]
 */

!!null
!!''
!!1

/**
 * null 是 falsy。 !null 的值是 true。 !true 的值是 false。
 * "" 是 falsy。 !"" 的值是 true。 !true 的值是 false。
 * 1 是 truthy。 !1 的值是 false。 !false 的值是 true。
 */

setInterval(() => console.log('Hi'), 1000)


/**
 * setInterval 返回一个唯一的 id。此 id 可被用于 clearInterval 函数来取消定时。
 */

function* generator(i) {
	yield i;
	yield i * 2;
}

const gen = generator(10);
console.log(gen.next().value);
console.log(gen.next().value);

// 10 20



const firstPromise = new Promise((res, rej) => {
	setTimeout(res, 500, "one");
});

const secondPromise = new Promise((res, rej) => {
	setTimeout(res, 100, "two");
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));

//two
/**
 * 当我们向Promise.race方法中传入多个Promise时，会进行优先解析。
 * 在这个例子中，我们用setTimeout给firstPromise和secondPromise分别设定了500ms和100ms的定时器。
 * 这意味着secondPromise会首先解析出字符串two。那么此时res参数即为two，是为输出结果。
 */


let person = { name: "Lydia" };
const members = [person];
person = null;

console.log(members);

//[{ name: "Lydia" }]



const person = {
	name: "Lydia",
	age: 21
};

for (const item in person) {
	console.log(item);
}

/**
 * 在for-in循环中,我们可以通过对象的key来进行迭代,也就是这里的name和age。
 * 在底层，对象的key都是字符串（如果他们不是Symbol的话）。
 * 在每次循环中，我们将item设定为当前遍历到的key
 * 所以一开始，item是name，之后 item输出的则是age。
 */


console.log(3 + 4 + "5");


//'75'



const num = parseInt("7*6", 10);
/**
 * 只返回了字符串中第一个字母. 设定了 进制 后 (也就是第二个参数，指定需要解析的数字是什么进制: 十进制、十六机制、八进制、二进制等等……),parseInt 检查字符串中的字符是否合法. 一旦遇到一个在指定进制中不合法的字符后，立即停止解析并且忽略后面所有的字符。
 */

[1, 2, 3].map(num => {
	if (typeof num === "number") return;
	return num * 2;
});

//[undefined, undefined, undefined]
/**
 * 对数组进行映射的时候,num就是当前循环到的元素. 在这个例子中，所有的映射都是number类型，所以if中的判断typeof num === "number"结果都是true.map函数创建了新数组并且将函数的返回值插入数组。

但是，没有任何值返回。当函数没有返回任何值时，即默认返回undefined.对数组中的每一个元素来说，函数块都得到了这个返回值，所以结果中每一个元素都是undefined.
 */


function getInfo(member, year) {
	member.name = "Lydia";
	year = "1998";
}

const person = { name: "Sarah" };
const birthYear = "1997";

getInfo(person, birthYear);

console.log(person, birthYear);

/**
 * { name: "Lydia" }, "1997"
 */

/**
 * 普通参数都是 值 传递的，而对象则不同，是 引用 传递。所以说，birthYear是值传递，因为他是个字符串而不是对象。当我们对参数进行值传递时，会创建一份该值的 复制 。（可以参考问题46）

变量birthYear有一个对"1997"的引用，而传入的参数也有一个对"1997"的引用，但二者的引用并不相同。当我们通过给 year赋值"1998"来更新year的值的时候我们只是更新了year（的引用）。此时birthYear仍然是"1997".

而person是个对象。参数member引用与之 相同的 对象。当我们修改member所引用对象的属性时,person的相应属性也被修改了,因为他们引用了相同的对象. person的 name属性也变成了 "Lydia".
 */

function greeting() {
	throw "Hello world!";
}

function sayHi() {
	try {
		const data = greeting();
		console.log("It worked!", data);
	} catch (e) {
		console.log("Oh no an error!", e);
	}
}
sayHi();

/**
 * 通过throw语句，我么可以创建自定义错误。 而通过它，我们可以抛出异常。异常可以是一个字符串, 一个 数字, 一个 布尔类型 或者是一个 对象。在本例中，我们的异常是字符串'Hello world'.

通过 catch语句，我们可以设定当try语句块中抛出异常后应该做什么处理。在本例中抛出的异常是字符串'Hello world'. e就是这个字符串，因此被输出。最终结果就是'Oh an error: Hello world'.
 */


function Car() {
	this.make = "Lamborghini";
	return { make: "Maserati" };
}

const myCar = new Car();
console.log(myCar.make);

//"Maserati"


(() => {
	let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);

//"undefined", "number"
/**
 * let x = y = 10; 是下面这个表达式的缩写:

y = 10;
let x = y;
我们设定y等于10时,我们实际上增加了一个属性y给全局对象(浏览器里的window, Nodejs里的global)。在浏览器中， window.y等于10.

然后我们声明了变量x等于y,也是10.但变量是使用 let声明的，它只作用于 块级作用域, 仅在声明它的块中有效；就是案例中的立即调用表达式(IIFE)。使用typeof操作符时, 操作值 x没有被定义：因为我们在x声明块的外部，无法调用它。这就意味着x未定义。未分配或是未声明的变量类型为"undefined". console.log(typeof x)返回"undefined".

而我们创建了全局变量y，并且设定y等于10.这个值在我们的代码各处都访问的到。 y已经被定义了，而且有一个"number"类型的值。 console.log(typeof y)返回"number".
 */


class Dog {
	constructor(name) {
		this.name = name;
	}
}

Dog.prototype.bark = function () {
	console.log(`Woof I am ${this.name}`);
};

const pet = new Dog("Mara");

pet.bark();

delete Dog.prototype.bark;

pet.bark();

/**
 * 我们可以用delete关键字删除对象的属性，对原型也是适用的。删除了原型的属性后，该属性在原型链上就不可用了。在本例中，函数bark在执行了delete Dog.prototype.bark后不可用, 然而后面的代码还在调用它。

当我们尝试调用一个不存在的函数时TypeError异常会被抛出。在本例中就是 TypeError: pet.bark is not a function，因为pet.bark是undefined.
 */

const set = new Set([1, 1, 2, 3, 4]);

console.log(set);
//{1, 2, 3, 4}

// counter.js
let counter = 10;
export default counter;
// index.js
import myCounter from "./counter";

myCounter += 1;

console.log(myCounter);
//引入的模块是 只读 的: 你不能修改引入的模块。只有导出他们的模块才能修改其值。

const name = "Lydia";
age = 21;

console.log(delete name);
console.log(delete age);

/**
 * delete操作符返回一个布尔值： true指删除成功，否则返回false. 但是通过 var, const 或 let 关键字声明的变量无法用 delete 操作符来删除。

name变量由const关键字声明，所以删除不成功:返回 false. 而我们设定age等于21时,我们实际上添加了一个名为age的属性给全局对象。对象中的属性是可以删除的，全局对象也是如此，所以delete age返回true.
 */

const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);
// 1
/**
 * 我们可以通过解构赋值来解析来自对象的数组或属性的值
 */

const user = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user };

console.log(admin);
// { admin: true, name: "Lydia", age: 21 }
/**
 * 扩展运算符...为对象的组合提供了可能。你可以复制对象中的键值对，然后把它们加到另一个对象里去。在本例中，我们复制了user对象键值对，然后把它们加入到admin对象中。admin对象就拥有了这些键值对，所以结果为{ admin: true, name: "Lydia", age: 21 }.
 */


const person = { name: "Lydia" };

Object.defineProperty(person, "age", { value: 21 });

console.log(person);
console.log(Object.keys(person));
//{ name: "Lydia", age: 21 }, ["name"]
/**
 * 通过defineProperty方法，我们可以给对象添加一个新属性，或者修改已经存在的属性。而我们使用defineProperty方法给对象添加了一个属性之后，属性默认为 不可枚举(not enumerable). Object.keys方法仅返回对象中 可枚举(enumerable) 的属性，因此只剩下了"name".

用defineProperty方法添加的属性默认不可变。你可以通过writable, configurable 和 enumerable属性来改变这一行为。这样的话， 相比于自己添加的属性，defineProperty方法添加的属性有了更多的控制权。
 */

const settings = {
	username: "lydiahallie",
	level: 19,
	health: 90
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);
//"{"level":19, "health":90}"
/**
 * JSON.stringify的第二个参数是 替代者(replacer). 替代者(replacer)可以是个函数或数组，用以控制哪些值如何被转换为字符串。

如果替代者(replacer)是个 数组 ，那么就只有包含在数组中的属性将会被转化为字符串。在本例中，只有名为"level" 和 "health" 的属性被包括进来， "username"则被排除在外。 data 就等于 "{"level":19, "health":90}".

而如果替代者(replacer)是个 函数，这个函数将被对象的每个属性都调用一遍。 函数返回的值会成为这个属性的值，最终体现在转化后的JSON字符串中（译者注：Chrome下，经过实验，如果所有属性均返回同一个值的时候有异常，会直接将返回值作为结果输出而不会输出JSON字符串），而如果返回值为undefined，则该属性会被排除在外。
 */



let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = number => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);
//10, 10
/**
 * 一元操作符 ++ 先返回 操作值, 再累加 操作值。num1的值是10, 因为increaseNumber函数首先返回num的值，也就是10，随后再进行 num的累加。

num2是10因为我们将 num1传入increasePassedNumber. number等于10（num1的值。同样道理，++ 先返回 操作值, 再累加 操作值。） number是10，所以num2也是10.
 */

const value = { number: 10 };

const multiply = (x = { ...value }) => {
	console.log(x.number *= 2);
};

multiply();
multiply();
multiply(value);
multiply(value);

//20, 20, 20, 40

/**
 * 在ES6中，我们可以使用默认值初始化参数。如果没有给函数传参，或者传的参值为 "undefined" ，那么参数的值将是默认值。上述例子中，我们将 value 对象进行了解构并传到一个新对象中，因此 x 的默认值为 {number：10} 。

默认参数在调用时才会进行计算，每次调用函数时，都会创建一个新的对象。我们前两次调用 multiply 函数且不传递值，那么每一次 x 的默认值都为 {number：10} ，因此打印出该数字的乘积值为20。

第三次调用 multiply 时，我们传递了一个参数，即对象value。 *=运算符实际上是x.number = x.number * 2的简写，我们修改了x.number的值，并打印出值20。

第四次，我们再次传递value对象。 x.number之前被修改为20，所以x.number * = 2打印为40。
 */


[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
//1 2 and undefined 3 and undefined 4
/**
 * reducer 函数接收4个参数:

Accumulator (acc) (累计器)
Current Value (cur) (当前值)
Current Index (idx) (当前索引)
Source Array (src) (源数组)
reducer 函数的返回值将会分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。

reducer 函数还有一个可选参数initialValue, 该参数将作为第一次调用回调函数时的第一个参数的值。如果没有提供initialValue，则将使用数组中的第一个元素。

在上述例子，reduce方法接收的第一个参数(Accumulator)是x, 第二个参数(Current Value)是y。

在第一次调用时，累加器x为1，当前值“y”为2，打印出累加器和当前值：1和2。

例子中我们的回调函数没有返回任何值，只是打印累加器的值和当前值。如果函数没有返回值，则默认返回undefined。 在下一次调用时，累加器为undefined，当前值为“3”, 因此undefined和3被打印出。

在第四次调用时，回调函数依然没有返回值。 累加器再次为 undefined ，当前值为“4”。 undefined和4被打印出。
 */

//使用哪个构造函数可以成功继承Dog类?
class Dog {
	constructor(name) {
		this.name = name;
	}
};

class Labrador extends Dog {
	// 1 
	constructor(name, size) {
		this.size = size;
	}
	// 2
	constructor(name, size) {
		super(name);
		this.size = size;
	}
	// 3
	constructor(size) {
		super(name);
		this.size = size;
	}
	// 4 
	constructor(name, size) {
		this.name = name;
		this.size = size;
	}

};

// 2
/**
 * 在子类中，在调用super之前不能访问到this关键字。 如果这样做，它将抛出一个ReferenceError：1和4将引发一个引用错误。

使用super关键字，需要用给定的参数来调用父类的构造函数。 父类的构造函数接收name参数，因此我们需要将name传递给super。

Labrador类接收两个参数，name参数是由于它继承了Dog，size作为Labrador类的额外属性，它们都需要传递给Labrador的构造函数，因此使用构造函数2正确完成。
 */

// index.js
console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
//running sum.js, running index.js, 3
/**
 * import命令是编译阶段执行的，在代码运行之前。因此这意味着被导入的模块会先运行，而导入模块的文件会后执行。

这是CommonJS中require（）和import之间的区别。使用require()，您可以在运行代码时根据需要加载依赖项。 如果我们使用require而不是import，running index.js，running sum.js，3会被依次打印。
 */



console.log(Number(2) === Number(2))
console.log(Boolean(false) === Boolean(false))
console.log(Symbol('foo') === Symbol('foo'))

//true, true, false

/**
 * 每个Symbol都是完全唯一的。传递给Symbol的参数只是给Symbol的一个描述。 Symbol的值不依赖于传递的参数。 当我们测试相等时，我们创建了两个全新的符号：第一个Symbol（'foo'），第二个Symbol（'foo'）, 这两个值是唯一的，彼此不相等，因此返回false。
 */

const name = "Lydia Hallie"
console.log(name.padStart(13))
console.log(name.padStart(2))

//game.next().value and game.next("Yes").value

console.log(String.raw`Hello\nworld`);

/**
 * String.raw函数是用来获取一个模板字符串的原始字符串的，它返回一个字符串，其中忽略了转义符（\n，\v，\t等）。但反斜杠可能造成问题，因为你可能会遇到下面这种类似情况：

const path = `C:\Documents\Projects\table.html`
String.raw`${path}`
这将导致：

"C:DocumentsProjects able.html"

直接使用String.raw

String.raw`C:\Documents\Projects\table.html`
它会忽略转义字符并打印：C:\Documents\Projects\table.html

上述情况，字符串是Hello\nworld被打印出。
 */

async function getData() {
	return await Promise.resolve("I made it!");
}

const data = getData();
console.log(data);
/**
 * 异步函数始终返回一个promise。await仍然需要等待promise的解决：当我们调用getData()并将其赋值给data，此时data为getData方法返回的一个挂起的promise，该promise并没有解决。

如果我们想要访问已解决的值"I made it!"，可以在data上使用.then()方法：

data.then(res => console.log(res))

这样将打印 "I made it!"
 */


function addToList(item, list) {
	return list.push(item);
}

const result = addToList("apple", ["banana"]);
console.log(result);
/**
 * push()方法返回新数组的长度。一开始，数组包含一个元素（字符串"banana"），长度为1。 在数组中添加字符串"apple"后，长度变为2，并将从addToList函数返回。

push方法修改原始数组，如果你想从函数返回数组而不是数组长度，那么应该在push item之后返回list。
 */


const box = { x: 10, y: 20 };

Object.freeze(box);

const shape = box;
shape.x = 100;
console.log(shape)
//{ x: 10, y: 20 }
/**
 * Object.freeze使得无法添加、删除或修改对象的属性（除非属性的值是另一个对象）。

当我们创建变量shape并将其设置为等于冻结对象box时，shape指向的也是冻结对象。你可以使用Object.isFrozen检查一个对象是否被冻结，上述情况，Object.isFrozen（shape）将返回true。

由于shape被冻结，并且x的值不是对象，所以我们不能修改属性x。 x仍然等于10，{x：10，y：20}被打印。

注意，上述例子我们对属性x进行修改，可能会导致抛出TypeError异常（最常见但不仅限于严格模式下时）。
 */


const { name: myName } = { name: "Lydia" };

console.log(name);
//ReferenceError
/**
 * 当我们从右侧的对象解构属性name时，我们将其值Lydia分配给名为myName的变量。

使用{name：myName}，我们是在告诉JavaScript我们要创建一个名为myName的新变量，并且其值是右侧对象的name属性的值。

当我们尝试打印name，一个未定义的变量时，就会引发ReferenceError。
 */

function sum(a, b) {
	return a + b;
}
A: Yes
B: No
/**
 * 纯函数一种若输入参数相同，则永远会得到相同输出的函数。

sum函数总是返回相同的结果。 如果我们传递1和2，它将总是返回3而没有副作用。 如果我们传递5和10，它将总是返回15，依此类推，这是纯函数的定义。
 */

const add = () => {
	const cache = {};
	return num => {
		if (num in cache) {
			return `From cache! ${cache[num]}`;
		} else {
			const result = num + 10;
			cache[num] = result;
			return `Calculated! ${result}`;
		}
	};
};

const addFunction = add();
console.log(addFunction(10));
console.log(addFunction(10));
console.log(addFunction(5 * 2));
//Calculated! 20 From cache! 20 From cache! 20
/**
 * add函数是一个记忆函数。 通过记忆化，我们可以缓存函数的结果，以加快其执行速度。上述情况，我们创建一个cache对象，用于存储先前返回过的值。

如果我们使用相同的参数多次调用addFunction函数，它首先检查缓存中是否已有该值，如果有，则返回缓存值，这将节省执行时间。如果没有，那么它将计算该值，并存储在缓存中。

我们用相同的值三次调用了addFunction函数：

在第一次调用，num等于10时函数的值尚未缓存，if语句num in cache返回false，else块的代码被执行：Calculated! 20，并且其结果被添加到缓存对象，cache现在看起来像{10：20}。

第二次，cache对象包含10的返回值。 if语句 num in cache 返回true，From cache! 20被打印。

第三次，我们将5 * 2(值为10)传递给函数。 cache对象包含10的返回值。 if语句 num in cache 返回true，From cache! 20被打印。
 */



const myLifeSummedUp = ["☕", "💻", "🍷", "🍫"]

for (let item in myLifeSummedUp) {
	console.log(item)
}

for (let item of myLifeSummedUp) {
	console.log(item)
}
//0 1 2 3 and "☕" "💻" "🍷" "🍫"
/**
 * 通过for-in循环，我们可以遍历一个对象自有的、继承的、可枚举的、非Symbol的属性。 在数组中，可枚举属性是数组元素的“键”， 即它们的索引。 类似于下面这个对象：

{0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}

其中键则是可枚举属性，因此 0，1，2，3被记录。

通过for-of循环，我们可以迭代可迭代对象（包括 Array，Map，Set，String，arguments等）。当我们迭代数组时，在每次迭代中，不同属性的值将被分配给变量item, 因此“☕”，“💻“，”🍷”，“🍫“被打印。
 */

const list = [1 + 2, 1 * 2, 1 / 2]
console.log(list)

//[3, 2, 0.5]

/**
 * 数组元素可以包含任何值。 数字，字符串，布尔值，对象，数组，null，undeifned, 以及其他表达式，如日期，函数和计算。

元素将等于返回的值。 1 + 2返回3，1 * 2返回'2，'1 / 2返回0.5。
 */

function sayHi(name) {
	return `Hi there, ${name}`
}

console.log(sayHi())
//Hi there, undefined
/**
 * 默认情况下，如果不给函数传参，参数的值将为undefined。 上述情况，我们没有给参数name传值。 name等于undefined，并被打印。

在ES6中，我们可以使用默认参数覆盖此默认的undefined值。 例如：

function sayHi（name =“Lydia”）{...}

在这种情况下，如果我们没有传递值或者如果我们传递undefined，name总是等于字符串Lydia
 */

var status = "😎"

setTimeout(() => {
	const status = "😍"

	const data = {
		status: "🥑",
		getStatus() {
			return this.status
		}
	}

	console.log(data.getStatus())
	console.log(data.getStatus.call(this))
}, 0)

//"🥑" and "😎"
/**
 * this关键字的指向取决于使用它的位置。 在函数中，比如getStatus，this指向的是调用它的对象，上述例子中data对象调用了getStatus，因此this指向的就是data对象。 当我们打印this.status时，data对象的status属性被打印，即"🥑"。

使用call方法，可以更改this指向的对象。data.getStatus.call(this)是将this的指向由data对象更改为全局对象。在全局对象上，有一个名为status的变量，其值为”😎“。 因此打印this.status时，会打印“😎”。
 */

const person = {
	name: "Lydia",
	age: 21
}

let city = person.city
city = "Amsterdam"

console.log(person)
//{ name: "Lydia", age: 21 }
/**
 * 我们将变量city设置为等于person对象上名为city的属性的值。 这个对象上没有名为city的属性，因此变量city的值为undefined。

请注意，我们没有引用person对象本身，只是将变量city设置为等于person对象上city属性的当前值。

然后，我们将city设置为等于字符串“Amsterdam”。 这不会更改person对象：没有对该对象的引用。

因此打印person对象时，会返回未修改的对象。
 */

function checkAge(age) {
	if (age < 18) {
		const message = "Sorry, you're too young."
	} else {
		const message = "Yay! You're old enough!"
	}

	return message
}

console.log(checkAge(21))

//ReferenceError
/**
 * const和let声明的变量是具有块级作用域的，块是大括号（{}）之间的任何东西, 即上述情况if / else语句的花括号。 由于块级作用域，我们无法在声明的块之外引用变量，因此抛出ReferenceError。
 */

fetch('https://www.website.com/api/user/1')
	.then(res => res.json())
	.then(res => console.log(res))
//前一个.then()中回调方法返回的结果将被打印

console.log("I want pizza"[0])
//"I"
/**
 * 可以使用方括号表示法获取字符串中特定索引的字符，字符串中的第一个字符具有索引0，依此类推。 在这种情况下，我们想要得到索引为0的元素，字符'I'被记录。

请注意，IE7及更低版本不支持此方法。 在这种情况下，应该使用.charAt（）
 */

function sum(num1, num2 = num1) {
	console.log(num1 + num2)
}

sum(10)
//20
/**
 * 您可以将默认参数的值设置为函数的另一个参数，只要另一个参数定义在其之前即可。 我们将值10传递给sum函数。 如果sum函数只接收1个参数，则意味着没有传递num2的值，这种情况下，num1的值等于传递的值10。 num2的默认值是num1的值，即10。 num1 + num2返回20。

如果您尝试将默认参数的值设置为后面定义的参数，则可能导致参数的值尚未初始化，从而引发错误。比如：

function test(m = n, n = 2) {
	console.log(m, n)
}
test() // Uncaught ReferenceError: Cannot access 'n' before initialization
test(3) // 3 2
test(3, 4) // 3 4
 */


// module.js 
export default () => "Hello world"
export const name = "Lydia"

// index.js 
import * as data from "./module"

console.log(data)
//{ default: function default(), name: "Lydia" }
/**
 使用import * as name语法，我们将module.js文件中所有export导入到index.js文件中，并且创建了一个名为data的新对象。 在module.js文件中，有两个导出：默认导出和命名导出。 默认导出是一个返回字符串“Hello World”的函数，命名导出是一个名为name的变量，其值为字符串“Lydia”。

data对象具有默认导出的default属性，其他属性具有指定exports的名称及其对应的值。
 */

class Person {
	constructor(name) {
		this.name = name
	}
}

const member = new Person("John")
console.log(typeof member)

//"object"
/**
 * 类是构造函数的语法糖，如果用构造函数的方式来重写Person类则将是：

function Person() {
  this.name = name
}
通过new来调用构造函数，将会生成构造函数Person的实例，对实例执行typeof关键字将返回"object"，上述情况打印出"object"。
 */

let newList = [1, 2, 3].push(4)

console.log(newList.push(5))
//报错
/**
 * .push方法返回数组的长度，而不是数组本身！ 通过将newList设置为[1,2,3].push(4)，实际上newList等于数组的新长度：4。

然后，尝试在newList上使用.push方法。 由于newList是数值4，抛出TypeError。
 */

function giveLydiaPizza() {
	return "Here is pizza!"
}

const giveLydiaChocolate = () => "Here's chocolate... now go hit the gym already."

console.log(giveLydiaPizza.prototype)
console.log(giveLydiaChocolate.prototype)
//{ constructor: ...} undefined
/**
 * 常规函数，例如giveLydiaPizza函数，有一个prototype属性，它是一个带有constructor属性的对象（原型对象）。 然而，箭头函数，例如giveLydiaChocolate函数，没有这个prototype属性。 尝试使用giveLydiaChocolate.prototype访问prototype属性时会返回undefined。
 */
const person = {
	name: "Lydia",
	age: 21
}

for (const [x, y] of Object.entries(person)) {
	console.log(x, y)
}
//name Lydia and age 21
/**
 * Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，上述情况返回一个二维数组，数组每个元素是一个包含键和值的数组：

[['name'，'Lydia']，['age'，21]]

使用for-of循环，我们可以迭代数组中的每个元素，上述情况是子数组。 我们可以使用const [x，y]在for-of循环中解构子数组。 x等于子数组中的第一个元素，y等于子数组中的第二个元素。

第一个子阵列是[“name”，“Lydia”]，其中x等于name，而y等于Lydia。 第二个子阵列是[“age”，21]，其中x等于age，而y等于21。
 */

function getItems(fruitList, ...args, favoriteFruit) {
	return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")
//报错
/**
 * ... args是剩余参数，剩余参数的值是一个包含所有剩余参数的数组，并且只能作为最后一个参数。上述示例中，剩余参数是第二个参数，这是不可能的，并会抛出语法错误。

function getItems(fruitList, favoriteFruit, ...args) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")
上述例子是有效的，将会返回数组：[ 'banana', 'apple', 'orange', 'pear' ]
 */

function nums(a, b) {
	if
		(a > b)
		console.log('a is bigger')
	else
		console.log('b is bigger')
	return
	a + b
}

console.log(nums(4, 2))
console.log(nums(1, 2))
//a is bigger, undefined and b is bigger, undefined
/**
 * 在JavaScript中，我们不必显式地编写分号(;)，但是JavaScript引擎仍然在语句之后自动添加分号。这称为自动分号插入。例如，一个语句可以是变量，或者像throw、return、break这样的关键字。

在这里，我们在新的一行上写了一个return语句和另一个值a + b 。然而，由于它是一个新行，引擎并不知道它实际上是我们想要返回的值。相反，它会在return后面自动添加分号。你可以这样看:

  return;
  a + b
这意味着永远不会到达a + b，因为函数在return关键字之后停止运行。如果没有返回值，就像这里，函数返回undefined。注意，在if/else语句之后没有自动插入!
 */

class Person {
	constructor() {
		this.name = "Lydia"
	}
}

Person = class AnotherPerson {
	constructor() {
		this.name = "Sarah"
	}
}

const member = new Person()
console.log(member.name)
//"Sarah"
/**
 * 我们可以将类设置为等于其他类/函数构造函数。 在这种情况下，我们将Person设置为AnotherPerson。 这个构造函数的名字是Sarah，所以新的Person实例member上的name属性是Sarah。
 */

const info = {
	[Symbol('a')]: 'b'
}

console.log(info)
console.log(Object.keys(info))

//{Symbol('a'): 'b'} and []
/**
 * ymbol类型是不可枚举的。Object.keys方法返回对象上的所有可枚举的键属性。Symbol类型是不可见的，并返回一个空数组。 记录整个对象时，所有属性都是可见的，甚至是不可枚举的属性。

这是Symbol的众多特性之一：除了表示完全唯一的值（防止对象意外名称冲突，例如当使用2个想要向同一对象添加属性的库时），您还可以隐藏这种方式对象的属性（尽管不完全。你仍然可以使用Object.getOwnPropertySymbols()方法访问 Symbol。
 */



const getList = ([x, ...y]) => [x, y]
const getUser = user => { name: user.name;age:user.age}

const list = [1, 2, 3, 4]
const user = { name: "Lydia", age: 21 }

console.log(getList(list))
console.log(getUser(user))
//[1, [2, 3, 4]] and undefined
/**
 * getList函数接收一个数组作为其参数。 在getList函数的括号之间，我们立即解构这个数组。 您可以将其视为：

[x, ...y] = [1, 2, 3, 4]

使用剩余的参数... y，我们将所有剩余参数放在一个数组中。 在这种情况下，其余的参数是2，3和4。 y的值是一个数组，包含所有其余参数。 在这种情况下，x的值等于1，所以当我们打印[x，y]时，会打印[1，[2,3,4]]。

getUser函数接收一个对象。对于箭头函数，如果只返回一个值，我们不必编写花括号。但是，如果您想从一个箭头函数返回一个对象，您必须在圆括号之间编写它，否则不会返回任何值!下面的函数将返回一个对象:

const getUser = user => ({ name: user.name, age: user.age })

由于在这种情况下不返回任何值，因此该函数返回undefined。
 */

const name = "Lydia"

console.log(name())
//TypeError
/**
 * 变量name保存字符串的值，该字符串不是函数，因此无法调用。

当值不是预期类型时，会抛出TypeErrors。 JavaScript期望name是一个函数，因为我们试图调用它。 但它是一个字符串，因此抛出TypeError：name is not a function

当你编写了一些非有效的JavaScript时，会抛出语法错误，例如当你把return这个词写成retrun时。 当JavaScript无法找到您尝试访问的值的引用时，抛出ReferenceErrors。
 */

 // 🎉✨ This is my 100th question! ✨🎉

const output = `${[] && 'Im'}possible!
You should${'' && `n't`} see a therapist after so much JavaScript lol`
//Impossible! You should see a therapist after so much JavaScript lol
/**
 * []是一个真值。 使用&&运算符，如果左侧值是真值，则返回右侧值。 在这种情况下，左侧值[]是一个真值，所以返回Im。

""是一个假值。 如果左侧值是假的，则不返回任何内容。 n't不会被退回。
 */

const one = (false || {} || null)
const two = (null || false || "")
const three = ([] || 0 || true)

console.log(one, two, three)

// {} "" []
/**\
 * 
 */