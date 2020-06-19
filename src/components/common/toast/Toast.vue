<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>

</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        show: false
      }
    },
    methods: {
      toShow(message, duration=2000) {
        this.show = true
        this.message = message
        setTimeout(() => {
          // 几秒后弹窗消失
          this.show = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 4px 8px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }

</style>
