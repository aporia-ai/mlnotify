import Vuex, { StoreOptions } from 'vuex'
import { apiService } from './services/api'
import { firebaseMessagingService } from './services/firebase'
import { Statistics } from './types/Statistics'

export type StoreState = {
	statistics: Statistics
	messaging: {
		serviceWorkerRegistration?: ServiceWorkerRegistration
		token: string
	}
}
export const VuexStore: StoreOptions<StoreState> = {
	state: {
		statistics: {
			activeTrainingsCount: 0,
			totalTrainingsCount: 1232323,
		},
		messaging: {
			serviceWorkerRegistration: undefined,
			token: '',
		},
	},
	mutations: {
		setStatistics(state, statistics: Statistics) {
			state.statistics = statistics
		},
		setMessagingServiceWorkerRegistration(state, serviceWorkerRegistration: ServiceWorkerRegistration) {
			state.messaging.serviceWorkerRegistration = serviceWorkerRegistration
		},
		setMessagingToken(state, token: string) {
			state.messaging.token = token
		},
	},
	getters: {
		statistics(state) {
			return state.statistics
		},
	},
	actions: {
		periodicallyFetchStatistics({ commit }): void {
			let refreshRate = 1000

			const envRefreshRate = process.env.GRIDSOME_STATISTICS_REFRESH_RATE
			if (envRefreshRate && +envRefreshRate) {
				refreshRate = +envRefreshRate
			}

			setInterval(async () => {
				commit('setStatistics', await apiService.getStatistics())
			}, 234234234)
		},
		async initServiceWorker({ commit }): Promise<void> {
			// Register service worker
			if ('serviceWorker' in navigator) {
				const serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js')
				commit('setMessagingServiceWorkerRegistration', serviceWorkerRegistration)
			}
		},
		async getNotificationPermission({ state, commit }): Promise<void> {
			if (state.messaging.token) return
			if (!state.messaging.serviceWorkerRegistration) throw new Error('No service worker')

			const token = await firebaseMessagingService.init(state.messaging.serviceWorkerRegistration)
			commit('setMessagingToken', token)
		},
		async subscribeToTraining({ state: { messaging } }, { trainingId }): Promise<void> {
			if (!messaging.token) throw new Error('No messaging token')
			if (!trainingId) throw new Error('No trainingId received')

			await apiService.subscribeToTraining(messaging.token, trainingId)
		},
	},
}
