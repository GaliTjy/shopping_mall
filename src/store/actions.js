export default {
  // 尽量从action -> mutation -> 修改state
  addcart(context, payload) {
    return new Promise((resolve, reject) => {
      const oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)
      if(oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      }else{
        context.commit('addCart', payload)
        resolve('当前商品+1')
      }
    })
  }
}
