"use client"
import React from "react";
import { getMessaging, getToken } from "firebase/messaging";
import messaging from '../../lib/firebase';
import axios from "axios";


export default function Notification(){   //this is the page where we pass the token which we got from fcm
    React.useEffect(()=>{
        try {
       const postToken=async()=>{
           const permission=await window.Notification.requestPermission();   //here window.notification.requestPermission 
           if(permission!=="granted"){
            return;
           }
           const token=await getToken(messaging, {
  vapidKey:
    "BGODuxpfDUm1IHCpi8VLDDT2Q5Q9dElm1fobmqIzSkkqx41vz5E1VK3stW8eJnpSdy38oQzaQ57bPbuB6AloOJE",
});
      await axios.post('/api/fcm',{token:token},{   //here we are passing the token to our app backend to store the token for the loggedin user.
        headers:{
            'Content-Type':'application/json'
        }
    })

       };
       postToken();     
          
            
        } catch (error:unknown) {
            if(error instanceof Error){
                console.log(error.message);

            }
            
        }

    },[])

   
  return(
    null
  )
}