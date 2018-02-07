// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import '!style-loader!css-loader!less-loader!./theme/index.less'
// import '@/assets/font-awesome.min.css'/*引入公共样式*/

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
