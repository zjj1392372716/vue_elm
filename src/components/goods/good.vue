<template>
  <div class="goods">
        <scroll class="menu-wrapper"
          :goods="goods"
          :pulldown="pulldown"
          @pulldown="loadData">
        <ul>
            <li v-for="(item,index) in goods" class="menu-item" :class="" @click="">
                <div class="menu-item-box boder-1" :class="">
                    <span class="goods-text"><span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
                </div>
            </li>
        </ul>
      </scroll>
      
    <scroll class="food-wrapper"
          :goods="goods"
          :pulldown="pulldown"
          @pulldown="loadData">
          <ul> 
            <li v-for="item in goods" class="goods-list food-list-hook">
                <h1 class="goods-title">{{item.name}}</h1>
                <ul>
                    <li v-for="food in item.foods" class="food-item boder-1">
                        <div class="icon">
                            <img :src="food.icon" alt="">
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="desc">{{food.description}}</p>
                            <div class="extra">
                                <span>月售{{food.sellCount}}</span>
                                <span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="price-now">￥ {{food.price}}</span>
                                <span class="price-old" v-show="food.oldPrice" >￥{{food.oldPrice}}</span>
                            </div>
                            <!-- <div class="cart">
                                <cartControl :food="food"></cartControl>
                            </div> -->
                        </div>
                    </li>
                </ul>
            </li>
          </ul>
      </scroll>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
import scroll from "../scroll/scroll.vue";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: {},
      pulldown: true
    };
  },
  created() {
    this.axios.get("/api/goods").then(response => {
      console.log(response.data);
      response = response.data;
      console.log(response.errornum);
      if (response.errornum == 0) {
        //将从后端返回的数据传递给data中对象
        this.goods = response.data;
        this.$nextTick(function() {
          this._initscroll();
        });
      }
    });
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.loadData();
  },
  methods: {
    loadData() {
      this.axios.get("/api/goods").then(response => {
        console.log(response.data);
        response = response.data;
        console.log(response.errornum);
        if (response.errornum == 0) {
          //将从后端返回的数据传递给data中对象
          this.goods = response.data.concat(this.goods);
        }
      });
    }
  },
  components: {
    scroll
  }
};
</script>
<style lang="stylus">
    @import '../../common/styles/mixin.styl';
    @import './good.styl';
</style>
