import Vue from 'vue'
import App from './App'

import router from './router'

// new一个Vue实例作为事件总线
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,

  render: h => h(App)
}).$mount('#app')
