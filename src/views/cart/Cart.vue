<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{CartLength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import Scroll from "components/common/scroll/Scroll";
  import CartBottomBar from "./childComps/CartBottomBar";

  // 直接将vuex中的getters中的CartLength引入计算属性
  import {mapGetters} from 'vuex'


  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      Scroll,
      CartBottomBar,
    },
    computed: {
      // 写法一
      ...mapGetters(['CartLength']),
      // 写法二 可以自定义名称为length
      // ...mapGetters({
      //   length: 'CartLength'
      // })
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .nav-bar{
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    color: #fff;
    font-weight: 700;
    background-color: var(--color-tint);
  }
  .cart {
    position: relative;
    height: 100vh;
  }

  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 89px;
    overflow: hidden;
  }

</style>
