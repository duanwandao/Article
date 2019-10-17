//构造函数
// Promise构造函数接收一个executor函数，executor函数执行完同步或异步操作后，调用它的两个参数resolve和reject
var promise = new Promise(function (resolve, reject) {
    /*
      如果操作成功，调用resolve并传入value
      如果操作失败，调用reject并传入reason
    */
})

//实现构造函数
function Promise(executor) {
    var self=this
    self.status='pending'//Promise当前的状态
    self.data=undefined//promise的值
    self.onResolvedCallback = [] //Promiseresolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    self.onRejectedCallback = [] // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    executor(resolve, reject) // 执行executor并传入相应的参数
}
//上面的代码基本实现了Promise构造函数的主体，但目前还有两个问题：
// 我们给executor函数传了两个参数：resolve和reject，这两个参数目前还没有定义
// executor有可能会出错（throw），类似下面这样，而如果executor出错，Promise应该被其throw出的值reject：

//所以我们需要在构造函数里定义resolve和reject这两个函数：
function Promise(executor) {
    var self = this
    self.status = 'pending' // Promise当前的状态
    self.data = undefined  // Promise的值
    self.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    self.onRejectedCallback = [] // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

    function resolve(value) {
        // TODO
    }

    function reject(reason) {
        // TODO
    }

    try { // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
        executor(resolve, reject) // 执行executor
    } catch (e) {
        reject(e)
    }
}
