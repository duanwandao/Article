# 面向对象之类的继承

## 什么是面向对象?
> 面向对象是一种编程思想，js本身就是基于面向对象构建出来的，例如js中有很多内置类，像promise，可以基于new promise来创建一个实例，来管理异步编程
> 几种的面向对象，和其他编程语言还是略微不同，js中的类和实例是基于原型和原型链机制来处理的，而且js中的类的重载和重写继承和其他语言不一样

## 类的继承、封装、多态
+ 封装：低耦合高内聚
+ 多态：重载和重写
  + 重载：方法名相同，形参个数或者类型不一样（js中不存在重载，js中重载指的是同一个方法，根据传参不同，实现出不同效果）
  + 重写：在类的继承中，子类可以重写父类的方法
+ 继承：子类继承父类上的方法
+ 为什么要继承

## 继承常用的四种方法
> 子类继承父类中的属性和方法(目的是让子类的实例继承父类中的属性和方法)

+ 原型继承
  + 让父类中的属性和方法在子类实例的原型链上
  + 子类的prototype指向父类的实例new A()
  + 特点：
  + 不像其他语言中的继承一样（其他语言的继承一般是继承拷贝，也就是子类继承父类，会把父类中的属性和方法拷贝一份到子类，供子类的实例调取使用）它是把父类的原型放到子类实例的原型链上的，实例想调取这些方法，是基于__proto__原型链查找机制完成的
  + 子类可以重写父类上的方法（这样会导致父类其他的实例也受到影响）
  + 父类中私有或者共有的属性方法都会变成子类的共有属性和方法

```javascript
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
B.prototype.constructor=B
B.prototype.getY = function(){
    console.log(this.y)
}
let b1=new B(100)
b1.y
b1.getX()
//子类的实例想用父类上的方法该怎么做？
b1.getX()
```

+ call继承
  + 特点
  + 在子类中把父类当做普通元素执行，让父类的this指向子类的实例
  + 只能继承父类私有的属性和方法（因为把父类当做普通函数执行了，和其原型上的属性和方法没有关系）
  + 父类私有的变成子类私有的

```javascript
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
```

+ 寄生组合继承
call继承+类似于原型链继承  
+ 特点：父类私有和共有的分别是子类实例的私有和共有属性方法

```javascript
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
```

+ es6中extend继承（extends和super）
  
```javascript
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
```