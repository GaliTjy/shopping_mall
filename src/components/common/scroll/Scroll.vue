<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null,
      }
    },
    // 需要外面传入，要有封装思想
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // 拿到dom元素用this.$refs.wrapper，并且在dom中要有ref属性
      // 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 控制BScroll控制里的div是否可以点击，里面的button肯定可以点击，div等其他元素只有click设置为true才可监听到点击事件
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 监听滚动事件
      if (this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
          this.$bus.$emit('scroll', position)
        })
      }

      // 监听上拉加载事件(滚动到底部)
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

    },
    methods: {
      scrollTo(x, y, time=500) {
        // scroll方法，滚回特定位置
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 封装一个可以反复上拉的函数，如果没有这个函数，只能监听一次上拉事件
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
        // console.log('-----')
      },
      getScrollY() {
        return this.scroll? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
