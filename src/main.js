import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(Toast)
//解决移动端300ms延迟
FastClick.attach(document.body)

//图片懒加载
Vue.use(VueLazyLoad)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()//创建一个事件总线


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
