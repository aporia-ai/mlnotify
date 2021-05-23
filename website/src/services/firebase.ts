import type Firebase from 'firebase/app'


let _firebase: typeof Firebase
export const firebaseMessagingService = {
	async getFirebase(): Promise<typeof Firebase> {
		if(!_firebase){
			// We're importing it dynamically since firebase does not support bundling in a non-web environment
			// See https://github.com/firebase/firebase-js-sdk/issues/2222
			const [firebase] = await Promise.all([import('firebase/app'), import('firebase/messaging')])
			
			_firebase = firebase.default

			if (process.env.GRIDSOME_FIREBASE_APP_CONFIG) {
				_firebase.initializeApp(JSON.parse(process.env.GRIDSOME_FIREBASE_APP_CONFIG))
			} else {
				throw new Error('No Firebase app config found')
			}
		}

		return _firebase
	},
	async initializeFirebaseMessaging(): Promise<Firebase.messaging.Messaging> {
		const firebase = await firebaseMessagingService.getFirebase()

		return firebase.messaging()
	},
	async onMessage(onMessage: (payload: any) => any) {
		const messaging = await firebaseMessagingService.initializeFirebaseMessaging()
		return messaging.onMessage(onMessage)
	},
	async askNotificationPermission(serviceWorkerRegistration?: ServiceWorkerRegistration): Promise<string> {
		const messaging = await firebaseMessagingService.initializeFirebaseMessaging()
		// NOTE: getToken asks the user for notifications permission
		return await messaging.getToken({ serviceWorkerRegistration })
	},
	getNotificationPermissionStatus(): NotificationPermission | null {
		if (typeof window === 'undefined' || !("Notification" in window)) return null

		return Notification.permission
	},
}
