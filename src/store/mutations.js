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
  },
  delate(state, payload){
    let newstate = state.cartList.filter(ele => ele.iid !== payload.iid)
    state.cartList = newstate
  },
  add(state, payload){
    for(let i=0; i<state.cartList.length; i++){
      if(state.cartList[i].iid === payload.iid){
        state.cartList[i].count += 1
        break
      }
    }
  },
  subtract(state, payload){
    console.log(state)
    for(let i=0; i<state.cartList.length; i++){
      if(state.cartList[i].iid === payload.iid && state.cartList[i].count>0){
        state.cartList[i].count -= 1
        break
      }
    }
  },

}
