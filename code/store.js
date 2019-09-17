const store =new Vuex.Store({
  state:{
    students:[
      {id:110,name:'why',age:18},
      {id:111,name:'kobe',age:20},
      {id:112,name:'lucy',age:25},
      {id:113,name:'lileu',age:30}
    ]
  },
  ggetters : {
    more20stu(){
      return state.students.filter(s=>s.age>=20)
    }
  },
  //mutation定义的方式
  mutations:{
    increment(state,payload){
      state.count=payload.count
    }
  },
  //mutations更新
  increment() {
    this.$store.commit({
      type : 'increment',
      count:100
    })
  }

})
