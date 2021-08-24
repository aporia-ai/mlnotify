import { ClientApiConstructor } from './types'
import Vuex from 'vuex'
import VueGtag from 'vue-gtag'

import DefaultLayout from './layouts/Default.vue'
import './styles/index.scss'
import { VuexStore } from './store'
import 'vue-toast-notification/dist/theme-sugar.css'

const client: ClientApiConstructor = async function(
	Vue: Vue.VueConstructor,
	{ appOptions, head, router, isClient },
): Promise<void> {
	head.htmlAttrs = { lang: 'en-US' }

	// Social meta tags
	const metaObjects = [
		{name: 'og:type', content: 'website'},
		{name: 'og:url', content: 'https://mlnotify.aporia.com/'},
		{name: 'og:title', content: 'ML Notify'},
		{
			name: 'og:description',
			content: 'MLNotify is an open-source tool that keeps track of model training for you, and sends web, mobile, or email  notifications the second training is complete.'
		},
		{
			name: 'og:image',
			content: `${process.env.GRIDSOME_BASE_URL}/seo/image.png`
		},
		{name: 'twitter:card', content: 'summary_large_image'},
		{name: 'twitter:url', content: 'https://mlnotify.aporia.com/'},
		{name: 'twitter:title', content: 'ML Notify'},
		{
			name: 'twitter:description',
			content: 'MLNotify is an open-source tool that keeps track of model training for you, and sends web, mobile, or email  notifications the second training is complete.'
		},
		{
			name: 'twitter:image',
			content: `${process.env.GRIDSOME_BASE_URL}/seo/image.png`
		}
	]
	metaObjects.forEach(e => head.meta.push(e))

	// Toasts
	if (isClient) {
		import('vue-toast-notification').then(({ default: VueToast }) => {
			Vue.use(VueToast)
		})
	}

	// GTag (Analytics)
	Vue.use(VueGtag, { config: { id: 'G-1C7PHXXTFE' } }, router)

	// Layout
	Vue.component('Layout', DefaultLayout)

	// Store
	Vue.use(Vuex)
	const store = new Vuex.Store(VuexStore)
	appOptions.store = store
}

export default client
