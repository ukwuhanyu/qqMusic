<template>
  <div class="home">
    <!-- loading -->
    <div class="loding" v-if="flag">
      <i class="el-icon-loading"></i>
    </div>
    <!-- swiper start -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in bannersList" :key="index">
          <img :src=item.pic alt="" srcset="">
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- swiper end -->
    <!-- 热门歌单 start -->
    <div class="song_list">
      <div class="list_title">热门歌单</div>
      <div class="list_content">
        <div class="content_item" v-for="(item, index) in playList" :key="index" @click="goDetail(item.id)">
          <div class="item_img">
            <img :src=item.coverImgUrl alt="" srcset="">
          </div>
          <div class="item_media">
            <p class="media_num"><i class="el-icon-headset"></i>&nbsp;<span>{{item.playCount | playCount}}</span></p>
            <p class="media_play"><i class="el-icon-video-play"></i></p>
          </div>
          <div class="item_name">
            <p class="name_c">{{item.name}}</p>
            <p class="name_n">{{item.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 热门歌单 end -->
    <div class="more" @click="more" v-if="!flag2">点击加载更多</div>
    <div class="loding" v-if="flag2">
      <i class="el-icon-loading"></i>
    </div>    
    <div class="footer">
      <div class="footer_logo"></div>
      <p>Copyright © 1998 - 2019  Tencent. All Rights Reserved.</p>
      <p>联系电话：0755-86013388 QQ群：55209235</p>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper/dist/js/swiper.js"
import {banner, playlist} from '../../common/api'
export default {
  data () {
    return {
      bannersList: [], // banner图数组
      playList: [], // 热门歌单数组
      mit: 10, // 一次展示的条数
      flag: true,
      flag2: false
    }
  },
  methods: {
    // 轮播图
    carousel () {
      new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination'
      },
      loop : true,
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true
      }
      })
    },
    // 加载更多歌单
    more () {
      this.flag2 = true
      this.mit += 10
      // 更多获取歌单
      this.$axios({
        url: playlist,
        params: {limit: this.mit}
      }).then(res => {
        this.playList = res.data.playlists
        // 将热门歌单存入vuex state中
        this.$store.commit('changePlayList',res.data.playlists)
        this.flag2 = false
      })
    },
    // 点击跳转detail页
    goDetail (id) {
      console.log(id)
      this.$router.push({
        path: '/detail',
        query: {id: id}
      })
    },
    // 获取banner图
    getBanner () {
      this.$axios({
        url: banner,
        params: {type: 2}
      }).then(res => {
        this.bannersList = res.data.banners
        this.$nextTick(() => {
          this.carousel()
        })
        // 将banner存入vuex state中
        this.$store.commit('changeBanner',res.data.banners)
        this.flag = false
      })
    },
    // 获取歌单
    getPlayList () {
      this.$axios({
        url: playlist,
        params: {limit: this.mit}
      }).then(res => {
        this.playList = res.data.playlists
        // 将热门歌单存入vuex state中
        this.$store.commit('changePlayList',res.data.playlists)
      })
    }
  },
  mounted () {
    // 获取banner图
    // 判断vuex中是否存在banner图数组，有则取出来，没有则调用接口数据。优化用户体验！解决每次切换重新加载问题
    if (this.$store.state.bannerList != '') {
      this.flag = false
      this.bannersList = this.$store.state.bannerList
      // 调用轮播图swiper
      this.$nextTick(() => {
        this.carousel()
      })
    } else {
      this.getBanner()
    }
    // 获取歌单
    // 判断vuex中是否存在热门歌单数组
    if (this.$store.state.playList != '') {
      this.playList = this.$store.state.playList
    } else {
      this.getPlayList()
    }
  }
};
</script>
<style lang="stylus" scoped>
.home{
  background: rgb(244, 244, 244);
  min-height: 100vh;
}
.more{
  // width: 80px;
  height: 0.18rem;
  line-height: 0.18rem;
  text-align: center;
  // border: 1px solid #31c27c;
  font-size: 0.14rem;
  border-radius: 10px;
  color: grey;
  margin: 0 auto;
}
.footer{
  // height: 300px;
  padding-top: 0.15rem;
  padding-bottom: 0.08rem;
  .footer_logo{
    width: 0.82rem;
    height: 0.24rem;
    margin: 0 auto 0.1rem;
        background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../../assets/images/logo_footer.png')
  }
  p{
    font-size: 10px;
    padding-bottom: 0.05rem;
    font-weight: 400;
    text-align: center;
    color: rgba(0,0,0,.6)
  }
}
.swiper-container{
  width: 100%;
  margin-bottom: 0.14rem;
}
// 穿透更改样式
.swiper-pagination >>> .swiper-pagination-bullet-active {
    opacity: 1;
    background: #fff!important;
}
.song_list{
  padding 0 0.1rem;
  box-sizing: border-box;
  width: 100%;
  .list_title{
    font-size: 0.16rem;
    color: #000;
    margin-bottom: 0.11rem;
    font-weight: 400;
  }
  .list_content{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .content_item{
      // width: 1.73rem;
      width: 49%;
      // height: 2.42rem;
      background: #fff;
      margin-bottom: 10px;
      position: relative;
      .item_img{
        min-height: 1.8rem;
      }
      img{
        // width: 1.73rem;
        width: 100%;
        // height: 1.73rem;
        margin-bottom: 0.05rem;
      }
      .item_name{
        width: 100%;
        height: 0.44rem;
        padding: 0 7px 5px;
        box-sizing: border-box;
        color: #000;
        display: flex;
        flex-wrap: wrap;
        p{
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 400;
        }
        .name_c{
          font-size: 0.14rem;
        }
        .name_n{
          font-size: 0.12rem;
        }
      }
      .item_media{
        color: #fff;
        position: absolute;
        bottom: 0.49rem;
        width: 100%;
        padding 0.06rem 0.04rem;
        height: 0.42rem;
        box-sizing: border-box;
        background-image: url('../../assets/images/shadow.png');
        background-size: 0.01rem 0.42rem;
         background-repeat: repeat-x;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .media_play{
          font-size: 0.22rem;
        }
      }
    }
  }
}
</style>
