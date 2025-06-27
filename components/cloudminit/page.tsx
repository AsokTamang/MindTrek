//this file contains the logic of registering our firebase-messaging-sw.js in our nextjs app  which handles the background message sending logic
"use client"
import React from "react"
export default function Cloudinit(){
    React.useEffect(()=>{
        if('serviceWorker' in navigator){
            navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration)=>{
                console.log('successful registration',registration)
            })
            .catch((error)=>{
                console.log('registration unsuccessful',error)
            })
        }

    },[])

    return null
}