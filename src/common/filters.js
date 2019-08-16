// 播放次数
let playCount = (num) => {
  if(num > 100000){
    return (num/10000).toFixed(1) + '万'
  }else{
    return num
  }
}

export default{
  playCount
}