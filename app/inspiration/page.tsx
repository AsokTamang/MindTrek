"use client"
import React from "react"
import axios from "axios";
import Goals from "@/components/goals/page";

    interface moodType {
  userid:string;
  mood:string;
  scale:number;
  feeling:string;
  journal:string;
  createdAt:string;

}



export default function Suggestion(){
    const [pastdata,setpastData]=React.useState<moodType[]>([]);  //we must declarre the type here.
    const [mounted,setMounted]=React.useState(false);



    React.useEffect(()=>{
        setMounted(true);
        const fetchData=async()=>{
            try {
               const res= await axios.get('/api/seven');  //inorder to get the recent datas which is of past week we use the backend called seven which extracts the mood data of last 7 days.
               const {success,data,message}=await res.data;
               if(success){
                setpastData(data);
                console.log('last 7 days mood data is:',data);
                console.log(message);
              
               }
            } catch (error:unknown) {
                if(error instanceof Error){
                    console.log(error.message);
                }

                
            }
        };
        fetchData();

    },[]);
        if(!mounted) return null ;
    return(
        <div className="min-h-screen w-full">
        <Goals moodData={pastdata.map((mood)=>mood.feeling)}/>  {/**we are only passing the array of feeling of the user */}
        </div>
    )
}