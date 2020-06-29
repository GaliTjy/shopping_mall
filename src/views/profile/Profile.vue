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
          {icon: 'message.svg', info: '我的消息', id:'message', path:'/cart'},
          {icon: 'pointer.svg', info: '积分商城', id:'pointer', path:'/cart'},
          {icon: 'vip.svg', info: '会员卡', id:'vip', path:'/cart'},
        ],
        cartList: [
          {icon: 'cart.svg', info: '我的购物车', id:'cart', path:'/cart'},
          {icon: 'shopping.svg', info: '下载购物APP', id:'shopping', path:'/cart'},
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
