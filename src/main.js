// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import './assets/js/flexible.js'
import './assets/js/remScale'
import './assets/css/reset.css'
import './assets/css/normalize.css'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import myFitter from './common/filters'
// vuex
import store from './store'
Vue.prototype.$axios = axios
// 全局过滤器
for (let i in myFitter){
  Vue.filter(i,myFitter[i])
}
Vue.use(ElementUI)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
