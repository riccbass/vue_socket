import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bulma/css/bulma.css';

import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
