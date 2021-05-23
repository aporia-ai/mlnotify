import { Statistics } from '../types/Statistics'

export const apiService = {
	async subscribeToTraining(messagingRegistrationToken: string, trainingId: string): Promise<void> {
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
	async getTrainingInfo(trainingId: string): Promise<{ startedAt: string; endedAt?: string } | null> {
		const response = await fetch('/.netlify/functions/get-training-info', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				trainingId,
			}),
		})

		const training: { startedAt: string } | {} = await response.json()

		if (!('startedAt' in training)) return null
		return training
	},
}
