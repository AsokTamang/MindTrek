import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";

export async function POST(req: NextRequest) {
  const data = await req.json(); //here we are extracting the array of feelings of the user.
  const { input } = data;

  try {
    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY,
    });
   const prompt = `You are a licensed mental health therapist with deep empathy and expertise in emotional well-being.

A user has been tracking their emotions over the past several days. Based on the emotional feelings and the average intensity (on a scale from 1 to 5), write a compassionate and thoughtful therapeutic message that helps them feel understood, validated, and gently supported.

Use the feelings to inform your tone:  
- Lower scores (1–2) may suggest struggle, low energy, or sadness.  
- Middle scores (3) may reflect tension, imbalance, or uncertainty.  
- Higher scores (4–5) suggest more positive or resilient states, but still require acknowledgment and gentle encouragement.

Avoid shallow affirmations. Write 5–7 sincere sentences, as you would in a private therapy session. Be clear, warm, validating, and realistic — not overly optimistic or robotic.


**Feeling Tags (recent days):** ${input.join(", ")}

Respond directly to the user. Do not include disclaimers or introductions. Do not say you are an AI or explain your reasoning.`;
    const completion = await together.chat.completions.create({
      //after creating the prompt we are creating a chat with the openai modal of version 4 with messages for chat system
      model: "deepseek-ai/DeepSeek-V3",
      messages: [{ role: "user", content: prompt }],
    });

    const aiResponse = completion.choices[0]?.message?.content; //then we extract the first response of ai
    return NextResponse.json({success:true,data:aiResponse,message:'successful suggestion'},{status:200});
  } catch (error:unknown) {
    if(error instanceof Error){
        console.log(error.message);
        return NextResponse.json({success:false,data:null,message:'unccessful suggestion'},{status:500});
    }
  }
}
