import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueCookies from 'vue-cookies'
// import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueCookies)



Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

