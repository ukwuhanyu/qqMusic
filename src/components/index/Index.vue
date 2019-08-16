<template>
  <div>
    <Header></Header>
    <div class="nav">
      <router-link to="/home" active-class="sel">推荐</router-link>
      <router-link to="/top" active-class="sel">排行榜</router-link>
      <router-link to="/search" active-class="sel">搜索</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from '../header/Header'
export default {
  components: {
    Header
  }
}
</script>
<style lang="stylus" scoped>
.nav{
  margin-top: 0.8rem;
  height: 0.41rem;
  display: flex;
  a{
    display: block;
    text-align: center;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.16rem;
    color: rgba(0,0,0,.6);
    flex: 1;
  }
}
.sel{
  color: #31c27c!important;
  border-bottom: 1px solid #31c27c!important;
}
</style>
