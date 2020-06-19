export default {
  // mutations唯一的目的是修改state的状态
  // mutations中的每一个方法尽可能完成的事件比较单一一点
  addCounter(state, payload){
    payload.count++
  },
  addCart(state, payload) {
    payload.count = 1
    payload.check = true
    state.cartList.push(payload)
  }

}
