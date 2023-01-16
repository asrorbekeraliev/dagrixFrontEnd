import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import router from "./routers"
import axios from "./axios"

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDY9htfyR8Q8D-yEL1gxTfx3JiIZ8MqJHI',
    // AIzaSyB8NHCF-5fMix0w2363RhC3V4vcyw8SHSM
  },
})

new Vue({
  render: h => h(App),
  router,
  axios,
}).$mount('#app')

