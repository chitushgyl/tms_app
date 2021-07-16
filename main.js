import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store/index';
// import tabBar from './components/tabbar.vue';
// Vue.component('tabBar', tabBar);
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
