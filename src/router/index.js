import Vue from 'vue'
import Router from 'vue-router'
import Ratings from '../components/ratings/ratings.vue'
import Goods from '../components/goods/goods.vue'
import Seller from '../components/seller/seller.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/seller',
      component: Seller
    },
    {
      path: '/ratings',
      component: Ratings
    }
  ]
})
