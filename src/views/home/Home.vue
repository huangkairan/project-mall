<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">汪街</div></nav-bar>
    <tab-control ref="topTab" class="tab-control"  @tabClick="tabClick" v-show="isTabFixed"></tab-control>
    <scroll class="content"
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
     @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <!-- <tab-control ref="contentTab" class="tab-control" @tabClick="tabClick"></tab-control> -->
      <tab-control ref="tabControl"  @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from 'components/content/tabControl/TabControl'

import { getHomeMultidata ,getProductData} from "network/home";
import { POP, NEW, SELL} from "common/const";
import { debounce } from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

import HomeSwiper from './childComps/HomeSwiper';
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins:[itemListenerMixin,backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods:{//分类tabcontrol的数据结构设计，获取时拿到全部数据，再使用时分开保留
        'pop':{page: 0, list: []},
        'new':{page: 0, list: []},
        'sell':{page: 0, list: []}
      },
      currentType:POP,
      tabOffsetTop: 545,
      isTabFixed:false,
      saveY:0
    };
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getProductdata(POP)
    this.getProductdata(NEW)
    this.getProductdata(SELL)
    
  },
  mounted(){
    // //监听ItemImageLoad 图片加载完成refresh
    // const refresh = debounce(this.$refs.scroll.refresh,500)
    // this.$bus.$on('itemImageLoad',()=>{
    //   refresh()
    // }) //用了混入，这里直接可以删掉了
  },
  methods:{
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getProductdata(type){
        const page = this.goods[type].page + 1 //拿到目前的page，加1，这样每次用这个方法就会多拿一页 而不是写死
        getProductData(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)//将数组元素解构出来依次push
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
      })
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }

      this.$refs.tabControl.currentIndex = index
      this.$refs.topTab.currentIndex = index
    },
    contentScroll(position){
      //判断backtop是否显示
      this.listenShowBackTop(position)
      //判断tabcontrol是否吸顶 istabfixed
      this.isTabFixed = -position.y >this.tabOffsetTop
    },
    loadMore(){
      this.getProductdata(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      
    }
  },
  computed:{
    showGoodsList() {
      return this.goods[this.currentType].list
    }
  }
};
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  top:0;
  left:0;
  right: 0;
  z-index: 9;
}
.tab-control{
  z-index:8;
  position: relative;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */

</style>
