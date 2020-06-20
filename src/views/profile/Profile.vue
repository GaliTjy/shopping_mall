<template>
  <div class="profile">
    <pro-nav-bar></pro-nav-bar>
    <use-info></use-info>
    <account></account>
    <normal-list :list="normalList"></normal-list>
    <normal-list :list="cartList"></normal-list>


  </div>

</template>

<script>
  import ProNavBar from "./childComps/ProNavBar";
  import UseInfo from "./childComps/UseInfo";
  import Account from "./childComps/Account";
  import NormalList from "./childComps/NormalList";

  export default {
    name: "Profile",
    components: {
      ProNavBar,
      UseInfo,
      Account,
      NormalList,
    },
    data() {
      return {
        normalList: [
          {icon: 'message.svg', info: '我的消息'},
          {icon: 'pointer.svg', info: '积分商城'},
          {icon: 'vip.svg', info: '会员卡'},
        ],
        cartList: [
          {icon: 'cart.svg', info: '我的购物车'},
          {icon: 'shopping.svg', info: '下载购物APP'},
        ]



      }

    }
  }
</script>

<style scoped>
  .profile {
    background-color: #f6f6f6;
  }


</style>
