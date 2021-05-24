import * as admin from 'firebase-admin'

export enum FirebaseKeys {
	Statistics = 'statistics',
	Trainings = 'trainings',
}
export function initializeApp(): admin.app.App {
	if (!admin.apps.length) {
		admin.initializeApp({
			databaseURL: 'https://mlnotify-default-rtdb.firebaseio.com/',
			credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVER_CERT as string)),
		})
	}

	return admin.app()
}
