<template>
  <div class="bottom-bar">
    <check-button class="select-all" @click.native="checkClick" :isChecked=isSelectAll></check-button>
    <span>全选</span>
    <span class="total-price">合计: ￥{{totalPrice}}</span>
    <span class="buy-product" @click="calClick">结算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters([
      	'cartList',
        'cartLength'
      ]),
    totalPrice(){
      const cartList = this.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item=> item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length === 0 ) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods:{
    checkClick(){
      // 1.判断是否有未选中的按钮
      // 2.有未选中的内容, 则全部选中
      if (!this.isSelectAll) {
        this.$store.state.cartList.forEach(item => {
          item.checked = true;
        })
      } else {
        this.$store.state.cartList.forEach(item => {
          item.checked = false;
        })
      }
    },
    calClick(){
      this.$toast.show('请选择购买的商品',1500)
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #f3f3f3;
    position: absolute;
    bottom: 49px;
    right: 0;
    left: 0;
    line-height: 40px;
    padding-left: 35px;
  }
  .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
   .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 40px;
    float: right;
  }
</style>