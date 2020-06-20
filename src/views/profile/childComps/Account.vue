<template>
  <div class="account">
    <div class="item">
      <div class="number">
        <span class="balance">{{0.00}}</span>元
      </div>
      <div class="info">我的余额</div>
    </div>
    <div class="item">
      <div class="number">
        <span class="balance">{{0.00}}</span>个
      </div>
      <div class="info">我的优惠</div>
    </div>
    <div class="item">
      <div class="number">
        <span class="balance">{{0.00}}</span>分
      </div>
      <div class="info">我的积分</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Account"
  }
</script>

<style scoped>
  .account{
    display: flex;
    text-align: center;
    margin-bottom: 5px;
    background-color: #f6f6f6;
    font-size: 13px;
  }
  .item{
    width: 100%;
    padding:18px;
    margin-right: 1px;
    background-color:#fff;
  }
  .account .item:last-child{
    margin-right: 0;
  }

  .item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .item .info{
    margin-top: 6px;
  }



</style>
