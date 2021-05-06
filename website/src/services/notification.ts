export const notificationService = {
	async requestNotificationPermission(): Promise<void> {
		const permission = await Notification.requestPermission()

		if (permission !== 'granted') {
			throw new Error('Unable to get permissions to notifications')
		}
	},
	hasApprovedNotifications(): boolean {
		return Notification.permission === 'granted'
	},
}
