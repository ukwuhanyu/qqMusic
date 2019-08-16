import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'
import Home from '@/components/home/Home'
import Top from '@/components/top/Top'
import Search from '@/components/search/Search'
import Detail from '@/components/detail/Detail'
import Musicdetail from '@/components/musicdetail/Musicdetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/home',
          name: '首页',
          component: Home
        },
        {
          path: '/top',
          name: '排行榜',
          component: Top
        },
        {
          path: '/search',
          name: '搜索',
          component: Search
        }
      ]
    },
    {
      path: '/detail',
      name: '详情',
      component: Detail
    },
    {
      path: '/musicdetail',
      name: '播放音乐详情',
      component: Musicdetail
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
