export interface Training {
	id: string
	startedAt: string
	notificationsSubscribers: string[]
	emailSubscribers: string[]
	endedAt?: string
}

export interface Statistics {
	activeTrainingsCount: number
	totalTrainingsCount: number
}
