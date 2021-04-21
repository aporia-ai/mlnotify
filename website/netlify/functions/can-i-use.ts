import { Handler } from '@netlify/functions'
import { someState } from '../utils/can-i-use-test'

const handler: Handler = async event => {
	return {
		statusCode: 200,
		body: JSON.stringify(someState),
	}
}

export { handler }
