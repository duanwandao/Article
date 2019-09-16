<template>
    <div id="app">
        <p>{{count}}</p>
        <button @click="increment"></button>
        <button @click="decrement"></button>
    </div>
</template>

<script>
  export default {
    name: "App",
    created(){
      //请求无参数
      axios.get('http://123.207.32.32:8000/catefory')
        .then(res=>{
          console.log(res);
        }).catch(err=>{
        console.log(err);
      })
      //请求有参数
      axios.get('http://123.207.32.32:8000/data',
        {params:{type:'sell',page:1}})
        .then(res=>{
          console.log(res);
        }).catch(err=>{
        console.log(err);
      })
    }
  }
</script>

<style scoped>

</style>