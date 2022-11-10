// 入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import 'normalize.css'
import axios from './axios'
import Cookie from 'js-cookie'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
//给vue里添加一个新的属性http，属性的值是我们配置的axios
// 这样配置的话，任何组件发送请求都可以通过this.$http
Vue.prototype.$cookie = Cookie;
Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
