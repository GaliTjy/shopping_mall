<template>
  <div class="normal-list">
    <div class="item" v-for="(item, index) in list" :id="item.id" @click="itemClick(item.id)">
      <span class="icon"><img :src="iconURL(item)" alt=""></span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NormalList",
    props: {
      list: {
        type: Array,
        default(){
          return []
        }
      },
    },
    methods: {
      iconURL(item) {
        return require("assets/img/profile/"+ item.icon)
      },
      itemClick(id){
        if(id === 'cart'){
          this.$router.replace('/cart')
        }
      },
    }
  }
</script>

<style scoped>
  .normal-list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
    margin-top: 15px;
  }

  .normal-list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .icon img {
    width: 20px;
    height: 20px;
  }

  .item .icon {
    margin-top: 3px;
    position: absolute;
    left: 16px;
  }

  .item .info {
    margin-left: 40px;
    border-bottom: 1px solid #f2f2f2;
    padding-left: 5px;
  }

  .normal-list .item:last-child .info{
    border-bottom: none;
  }

</style>
