import DefaultLayout from '~/layouts/Default.vue'

export default async function(Vue, { isClient }) {
	if (isClient) {
		const { firebaseMessagingService } = await import('./services/firebase/messaging.js')
		firebaseMessagingService.start(await navigator.serviceWorker.register('/sw.js'))
	}
	Vue.component('Layout', DefaultLayout)
}
