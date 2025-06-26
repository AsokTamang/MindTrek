import { NextRequest,NextResponse } from "next/server";
import client from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req:NextRequest) {
    try {
         const session=await auth();   //we are extracting the session from auth
         const userID=session?.user.id;    //here we are extracting the userid from session.user.id as the id of user is saved inside session.user.id as defined in our callback 
         const db=client.db('mindtrek');   //we are storing the token as well as the userid in the same database but under different collection.
         const collection=db.collection('notificationdata');

         const data = await req.json();
    const{token}=data;   //then we are extracting the token passed into our backend
    if(token){
        await collection.insertOne({id:userID,token:token})   //then we are saving the logged in userid and the token that this user got from firebase cloud messaging
        return NextResponse.json({success:true,data:token,message:'token passed successfully'},{status:200})
    }
        
    } catch (error:unknown) {
        if(error instanceof Error){
            console.log(error.message);
              return NextResponse.json({success:false,data:null,message:'token passed unsuccessfull'},{status:500})
        }
        
    }
   
    

    
}