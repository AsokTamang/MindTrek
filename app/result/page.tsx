"use client"
import { useSearchParams } from "next/navigation"
export default function Result(){
    const seachParams=useSearchParams();
    const data=seachParams.get('data') as string;
    return(
        <div className="min-h-screen flex flex-col items-center">
        <h1>Here is your suggestion</h1>
        <p className="p-2 m-5">
            {data}

        </p>
        </div>
    )
}