<template>
	<main class="p-4 flex-1 flex flex-col justify-around">
		<div>
			<h1 class="font-orelega text-center md:text-6xl text-3xl mb-2 md:mb-4">
				Get notified when
				<ChangingText class="text-left" :options="['train()', 'fit()']"></ChangingText><br />
				is complete
			</h1>
			<h2 class="md:text-base text-xs text-center mb-7 px-4">
				No need to keep checking your training. Add <strong>just 1 import line</strong> and MLNotify will let you know the second it's done.
			</h2>
			<Count class="md:mb-6 mb-3" :count="statistics.totalTrainingsCount"></Count>
			<div class="text-center text-grey-1 md:text-xl text-xs md:mb-6 mb-8">
				Models have been trained with MLNotify
			</div>
		</div>
		<div>
			<div
				class="mx-auto flex justify-around max-w-7xl bottom-section-container md:flex-row-reverse flex-col space-y-10 md:space-y-0 items-center mb-10"
			>
				<EnterCodeSection v-model="code" class="md:mx-4 bottom-section" />
				<div class="md:mx-4 bottom-section">
					<h3 class="font-orelega text-lg text-center md:hidden mb-7">How to do it yourself</h3>
					<UsageInstructionsSection />
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import Vue from 'vue'

import Count from '../components/Count.vue'
import EnterCodeSection from '../components/EnterCodeSection.vue'
import UsageInstructionsSection from '../components/UsageInstructionsSection.vue'
import ChangingText from '../components/ChangingText.vue'
import { apiService } from '../services/api'
import { Statistics } from '../../netlify/utils/types'

export default Vue.extend({
	name: 'Index',
	components: {
		Count,
		EnterCodeSection,
		UsageInstructionsSection,
		ChangingText,
	},
	data() {
		return {
			code: '',
			statistics: {
				activeTrainingsCount: 0,
				totalTrainingsCount: 0,
			} as Statistics,
			statisticsIntervalToken: null as any,
		}
	},
	beforeMount() {
		this.periodicallyFetchStatistics()
	},
	beforeDestroy() {
		if (this.statisticsIntervalToken) clearInterval(this.statisticsIntervalToken)
	},
	methods: {
		async periodicallyFetchStatistics() {
			let refreshRate = 1000

			const envRefreshRate = process.env.GRIDSOME_STATISTICS_REFRESH_RATE
			if (envRefreshRate && +envRefreshRate) {
				refreshRate = +envRefreshRate
			}

			this.statistics = await apiService.getStatistics()
			this.statisticsIntervalToken = setInterval(async () => {
				this.statistics = await apiService.getStatistics()
			}, refreshRate)
		},
	},
})
</script>
<style lang="scss" scoped>
.bottom-section {
	flex: 1 1 auto;
	width: 280px;

	@media (min-width: 768px) {
		flex: 1 1 450px;
		max-width: 480px;
	}
}
</style>
