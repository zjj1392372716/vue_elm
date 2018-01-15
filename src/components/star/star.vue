<template>
  <div class="star" :class="startype">
      <span v-for="item in itemsClass" :class="item" class="star-item"></span>
  </div>
</template>
<script type="text/ecmascript-6">
const LENGTH = 5;
const STR_ON = 'on';
const STR_HALF = 'half';
const STR_OFF = 'off';

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed:{
      startype() {
          return 'star-' +this.size;
      },
      itemsClass() {
          let result =[];
          let score = Math.floor(this.score * 2) / 2;//3.4->3   4.5->4.5    4.6->4.5
          let hasDecimal = false;
          if(score % 1 ==0){
              hasDecimal = false;
          }else{
              hasDecimal = true;
          }
          let integer = Math.floor(score);
          for(let i=0; i<integer ;i++){
              result.push(STR_ON);
          }
          if(hasDecimal){
              result.push(STR_HALF);
          }
          while(result.length < LENGTH){
              result.push(STR_OFF);
          }
          return result;      
      }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
    .star
        font-size:0
        .star-item
            display :inline-block
            background-repeat:no-repeat
        &.star-48
            .star-item
                width:22px
                height:22px
                margin-right:22px
                background-size:22px 22px
                &.last-child
                    margin-right:0px
                &.on
                    bg-image('star48_on')
                &.half
                    bg-image('star48_half')
                &.off
                    bg-image('star48_off')
        &.star-36
            .star-item
                width:15px
                height:15px
                margin-right:15px
                background-size:15px 15px
                &.last-child
                    margin-right:0px
                &.on
                    bg-image('star36_on')
                &.half
                    bg-image('star36_half')
                &.off
                    bg-image('star36_off')
        &.star-24
            .star-item
                width:10px
                height:10px
                margin-right:3px
                background-size:10px 10px
                &.last-child
                    margin-right:0px
                &.on
                    bg-image('star24_on')
                &.half
                    bg-image('star24_half')
                &.off
                    bg-image('star24_off')

</style>
