<template>
  <div class="ratingsshow">
     <div class="rating-type">
         <span @click="changeSelectType(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">40</span></span>
         <span @click="changeSelectType(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">40</span></span>
         <span @click="changeSelectType(1,$event)" class="block nagative" :class="{'active':selectType===1}">{{desc.nagative}}<span class="count">40</span></span>
     </div>
     <div class="switch" @click="changeSwitch($event)" :class="{'on':onlyCount}">
         <span class="icon-check_circle"></span>
         <span class="switch-content">只看有内容的评价</span>
     </div>
  </div>
</template>

<script>
const ALL = 2;
const POSITIVE = 0;
const NAGATIVE = 1;
export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return []
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyCount: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: "全部",
                    positive: "满意",
                    nagative: "不满意"
                }
            }
        }

    },
    methods: {
        changeSelectType(type,event){
            if(!event._constructed){
                return ;
            }
            this.selectType = type;
        },
        changeSwitch(event) {
            if(!event._constructed){
                return ;
            }
            this.onlyCount = !this.onlyCount;
        }
    }
}
</script>

<style lang="stylus">
.ratingsshow
    .rating-type
        padding:0px 0px 18px 0px  
        margin:0px 18px
        border-1px(rgba(7,17,27,0.1))
        font-size:0
        .block 
          display :inline-block
          padding: 8px 12px
          border-radius:1px
          margin-right:8px 
          font-size:12px
          color: rgb(77,85,93)
          .count
              font-size:8px
              margin-left:2px
              line-height :16px
          &.positive
              background :rgba(0,160,220,0.2)
              &.active
                background :rgba(0,160,220,0.6)
          &.nagative
              background :rgba(77,85,93,0.2)  
              &.active
                ackground :rgba(77,85,93,0.6)
    .switch
        padding:0px 0px 18px 0px  
        margin:0px 18px
        &.on
            .icon-check_circle
              color:#00c850
        .icon-check_circle
            color: #989595
            font-size: 19px
            position :relative
            top: 2px
        .switch-content
            line-height :24px
            margin-left:4px
</style>
