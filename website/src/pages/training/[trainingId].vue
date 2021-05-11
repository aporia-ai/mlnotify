<template>
	<main class="p-4">
		Training Page
	</main>
</template>

<script lang="ts">
import Vue from 'vue'
import { apiService } from '../../services/api'
import { firebaseMessagingService } from '../../services/firebase'
import { notificationService } from '../../services/notification'

export default Vue.extend({
	name: 'Training',
	data() {
		return {
			serviceWorkerRegistration: null as null | ServiceWorkerRegistration,
			hasApprovedNotifications: false,
		}
	},
	computed: {
		trainingId(): string {
			return (this.$route.params.trainingId || '') as string
		},
	},
	async mounted(): Promise<void> {
		this.initMessaging()
	},
	methods: {
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
