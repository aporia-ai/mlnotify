import { ClientApiConstructor } from './types'
import Vuex from 'vuex'

import DefaultLayout from './layouts/Default.vue'
import './styles/index.scss'
import { VuexStore } from './store'

const client: ClientApiConstructor = async function(Vue: Vue.VueConstructor, { appOptions }): Promise<void> {
	Vue.component('Layout', DefaultLayout)

	Vue.use(Vuex)
	const store = new Vuex.Store(VuexStore)
	appOptions.store = store
	store.dispatch('periodicallyFetchStatistics')
}

export default client
