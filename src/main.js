import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
// 图片懒加载
Vue.use(VueLazyload,
  {
    // loading: require("./assets/img/common/placeholder.png")
    preLoad: 0,
    error: 'dist/error.png',
    attempt: 1
  })
// 事件总线
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
