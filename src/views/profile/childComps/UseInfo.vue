<template>
  <div class="useInfo">
    <div class="left">
      <img src="~assets/img/profile/avatar.svg" alt="">
    </div>
    <div class="center">
      <div class="login">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="right">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>

  </div>

</template>

<script>
  export default {
    name: "UseInfo",

  }
</script>

<style scoped>
  .useInfo{
    height: 85px;
    padding: 6px 12px;
    background-color: var(--color-tint);
    display: flex;

  }
  /*.useInfo>div {*/
  /*  flex:1;*/
  /*}*/
  .left{
    display: flex;
    align-items: center;
    width: 80px;
  }

  .left img{
    width: 70px;
    height: 70px;


  }
  .center{
    flex: 1;

  }
  .center .login{
    margin-top: 20px;
    color:#fff;
    font-size: 16px;
  }
  .center .phone{
    font-size: 13px;
    color:#fff;
    margin-top: 5px;
  }
  .center .phone img{
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  .right{
    width: 25px;
    display: flex;
    align-items: center;
  }

  .right img{
    width: 20px;
    height: 20px;
  }


</style>
