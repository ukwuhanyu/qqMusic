<template>
  <div class="lyric">
    <div class="loding" v-if="!flag">
      <i class="el-icon-loading"></i>
    </div>
    <div class="lyric_mian" v-if="flag" :style="{transform: 'translate3d(0,'+(nowIndex)*(-29.6)+'px,0)'}">
      <p class="none"></p>
      <p>{{musicDetaild.name?musicDetaild.name:''}} - {{musicDetaild.ar[0].name?musicDetaild.ar[0].name:''}}</p>
      <p class="lItem"  :class="{sel : index == nowIndex}" v-for="(item, index) in lyricWord" :key="index">{{item}}</p>
    </div>
  </div>
</template>
<script>
import {lyric, musicDetail} from '../../common/api'
export default {
  data () {
    return {
      lyricd: '', // 歌词和时间
      lyricTime: '', // 时间
      lyricTimed: [], // 处理后的时间,去除了小数点后二位
      lyricWord: '', // 歌词
      musicDetaild: '', //歌曲详情
      flag: false,
      isSel: 0,
      nowIndex: 0 //当前播放下标
    }
  },
  props: ['currenttime','duration'],
  mounted () {
    // 获取歌词
    this.$axios({
      url: lyric,
      params: {id: this.$route.query.id}
    }).then(res => {
      // 得到歌词
      this.lyricd = res.data.lrc.lyric
      // 调用处理歌词函数
      this.lyc()
      // 高亮
      //[lyricTimed[index] < currenttime && 
      //lyricTimed[index] > currenttime - (lyricTimed[index+1] - lyricTimed[index]) ?'sel':'']
      setInterval(() => {
        // this.lyricTimed.forEach((item, index) => {
        //   if(item == parseInt(this.currenttime+0.85)){
        //     console.log(index,9998898998)
        //     this.nowIndex = index
        //   }
        // })
        // this.lyricWord.forEach((item, index) => {
        //   if(item.length == 1){
        //     console.log(item,777777)
        //     this.nowIndex = index - 1  
        //   }
        // })
      }, 1000);
    })

    // 获取歌曲详情
    this.$axios({
      url: musicDetail,
      params: {ids: this.$route.query.id}
    }).then(res => {
      this.musicDetaild = res.data.songs[0]
      this.flag = true
    })
  },
  methods: {
    // 处理歌词和时间函数
    lyc () {
      // 正则匹配括号[]
      let reg = /\[.*\]/g
      // 将匹配到的时间保存到matches中
      let matches = this.lyricd.match(reg)
      // 将时间用$替换，将歌词分割成数组
      let rep = this.lyricd.replace(reg,'$')
      this.lyricTime = matches;
      // 将时间[01:43]转换成毫秒
      // 将分和秒转化成毫秒
      this.lyricTime.forEach(item => {
      // 分 
      var min = item.substr(1,5).split(':')[0]
      // 秒
      var sec = item.substr(1,5).split(':')[1]
      // 转换成毫秒
      var s =  Number(min * 60) + Number(sec)
      // 将转换好的时间push到数组中
      this.lyricTimed.push(s)
      })
      // 将歌词转换成数组
      this.lyricWord = rep.split('$')
      // 将第一位空元素删除
      this.lyricWord.splice(0, 1)
      // 将歌词中空的项删除
      for(let i = 0; i < this.lyricWord.length; i ++) {
        if(this.lyricWord[i] == '\n'){
          this.lyricWord.splice(i, 1)
          this.lyricTimed.splice(i, 1)
        }
      }
      // 输出歌词和时间数组
      // console.log(this.lyricWord , this.lyricTimed)
    }
  },
  watch: {
    currenttime : function(newValue, oldValue) {
      // 高亮
      this.lyricTimed.forEach((item, index) => {
        if(item == parseInt(newValue+0.85)){
          // console.log(index,9998898998)
          // 歌词为空，高亮停在上一句
          this.lyricWord.forEach((item, index) => {
            if(item.length == 1){
              this.nowIndex = index - 1
            }
          })            
          this.nowIndex = index
        }
      })
        // this.lyricWord.forEach((item, index) => {
        //   if(item.length == 1){
        //     console.log(item,777777)
        //     this.nowIndex = index - 1  
        //   }
        // })
    //   // console.log(this.$refs.lItem[0],22222)
    //   var lItem = document.getElementsByClassName('lItem')
    //   if(lItem[20]){
    //   console.log(lItem[2].innerHTML.length,8877)
    //         for(let i = 0;i < this.lyricTimed.length; i++){
    //           if(this.lyricTimed[i] < this.currenttime && this.lyricTimed[i] > this.currenttime - (this.lyricTimed[i+1] - this.lyricTimed[i])){
    //             console.log('ok888888888',i)
    //             // this.$refs.lyric.scrollTop += 1 
    //             // lItem[i-1].className = 'nosel'
    //             if(lItem[i].innerHTML.length == 1){
    //               console.log('ko')
    //               // lItem[i-1].className = 'sel'
    //             }
    //             // console.log(l)
    //             // if(lItem.innerHtml)
    //           }else{
    //           }

    //         }
      }
      

    // }
  }
}
</script>
<style lang="stylus" scoped>
.lyric{
  height: 60vh;
  overflow:scroll;
  // overflow hidden;
  position: relative;
  .lyric_mian{
    width: 100%;
    transition: all 1000ms linear 500ms;
    p{
      text-align: center;
      font-size: .15rem;
      color: rgba(0,0,0,.9);
      line-height: 2;
      margin: 0 .2rem;
    }
    .sel{
      color: #22d59c;
    }
    .nosel{
      color: rgba(0,0,0,0.9);
    }
  }
}
.none{
  height: 1.4rem;
  box-sizing: border-box;
  margin: 0;
}
</style>
