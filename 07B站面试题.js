/**
 * 作用域和值类型引用类型的传递
 */
var num1 = 55;
var num2 = 66;

function f1(num, num1) {
  //形参赋值 num和num1是私有变量 以后改变的值都是函数作用域内的
  //num2没有加var 改变的是全局变量
  //num=num1=55-->100
  //num1=num2=66-->100
  //var num2-->100 全局的从66改变为100
  num = 100
  num1 = 100
  num2 = 100
  console.log(num)//100
  console.log(num1)//100
  console.log(num2)//100
}

f1(num1, num2)
console.log(num1)//55
console.log(num2)//66
console.log(num)//报错 num is not defined


/**
 * 作用域和值类型引用类型的传递
 */
function Person(name, age, salary) {
  this.name = name;
  this.age = age;
  this.salary = salary;
}

function f1(person) {
  person.name = 'ls'
  person = new Person('aa', 16, 1200)
}
//创建一个p对象
var p = new Person('zs', 18, 1000);
console.log(p.name)//'zs'
//把p对象的地址传递给函数的形参 可以通过形参改变p对象的属性
f1(p)
console.log(p.name)//'ls'

/**
 * foo='get-element-by-id'
 * 转化为驼峰式命名
 */

function toString (str){
  let arr=str.split('-');
  for (let i = 1; i < arr.length; i++) {
    //获取每个元素的第一个字符转化为大写
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1, arr[i].length - 1);
  }
  return arr.join('');
}
let foo = 'get-element-by-id';
toString(foo);

