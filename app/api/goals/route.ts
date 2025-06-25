import client from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth(); //here we are extracting the signed in user's info using helper function called auth.

  await client.connect(); //here we are connecting using the instance of mongo client that we created in the file db.ts

  const data = await req.json(); //then we convert the requested body into json format.
  const { moodData} = data;

  try {
   

    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY,
    });
   const prompt = `
You are a world-class mental health coach and emotional fitness strategist.

Based on the following emotional data from the past week, create a highly actionable list of goals and planning strategies that can improve the user's mood, build emotional resilience, and support long-term mental wellness.

**Guidelines:**
- Format your response using **clear bullet points or numbered steps**
- Each goal must include:
  - **Action** (what to do, clearly stated)
  - **Purpose** (why it works — brief and evidence-based)
  - **Timing or Frequency** (when or how often to apply it)
- Avoid fluff, disclaimers, or generic advice
- Keep the tone professional, direct, and motivating — like a personal coach who believes in the user's growth

**Emotional Data (Past Week):**
${moodData.join(', ')}

Respond with at least 5 concise, personalized goals. Finish with 1 optional bonus tip or motivational nudge.
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
