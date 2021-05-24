import { StoreOptions } from 'vuex'
import { apiService } from './services/api'
import { firebaseMessagingService } from './services/firebase'

export type StoreState = {
	messaging: {
		serviceWorkerRegistration?: ServiceWorkerRegistration
		token: string
	}
}
export const VuexStore: StoreOptions<StoreState> = {
	state: {
		messaging: {
			serviceWorkerRegistration: undefined,
			token: '',
		},
	},
	mutations: {
		setMessagingServiceWorkerRegistration(state, serviceWorkerRegistration: ServiceWorkerRegistration) {
			state.messaging.serviceWorkerRegistration = serviceWorkerRegistration
		},
		setMessagingToken(state, token: string) {
			state.messaging.token = token
		},
	},
	actions: {
		async initServiceWorker({ commit }): Promise<void> {
			if (!('serviceWorker' in navigator)) throw new Error('Service workers not supported')

			const serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js')
			commit('setMessagingServiceWorkerRegistration', serviceWorkerRegistration)
		},
		async getNotificationPermission({ state, commit }): Promise<void> {
			if (state.messaging.token) return
			if (!state.messaging.serviceWorkerRegistration) throw new Error('No service worker')

			const token = await firebaseMessagingService.askNotificationPermission(
				state.messaging.serviceWorkerRegistration,
			)
			commit('setMessagingToken', token)
		},
		async subscribeToTrainingNotification({ state: { messaging } }, { trainingId }): Promise<void> {
			if (!messaging.token) throw new Error('No messaging token')
			if (!trainingId) throw new Error('No trainingId received')

			await apiService.subscribeToTrainingNotification(messaging.token, trainingId)
		},
		async showSuccessNotification(
			context,
			{
				notification: notificationOptions,
			}: { data: Record<string, string>; notification: Record<string, string> },
		) {
			if (!('Notification' in window)) throw new Error('Notifications not supported')

			const notification = new Notification(notificationOptions.title, notificationOptions)

			notification.addEventListener('click', event => {
				parent.focus()
				window.focus() //just in case, older browsers
			})
		},
	},
}
