/**
 * 目录：
 * 1. 冒泡排序
 * 2. 插入排序
 */

//冒泡排序的思想：让数组中的当前项和后一项进行比较，如果当前项比后一项大，则两项交换位置
/**
 * bubble实现冒泡排序
 * @param arr 需要排序的数组
 * @return 排序后的新数组
 */
function bubble(arr) {
  //外层循环循环几次
  for (let i=0;i<arr.length-1;i++){
    //内层循环控制每一轮的次数
    for (let j=0;j<arr.length-1-i;j++){
      if (arr[j]>arr[j+1]){
        //当前项大于后一项
        temp=arr[j]
        arr[j]=arr[j+1]
        arr[j+1]=temp
      }
    }
  }
  return arr
}





//插入排序
/**
 * insert插入排序
 * @param arr 需要排序的数组
 * @returns {*} 返回排序后的新数组
 */
function insert(arr) {
  //1. 准备一个新数组，用来存储抓到手里的牌，开始先抓一张牌进来
  let handle=[]
  handle.push(arr[0])
  //2. 从第二项开始一次抓牌，一直到把牌面上的牌抓光
  for (let i=1;i<arr.length;i++){
    //A是新抓的牌
    let A=arr[i]
    //和handle手里的牌一次比较（从后向前）
    for (let j=handle.length-1;j>=0;j--){
      //每一次要比较的手里的牌
      let B=handle[j]
      //如果当前新牌A比要比较的牌B大，把A放到B的后面
      if (A>B){
        handle.splice(j+1,0,A)
        break
      }
      //已经比到了第一项了，我们把新牌A放到最前面即可
      if (j === 0){
        handle.unshift(A)
      }
    }
  }
  return handle
}
