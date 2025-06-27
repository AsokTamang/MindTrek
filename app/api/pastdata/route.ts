
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import client from "@/lib/db";
export async function GET() {
  const session = await auth();
  console.log("loggedin user email is:", session?.user.email);
  const d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); //here we are setting the varible called d which stores the time in milliseconds and i.e 7 days ago from the current data. but for example of showing my demo i have used just two days.

  try {
    const db = client.db("mindtrek");
    const collection = db.collection("moods");
    //below we are retrieving the mood data where the userid matches with the current loogedin session id to prevent unauthorized using of personal datas of others and we also fetches the past 7 days mood datas from the current date so that the ai will provide the consolation based on past 7 days of our mood datas
    const data = await collection
      .find({ userid: session?.user.id,createdAt:{$gte:d} })
      .toArray(); //here we must convert the result into an array using toArray() cause the data returned  from find using mongoclient is in object pointer format.

    if (data.length>0) {
      console.log("data is:", data);
      return NextResponse.json(
        { success: true, message: "Data found successfully", data: data },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Data found unsuccessfull", data: null },
      { status: 500 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        { success: false, message: "Data found unsuccessfull", data: null },
        { status: 500 }
      );
    }
  }
}
