import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      let oldProduct = context.state.cartList.find(item=>{
        return item.iid ===payload.iid
      })
      
      if(oldProduct){//判断是否有旧商品
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品数量+1')
      }else{
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新商品')
      }
    })
  }
}