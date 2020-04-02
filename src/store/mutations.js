import {
  ADD_COUNTER,
  ADD_TO_CART,
  CLEAR_CART_LIST,
  SET_CART_LIST,
  SET_LOADING,
  SET_TABBAR_SHOW
} from './mutation-types'

export default {
  // 设置tabBar显示和隐藏
  [SET_TABBAR_SHOW](state, bol) {
    state.tabBarShow = bol;
  },
  // 设置请求加载
  [SET_LOADING](state, bol) {
    state.isLoading = bol;
  },
  //mutations中每个方法尽量只做一件事
  //将addCart中两种情况拆成两个mutations
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = false
    state.cartList.push(payload)
  }
}