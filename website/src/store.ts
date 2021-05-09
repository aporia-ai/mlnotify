import Vuex, { StoreOptions } from 'vuex'
import { apiService } from './services/api'
import { Statistics } from './types/Statistics'

export const VuexStore: StoreOptions<{ statistics: Statistics }> = {
	state: {
		statistics: {
			activeTrainingsCount: 0,
			totalTrainingsCount: 0,
		},
	},
	mutations: {
		setStatistics(state, statistics: Statistics) {
			state.statistics = statistics
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
			}, refreshRate)
		},
	},
}
