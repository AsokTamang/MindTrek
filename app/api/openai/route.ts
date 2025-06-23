import client from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";
import { userModal } from "@/modal/user";
import { moodModal } from "@/modal/mood";
import { auth } from "@/lib/auth";
import { connectionMongoose } from "@/lib/connection";

export async function POST(req: NextRequest) {
  const session = await auth();   //here we are extracting the signed in user's info using helper function called auth.
   
  await client.connect(); //here we are connecting using the instance of mongo client that we created in the file db.ts
  await connectionMongoose()  //here we are connecting our mongoose with our mongodb uri
  const data = await req.json(); //then we convert the requested body into json format.
  const { mood, scale, feeling, journal } = data; //destructuring mood,scale,feeling and journal from the requested data
  try {

    const existingUser=await userModal.findOne({email:session?.user.email});
    if(!existingUser){    //here to prevent the duplicate saving of user we are checking first if the user exists or not.
        const userData=new userModal({
      id:session?.user.id,
      name:session?.user.name,
      email:session?.user.email,
    });
     await userData.save();
    }
  
    const newMood=new moodModal({
        user:session?.user.id,
        mood,
        scale,
        feeling,
        journal
    })

   

    await newMood.save();

    const together=new Together({
  apiKey:process.env.TOGETHER_API_KEY}
    )
    const prompt = `You are a mental health expert.
Based on the following emotional data, provide a short, warm, encouraging message — no explanations, no disclaimers, just a direct response that feels like a relief to the user.

Mood: ${mood}

Emotion Scale (1–5): ${scale}

Feeling Tag: ${feeling}

Journal Entry: ${journal}

Respond in 2–4 sincere sentences that offer comfort and gentle support. Do not include AI disclaimers or introductions.
    
    `
    const completion=await together.chat.completions.create({  //after creating the prompt we are creating a chat with the openai modal of version 4 with messages for chat system
      model:"deepseek-ai/DeepSeek-V3",
      messages:[{role:'user',content:prompt}]
    })

    const aiResponse=completion.choices[0]?.message?.content;    //then we extract the first response of ai
  
      return NextResponse.json(
        { success: true, data: aiResponse },
        { status: 200 }
      );
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json({ success: false, data: null }, { status: 500 });
    }
  }
} 
