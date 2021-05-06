export interface Training {
	id: string
	startedAt: string
	subscribers: { messagingRegistrationToken: string }[]
	endedAt?: string
}

export interface Statistics {
	activeTrainingsCount: number
	totalTrainingsCount: number
}
