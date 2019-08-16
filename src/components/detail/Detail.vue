<template>
  <div class="detail">
    <!-- 返回按钮 -->
    <div class="back" @click="back">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="detail_content">
      <div class="top">
        <div class="top_img">
          <img :src=detailList.coverImgUrl alt="" srcset="">
        </div>
        <div class="top_title">{{detailList.name}}</div>
        <div class="top_time">更新时间：2019-07-24</div>
        <div class="top_play">
          <img src="../../assets/images/play.png" alt="" srcset="">
        </div>
      </div>
      <div class="bottom">
        <div class="btm_title">排行榜 共{{dListLength?dListLength:''}}首</div>
        <!-- loading -->
        <div class="loding" v-if="flag">
          <i class="el-icon-loading"></i>
        </div> 
        <ul class="btm_mian">
          <li class="btm_list" v-for="(item, index) in detailList.tracks" :key="index" @click="goMusicDetail(item.id)">
            <div class="list_left">
              <div class="list_top">{{index+1}}</div>
              <div class="list_name">
                <p class="list_title">{{item.name}}</p>
                <p class="list_singer">{{item.ar[0].name}}</p>
              </div>
            </div>
            <div class="list_down"><i class="el-icon-download"></i></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {detail} from '../../common/api'
export default {
  data () {
    return {
      detailList: {},
      flag: true,
      dListLength: '' // 列表总个数
    }
  },
  mounted () {
    // 获取详情页数据
    this.$axios({
      url: detail,
      params: {id : this.$route.query.id}
    }).then(res => {
      this.detailList = res.data.playlist
      // 获取列表总个数
      this.dListLength = this.detailList.tracks.length
      this.flag = false
    })
  },
  methods: {
    // 跳转音乐播放界面
    goMusicDetail (id) {
      this.$router.push({
        path: '/musicdetail',
        query: {id: id}
      })
    },
    // 返回按钮
    back () {
      this.$router.go(-1)
    }
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
.detail{
  background-color: #f8f8f8;
  min-height: 100vh;
}
.detail_content{
  padding-top: 0.55rem;
  .top{
    width: 100%;
    .top_img{
      width: 1.9rem;
      margin: 0 auto;
      img{
        border-radius: 0.18rem;
        box-shadow: 0 7px 13px rgba(0,0,0,.21);
        margin-bottom: .25rem;
      }
    }
    .top_title{
      text-align: center;
      margin-bottom: .12rem;
      font-size: .18rem;
      color: #121212;
    }
    .top_time{
      text-align: center;
      font-size: .14rem;
      color: grey;
    }
    .top_play{
      margin: 0 auto;
      margin-top: .15rem;
      width: 1.9rem;
      height: .4rem;
      border-radius: .4rem;
      box-shadow: 0 6px 32px rgba(24,213,156,.5);
      background-color: #22d59c;
      padding-top: 0.3px;
      box-sizing: border-box;
      img{
        width: 0.55rem;
        // height: 20px;
        display: block;
        margin: 0.05rem auto;
      }
    }
  }
  .bottom{
    padding-top: 0.1rem;
    .btm_title{
      margin: 0 .16rem -.05rem;
      display: block;
      font-size: .12rem;
      color: grey;
      padding-bottom: 0.05rem;
    }
    .btm_mian{
      .btm_list{
        padding: .1rem .07rem .1rem 0;
        display: flex;
        justify-content: space-between;
        .list_left{
          display: flex;
          .list_top{
            width: .47rem;
            height: 0.4rem;
            text-align: center;
            line-height: 0.4rem;
            color: #f56273;
          }
          .list_name{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 0.35rem;
            .list_title{
              width: 70vw;
              font-size: .14rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #000;
            }
            .list_singer{
              font-size: .12rem;
              color: rgba(0,0,0,.4);
            }
          }
        }
        .list_down{
          width: 0.4rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          i{
            font-size: 0.2rem;
            color: #b3b3b3;
          }
        }
      }
    }
  }
}
</style>
