/*global importScripts, firebase*/

importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js')

firebase.initializeApp(process.env.GRIDSOME_FIREBASE_APP_CONFIG)

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function(payload) {
	console.log('[firebase-messaging-sw.js] Received background message ', payload)
	// Customize notification here
	const notificationTitle = 'Background Message Title'
	const notificationOptions = {
		body: 'Background Message body.',
		icon: '/firebase-logo.png',
	}

	self.registration.showNotification(notificationTitle, notificationOptions)
})
