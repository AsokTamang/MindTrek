//this file is mostly about initializing our firebase client app for getting the token in frontend and passing it into backend inorder to send the message using firebase sdk
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBNG3DCmaP1o6U4F2EqhJcKv3NHg-GfUYY",
  authDomain: "mindtrek-c0150.firebaseapp.com",
  projectId: "mindtrek-c0150",
  storageBucket: "mindtrek-c0150.firebasestorage.app",
  messagingSenderId: "1009212621539",
  appId: "1:1009212621539:web:dcfff4cd180e66109d3bd6",
  measurementId: "G-XKV9FVE1WP",
};
let app: FirebaseApp; //here we are declaring the type of our app

// Initialize Firebase
if (getApps().length===0) {   //getApps is a function so we must check the function's length
  //if there is no app then only we initialize our firebase app
  app = initializeApp(firebaseConfig);
} //here we are initializing our firebase app using the firebaseconfig
else {
  //if there is initialized app then we use the first app
  app = getApps()[0];
}



export { app };
