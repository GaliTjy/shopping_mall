<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommend">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>

  </div>

</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;

  }
  .recommend-item {
    /*均等分*/
    flex: 1;
    text-align: center;
  }
  .recommend img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }

</style>
