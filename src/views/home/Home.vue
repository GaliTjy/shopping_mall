<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @itemClick="itemClick"
                 ref="tabControl1"
                 v-show="isActive"
                 class="tab-control"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner" @imgLoad="imgLoad"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <!--    这里只有传字符串的时候不用加：，其它都要加-->
      <tab-control :titles="['流行','新款','精选']"
                   @itemClick="itemClick"
                   ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
<!--    组件原生事件不能直接监听，必须加上.nativ-->
    <back-top @click.native="backClick" v-show="isBackTop"></back-top>
  </div>
</template>

<script>
  // 导入子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  // 导入公共组件
  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/Goods/GoodsList";
  import Scroll from 'components/common/scroll/Scroll';


  // 导入服务器数据
  import {getHomeMultidata, getHomeGoods} from 'network/home';
  import {itemListenerMixin, backTopMixin} from 'common/mixin'




  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,

    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        // 轮播图数据
        banner: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isBackTop: false,
        offsetTop: 0,
        isActive: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    // 生命周期函数，一旦创建完组件就发送网络请求
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // // 加入防抖，减少refresh执行次数,这里一定传入函数this.$refs.scroll.refresh，
      // // 如果传入this.$refs.scroll.refresh()表示传入该函数返回值
      // const refresh = debounce(this.$refs.scroll.refresh, 500);
      //
      // // 3.监听item中图片加载完成,刷新refresh以重新计算scrollerHeight
      // this.$bus.$on('itemImageLoad', () => {
      //   refresh()
      // });
    },
    methods: {
      // 监听轮播图是否加载完成,加载完成以后计算tabControl的offsetTop值
      imgLoad() {
        this.offsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      // 事件监听相关方法
      itemClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index
      },

      contentScroll(position) {
        // 判断BackTop是否显示
        this.isBackTop = position.y < -1000;
        // 判断是否tabControl吸顶
        this.isActive = -position.y > this.offsetTop
      },
      loadMore() {
        console.log('shangla')
        this.getHomeGoods(this.currentType)
      },
      // 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
        // console.log(res);
          })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          const newlsit = res.data.list
          // push这个函数可以传入多个参数，表示一个一个分开push进去，传入一个list一定要加...
          this.goods[type].list.push(...newlsit)
          this.goods[type].page = page
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    // 当路由外包裹keep-alive(组件缓存)后可使用，进入页面触发
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
      console.log('回到home')

    },
    // 离开时触发
    deactivated() {
      // 1.保存高度值
      this.saveY = this.$refs.scroll.getScrollY()
      console.log('离开home')
      // 2.取消全局事件监听bus,后面传入一个函数this.itemImgListener，
      // 表示取消的是这个函数的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #home {
    /*100%的视图高度*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    /*在使用浏览器原生滚动时，为了使导航不随着一起滚动而设置的属性*/
    /*position: sticky;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 999;*/
    background-color: var(--color-tint);
    color: #fff;
  }
  .content {
    /*height: calc(100% - 44px - 49px);*/
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>
