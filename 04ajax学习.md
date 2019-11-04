# Ajax  

> async javascript and xml异步的js和xml
> AJAX是与服务器交换数据并更新部分网页的艺术，在不重新加载整个页面的情况下  
> ajax中的异步不是我们理解的同步异步编程，而是泛指局部刷新，在以后的ajax请求中尽可能使用异步获取数据（因为异步数据获取不会阻塞下面代码的执行）
> xml是一种文件格式（HTML可以理解为xml的一种）可扩展的标记语言。他的作用是用自己扩展的一些语义标签来储存一些数据的内容，这样存储的好处是清晰的展示出数据的结构

## 全局刷新和局部刷新  

> 全局刷新：页面是服务器端渲染的（前后端不分离项目）
> > 输入网址www.xxx.com/login.html---发送请求：服务器端处理的事情：

+ 首先获取到login.html资源中的内容  
+ 从服务器中获取需要展示的数据  
+ 把数据和获取的源代码进行拼接处理(处理好的字符串中有结构有数据)
+ 把处理好的xml格式数据返回给客户端

> 返回给客户端的是拼接好的源码  
> > 客户端拿到源码后只需要展示渲染即可（因为需要展示的数据都已经在服务器端拼接好了）
>
> 已上就是服务器端渲染的整个流程了，把数据和结构都在服务器端处理好，客户端只负责展示
> 服务器端渲染的好处：

1. 有利于SEO优化（服务器渲染好的内容到客户端呈现，在页面源代码中可以看到绑定的内容，有利于引擎的收录）但是客户端做字符串拼接，呈现数据的内容在页面源代码中是没有的，不利于SEO
2. 只要服务器端并发给力，页面加载速度会比客户端渲染更快

## ajax操作

+ 使用ajax的五步：

  + 创建一个异步对象

    `let xhr= new XMLHttpRequest()`

  + 设置请求方式和请求地址,相当于发送请求之前的一些配置项  

    ```javascript
      xhr.open([HTTP METHOD],[url],[async],[user-name],[user-pass])
      //1.HTTP METHOD请求方式
      //get/delete/head/options/post/put/trace/connect
      //2.url 向服务器端发送请求的API()接口地址
      //3.async 设置ajax请求的同步异步，默认是异步（写true也是异步）false是同步，但是在项目中都是使用异步编程，防止阻塞后续代码执行
      //4.user-name/user-pass 用户名密码，一般不用
    ```

  + 事件监听：一般监听的都是ready-state-change时间（ajax状态改变事件）基于这个时间可以获取服务器返回的响应头响应主体

   ```javascript
  xhr.onreadystatechange=function(){
    if(xhr.readyState === 4 & xhr.states === 200){
      xhr.responseText;
    }
  }
   ```

  + 发送ajax请求:从这步开始，当前ajax任务开始，如果ajax是同步的，后续代码不会执行，要等到ajax状态成功后在执行反之异步不会
   `xhr.send([请求主体内容])`

## 关于HTTP请求方式  

> 所有的请求都可以给服务器端传递内容，也都可以从服务器端获取内容

+ get：从服务器端获取数据（给的少拿得多）
+ post:向服务器端推送数据（给的多拿得少）
+ delete：删除服务器端的某些文件（一般是删除一些文件）
+ put：向服务器上存放一些内容（一般也是存放文件）
+ head：只想获取服务器返回的响应头信息，不要响应主体中的内容
+ options：一般使用它向服务器发送一个探测性请求，如果服务器端返回信息了，说明当前和客户端和服务器已经建立了链接（TRACE是干这件事的，但是axios这个AJAX类库在基于cross domain进行跨域请求的时候，就是先发送OPTIONS请求进行探测尝试，如果能连通服务器，才会继续发送其它的请求）  

## AJAX状态 ready-state

+ 0  ==> unsent  刚开始创建xhr，还没有发送
+ 1  ==> opened  已经执行了open这个操作
+ 2  ==> headers_received 已经发送ajax请求（ajax任务开始）响应头信息已经被客户端接收了（响应头中包含了：服务器的时间.返回的http状态码）
+ 3  ==> loading 响应主体内容正在返回
+ 4  ==> done 响应主体内容已经被客户端接收了  

## HTTP网络状态码status  

> 根据状态码能够清楚的反映出当前交互的结果及原因  

+ 200 OK 成功（只能证明服务器成功返回信息了，但是信息不一定是你业务需要的）  
+ 301 Moved Permanently 永久转移（永久重定向 => 307） => 域名更改，访问原始域名重定义到新的域名  
+ 302 Move temporarily 临时转移（临时重定向 =>307）  
  + => 网站现在是基于https协议运作的，如果访问的是http协议，会基于307重定向到HTTPS协议上  
  + =>302一般用作服务器负载均衡：当一台服务器达到最大并发数的时候，会把后续访问的用户临时转移到其它的服务器机组上处理  
  + =>偶尔真实项目中会把所有的图片放到单独的服务器上“图片处理服务器”，这样减少主服务器的压力，当用户向主服务器访问图片的时候，主服务器都把它转移到图片服务器上处理  
+ 304 Not Modified 设置缓存  
  + =>对于不经常更新的资源文件，例如：CSS/JS/HTML/IMG等，服务器会结合客户端设置304缓存，第一次加载过这些资源就缓存到客户端了，下次再获取的时候，是从缓存中获取；如果资源更新了，服务器端会通过最后修改时间来强制让客户端从服务器重新拉取；基于CTRL+F5强制刷新页面，304做的缓存就没有用了。  
+ 400 Bad Request 请求参数错误
+ 401 Unauthorized 无权限访问
+ 404 Not Found  找不到资源(地址不存在)
+ 413 Request Entity Too Large 和服务器交互的内容资源超过服务器最大限制
+ 500 Internal Server Error 未知的服务器错误  
+ 503 Service Unavailable 服务器超负荷  

## ajax方法  

+ xhr.response  响应主体内容
+ xhr.responseText 响应主体的内容是字符串（JSON或者XML格式字符串都可以）
+ xhr.responseXML 响应主体的内容是XML文档
+ xhr.status 返回的HTTP状态码
+ xhr.statusText 状态码的描述
+ xhr.timeout 设置请求超时的时间
+ xhr.withCredentials 是否允许跨域（FALSE）
+ xhr.abort() 强制中断AJAX请求
+ xhr.getAllResponseHeaders() 获取所有响应头信息
+ xhr.getResponseHeader([key]) 获取KEY对应的响应头信息，例如：xhr.getResponseHeader('date')就是在获取响应有中的服务器时间
+ xhr.open() 打开URL请求
+ xhr.overrideMimeType() 重写MIME类型
+ xhr.send() 发送AJAX请求
+ xhr.setRequestHeader() 设置请求头

### promise

> promise是es6中新增加的类，目的是为了管理异步操作  

```javascript
/*1. new Promise();创建类的一个实例，每一个实例都可以管理一个异步操作
  必须传递一个回调函数进去（回调函数中管理你的异步操作）不传递会报错
  回调函数总有两个参数
  resolve：异步操作成功做的事件（代指成功后的事件队列）成功后要做的所有事情都存放在成功这个时间队列中
  reject：异步操作失败做的事件（代指失败后的事件队列）
  > new Promise的时候立即把回调函数执行了（promise是同步的）
  2. 基于promise.prototype.then方法（还有catch/finally）向成功队列和失败队列中一次加入需要处理的事情
*/
let promise=new Promise(()=>{

});
```