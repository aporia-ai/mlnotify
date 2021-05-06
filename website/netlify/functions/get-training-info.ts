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

	return {
		statusCode: 200,
		body: JSON.stringify({ startedAt: training.startedAt }),
	}
}

const handler = middy(baseHandler)
	.use(jsonBodyParser())
	.use(validator({ inputSchema }))
	.use(httpErrorHandler())

export { handler }
