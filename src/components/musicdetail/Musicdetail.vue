<template>
  <div class="music" v-if="flag2">
    <!-- 返回按钮 -->
    <div class="back" @click="back">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="music_content">
      <div class="title">
        <p class="name">{{musicDetaild.name?musicDetaild.name:''}}</p>
        <p class="singer">{{musicDetaild.ar[0].name?musicDetaild.ar[0].name:''}}</p>
      </div>
      <div class="main">
        <!-- <p class="sel">{{musicDetaild.name}} - {{musicDetaild.ar[0].name}}</p> -->
        <!-- <p :class="[flag2  ? 'sel':'',flag2 ? 'nosel':'']" v-for="(item, index) in lyricWord" ref="lyric" :key="index">{{item}}</p> -->
        <Lyric :currenttime="currenttime" :duration="duration"></Lyric>
      </div>
      <div class="play">
        <audio ref="myaudio" style="display:none" @timeupdate="myCurrenttime()" @canplaythrough='loaded()' controls="controls" :src=musicsrc>
        </audio>
      </div>
      <div class="nowplay">
        <div class="nplay_img">
          <img :src=musicDetaild.al.picUrl alt="" srcset="">
        </div>
        <div class="nplay_main">
          <p class="last"><svg t="1564197108793" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3304" width="30" height="30"><path d="M509.866667 992C245.333333 992 32 776.533333 32 512s213.333333-480 477.866667-480S987.733333 247.466667 987.733333 512s-213.333333 480-477.866666 480z m0-896C281.6 96 96 281.6 96 512s185.6 416 413.866667 416S923.733333 742.4 923.733333 512 738.133333 96 509.866667 96z" fill="#cdcdcd" p-id="3305"></path><path d="M573.866667 736c-8.533333 0-17.066667-2.133333-23.466667-8.533333l-192-192c-6.4-6.4-8.533333-14.933333-8.533333-23.466667s4.266667-17.066667 8.533333-23.466667l192-192c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L426.666667 512l168.533333 168.533333c12.8 12.8 12.8 32 0 44.8-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z" fill="#dbdbdb" p-id="3306"></path></svg></p>
          <p class="played" @click="played()"><i :class="[flag?'el-icon-video-play':'el-icon-video-pause']"></i></p>
          <p class="next"><svg t="1564196611863" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2960" width="30" height="30"><path d="M509.866667 32C245.333333 32 32 247.466667 32 512s213.333333 480 477.866667 480S987.733333 776.533333 987.733333 512 774.4 32 509.866667 32z m0 896C281.6 928 96 742.4 96 512S281.6 96 509.866667 96 923.733333 281.6 923.733333 512s-185.6 416-413.866666 416z" fill="#cdcdcd" p-id="2961"></path><path d="M469.333333 296.533333c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l168.533334 168.533334-168.533334 168.533333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466667-8.533333l192-192c6.4-6.4 8.533333-14.933333 8.533333-23.466667s-4.266667-17.066667-8.533333-23.466666L469.333333 296.533333z" fill="#e6e6e6" p-id="2962"></path></svg></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {musicDetail, lyric, musicUrl} from '../../common/api'
