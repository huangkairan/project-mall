<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  data(){
    return {
      scroll: null
    }
  },
  props:{
    probeType:{
      type:Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType :this.probeType,
      pullUpLoad :this.pullUpLoad
    })
    //监听滚动位置
    if(this.probeType ===2 || this.probeType ===3){
      this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position) //把position 发射emit出去
      })
    }
    //监听上拉加载
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')//上拉加载 emit出去
      })
    }
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time) //判断一下scroll是否加载出来 避免bug
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()  //判断一下scroll是否加载出来 避免bug
    },
    getScrollY(){
      return this.scroll.y
    }
  }
}
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>