import { ClientApiConstructor } from './types'
import Vuex from 'vuex'
import VueGtag from 'vue-gtag'
import VueGtm from '@gtm-support/vue2-gtm';

import DefaultLayout from './layouts/Default.vue'
import './styles/index.scss'
import { VuexStore } from './store'
import 'vue-toast-notification/dist/theme-sugar.css'

const client: ClientApiConstructor = async function(
	Vue: Vue.VueConstructor,
	{ appOptions, head, router, isClient },
): Promise<void> {
	head.htmlAttrs = { lang: 'en-US' }

	// Toasts
	if (isClient) {
		import('vue-toast-notification').then(({ default: VueToast }) => {
			Vue.use(VueToast)
		})
	}

	// GTag (Analytics)
	Vue.use(VueGtag, { config: { id: 'G-1C7PHXXTFE' } }, router)

	// Google tag manager
	Vue.use(VueGtm, {id: 'GTM-MBSTH6F', vueRouter: router,})

	// Layout
	Vue.component('Layout', DefaultLayout)

	// Store
	Vue.use(Vuex)
	const store = new Vuex.Store(VuexStore)
	appOptions.store = store
}

export default client
