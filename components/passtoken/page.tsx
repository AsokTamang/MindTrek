"use client";
import React from "react";
import { getToken } from "firebase/messaging";
import messaging from "../../lib/firebase";
import axios from "axios";

export default function Passtoken() {
  //this is the page where we pass the token which we got from fcm
  React.useEffect(() => {
    try {
      const postToken = async () => {
        const permission = await Notification.requestPermission(); //here window.notification.requestPermission is the api of window that handles the request of notification in the webpage fot the user
        if (permission !== "granted") {
          //if the permission is not granted then we wont pass the token in out backend server.
          return;
        }

        const token = await getToken(messaging, {
          //here we are extracting the token from firebase
          vapidKey:
            "BGODuxpfDUm1IHCpi8VLDDT2Q5Q9dElm1fobmqIzSkkqx41vz5E1VK3stW8eJnpSdy38oQzaQ57bPbuB6AloOJE",
        });
        await axios.post(
          "/api/fcm",
          { token: token },
          {
            //here we are passing the token to our app backend to store the token for the loggedin user.
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      };
      postToken();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);

  return null;
}
