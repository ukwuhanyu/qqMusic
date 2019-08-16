<template>
  <div class="top">
    <!-- loading -->
    <div class="loding" v-if="flag">
      <i class="el-icon-loading"></i>
    </div>
    <div class="top_content">
      <ul>
        <li class="top_list" v-for="(item, index) in topList" :key="index" @click="goDetail(item.id)">
          <div class="list_left">
            <img :src=item.coverImgUrl alt="">
          </div>
          <div class="list_right">
            <p class="right_title">{{item.name}}</p>
            <p class="right_mian" v-for="(item2, index2) in item.tracks" :key="index2">{{index2+1}}<span>{{item2.first}}</span>- {{item2.second}}</p>
          </div>
          <p class="icon_right"><i class="el-icon-arrow-right"></i></p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {top} from '../../common/api'
export default {
  data () {
    return {
      topList: [],
      flag: true
    }
  },
  mounted () {
    // 获取top
    // 判断vuex中是否存在top数组
    if (this.$store.state.topList != '') {
      this.topList = this.$store.state.topList
      this.flag = false
    } else {
      this.getTop()
    }
  },
  methods: {
    // 点击跳转detail页
    goDetail (id) {
      this.$router.push({
        path: '/detail',
        query: {id: id}
      })
    },
    // 获取top
    getTop () {
      this.$axios({
        url: top
      }).then(res => {
        this.topList = res.data.list
        // 将top列表存入 vuex store中
        this.$store.commit('changeTopList', res.data.list)
        this.flag = false
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.top{
  background: rgb(244, 244, 244);
  min-height: 100vh;
}
.top_content{
  padding: 0.1rem;
  box-sizing: border-box;
  .top_list{
    display: flex;
    margin-bottom: 0.1rem;
    background: #fff;
    position: relative;
    .list_left{
      width: 1.03rem;
      img{
        display: block;
        width: 1.03rem;
        height: 1.03rem;
      }
    }
    .list_right{
      margin: 0 0.1rem 0 0.15rem;
      .right_title{
        font-size: 16px;
        color: #000;
        font-weight: 400;
        margin-top: 0.07rem;
      }
      .right_mian{
        font-size: 0.14rem;
        color: rgba(0,0,0,.5);
        width: 57vw;
        margin: 0.1rem 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span{
          color: #000;
          margin-left: 0.08rem;
          margin-right: 0.05rem;
        }
      }
    }
    .icon_right{
      position:absolute;
      right: 0.04rem;
      top: 0.45rem;
      color: #b2b2b2;
      i{
        font-size: 14px;
      }
    }
  }
}
</style>
