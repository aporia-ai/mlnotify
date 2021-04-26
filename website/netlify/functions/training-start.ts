// Firebase
import { initializeApp } from '../utils/firebase'

// Middy
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import validator from '@middy/validator'

// Id
import { customAlphabet } from 'nanoid/async'

// Types
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Training } from '../utils/types'

type Event = APIGatewayProxyEvent & { body: {} }

const inputSchema = {
	type: 'object',
	properties: {
		body: {
			type: 'object',
		},
	},
}
const nanoid = customAlphabet('0123456789', 6)

async function baseHandler(event: Event): Promise<APIGatewayProxyResult> {
	// Initialize firebase
	const app = initializeApp()
	const trainings = app.database().ref('trainings')

	// Get a unique id
	let exists = true
	let trainingId
	while (exists) {
		trainingId = await nanoid()
		exists = (await trainings.child(trainingId).get()).exists()
	}

	// Insert a new training
	const newTraining: Training = { id: trainingId, startedAt: new Date().toISOString(), subscribers: [] }
	await trainings.child(trainingId).set(newTraining)

	return {
		statusCode: 200,
		body: JSON.stringify({
			trainingId,
		}),
	}
}

const handler = middy(baseHandler)
	.use(jsonBodyParser())
	.use(validator({ inputSchema }))
	.use(httpErrorHandler())

export { handler }
