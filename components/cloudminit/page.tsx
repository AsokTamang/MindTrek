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