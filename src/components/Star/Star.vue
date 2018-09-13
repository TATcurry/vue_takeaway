<template>
  <div class="star" :class="'star-'+ size">
    <span class="star-item" v-for="(item, index) in starArr" :key="index" :class="item"></span>

  </div>
</template>

<script>
    export default {
        name: "Star",
        props:{
          score: Number,
          size: Number
        },
        computed:{
          starArr(){
            const {score} = this
            const star_on = "on"
            const star_half = "half"
            const star_off = "off"
            let arr = []
            for(let i = 0; i < Math.floor(score); i++){
              arr.push(star_on)
            }
            if(Math.floor(score) < score){
              arr.push(star_half)
            }
            while(arr.length < 5){
              arr.push(star_off)
            }
            return arr;
          }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
