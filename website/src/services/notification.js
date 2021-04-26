export const notificationService = {
	async requestNotificationPermission() {
		const permission = await Notification.requestPermission()

		if (permission !== 'granted') {
			throw new Error('Unable to get permissions to notifications')
		}
	},
}
