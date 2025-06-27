//this file is mostly about initializing our firebase client app for getting the token in frontend and passing it into backend inorder to send the message using firebase sdk
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";



const firebaseConfig = {
  apiKey: "AIzaSyBNG3DCmaP1o6U4F2EqhJcKv3NHg-GfUYY",
  authDomain: "mindtrek-c0150.firebaseapp.com",
  projectId: "mindtrek-c0150",
  storageBucket: "mindtrek-c0150.firebasestorage.app",
  messagingSenderId: "1009212621539",
  appId: "1:1009212621539:web:dcfff4cd180e66109d3bd6",
  measurementId: "G-XKV9FVE1WP",
};
let app:FirebaseApp;   //here we are declaring the type of our app

// Initialize Firebase
if(!getApps.length){   //if there is no app then only we initialize our firebase app
 app = initializeApp(firebaseConfig);}  //here we are initializing our firebase app using the firebaseconfig
else{   //if there is initialized app then we use the first app
  app=getApps()[0];
  
}
const messaging = getMessaging(app); //here we are initializing the firebase cloud messaging.
getToken(messaging, {
  vapidKey:
    "BGODuxpfDUm1IHCpi8VLDDT2Q5Q9dElm1fobmqIzSkkqx41vz5E1VK3stW8eJnpSdy38oQzaQ57bPbuB6AloOJE",
});     //here we are requesting the token from firebase cloud messaging

export default messaging;
export  {app};