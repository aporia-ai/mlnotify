// Firebase
import { FirebaseKeys, initializeApp } from '../utils/firebase'

// Middy
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import validator from '@middy/validator'

// Errors
import createError from 'http-errors'

// Types
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Statistics, Training } from '../utils/types'
import { sendTrainingEndedEmail } from '../utils/email'

type Event = APIGatewayProxyEvent & { body: { trainingId: string; trainingToken: string } }

const inputSchema = {
	type: 'object',
	properties: {
		body: {
			type: 'object',
			properties: {
				trainingId: { type: 'string', minLength: 1 },
				trainingToken: { type: 'string', minLength: 1 },
			},
			required: ['trainingId', 'trainingToken'],
		},
	},
	required: ['body'],
}

async function baseHandler({ body: { trainingId, trainingToken } }: Event): Promise<APIGatewayProxyResult> {
	// Initialize firebase
	const app = initializeApp()
	const trainings = app.database().ref(FirebaseKeys.Trainings)

	// Validate training
	const training: Training = (await trainings.child(trainingId).get()).val()
	if (!training) throw new createError.NotFound()
	else if (training.token !== trainingToken) throw new createError.Unauthorized()
	else if (training.endedAt) throw new createError.BadRequest('Training already ended')

	// Update training
	training.endedAt = new Date().toISOString()
	await trainings.child(trainingId).set(training)

	// Send notification by topic
	const sendToTopicPromise = app.messaging().sendToTopic(trainingId, {
		data: {
			event: 'training-end',
			id: training.id,
			endedAt: training.endedAt,
			startedAt: training.startedAt,
		},
		notification: {
			// https://firebase.google.com/docs/cloud-messaging/send-message
			title: 'Training Over',
			body: `Training #${trainingId} is over`,
			icon: `${process.env.GRIDSOME_BASE_URL}/logo-dark.png`,
			clickAction: `${process.env.GRIDSOME_BASE_URL}/training/${trainingId}`,
		},
	})

	await Promise.allSettled([sendToTopicPromise, sendTrainingEndedEmail(training.emailSubscribers, { trainingId })])

	// Update statistics
	const statisticsRef = app.database().ref(FirebaseKeys.Statistics)
	const decrement = (val = 1) => Math.max(val - 1, 0)
	const activeTrainingsCountKey: keyof Statistics = 'activeTrainingsCount'

	// Unsubscribe all notificationsSubscribers
	training.notificationsSubscribers = training.notificationsSubscribers || []
	await Promise.all([
		...training.notificationsSubscribers.map(messagingRegistrationToken =>
			app.messaging().unsubscribeFromTopic(messagingRegistrationToken, trainingId),
		),
		statisticsRef.child(activeTrainingsCountKey).transaction(decrement),
	])

	return {
		statusCode: 200,
		body: 'OK',
	}
}

const handler = middy(baseHandler)
	.use(jsonBodyParser())
	.use(validator({ inputSchema }))
	.use(httpErrorHandler())

export { handler }
