// Firebase
import { initializeApp } from '../utils/firebase'

// Middy
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import validator from '@middy/validator'

// Types
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Statistics } from '../utils/types'

type Event = APIGatewayProxyEvent & { body: {} }

const inputSchema = {
	type: 'object',
	properties: {
		body: {
			type: 'object',
		},
	},
}

async function baseHandler({ body: {} }: Event): Promise<APIGatewayProxyResult> {
	// Initialize firebase
	const app = initializeApp()
	const trainings = app.database().ref('trainings')

	const trainingsValue = await trainings.get()

	const statistics: Statistics = {
		trainingsCount: trainingsValue.numChildren(),
	}

	return {
		statusCode: 200,
		body: JSON.stringify(statistics),
	}
}

const handler = middy(baseHandler)
	.use(jsonBodyParser())
	.use(validator({ inputSchema }))
	.use(httpErrorHandler())

export { handler }
