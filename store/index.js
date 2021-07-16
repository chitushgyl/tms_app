import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		editor: null,
		addcar_info:null
	},
	mutations: {
		addValue(state, provider) {
			state.editor = provider
		},
		addcar_info(state, provider) {
			state.addcar_info = provider
		},
	},
	actions: {}
})
export default store
