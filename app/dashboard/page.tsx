"use client"
import Form from "@/components/Form/page";

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
export default function Dashboard(){
  
    const {status}=useSession();   //here we are destructuring the status from usesession.

    if (status==="unauthenticated") (      //and if the user is unauthenticated then we redirect the user to directly to page home
        redirect('/')

        
    )
    return(
        <main className="flex flex-col justify-center items-center m-6 gap-6">
        <h1 className="font-bold text-2xl font-serif">Dashboard Page</h1>
        <Form/>
        
        </main>
    )
}