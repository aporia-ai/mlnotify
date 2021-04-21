importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCQTMTqcUxtWW0C72Hgd__g2y2pshSehmg",
    authDomain: "mlnotify-test.firebaseapp.com",
    projectId: "mlnotify-test",
    storageBucket: "mlnotify-test.appspot.com",
    messagingSenderId: "974878109220",
    appId: "1:974878109220:web:3b8b6bf75fb6d9c98972b1"
  })

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
  

  precacheAndRoute(self.__WB_MANIFEST)