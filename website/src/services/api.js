export const apiService = {
	async subscribeToTraining(messagingRegistrationToken, trainingId) {
		await fetch('/.netlify/functions/subscribe-to-training', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				messagingRegistrationToken,
				trainingId,
			}),
		})
	},
	async getStatistics() {
		return await fetch('/.netlify/functions/statistics', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	},
}
