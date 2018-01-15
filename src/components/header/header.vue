<template>
  <div class="header">
      <div class="container-wrapper">
        <div class="avatar">
            <img :src="seller.avatar" alt="avator">
        </div>
        <div class="content">
            <div class="ttile">
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
            </div>
            <div class="descripation">
              {{seller.description}}/{{seller.deliveryTime}}分钟
            </div>
            <div v-if="seller.supports" class="support">
                <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                <span class="text">{{seller.supports[0].description}}</span>
            </div>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bulletin-wrap">
          <span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
          <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="detail" v-show="detailshow">
          <div class="detail-wrap clearfix">
              <div class="detail-main">
                <h1 class="detail-title">{{seller.name}}</h1>
                <star :size="48" :score="seller.score"></star>
                <div class="good-title">
                      <div class="good-line"></div>
                      <div class="good-text">优惠信息</div>
                      <div class="good-line"></div>
                </div>
                <ul v-if="seller.supports" class="supports">
                      <li v-for="(item,index) in seller.supports" class="supports-item">
                          <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                          <span class="text">{{seller.supports[index].description}}</span>
                      </li>
                  </ul>
                  <div class="good-title">
                      <div class="good-line"></div>
                      <div class="good-text">商家公告</div>
                      <div class="good-line"></div>
                  </div>
                  <div class="ad">
                      <div class="ad-content">
                        {{seller.bulletin}}
                      </div>
                  </div>
              </div>
          </div>
          <div class="detail-close" @click="closeDetail">
              <i class="icon-close"></i>
          </div>
      </div>
  </div>
</template>
<script>
import star from "../star/star.vue";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailshow: false
    };
  },
  methods: {
    showDetail: function() {
        console.log(1);
      this.detailshow = true;
    },
    closeDetail: function() {
      this.detailshow = false;
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  components: {
    star
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/stylus/mixin.styl';
@import 'header.styl';

</style>
