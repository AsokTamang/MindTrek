import client from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";
import { auth } from "@/lib/auth";
import { connectionMongoose } from "@/lib/connection";

export async function POST(req: NextRequest) {
  const session = await auth(); //here we are extracting the signed in user's info using helper function called auth.
  
  await client.connect(); //here we are connecting using the instance of mongo client that we created in the file db.ts
  await connectionMongoose(); //here we are connecting our mongoose with our mongodb uri
  const data = await req.json(); //then we convert the requested body into json format.
  const { mood, scale, feeling, journal } = data;

  try {
    const db = client.db("mindtrek"); //here we are creating a database using mongoclient.
    const collection = db.collection("moods"); //then we are creating a collection named moods.
    await collection.insertOne({
      userid: session?.user.id,
      mood: mood,
      scale: scale,
      feeling: feeling,
      journal: journal,
      createdAt: new Date(),
    });

    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY,
    });
    const prompt = `You are a mental health expert.
Based on the following emotional data, provide a short, warm, encouraging message — no explanations, no disclaimers, just a direct response that feels like a relief to the user.

Mood: ${mood}

Emotion Scale (1–5): ${scale}

Feeling Tag: ${feeling}

Journal Entry: ${journal}

Respond in 2–4 sincere sentences that offer comfort and gentle support. Do not include AI disclaimers or introductions.
    
    `;
    const completion = await together.chat.completions.create({
      //after creating the prompt we are creating a chat with the openai modal of version 4 with messages for chat system
      model: "deepseek-ai/DeepSeek-V3",
      messages: [{ role: "user", content: prompt }],
    });

    const aiResponse = completion.choices[0]?.message?.content; //then we extract the first response of ai

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
