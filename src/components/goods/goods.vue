<template>
  <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul ref="menus">
            <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex==index}" @click="selectMenu(index,$event)">
                <div class="menu-item-box boder-1" >
                    <span class="goods-text"><span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
                </div>
            </li>
        </ul>
      </div>
      <div class="food-wrapper" ref='foodWrapper'>
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
                            <div class="cart">
                                <CartControl :food="food"></CartControl>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
          </ul>
      </div>
      <shopcar :selectFoods="selectFoods" :minPrice="seller.minPrice" :prices="seller.deliveryPrice"></shopcar>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
import Shopcar from '../../components/shopcar/shopcar.vue'
import CartControl from '../../components/cartcontrol/cartcontrol.vue'

    export default{
        props:{
            seller:{
                type:Object
            }
        },
        data (){
            return {
                goods:{

                },
                listHeight:[],
                scrollY:0
            }
        },
        components:{
            Shopcar,
            CartControl
        },
        computed:{
            currentIndex:function() {
                for(var i=0;i<this.listHeight.length;i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];

                if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
                    return i;
                }
            }
            return 0;
            },
            selectFoods() {
                let arr=[];
                for(var i=0;i<this.goods.length;i++){
                    this.goods[i].foods.forEach(function(item){
                        //如果被选中了，count就存在了也就大于0了
                        if(item.count){
                            arr.push(item);
                        }
                    })
                }
                return arr;
            }
        },
        created() {
            this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
            this.axios.get('/api/goods').then((response) => {
                console.log(response.data)
                response = response.data
                console.log(response.errornum);
                if (response.errornum == 0) {
                    //将从后端返回的数据传递给data中对象
                    this.goods = response.data;
                    this.$nextTick(function(){
                        this._initscroll();
                        this._calculateHeight();
                    })
                }

                })
        },
        methods:{
            _initscroll:function(){
                this.menuScroll = new Bscroll(this.$refs.menuWrapper,{
                    click:true
                })
                this.foodScroll = new Bscroll(this.$refs.foodWrapper,{
                    probeType: 3,//probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
                    click:true
               })
               this.foodScroll.on('scroll',function(pos){
                    this.scrollY = Math.abs(Math.round(pos.y));
                })

            },
            _calculateHeight:function(){
                //获取右侧food列表的高度，并写入listHeight数组中
                let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');//获取每一个区块
                let height = 0;
                this.listHeight.push(height);
                for(let i=0;i<foodList.length;i++)
                {
                    let item = foodList[i].clientHeight;
                    //将每一个区块的高度都储存到数组中
                    height += item;
                } 
            },
            selectMenu:function(index,event){
                if(!event._constructed)
                {
                    return ;
                }
                let foodlist = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
                let el = foodlist[index];
                this.foodScroll.scrollToElement(el,1000); 
                let children = this.$refs.menus.getElementsByClassName('menu-item');
                // children[index].siblings.removeClass('current')
            }
        }

    }
</script>
<style lang="stylus">
    @import '../../common/stylus/mixin.styl';
    @import './good.styl';
</style>
