import DefaultLayout from '~/layouts/Default.vue'
import { firebaseMessagingService } from './services/firebase/messaging.js'

export default function(Vue, { isClient }) {
	if (isClient) {
		firebaseMessagingService.start()
	}
	Vue.component('Layout', DefaultLayout)
}
