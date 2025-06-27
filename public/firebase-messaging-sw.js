importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyBNG3DCmaP1o6U4F2EqhJcKv3NHg-GfUYY",
  authDomain: "mindtrek-c0150.firebaseapp.com",
  projectId: "mindtrek-c0150",
  storageBucket: "mindtrek-c0150.firebasestorage.app",
  messagingSenderId: "1009212621539",
  appId: "1:1009212621539:web:dcfff4cd180e66109d3bd6",
  measurementId: "G-XKV9FVE1WP",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});