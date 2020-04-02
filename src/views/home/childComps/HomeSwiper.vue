<template>
      <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name:'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){ //没必要发送四次，用isload判断是否发送过 因为高度是一样的
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>