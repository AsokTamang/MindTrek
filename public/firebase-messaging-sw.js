//this code handles the background messaging when the user is inactive or the app is not opened.

import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

const messaging = getMessaging();
onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Login reminder';
  const notificationOptions = {
    body: 'Login your mood',
   
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});