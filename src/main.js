import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import FastClick from 'fastclick'

import toast from 'components/common/toast'


// new一个Vue实例作为事件总线
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

// 安装插件，执行use以后自动调用toast中的install函数
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
