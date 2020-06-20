<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button @click.native="checkedChange" :is-check="itemInfo.check"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.img" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="del right" @click="delate">删除</div>
        <div class="item-count right">
          <span @click="add">+</span>
          <span>{{itemInfo.count}}</span>
          <span @click="subtract">-</span>
        </div>
<!--        <div class="item-count right">x{{itemInfo.count}}</div>-->

      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      itemInfo: {
        type: Object,
        default: {}
      }
    },
    methods: {
      checkedChange: function () {
        this.itemInfo.check = !this.itemInfo.check;
        //this.$emit('')
      },
      delate() {
        this.$store.dispatch('delate', this.itemInfo)
      },
      add(){
        this.$store.dispatch('add', this.itemInfo)
      },
      subtract(){
        this.$store.dispatch('subtract', this.itemInfo)
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    height: 35px;
    line-height: 35px;
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

  .del {
    padding-left: 10px;
    color:blue;
  }

  .item-count span{
    border: 1px solid #f2f2f2;
    padding: 5px 8px;
    background-color: #f9e2e6;
  }
  .item-count span:nth-child(-n+2){
    border-right: 0;
  }
  .item-count span:nth-child(2n){
    background-color: #fff;
  }

</style>
