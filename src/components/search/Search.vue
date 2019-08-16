<template>
  <div>
    <div class="top">
      <div class="top_mian">
        <div class="mian_left">
          <input type="text" @focus="onfocus" @blur="onblur" v-model="key" @keydown.enter="searched">
        </div>
        <div :class="['mian_right',flag?'show':'']" @click="cancel">取消</div>
      </div>
    </div>
    <!-- 热门搜索列表 -->
    <div :class="['bottom_hot',flag?'bottom_hot_none':'']">
      <div class="title">热门搜索</div>
      <div class="hot_mian">
        <span :class="[index == 0 ? 'sel' : '']" v-for="(item, index) in hotSearchList" :key="index" @click="doSearch(item.first)">{{item.first}}</span>
      </div>
    </div>
    <!-- 热门搜索列表 end -->
    <!-- 搜索结果列表 -->
    <div :class="['bottom_list',flag?'bottom_list_show':'']">
      <div class="item" v-for="(item, index) in searchedList" :key="index" @click="toMusicdetail(item.id)">
        <img class="img" src="../../assets/images/music.png">
        <p class="name">{{item.name}}</p>
        <p class="sing_name">{{item.artists[0].name}}</p>
      </div>  
    </div>
    <!-- 搜索结果列表end -->
    <div :class="['history',flag2?'history_show':'']">
      <div class="history_item" v-for="(item, index) in historyList" :key="index">
        <div class="h_left">
        <div class="h_img"><i class="el-icon-time"></i></div>
        <div class="h_name" @click="doSearch(item)">{{item}}</div>
        </div>
        <div class="h_close" @click="del(index)"><i class="el-icon-close"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
import {search, hotSearch} from '../../common/api'
export default {
  data() {
    return {
      flag: false,
      flag2: false, // 控制搜索列表
      key: '', // 搜索关键词
      keyed: '', //搜索完之后的关键词
      musicImg: require('../../assets/images/music.png'),
      searchedList: [], // 搜索结果数组
      hotSearchList: [], // 热门搜索数组
      historyList: [] // 搜索历史记录
    }
  },
  mounted () {
    // 获取热门搜索
    if(this.$store.state.hotSearchList != '') {
      this.hotSearchList = this.$store.state.hotSearchList
    } else {
      this.getHotSearchList()
    }
  },
  methods: {
    // 获取热门搜索
    getHotSearchList () {
      this.$axios({
        url: hotSearch
      }).then(res => {
        this.hotSearchList = res.data.result.hots
        // 将热门搜索列表存入vuex state中
        this.$store.commit('changehotSearchList', res.data.result.hots)
      })
    },
    // 聚焦时
    onfocus () {
      this.flag = true
      this.flag2 = true
      // 获取历史记录
      if(JSON.parse(localStorage.getItem('historyList'))){
        this.historyList = JSON.parse(localStorage.getItem('historyList'))
        // 去除重复
        var s = new Set(this.historyList)
        var s_after = Array.from(s)
        this.historyList = s_after
      }
    },
    // 失去焦点
    onblur () {
    },
    // 取消按钮
    cancel () {
      this.flag = false
      this.flag2 = false
      this.key = ''
      this.searchedList = []
    },
    // 键盘/手机enter后,搜索
    searched () {
      this.flag2 = false
      // 请求搜索接口
      this.$axios({
        url: search,
        params: {keywords: this.key}
      }).then(res => {
        this.searchedList = res.data.result.songs
      })
      // 将搜索过的记录添加到localstorage
      this.historyList = JSON.parse(localStorage.getItem('historyList')) || []
      this.historyList.push(this.key)
      localStorage.setItem('historyList',JSON.stringify(this.historyList))
    },
    // 历史记录删除
    del (index) {
      console.log(this.historyList)
      this.historyList.splice(index,1)
      localStorage.setItem('historyList',JSON.stringify(this.historyList))
    },
    // 根据关键词搜索
    doSearch (item) {
      this.key = item
      this.keyed = item
      this.flag2 = false
      this.flag = true
      this.$axios({
        url: search,
        params: {keywords: item}
      }).then(res => {
        this.searchedList = res.data.result.songs
      })      
    },
    // 跳转到播放详情页
    toMusicdetail (id) {
      this.$router.push({
        path: '/musicdetail',
        query: {id: id}
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.top{
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  background: #f4f4f4;
  padding: 10px;
  .top_mian{
    display: flex;
    .mian_left{
      width: 100%;
      box-sizing: border-box;
      border-radius: 3px;
      background: #fff;
      height: 36px;
      padding: 8px 12px 8px 35px;
      input{
        width: 100%;
        height: 100%;
        outline: none;
      }
    }
    .mian_right{
      width: 15%;
      height: 36px;
      line-height: 36px;
      text-align: center;
      display: none;
    }
    .show{
      display: block!important;
    }
  }
}
.bottom_hot_none{
  display: none;
}
.bottom_hot{
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  padding: 15px 15px 10px 15px;
  .title{
    color: rgba(0,0,0,.6);
    margin-bottom: 8px;
  }
  .hot_mian{
    span{
      display: inline-block;
      font-size: 14px;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      color: #000;
      border: 1px solid rgba(0,0,0,.6);
      border-radius: 99px;
      word-break: keep-all;
      margin-bottom: 10px;
      margin-right: 14px;
    }
    .sel{
      color: #fc4524;
      border-color: #fc4524;
    }
  }
}
.bottom_list{
  display: none;
  .item::after{
    content: "";
    position: absolute;
    height: 1px;
    top: 0;
    left: 0;
    right: 0;
    background: #e5e5e5;
  }
  .item{
    position: relative;
    height: 55px;
    padding-left: 56px;
    overflow: hidden;
    // border: 1px solid;
    p{
      width: 100%;
      white-space nowrap;
      overflow hidden;
      text-overflow ellipsis;
    }
    .img{
      position: absolute;
      top: 18px;
      left: 18px;
      width: 22px;
      height: 20px;
    }
    .name{
      margin: 10px 0 2px;
      line-height: 18px;
      font-size: 16px;
      font-weight: 400;
      color: #000;
    }
    .sing_name{
      color: grey;
      margin-top: 6px;
    }
  }
}
.history{
  display: none;
  .history_item::after{
    content: "";
    position: absolute;
    height: 1px;
    top: 0;
    left: 0;
    right: 0;
    background: #e5e5e5;
  }
  .history_item{
    display: flex;
    justify-content: space-between;
    position: relative;
    border-top: 1px solid #ededed;
    padding: 0 15px;
    height: 44px;
    line-height: 44px;
    .h_left{
      display: flex;
      .h_img{
        line-height: 52px;
        i{
          font-size: 20px;
          color: #ccc
        }
      }
      .h_name{
        height: 44px;
        line-height: 44px;
        color: #000;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 20px;
      }      
    }

    .h_close{
      line-height: 52px;
      i{
        font-size: 20px;
        color: #ccc
      }
    }
  }

}
.bottom_list_show{
  display: block!important;
}
.history_show{
  display: block!important;
}
</style>
