// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/stylus/reset.css'// 重置样式文件
import axios from 'axios'
import VueAxios from 'vue-axios'
import './common/stylus/base.styl'
import './common/stylus/mixin.styl'
import './common/stylus/font.styl'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
