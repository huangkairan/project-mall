<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar"
 

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { itemListenerMixin,backTopMixin} from "common/mixin";
import { debounce } from "common/utils";
import { BACK_POSITION } from "common/const";
import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    //请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      //顶部轮播数据
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      // this.$nextTick(()=>{
      //   //根据最新数据，对应的dom已经被渲染，但是图片还没加载完
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);

      // })
    });
    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh();
      //在加载图片完了以后进行给themeTopYs的参数赋值
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for (let i = 0; i < this.themeTopYs.length-1; i++) {
        if(this.currentIndex !==i && (positionY >this.themeTopYs[i] && positionY< this.themeTopYs[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
          // console.log(i);
          
        }
      }
      this.listenShowBackTop(position)
    },
    addToCart(){
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      //将商品添加到购物车
      this.addCart(product).then(res=>{
        // console.log(res);
        this.$toast.show(res,1500)
        // console.log(this.$toast);
        
      })
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res)
      // })//传actions,用了mapActions后上面直接调用映射的addCart时，vuex内部就会做dispatch这个操作
    }
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}
</style>
