// Firebase
import { initializeApp, FirebaseKeys } from '../utils/firebase'

// Middy
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import validator from '@middy/validator'

// Types
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Statistics } from '../utils/types'

type Event = APIGatewayProxyEvent & { body: Record<string, never> }

const inputSchema = {
	type: 'object',
	properties: {
		body: {
			type: 'object',
		},
	},
}

async function baseHandler(_event: Event): Promise<APIGatewayProxyResult> {
	// Initialize firebase
	const app = initializeApp()
	const statisticsRef = app.database().ref(FirebaseKeys.Statistics)

	const statistics: Statistics = (await statisticsRef.get()).val()

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
