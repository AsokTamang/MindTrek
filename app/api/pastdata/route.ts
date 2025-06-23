import { moodModal } from "@/modal/mood";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function GET(){
    const session=await auth();
    const d = new Date(Date.now()- (2*24*60*60*1000));    //here we are setting the varible called d which stores the time in milliseconds and i.e 7 days ago from the current data. but for example of showing my demo i have used just two days.
  
    try {
         const data=await moodModal.find({'createdAt':{$gte:d}}).populate('user').where('user.email').equals(session?.user.email); 
         if(data){
            return NextResponse.json({success:true,message:'Data found successfully',data:data},{status:200})
         }
         
         return NextResponse.json({success:false,message:'Data found unsuccessfull',data:null},{status:500})

    } catch (error:unknown) {
        if(error instanceof Error){
            console.log(error.message);
             return NextResponse.json({success:false,message:'Data found unsuccessfull',data:null},{status:500})
        }

        
    }
   


}