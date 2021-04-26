import firebase from 'firebase/app'
import 'firebase/messaging'

export const firebaseMessagingService = {
	async subscribeToTraining(messaging, serviceWorkerRegistration) {
		const currentToken = await messaging.getToken({ serviceWorkerRegistration })

		if (!currentToken) {
			throw new Error('No registration token available. Request permission to generate one.')
		}

		return currentToken
	},
	initializeFirebaseMessaging() {
		firebase.initializeApp(JSON.parse(process.env.GRIDSOME_FIREBASE_APP_CONFIG))

		const messaging = firebase.messaging()
		messaging.onMessage(payload => {
			console.log('Message received. ', payload)
		})

		return messaging
	},
	async init(serviceWorkerRegistration) {
		const messaging = await firebaseMessagingService.initializeFirebaseMessaging()
		return await messaging.getToken({ serviceWorkerRegistration })
	},
}
