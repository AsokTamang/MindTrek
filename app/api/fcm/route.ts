import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import { auth } from "@/lib/auth";
import { initializeApp, cert,getApps } from "firebase-admin/app"; //we ofcourse need initializeApp as well as cert to initialize our firebase admin app
import { getMessaging } from "firebase-admin/messaging";

export async function POST(req: NextRequest) {
  try {
    let app;
    if (!getApps.length) {  //here we are checking if the apps are already initialized or not , only ifnot then we initialize our app otherwise we retrieve the already initialized app.
       app = initializeApp({
      credential: cert({
        //here we are initializing our firebase admin sdk app using credential with cert having prjectid,cleintemail and privatekey
        projectId: process.env.project_id,
        clientEmail: process.env.client_email,
        privateKey: process.env.private_key,    //here we are using .replace method to replace the \\n with the \n which is a line breaker that is required for the validation of the private key provided by the firebase service account
      }),
    });
    }
    else{
      app=getApps()[0];
    }
    
    const session = await auth(); //we are extracting the session from auth
    const userID = session?.user.id; //here we are extracting the userid from session.user.id as the id of user is saved inside session.user.id as defined in our callback
    const db = client.db("mindtrek"); //we are storing the token as well as the userid in the same database but under different collection.
    const collection = db.collection("notificationdata");

    const data = await req.json();
    const { token } = data; //then we are extracting the token passed into our backend
    if (token) {
      const message = {
        notification: {
          title: "Login Reminder",
          body: "Login your mood today!",
        },
        token: token,
      };

      // Send a message to the device corresponding to the provided
      // registration token.
      await getMessaging(app)
        .send(message) //then we send the message with the getmessaging of our app instance
        .then((response) => {
          // Response is a message ID string.
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
      await collection.insertOne({ id: userID, token: token }); //then we are saving the logged in userid and the token that this user got from firebase cloud messaging
      return NextResponse.json(
        { success: true, data: message, message: "token passed successfully" },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        { success: false, data: null, message: "token passed unsuccessfull" },
        { status: 500 }
      );
    }
  }
}
