<template>
  <nav-bar>
    <div slot="left" class="imgItem">
      <img src="~assets/img/common/back.svg" alt="" @click="backClick">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in title"
           class="title-item"
           @click="itemClick(index)"
           :class="{active: currentItem === index}">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";


  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        title: ['商品','参数','评论','推荐'],
        currentItem: 0
      }
    },

    methods: {
      itemClick(index) {
        this.currentItem = index;
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
      },

    }

  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .title-item {
    flex: 1
  }
  .imgItem img {
    vertical-align: middle;
    width: 15px;
    height: 15px;
  }
  .active{
    color: var(--color-high-text)
  }


</style>
