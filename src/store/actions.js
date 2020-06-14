export default {
  // 尽量从action -> mutation -> 修改state
  addcart(context,payload) {
    const oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)
    if(oldProduct) {
      context.commit('addCounter', oldProduct)
    }else{
      context.commit('addCart', payload)
    }
  },
}
