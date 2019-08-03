/*
 * @Author: wenhao.huang
 * @UserId: 18073766
 * @Create: 2019-08-03 11:49:27
 */
// package
import Vue from 'vue'
// script
import utils from './utils/index.js'
import router from './router/index.js'
import store from './store/index.js'
// view
import App from './App.vue'
// css
import 'styles/index.scss'
import 'assets/iconfont/iconfont.css'
// use
Vue.use(utils)
// export
export default new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
