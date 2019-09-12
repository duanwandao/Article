# axios  

> axios:它是一个类库，基于promise管理的ajax库  

+ axios是一个对象，提供了对应请求方式的方法（例如get/post/head/delete/put/options）  
+ 支持的参数配置axios.get([url],[options])

```javascript
axios.get(url,{
  //get请求中会把params中的键值对拼接成urlencode格式的字符串，然后以问号传递参数的方式，传递给服务器，类似于JQ-ajax中的data
  params:{
    name:'www',
    age:111
  }
})
axios.get(url,{
  //配置项中传递的内容都相当于基于请求主体传递给服务器，但是传递给服务器的内容格式是RAM（json格式的子字符串）不是x-www-from-urlencoded
    name:'www',
    age:111
})
```

+ 基于get或者post方法发请求，返回的结构都是promise实例  
