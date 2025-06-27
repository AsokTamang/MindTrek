"use client";
import React from "react";
import type { FirebaseApp } from "firebase/app";
import { ToastContainer, toast } from "react-toastify";
import { app } from "../lib/firebase";


const Page = () => {
  let unsubscribe:(()=>void);   //here we are making the unsubscribe a variable not a constant so that we can use it inside .then of import  as well as outside .then
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
    import("firebase/messaging").then(({ getMessaging, onMessage }) => {   //here we must include the import of {getMessaging, onMessage} from firebase/messaging inside the useEffect inorder to prevent the ssr bug cause these imports only work on the client side
      const messaging = getMessaging(app as FirebaseApp);
       unsubscribe = onMessage(messaging, (payload) => {
        //this part will show the notification when the app is opened.
        console.log("Message received. ", payload);

        toast(
          <div className="p-3">
            <h1 className="font-semibold">{payload.notification?.title}</h1>
            <p>{payload.notification?.body}</p>
          </div>
        );
      });

    
    });
      return () => {
        if(unsubscribe){
        unsubscribe();}
      };
  }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <main className="flex flex-col items-center text-center gap-10 max-w-4xl">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-indigo-900 dark:text-indigo-300">
            Welcome to MindTrek
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Your personal mental wellness companion — track your daily mood,
            reflect through journaling, and receive AI-powered suggestions to
            help you stay balanced and mindful.
          </p>
        </div>

        <section className="w-full max-w-xl rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md p-6 text-left space-y-4 bg-white dark:bg-gray-900 transition-shadow hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-400">
            ✨ Features:
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-base md:text-lg text-gray-800 dark:text-gray-200">
            <li>Log your mood using emojis and a 1–5 scale</li>
            <li>Write daily journal entries with rich text support</li>
            <li>Visualize your emotional trends with weekly charts</li>
            <li>Get personalized wellness tips using AI</li>
            <li>Set self-care goals like sleep, exercise, and meditation</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Page;
