/*
	NOTE: This file is copied as-is into the generated service worker using the appendToServiceWorker script
*/

/*global importScripts*/

importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js')
/*global firebase*/

firebase.initializeApp(process.env.GRIDSOME_FIREBASE_APP_CONFIG)

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function(payload) {
	// TODO
	self.registration.showNotification(payload.notification.title, payload.notification)
})
