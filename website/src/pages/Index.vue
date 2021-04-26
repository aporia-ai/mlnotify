<template>
	<Layout>
		Index Page
		{{ statistics }}
	</Layout>
</template>

<script>
import { apiService } from './services/api'
import { firebaseMessagingService } from './services/firebase'
import { notificationService } from './services/notification'

export default {
	name: 'Index',
	data() {
		return {
			serviceWorkerRegistration: null,
			hasApprovedNotifications: false,
			statistics: {},
		}
	},
	async mounted() {
		this.initMessaging()
		this.periodicallyFetchStatistics()
		this.askForNotificationPermission()
	},
	methods: {
		periodicallyFetchStatistics() {
			setInterval(async () => {
				this.statistics = await apiService.getStatistics()
			}, 1000)
		},
		async initMessaging() {
			// Register service worker
			this.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js')

			// Start Firebase
			const token = firebaseMessagingService.init(this.serviceWorkerRegistration)

			// Subscribe to training if we have a training id
			if (this.trainingId) {
				await apiService.subscribeToTraining(token, this.trainingId)
			}
		},
		async askForNotificationPermission() {
			await notificationService.requestNotificationPermission()
			this.hasApprovedNotifications = true
		},
	},
	computed: {
		trainingId() {
			return this.$route.query['training-id']
		},
	},
}
</script>
