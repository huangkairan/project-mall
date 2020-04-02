import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
import {BACK_POSITION} from 'common/const'

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null
    }
  },
  mounted(){
    let newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () =>{
      newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
    // console.log('haha');
  }
}

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backTop() {
			this.$refs.scroll.scrollTo(0, 0, 1000)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION
    }
	}//在别的组件中使用backTop，直接引入mixin,然后<back-top @click.native="backTop" v-show="isShowBackTop"></back-top>就行了
}