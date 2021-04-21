import firebase from 'firebase/app'
import 'firebase/messaging'

export const firebaseMessagingService = {
	async registerServiceWorker() {
		if (!('serviceWorker' in navigator)) return
		return await navigator.serviceWorker.register('/notify-sw.js')
	},
	async registerClient(messaging, serviceWorkerRegistration, topicId) {
		const currentToken = await messaging.getToken({
			vapidKey: 'BPpG5RwZGPOg_qOXJi9ETeLX7FVflIHnaq4tKUh_h4JW9a4yoUYwN9MAbtPtXgPmAKt-pgyuAVI6ker6ZrG3_4I',
			serviceWorkerRegistration,
		})

		if (!currentToken) {
			throw new Error('No registration token available. Request permission to generate one.')
		}

		await fetch('/.netlify/functions/register-client', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				registrationToken: currentToken,
				topicId,
			}),
		})
	},
	initializeFirebaseMessaging() {
		firebase.initializeApp({
			apiKey: 'AIzaSyCQTMTqcUxtWW0C72Hgd__g2y2pshSehmg',
			authDomain: 'mlnotify-test.firebaseapp.com',
			projectId: 'mlnotify-test',
			storageBucket: 'mlnotify-test.appspot.com',
			messagingSenderId: '974878109220',
			appId: '1:974878109220:web:3b8b6bf75fb6d9c98972b1',
		})

		const messaging = firebase.messaging()
		messaging.onMessage(payload => {
			console.log('Message received. ', payload)
		})

		return messaging
	},
	requestNotificationPermission() {
		console.log('Requesting permission...')
		Notification.requestPermission().then(permission => {
			if (permission === 'granted') {
				console.log('Notification permission granted.')
			} else {
				console.log('Unable to get permission to notify.')
			}
		})
	},
	async onPageLoad() {
		return new Promise(resolve => {
			window.addEventListener('load', resolve)
		})
	},
	async start() {
		const messaging = await firebaseMessagingService.initializeFirebaseMessaging()
		firebaseMessagingService.requestNotificationPermission()
		await firebaseMessagingService.onPageLoad()
		const serviceWorkerRegistration = await firebaseMessagingService.registerServiceWorker()
		firebaseMessagingService.registerClient(messaging, serviceWorkerRegistration, '123')
	},
}
