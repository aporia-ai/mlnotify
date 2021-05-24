import { Statistics } from '../types/Statistics'

export const apiService = {
	async subscribeToTrainingNotification(messagingRegistrationToken: string, trainingId: string): Promise<void> {
		await fetch('/.netlify/functions/subscribe-to-training-notification', {
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
	async subscribeToTrainingEmail(email: string, trainingId: string): Promise<void> {
		await fetch('/.netlify/functions/subscribe-to-training-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				trainingId,
			}),
		})
	},
	async getStatistics(): Promise<Statistics> {
		const response = await fetch('/.netlify/functions/statistics', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		})

		return await response.json()
	},
	async getTrainingInfo(trainingId: string): Promise<{ startedAt: string; endedAt?: string }> {
		const response = await fetch('/.netlify/functions/get-training-info', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				trainingId,
			}),
		})

		const training: { startedAt: string; endedAt?: string } = await response.json()

		if (!training || !training.startedAt) {
			throw new Error('Server did not return a valid training')
		}

		return training
	},
}
