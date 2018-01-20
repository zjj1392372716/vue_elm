<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <!-- border-1类用于处理不同dpi下的设备的伪类的缩放 -->
    <div class="tab boder-1">
      <div class="tab-item">
        <router-link to="/goods" class="a">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" class="a">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" class="a">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import mheader from "./components/header/header.vue";
import {urlParse} from './common/js/util.js'
export default {
  name: 'app',
  components:{
    "v-header": mheader
  },
  data() {
    return {
      seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log(queryParam)
            return queryParam.id;
          })()
        }
    }
  },
  created() {
    //为什么是在created这个钩子函数里请求数据呢
    //因为created的时候，data已经初始化完毕了，seller也就有了，如果是在created之前，那么是无法对seller赋值的，会报错
    //通过axios请求数据
    this.axios.get('/api/seller').then((response) => {
      console.log(response.data)
      response = response.data
      console.log(response.errornum);
      if (response.errornum == 0) {
        //将从后端返回的数据传递给data中对象
        this.seller = response.data;
      }

    })
  }
}
</script>
<style lang="stylus">
@import 'app.styl'
</style>

