<template>
  <div class="home-recommend">
    <div class="home-recommend-item" v-for="(item,index) in recommends" :key="index">
    <a href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
  </div>
</template>

<script>
export default {
  name:'HomeRecommendView',
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .home-recommend{
    display: flex;
    width: 100%;
    font-size: 12px;
    padding: 15px 0 30px 0;
    border-bottom: 9px solid #eee;
  }
  .home-recommend-item{
    flex: 1;
    text-align: center;
  }
  .home-recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>