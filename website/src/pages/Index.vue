<template>
	<Layout class="text-4xl">
		Index Page
		{{ statistics }}
	</Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { apiService } from '../services/api'
import { firebaseMessagingService } from '../services/firebase'
import { notificationService } from '../services/notification'

export default Vue.extend({
	name: 'Index',
	data() {
		return {
			serviceWorkerRegistration: null as null | ServiceWorkerRegistration,
			hasApprovedNotifications: false,
			statistics: {},
		}
	},
	computed: {
		trainingId(): string {
			return (this.$route.query['training-id'] || '') as string
		},
	},
	async mounted(): Promise<void> {
		this.initMessaging()
		this.periodicallyFetchStatistics()
		this.askForNotificationPermission()
	},
	methods: {
		periodicallyFetchStatistics(): void {
			let refreshRate = 1000
			console.log(process.env.GRIDSOME_STATISTICS_REFRESH_RATE, 111)
			console.log(process.env.GRIDSOME_STATISTICS_REFRESH_RATE2, 222)
			if (process.env.GRIDSOME_STATISTICS_REFRESH_RATE && +process.env.GRIDSOME_STATISTICS_REFRESH_RATE) {
				refreshRate = +process.env.GRIDSOME_STATISTICS_REFRESH_RATE
			}

			setInterval(async () => {
				this.statistics = await apiService.getStatistics()
			}, refreshRate)
		},
		async initMessaging(): Promise<void> {
			// Register service worker
			this.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js')

			// Start Firebase
			const token = await firebaseMessagingService.init(this.serviceWorkerRegistration)

			// Subscribe to training if we have a training id
			if (this.trainingId) {
				await apiService.subscribeToTraining(token, this.trainingId)
			}
		},
		async askForNotificationPermission(): Promise<void> {
			await notificationService.requestNotificationPermission()
			this.hasApprovedNotifications = true
		},
	},
})
</script>
