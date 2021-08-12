// Firebase
import { FirebaseKeys, initializeApp } from '../utils/firebase'

// Middy
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import validator from '@middy/validator'

// Id & token generation
import { customAlphabet } from 'nanoid/async'
import cryptoRandomString from 'crypto-random-string'

// Types
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Statistics, Training } from '../utils/types'

type Event = APIGatewayProxyEvent & { }

const inputSchema = {
	type: 'object',
}

const nanoid = customAlphabet('0123456789', 6)

async function baseHandler(_event: Event): Promise<APIGatewayProxyResult> {
	// Initialize firebase
	const app = initializeApp()
	const trainings = app.database().ref(FirebaseKeys.Trainings)

	// Get a unique id
	let exists = true
	let trainingId
	while (exists) {
		trainingId = await nanoid()
		exists = (await trainings.child(trainingId).get()).exists()
	}
	trainingId = trainingId as string // Just for the typecast
	const trainingToken = cryptoRandomString({ length: 32 })

	// Insert a new training
	const newTraining: Training = {
		id: trainingId,
		token: trainingToken,
		startedAt: new Date().toISOString(),
		notificationsSubscribers: [],
		emailSubscribers: [],
	}

	// Update statistics
	const statisticsRef = app.database().ref(FirebaseKeys.Statistics)
	const increment = (val = 0) => val + 1
	const totalTrainingsCountKey: keyof Statistics = 'totalTrainingsCount'
	const activeTrainingsCountKey: keyof Statistics = 'activeTrainingsCount'

	await Promise.all([
		trainings.child(trainingId).set(newTraining),
		statisticsRef.child(totalTrainingsCountKey).transaction(increment),
		statisticsRef.child(activeTrainingsCountKey).transaction(increment),
	])

	return {
		statusCode: 200,
		body: JSON.stringify({
			trainingId,
			trainingToken,
		}),
	}
}

const handler = middy(baseHandler)
	.use(jsonBodyParser())
	.use(validator({ inputSchema }))
	.use(httpErrorHandler())

export { handler }
