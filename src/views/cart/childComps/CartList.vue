<template>
  <div class="cart-list">
    <cart-list-item v-for="(item, index) in CartList"
    :item-info="item"></cart-list-item>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    components: {
      CartListItem,

    },
    computed: {
      ...mapGetters(['CartList'])
    },

  }
</script>

<style scoped>

</style>
