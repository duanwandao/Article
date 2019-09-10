function obj2str (obj){
  obj.t=new Date().getTime;
var res=[];
  for(var key in obj){
    res.push(key+"="+obj[key])
  }
  return res.join("&");
}

function ajax (url,obj,timeout,sussess,error){
  //0将对象转换为字符串
  var str=obj2str(obj);
  //1创建一个异步对象
  var xhr=new XMLHttpRequest();
  var timer;
  //2设置请求方式和请求地址
  xhr.open("GET",url+"?"+str,true);
  //3发送请求
  xhr.send();
  //4监听状态的变化
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
      clearInterval(timer)
      //判断请求是否成功
      if (xhr.status >=200 && xhr.status < 300 || xhr.status === 304) {
        //console.log("请求成功")
        sussess(xhr);
      }else {
        //console.log("请求失败")
        error(xhr)
      }
    }
  }
  //判断外界是否传入了超时时间
  if (timeout) {
    timer=setInterval(function  (){
      xhr.abort();
      clearInterval(timer)
    },timeout);
  }
}