import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNG3DCmaP1o6U4F2EqhJcKv3NHg-GfUYY",
  authDomain: "mindtrek-c0150.firebaseapp.com",
  projectId: "mindtrek-c0150",
  storageBucket: "mindtrek-c0150.firebasestorage.app",
  messagingSenderId: "1009212621539",
  appId: "1:1009212621539:web:dcfff4cd180e66109d3bd6",
  measurementId: "G-XKV9FVE1WP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  //here we are initializing our firebase app using the firebaseconfig
const analytics = getAnalytics(app);
const messaging = getMessaging(app); //here we are initializing the firebase cloud messaging.
getToken(messaging, {
  vapidKey:
    "BGODuxpfDUm1IHCpi8VLDDT2Q5Q9dElm1fobmqIzSkkqx41vz5E1VK3stW8eJnpSdy38oQzaQ57bPbuB6AloOJE",
});     //here we are requesting the token from firebase cloud messaging

export default messaging;