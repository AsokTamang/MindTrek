"use client"
import { useState,useEffect } from "react"
import axios from "axios";

export default function Consolation() {
    useEffect(()=>{
        async()=>{
            const res=await axios.get('/api/pastdata');
            const{success,data,message}res.data;

        }

    },[]);

    return(
        <>
        </>
    )


}

