<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "HomeSwiper",
    // 父传子
    props: {
      banner: {
        type: Array,
        // 默认参数是个函数
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem,
    },
  }
</script>

<style scoped>

</style>
