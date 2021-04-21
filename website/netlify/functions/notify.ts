import { Handler } from '@netlify/functions'
import * as admin from 'firebase-admin'

// Initialize Firebase
admin.initializeApp(
	{
		credential: admin.credential.cert({
			// @ts-ignore
			type: 'service_account',
			project_id: 'mlnotify-test',
			private_key_id: '2064e75fa13f2366e99762b77a1eae585b6a1be9',
			private_key:
				'-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD2urnuwdfCxD2/\nAUaV/jEwzyjy+cSldvjluUectMLvymPgX9OipHWl4MCNOPND+RqfO+VgOBZ9PMcC\niYsGy/2MeUUYuP4X3D3P+nfQRRm59E2Va5Akd+xJFzEOYbbHcAaDhJJZyCuSw7LY\nUE3GQE7fg3CBaytjNjd3aJ315smwfcnoEsICtqWy8VX3/SdvsRTr763HxR5lZ6gp\npx3t6tFcU/8qgA/tSjrQWdA/qRS3qWwoFjC2CtHFa9n0W30UU5lBR+p72Vu3way+\nvcZawl4IzdYWKGvIAcce+bMeEAGjX+txBGjSuTrzhpKCwF/wLT1ycMsEoX7omncr\nNnlso1qzAgMBAAECggEAC1RPrV2hTAQ5gZ0hYfR7dcOixxAeWNVkYHK9jb3kevZO\n18K5Xm0xfx3EObffvm311vynxQn487noDtRvWdnhbqMy6mEJlIw8b7cPQV+q6sBZ\nFP9iGF/uracu+CYXKoPuXfj8b2Wi+pOZ5sI+kAKWnJTV2bDTcTQldTTh6/oI+4hJ\nZE/qRpA5C7A7pNSD69Y57irNMbaL+wd6N9PErex8PQnRzAFBXMPSrvZnanPHi6/C\nAVG+Q6D5vpjIP2/yxerE7cbT+GFn1zpPjjUbmpKXTuO/nA3hUPwWcJAo7QcrW99p\ntupqmh5NwJ2deEERFtRFLQlApnn57ZBccC/jwuZDIQKBgQD9PTMNT0HHllJOsqE8\nfaM26g5btrmFsUQiVap9xrANBZjyt4Cn2v6DjmUrEKpSpOJo8NBCu5v8kmiNfPBa\nW7TkFl8HWGp4YgHe6CdMmhNh1jmkafuOixJ/ehIGjCCuwiAhEnYTC9acJcNy49Uq\n7+tXBHLdrcIvsFVyo1GPHeKjxQKBgQD5a1uvnOY2XSok5dd8qqQBP791+n7rQaAv\nHf9rCjUGcwZ2O50QcvJFQWjRHp3zO1RPO33FJFn1j85tdFbfEx2AYOuwDRW3nMwL\nRTvr/6yrijkgyf4hRq7nSoLTfLdfUx5sB1I0RWPvinENp2/MxbpbX35oUKMo69p0\nb0DLOAJUFwKBgQDPVYDr370yhM+EoVnDZfXwavcwfc0tOXJYTh0Vd0wCjVepOTZ7\nt5/z4+zOsolQurCoTKmmSWYwB0rUtLswr67No8dQA0LApzVy5E3wuKEv1C5Df4Y3\nMYQGnNIPTEEh88xMZ4oGlAW0uHJqKUEJM39SMlE9UBsR4mRDRJXtAAHkJQKBgFVa\nKs8G1zUFXrWvvbUYw/T1drSN2z7wfzuAfXaI0Kp7VFvDfLUzULroblEZtB2XUPuo\nNRrwnKRO6OpF5LCD3xWelSjy4VqrGpxEvgO9w74UGAajeQa0JIhb1DdBN5M0Y3W+\nb6AZmuBPNO7iPH0LsQExxZU2+w6231P2+mpQqWNTAoGBAMlti9KBk2oaiVGNtwE9\ny3vrvuEO6O2N+C4iqwhGCoymf5Oi+nAUJow0oF6zhWmSAXlEA6DDjeDw/i2HL3gj\n/j9SAWokOHScA3sIZaI4efmnSBi4eWWU38IjMfctLR+VAsDVIOK/2m2HvyPC/svw\njZwBzbUMl6+Xu3Ur/SDm0sAg\n-----END PRIVATE KEY-----\n',
			client_email: 'firebase-adminsdk-qmsv3@mlnotify-test.iam.gserviceaccount.com',
			client_id: '115608594952508182814',
			auth_uri: 'https://accounts.google.com/o/oauth2/auth',
			token_uri: 'https://oauth2.googleapis.com/token',
			auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
			client_x509_cert_url:
				'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qmsv3%40mlnotify-test.iam.gserviceaccount.com',
		}),
	},
	'mlnotify-notify-lambda',
)

const handler: Handler = async event => {
	// Parse request
	let topicId: string
	try {
		const body: { topicId?: string } = JSON.parse(event.body)
		if (!body.topicId) throw new Error('Missing topicId')

		topicId = body.topicId
	} catch (e) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: 'Invalid input. Body must be of type { topicId: string }',
				error: e.message,
			}),
		}
	}

	// Send notification by topic
	await admin.messaging().sendToTopic(topicId, {
		data: {},
		notification: {
			title: 'Done!',
			body: 'Your training is over',
			// 'icon': 'firebase-logo.png',
			click_action: `https://mlnotify.com?${topicId}`,
		},
	})

	// Success
	return {
		statusCode: 200,
		body: JSON.stringify({ message: 'OK' }),
	}
}

export { handler }
