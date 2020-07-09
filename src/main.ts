import Vue from 'vue'
import App from './App.vue'
import router from './router'

import * as Element from 'element-ui';
import vuescroll from 'vuescroll';

/*import axios from 'axios';
import vueAxios from 'vue-axios';
Vue.use(axios, vueAxios);*/

import http from './http';

import './plugins/element.js'


Vue.config.productionTip = false

Vue.use(Element);
Vue.use(http);
Vue.use(vuescroll);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
