// 混入，用于Home.vue和Detail.vue中的图像加载以后的页面刷新
import {debounce} from 'common/utils'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 加入防抖，减少refresh执行次数,这里一定传入函数this.$refs.scroll.refresh，
    // 如果传入this.$refs.scroll.refresh()表示传入该函数返回值
    const newRefresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      newRefresh()
    }

    // 3.监听item中图片加载完成,刷新refresh以重新计算scrollerHeight
    this.$bus.$on('itemImageLoad', this.itemImgListener);
  },
}

import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isBackTop: false,

    }
  },
  methods: {
    backClick() {
      // 点击以后500ms内返回顶部
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
  }
}
