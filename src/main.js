import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import loding from './assets/loading.gif'
import VueLazyload from 'vue-lazyload'
import '@/icons' // icon
import '@/permission' // permission control

Vue.use(VueLazyload, {
  loading: loding,
})

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.config.productionTip = false
import API from '@/api';
import CategorySelect from '@/components/CategorySelect';
Vue.component(CategorySelect.name, CategorySelect)
// 引入接口
Vue.prototype.$API = API;
new Vue({
  el: '#app',
  // 注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
  render: h => h(App)
})
