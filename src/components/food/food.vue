<template>
  <transition name="move">
    <div class="food" v-show="showflag" ref="food">
      <div class="food-content">
          <div class="image-header">
              <img :src="food.image" alt="">
              <div class="back" @click="hidefood"> 
                <i class="icon-arrow_lift"></i>
              </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="details">
              <span class="sellCount">月售{{food.sellCount}}</span>
              <span class="rating">好评率{{food.rating}} %</span>
            </div>
            <div class="price">
               <span class="now">￥ {{food.price}}</span>
               <span class="oldPrice">￥ {{food.oldPrice}}</span>
            </div>
            <div class="cartcontroll-wrapper">
              <CartControll :food="food"></CartControll>
            </div>
            <div class="buy" @click.stop="addFirst($event)" v-show="!food.count || food.count === 0">加入购物车</div>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
              <h1 class="info-title">商品信息</h1>
              <p class="info-text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
              <h1 class="rating-title">商品评价</h1>
              <ratingshow  :ratings="food.ratings" :selectType="selectType" :onlyCount="onlyCount" :desc="desc"></ratingshow>
          </div>
      </div> 
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import CartControll from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
import Split from '../split/split.vue'
import Ratingshow from '../ratingshow/ratingshow'
const ALL = 2;
const POSITIVE = 0;
const NAGATIVE = 1;
export default {
  props: {
      food: {
        type: Object
      }
  },
  data() {
      return {
        showflag: false,
        selectType: ALL,
        onlyCount: false,
        desc: {
            all: "全部",
            positive: "推荐",
            nagative: "吐槽"
        }
      }
  },
  methods: {
      show() {
        this.showflag = true
        this.$nextTick(()=>{
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.food, {
                  click: true
              })
            }else{
                this.scroll.refresh()
            }
          
        })
      },
      hidefood() {
        this.showflag = false
      },
      addFirst(event) {
          if(!event._constructed){
              return ;
          }
          Vue.set(this.food,'count', 1)
      }
  },
  components: {
      CartControll,
      Split,
      Ratingshow
      
  }
}
</script>

<style lang="stylus">
.food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
        width:100%
        height:0
        padding-top:100%
        position:relative
        img 
            position :absolute
            top: 0px 
            left: 0px 
            width:100%
            height:100%
        .back
            position:absolute
            top: 10px 
            left:0px
            .icon-arrow_lift
                display:block
                padding: 10px
                color:#fff
                font-size:20px
    .content
        padding: 18px
        position :relative
        .title
            font-weight: 700
            font-size:14px
            line-height :14px
            margin-bottom :8px
            color:rgb(7,17,27)
        .details
            margin-bottom :18px
            line-height :18px
            heihgt:18px
            font-size:0
            .sellCount,.rating
                font-size: 10px
                color:rgb(147,153,159)
            .sellCount
                margin-right:12px
        .price
            font-weight:700
            line-height :24px
            .now
                margin-right:8px 
                font-size:14px
                color:rgb(240,20,20)
            .oldPrice
                text-decoration:line-through
                font-size:18px
                color:rgb(147,153,159)
        .cartcontroll-wrapper
            position :absolute
            right:12px
            bottom: 16px
        .buy
            position :absolute
            right:18px
            bottom: 21px
            z-index: 10
            height: 24px
            line-height :24px
            padding :0px 12px
            box-sizing :border-box
            font-size: 10px 
            background :rgb(0,160,220)
            color:#fff
            border-radius:12px
    .info
        padding:18px
        margin-bottom:6px
        color:#555
        .info-title
            font-size:16px
            line-height :20px
            margin-bottom :8px
        .info-text
            line-height: 24px
            padding: 0 8px
            font-size: 12px
            color: #4d555d
    .rating
        .rating-title
            padding-top: 18px
            line-height: 14px
            margin-left: 20px
            line-height: 24px
            margin-bottom: 20px
             
</style>
