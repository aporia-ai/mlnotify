// Firebase
import { FirebaseKeys, initializeApp } from '../utils/firebase'

// Middy
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import validator from '@middy/validator'

// Types
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Training } from '../utils/types'

type Event = APIGatewayProxyEvent & { body: { trainingId: string } }

const inputSchema = {
	type: 'object',
	properties: {
		body: {
			type: 'object',
			properties: {
				trainingId: { type: 'string', minLength: 1 },
			},
			required: ['trainingId'],
		},
	},
	required: ['body'],
}

const outputSchema = {
	type: 'object',
	properties: {
		statusCode: { type: 'number' },
		body: {
			type: 'object',
			properties: {
				startedAt: { type: 'string' },
				endedAt: { type: 'string' },
			},
		},
	},
	required: ['statusCode', 'body'],
}

async function baseHandler({ body: { trainingId } }: Event): Promise<APIGatewayProxyResult> {
	// Initialize firebase
	const app = initializeApp()
	const trainings = app.database().ref(FirebaseKeys.Trainings)

	// Validate training
	const training: Training | null = (await trainings.child(trainingId).get()).val()

	const response: Partial<Training> = {}
	if (training) response.startedAt = training.startedAt
	if (training?.endedAt) response.endedAt = training.endedAt

	return {
		statusCode: 200,
		body: JSON.stringify(response),
	}
}

const handler = middy(baseHandler)
	.use(jsonBodyParser())
	.use(validator({ inputSchema, outputSchema }))
	.use(httpErrorHandler())

export { handler }
