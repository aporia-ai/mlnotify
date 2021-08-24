/*
	NOTE: This file is copied as-is into the generated service worker using the appendToServiceWorker script
*/

/*global importScripts*/
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js')
/*global firebase*/
/*global clients*/

firebase.initializeApp(process.env.GRIDSOME_FIREBASE_APP_CONFIG)

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function(payload) {
	self.registration.showNotification(payload.notification.title, payload.notification)
})

self.addEventListener('notificationclick', function(event) {
	console.log('On notification click: ', event.notification)
	event.notification.close()

	const notificationUrl = event.notification.click_action

	// This looks to see if the current is already open and
	// focuses if it is
	event.waitUntil(
		clients
			.matchAll({
				type: 'window',
			})
			.then(function(clientList) {
				for (var i = 0; i < clientList.length; i++) {
					let client = clientList[i]
					if (client.url == notificationUrl && 'focus' in client) return client.focus()
				}
				if (clients.openWindow) return clients.openWindow(notificationUrl)
			}),
	)
})
