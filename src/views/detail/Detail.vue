<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <!--    组件原生事件不能直接监听，必须加上.nativ-->
    <back-top @click.native="backClick" v-show="isBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import GoodsList from "components/content/Goods/GoodsList";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  import {debounce} from 'common/utils'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      GoodsList,

      Scroll,

    },
    mixins: [itemListenerMixin, backTopMixin],

    data() {
      return {
        // 1.保存iid
        iid: null,
        // 2.请求数据
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs:[],
        getThemeTopYs: null,
        currentIndex: 0,
        positionY: 0

      }
    },
    created() {
      this.iid = this.$route.query.iid
      // 请求详情数据
      this.getDetail(this.iid)
      // 请求推荐数据
      this.getRecommend()
      //
      this.getThemeTopYs = debounce(() => {
        // 在数据请求完，dom渲染完，图片加载完以后获取组件的offsetTop,并做防抖
        this.$nextTick(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTopYs)

        }, 50);
      })

    },
    mounted() {

    },
    // detail没有keep-alive，因此监听离开销毁组件只能用生命周期函数destroyed()
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      getDetail(iid) {
        getDetail(iid).then(res => {
          // 1.获取顶部轮播图数据
          const data1 = res.result
          this.topImages = data1.itemInfo.topImages
          console.log(data1)

          // 2.获取商品信息(用类保存)
          this.goods = new Goods(data1.itemInfo, data1.columns, data1.shopInfo.services)

          // 3.获取商家信息(用类保存)
          this.shop = new Shop(data1.shopInfo)

          // 4.保存商品的详情数据
          this.detailInfo = data1.detailInfo

          // 5. 获取商品信息(用类保存)
          this.paramInfo = new GoodsParam(data1.itemParams.info, data1.itemParams.rule)

          // 6.取出评论信息
          if (data1.rate.cRate !== 0) {
            this.commentInfo = data1.rate.list[0]
          }
        })
      },
      getRecommend() {
        getRecommend().then(res => {
          console.log(res)
          this.recommends = res.data.list
        })
      },
      // 做刷新
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopYs()
      },
      titleClick(index) {
        // console.log(index);
        this.currentIndex = index
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      // 做滑动标题跟随变颜色的联动效果
      contentScroll(position) {
        this.positionY = -position.y
        // console.log(this.positionY)
        for(let i=0; i<this.themeTopYs.length; i++) {
          if(this.currentIndex !== i && ((i<this.themeTopYs.length-1 && this.positionY >= this.themeTopYs[i] && this.positionY < this.themeTopYs[i+1])
            || (i===this.themeTopYs.length-1 && this.positionY >= this.themeTopYs[i]))){
            this.currentIndex = i
            console.log(this.currentIndex)
            this.$refs.detailNavBar.currentItem = this.currentIndex
          }
        }
        // 判断BackTop是否显示
        this.isBackTop = position.y < -1000;
      },
      addCart() {
        // 获取购物车需要展示的信息
        const product = {}
        product.img = this.topImages[0]
        product.title = this.goods.title
        product.disc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        product.count = 0
        this.$store.dispatch('addcart', product)
        this.$store.commit('addcart', product)
        console.log(product);

      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
  }
  .detail-nav-bar {
    position: relative;
    z-index: 99;
    background-color: #fff;
  }
  .content {
    position: absolute;
    top:44px;
    bottom: 58px;
    left: 0;
    right: 0;

  }

</style>
