import client from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";
import { userModal } from "@/modal/user";
import { moodModal } from "@/modal/mood";
import {getServerSession} from 'next-auth'
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
    const session=await getServerSession(req,authOptions);
  await client.connect(); //here we are connecting using the instance of mongo client that we created in the file db.ts
  await mongoose.connect(process.env.MONGODB_URI!)  //here we are connecting our mongoose with our mongodb uri
  const data = await req.json(); //then we convert the requested body into json format.
  const { mood, scale, feeling, journal } = data; //destructuring mood,scale,feeling and journal from the requested data
  try {
    const newMood=new moodModal({
        mood,
        scale,
        feeling,
        journal
    })

    await newMood.save();

    const together=new Together({
  apiKey:process.env.TOGETHER_API_KEY}
    )
    const prompt = `You are a mental health specialist and the user has provided this data which is 
    mood:${mood}
    scale of emotions:${scale}
    feeling:${feeling}
    journal:${journal}
    so just provide few lines of compassionate response to the user based on the input
    
    
    `
    const completion=await together.chat.completions.create({  //after creating the prompt we are creating a chat with the openai modal of version 4 with messages for chat system
      model:"deepseek-ai/DeepSeek-V3",
      messages:[{role:'user',content:prompt}]
    })

    const aiResponse=completion.choices[0]?.message?.content;    //then we extract the first response of ai
    console.log(aiResponse)
    const savedData = await collection.insertOne({
      ...data,
      createdAt: new Date(),
    }); //we are using createdAt:new Date()  to display the current date while the new data is inserted.
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
