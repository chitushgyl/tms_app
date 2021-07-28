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
		a1(state, provider) {
			state.a1 = provider
		},
		custedit(state, provider) {
			state.custedit = provider
		},
		caredit(state, provider){
			state.caredit = provider
		},
		caradd(state,provider){
			state.caradd = provider
		},
		linesendadd(state,provider){
			state.linesendadd = provider
		},
		linegatadd(state,provider){
			state.linegatadd = provider
		},
	},
	actions: {}
})
export default store
