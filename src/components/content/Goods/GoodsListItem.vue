<template>
  <div class="goods-item" @click="goodsItemClick">
<!--    监听图片是否加载完成-->
      <img :src="showImg" alt="" @load="imgLoad">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImg() {
        return  this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoad() {
        // 事件总线
        this.$bus.$emit('itemImageLoad')
      },
      goodsItemClick() {
        this.$router.push({
          path: '/detail',
          query: {iid: this.goodsItem.iid}
        })
      }

    },
    data() {
      return {
        iid: 0
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    position: relative;
    width: 48%;
    padding-bottom: 40px;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px

  }
  .goods-info {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    font-size: 12px;
    text-align: center;

  }
  .goods-info p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before {
    content:'';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
