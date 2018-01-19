<template>
  <div class="cartwrapper">
      <transition name="move">
          <div class="cart-reduce" v-show="food.count>0" @click.stop="reduceCart($event)">
             <span class="inner icon-remove_circle_outline"></span>
          </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
      food: {
          type: Object
      }
  },
  created() {

  },
  methods: {
      addCart: function(event) {
        //阻止非vue事件时
        if(!event._constructed)
        {
            return ;
        }
        if(!this.food.count)
        {
            Vue.set(this.food,'count',1);
        }
        else{
            this.food.count++;
        }
      },
      reduceCart: function(event) {
        if(!event._constructed)
        {
            return ;
        }
        if(this.food.count){
            this.food.count-- ;
        }
      }
  }
}
</script>

<style lang="stylus">
.cartwrapper
    font-size:0
    .cart-reduce
        display inline-block
        padding:6px
        .inner
            font-size :24px
            line-height :24px
            color :#7e7ebc
.move-enter-active
        transition: all .3s ease
        transform :rotate(0deg)
        transform: translate3d(0,0,0)
.move-leave-active 
        transition: all .2s ease
.move-enter
        opacity :0
        transform :rotate(180deg)
        transform: translate3d(24px,0,0)
.move-leave-to
        opacity :0
        transform: translate3d(24px,0,0)
    .cart-count 
        display inline-block
        vertical-align :top
        width:24px
        padding-top:6px
        line-height :24px
        color:#555555
        text-align :center
        font-size:12px
        font-weight:700
    .cart-add
        display inline-block
        padding:6px
        font-size:24px
        line-height :24px
        color:#7e7ebc    
</style>