// 引入处理歌词组件
import Lyric from '../base/Lyric'
export default {
  data () {
    return{
      musicsrc: '',
      flag: true,
      musicDetaild: '', // 歌曲详情
      lyricd: '', // 歌词和时间
      lyricWord: '', // 歌词
      lyricTime: '',  // 时间
      lyricTimed: [], // 处理后的时间,去除了小数点后二位
      currenttime:'',// 已播放时间
      duration: '', // 歌曲总时间
      regCurrenttime: '',
      flag2: false
    }
  },
  mounted () {
    // 获取歌曲详情
    this.$axios({
      url: musicDetail,
      params: {ids: this.$route.query.id}
    }).then(res => {
      this.musicDetaild = res.data.songs[0]
      this.flag2 = true;
    })
    // 获取音乐url
    this.$axios({
      url: musicUrl,
      params: {id: this.$route.query.id}
    }).then(res => {
      this.musicsrc = res.data.data[0].url
    })
  },
  methods: {
    // 歌曲总时间
    loaded () {
      let el = this.$refs.myaudio
      this.duration = el.duration
    },
    // 当前歌曲已经播放的时间
    myCurrenttime () {
      let el = this.$refs.myaudio
      this.currenttime = el.currentTime
      // this.lyricTimed.forEach((item,index) => {
      //   // console.log(index)
      //   // if(index > 1){
      //   this.$refs.lyric[index].className = ''

      //   // }
      // })
      // for(let i = 0;i < this.lyricTimed.length; i++){
      //     // this.$refs.lyric[i+1].className = ''
      //     if(this.currenttime == this.lyricTimed[i]){
      //       this.$refs.lyric[i].className = 'sel'

      //     }else if(this.currenttime > this.lyricTimed[i-1] && this.currenttime < this.lyricTimed[i+1]){
      //       this.$refs.lyric[i-1].className = 'sel'
      //     }
      //   // if(this.currenttime >= this.lyricTimed[i-1] && this.currenttime <= this.lyricTimed[i+1]){
      //   //   this.$refs.lyric[i].className = 'sel'
      //   //   console.log(this.$refs.lyric[i-1],777777)
      //   // }else{
      //   //   // this.$refs.lyric[i+1].className += ' nosel'
      //   //   // if(i > 1){
      //   //   // this.$refs.lyric[i-1].className = ''
      //   //   // }
      //   //   // console.log('hhhh888')
      //   // }
      // }
      // this.lyricTimed.forEach((item, index) => {
      //   // this.$refs.lyric[index].className = ''
      //   if(item >= this.currenttime && item <= this.currenttime){
          
      //     // this.flag2 = true;
      //     console.log(index,'index')
      // // console.log(this.$refs.lyric[0],77777)
      // this.$refs.lyric[index].className = 'sel'
      //   }else{
      //     this.$refs.lyric[index].className = ''
      //   }
      //   // console.log(item,this.currenttime)
      // })
      // setInterval(()=>{

      // },2000)
      // if(this.currenttime<60){//把毫秒数转换为分和杪
      //   if(this.currenttime<10){
      //     this.currenttime= '00:0' + Math.round(this.currenttime)
      //   }else{
      //     this.currenttime= '00:' + Math.round(this.currenttime)
      //   }
      // }else{
      //   let allmm='0' + Math.floor(this.currenttime/60)
      //   let allss=Math.round(this.currenttime-allmm*60)
      //   if(allss < 10){
      //     allss = '0' + Math.round(this.currenttime-allmm*60)
      //   }
      //   this.currenttime=allmm+':'+allss
      // }
      // this.regCurrenttime = '['+ this.currenttime +']'
      // console.log(el.currentTime,999999)
      // console.log(this.regCurrenttime,999999)
    },
    // 控制播放按钮
    played () {
      // 获取当前audio标签DOM结构
      let el = this.$refs.myaudio
      this.flag = !this.flag
      if(el.paused){
        el.play();
      }else{
        el.pause();
      } 
    },
    // 返回按钮
    back () {
      this.$router.go(-1)
    }
  },
  components: {
    Lyric
  }
}
</script>
<style lang="stylus" scoped>
.back{
  position: absolute;
  top: 0.08rem;
  left: 0.08rem;
  i{
    font-size: 26px;
  }
}
.music{
  background: rgb(244, 244, 244);
  min-height: 100vh;
}
.music_content{
  .title{
    padding 40px 0;
    .name{
      text-align: center;
      color: rgb(0, 0, 0);
      font-size: .19rem;
      font-weight: 400;
      margin-bottom: 10px;
    }
    .singer{
      text-align: center;
      color: grey;
      margin: 0 .2rem .15rem;
      font-size: .14rem;
    }
  }
  .main{
    height: 60vh;
    -webkit-mask: -webkit-linear-gradient(top,rgba(0,0,0,0),#fff 25%,#fff 75%,rgba(0,0,0,0));
    .sel{
      color: #22d59c;
    }
    .nosel{
      color: rgba(0,0,0,0.9);
    }
    p{
      text-align: center;
      font-size: .15rem;
      color: rgba(0,0,0,.9);
      line-height: 2;
      margin: 0 .2rem;
    }
  }
  .play{
    width: 100%;
    // height 200px;
  }
  .nowplay{
    width: 100%;
    height: 0.5rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    display: flex;
    .nplay_img{
      margin-right: 15px;
      img{
        width: 50px;
      }
    }
    .nplay_main{
      height: 50px;
      display: flex;
      p{
        margin-right: 10px;
      }
      .played{
        height: 50px;
        i{
          font-size: 40px;
          color: rgba(0,0,0,.2);
          line-height: 50px;
        }
      }
      .next{
        svg{
          padding-top: 13px;
        }
      }
      .last{
        svg{
          padding-top: 13px;
        }
      }
    }
  }
}
</style>
