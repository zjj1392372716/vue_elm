<template>
  <div class="shopcar">  
      <div class="content" @click="togglelist">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo" :class="{'heightLight':totalCount>0}">
                      <i class="icon-shopping_cart" :class="{'heightLight':totalCount>0}"></i>
                  </div>
                  <div class="num" v-show="totalCount>0">
                      {{totalCount}}
                  </div>
              </div>
              <div class="prices" :class="{'heightLight':totalCount>0}">￥ {{totalPrices}}</div>
              <div class="desc">另配送费￥{{prices}}元</div>
          </div> 
          <div class="content-right">
            <div class="pay" :class="payclass">
              {{payTotal}}
            </div>
          </div>
      </div>
      <transition name="fade">
        <div class="list-wrapper" v-show="listshow"> 
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty">清空</span>
            </div>
            <div class="list-content">
                <ul>
                    <li class="foods" v-for="item in selectFoods">
                        <span class="name">{{item.name}}</span>
                        <div class="prices">
                            <span class="price">￥{{item.price*item.count}}</span>
                        </div>
                        <div class="cartcontrol-wrap">
                            <CartControl :food="item"></CartControl>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </transition>
  </div>
</template>

<script>
import CartControl from '../../components/cartcontrol/cartcontrol.vue'
export default {
  data() {
    return {
      fold: true  //默认购物车是折叠的
    }
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
        
        ];
      }
    },
    minPrice: {
      type: Number,
      default: 0
    },
    prices: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrices: function(){
      let total = 0;
      this.selectFoods.forEach(function(food){
        total += food.price * food.count;
      })
      return total;
    },
    totalCount: function(){
      let total = 0;
      this.selectFoods.forEach(function(food) {
        total += food.count;
      });
      return total;
    },
    payTotal: function() {
      //minPrice
      let str = "";
      if (this.totalPrices === 0) {
        str = "" + this.minPrice + "元起送";
        return str;
      } else if (this.totalPrices < this.minPrice) {
        str = "还差" + (this.minPrice - this.totalPrices) + "元起送";
        return str;
      } else {
        str = "去结算";
        return str;
      }
    },
    payclass: function() {
      if (this.totalPrices < this.minPrice) return "no-enough";
      else return "enough";
    },
    listshow: function(){
      if(!this.totalCount>0){
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      return show;
    }
  },
  components: {
    CartControl
  },
  methods: {
    togglelist: function() {
      console.log(1);

      //点击事件，如果购物车没东西就return掉
      if (!this.totalCount) {
        return;
      }
      //否者就交替出现消失
      this.fold = !this.fold;
      console.log(this.fold);
    }
  }
}
</script>

<style lang="stylus">
.shopcar
    height:48px
    width:100%
    position fixed
    bottom:0px
    left:0px
    z-index :50
    background :#14172d
    .content
        height:100%
        display:flex
        background :#14172d
        .content-left
            font-size:0px
            flex:1
            .logo-wrapper
                display inline-block
                position relative
                top: -10px
                margin:0px 12px
                padding:6px
                width:56px
                height:56px
                box-sizing :border-box
                vertical-align top
                border-radius:50%
                background :#141727
                line-height :56px
                .logo
                    width:100%
                    height:100%
                    border-radius:50%
                    background :#2b343c
                    text-align:center
                    &.heightLight
                        background:#4a9de6;
                    .icon-shopping_cart
                        font-size: 24px
                        color: #8e7575
                        line-height: 44px
                        &.heightLight
                            color:#fff
                .num
                    position:absolute
                    top:0px
                    right:0px
                    width:24px
                    height:16px
                    line-height :16px
                    text-align:center
                    border-radius :16px
                    font-size:9px
                    color:#fff
                    background :rgb(240,20,20)
                    box-shadow :0px 4px 8px 0 rgba(0,0,0,0.4)
            .prices
                display inline-block
                vertical-align :top
                line-height :24px
                font-weight :700
                color:rgba(255,255,255,0.4)
                margin-left:6px
                padding-right:12px
                box-sizing :border-box
                border-right:2px solid rgba(255,255,255,0.4)
                font-size:16px
                margin-top:10px
                &.heightLight
                    color:#fff
            .desc
                display inline-block
                vertical-align :top
                line-height :24px
                margin-left:15px
                margin-right:12px
                font-size:14px
                font-weight :500
                color:rgba(255,255,255,0.4)
                margin-top:10px
        .content-right
            width:105px
            flex: 0 0 105px
            .pay
                line-height :48px
                height:48px
                font-weight:600
                font-size:12px
                color:rgba(255,255,255,0.4)
                width:100%
                text-align :center  
                background :#2b333b
                &.no-enough
                    background :#2b333b
                &.enough
                    background :#299529
                    color:#fff

    .list-wrapper
        position :absolute
        left:0
        width:100%
        top:0
        background :#fff
        z-index:-1
        &.fade-leave
          transform: translate3d(0,-100%,0) 
        &.fade-leave-active
          transform: translate3d(0,0,0)
          transition: all 2s ease
        &.fade-enter-active
          transition: all 1s ease
          transform: translate3d(0,-100%,0) 
        &.fade-enter
          transform: translate3d(0,0,0)
        // .list-header
        //     height 40px
        //     line-height:40px
        //     padding:0px 18px
        //     background: #f3f5f7

        //     border-bottom:1px solid rgba(7,17,27,0.1)
        //     .title
        //         float:left
        //         font size 14px
        //         color:rgb(7,17,27)
        //     .empty
        //         float:right
        //         font size 12px
        //         color:rgb(0,160,220)
        // .list-content
        //     padding:0px 18px
        //     max-height:217px
        //     background: #ffffff
        //     overflow hidden










</style>
