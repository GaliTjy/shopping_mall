<template>
  <div class="cart-bottom-bar">
    <div class="check-content" @click="checkClick">
      <check-button class="check-button" :is-check="isCheck"></check-button>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计: ￥{{totalPrice}}
    </div>

    <div class="calculated" @click="toCalculated">
      去结算({{calculated}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,
    },
    computed: {
      totalPrice() {
        let sum = 0
        for (let i = 0; i < this.$store.state.cartList.length; i++) {
          if (this.$store.state.cartList[i].check) {
            sum += this.$store.state.cartList[i].price * this.$store.state.cartList[i].count
          }
        }
        return sum.toFixed(2)
      },
      calculated() {
        let count = 0
        for (let i = 0; i < this.$store.state.cartList.length; i++) {
          if (this.$store.state.cartList[i].check) {
            count += 1
          }
        }
        return count
      },
      isCheck() {
        let count = 0
        for(let i=0; i<this.$store.state.cartList.length; i++){
          if(this.$store.state.cartList[i].check){
            count += 1
          }
        }
        if(count === this.$store.state.cartList.length && count !== 0){
          return true
        }else{
          return false
        }
      },
    },
    methods: {
      checkClick(){
        if(this.isCheck){
          // for(let i=0; i<this.$store.state.cartList.length; i++){
          //   this.$store.state.cartList[i].check = false
          // }
          this.$store.state.cartList.forEach(item => item.check = false)
        }else {
          for (let i = 0; i < this.$store.state.cartList.length; i++) {
            this.$store.state.cartList[i].check = true
          }
        }
      },
      toCalculated(){
        if(!this.calculated){
          this.$toast.toShow('请选择购买的商品', 1500)
        }else{
          this.$toast.toShow('已选择'+this.calculated+'件商品', 1500)
        }
      }
    }
  }

</script>

<style scoped>
  .cart-bottom-bar{
    height: 40px;
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;

  }
  .check-button{
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .total-price{
    margin-left: 10px;
    flex: 1;
  }
  .calculated {
    width: 80px;
    height: 100%;
    line-height: 40px;
    text-align: center;
    background-color: red;
    color: #fff;
  }



</style>
