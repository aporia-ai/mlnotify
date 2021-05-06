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

type Event = APIGatewayProxyEvent & { body: { trainingId: string } }

const inputSchema = {
	type: 'object',
	properties: {
		body: {
			type: 'object',
			properties: {
				trainingId: { type: 'string' },
			},
		},
	},
	required: ['body'],
}

async function baseHandler({ body: { trainingId } }: Event): Promise<APIGatewayProxyResult> {
	// Initialize firebase
	const app = initializeApp()
	const trainings = app.database().ref(FirebaseKeys.Trainings)

	// Validate training
	const training: Training = (await trainings.child(trainingId).get()).val()
	if (!training) throw new createError.NotFound()
	else if (training.endedAt) throw new createError.BadRequest('Training already ended')

	// Update training
	training.endedAt = new Date().toISOString()
	await trainings.child(trainingId).set(training)

	// Send notification by topic
	await app.messaging().sendToTopic(trainingId, {
		data: {},
		notification: {
			// https://firebase.google.com/docs/cloud-messaging/send-message#admin_sdk_error_reference
			title: 'Training Over',
			body: `Training #${trainingId} is over`,
			// 'icon': 'firebase-logo.png',
			click_action: `https://mlnotify.com?${trainingId}`,
		},
	})

	// Update statistics
	const statisticsRef = app.database().ref(FirebaseKeys.Statistics)
	const decrement = (val = 1) => Math.max(val - 1, 0)
	const activeTrainingsCountKey: keyof Statistics = 'activeTrainingsCount'

	// Unsubscribe all subscribers
	await Promise.all([
		...training.subscribers.map(({ messagingRegistrationToken }) =>
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
