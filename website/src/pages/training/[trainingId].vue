<template>
	<div class="flex-1">
		<div
			class="bg-blue-1 transition-all text-white-0 h-0 flex justify-center items-center overflow-hidden"
			:class="{ 'h-14': !shouldHideNotificationsBanner }"
		>
			<div>
				<span class="font-bold">MLNotify</span> needs your permission to
				<button class="underline">enable desktop notifications</button>
			</div>
		</div>
		<main class="p-4">
			Training Page
		</main>
		<MobileNotificationDialog
			v-model="isMobileNotificationDialogOpen"
			@close="isMobileNotificationDialogOpen = false"
			@approve="askForNotificationPermission"
		/>
		<DesktopNotificationDialog v-model="isDesktopNotificationDialogOpen" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

import MobileNotificationDialog from '../../components/MobileNotificationDialog.vue'
import DesktopNotificationDialog from '../../components/DesktopNotificationDialog.vue'
import { firebaseMessagingService } from '../../services/firebase'

export default Vue.extend({
	name: 'Training',
	components: {
		MobileNotificationDialog,
		DesktopNotificationDialog,
	},
	data() {
		return {
			isInitializing: true,
			isMobileNotificationDialogOpen: false,
			isDesktopNotificationDialogOpen: false,
			areNotificationsApproved: firebaseMessagingService.hasApprovedNotifications(),
		}
	},
	computed: {
		trainingId(): string {
			return (this.$route.params.trainingId || '') as string
		},
		shouldHideNotificationsBanner(): boolean {
			const isDialogOpen = this.isMobileNotificationDialogOpen || this.isDesktopNotificationDialogOpen
			return this.isInitializing || isDialogOpen || this.areNotificationsApproved
		},
	},
	async beforeMount(): Promise<void> {
		if (!this.trainingId) {
			this.$router.replace('/')
			return
		}

		this.checkNotificationPermission()
	},
	methods: {
		async checkNotificationPermission() {
			await this.$store.dispatch('initServiceWorker')

			if (firebaseMessagingService.hasApprovedNotifications()) {
				try {
					await this.askForNotificationPermission()
				} finally {
					this.isInitializing = false
				}
				return
			}

			if (window.innerWidth < 768) {
				this.isMobileNotificationDialogOpen = true
				this.isInitializing = false
			} else {
				this.isDesktopNotificationDialogOpen = true
				this.isInitializing = false
				await this.askForNotificationPermission()
				this.isDesktopNotificationDialogOpen = false
			}
		},
		async askForNotificationPermission(): Promise<void> {
			try {
				await this.$store.dispatch('getNotificationPermission')

				this.$store.dispatch('subscribeToTraining', { trainingId: this.trainingId })
			} finally {
				this.areNotificationsApproved = firebaseMessagingService.hasApprovedNotifications()
				this.isMobileNotificationDialogOpen = false
				this.isDesktopNotificationDialogOpen = false
			}
		},
	},
})
</script>
