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
import { Training } from '../utils/types'

type Event = APIGatewayProxyEvent & { body: { email: string; trainingId: string } }

const inputSchema = {
	type: 'object',
	properties: {
		body: {
			type: 'object',
			properties: {
				email: { type: 'string' },
				trainingId: { type: 'string' },
			},
		},
	},
	required: ['body'],
}

async function baseHandler({ body: { trainingId, email } }: Event): Promise<APIGatewayProxyResult> {
	// Initialize firebase
	const app = initializeApp()
	const trainings = app.database().ref(FirebaseKeys.Trainings)

	// Validate training
	const training: Training = (await trainings.child(trainingId).get()).val()
	if (!training) throw new createError.NotFound()
	else if (training.endedAt) throw new createError.BadRequest('Training already ended')

	training.emailSubscribers = training.emailSubscribers || []
	const emailSubscribersSet = new Set(training.emailSubscribers)

	if (!emailSubscribersSet.has(email)) {
		// Add subscriber to database
		emailSubscribersSet.add(email)
		training.emailSubscribers = Array.from(emailSubscribersSet)
		await trainings.child(trainingId).set(training)

		// Subscribe to topic
		await app.messaging().subscribeToTopic(email, trainingId)
	}

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
