import Vue      from 'vue'
import App      from './App.vue'
import vuetify  from '@/plugins/vuetify'
import router   from './router'
import axios    from 'axios'
import DisableAutocomplete from 'vue-disable-autocomplete';

Vue.config.productionTip = false
Vue.use(DisableAutocomplete);

Vue.prototype.$http   = axios;
Vue.prototype.$api    = 'https://akb-backend.herokuapp.com/api' // hosted api
Vue.prototype.$public = 'https://akb-backend.herokuapp.com/'    // hosted html

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

new Vue({
  el: '#app',
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
