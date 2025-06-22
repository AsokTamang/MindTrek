import React from "react";


const Page = () => {
  return (
    <div className="min-h-screen ">

    

      <main className="flex flex-col items-center justify-center text-center px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
          Welcome to MindTrek
        </h1>
        <p className="text-lg md:text-xl max-w-2xl  mb-8">
          Your personal mental wellness companion — track your daily mood, reflect through journaling, and receive AI-powered suggestions to help you stay balanced and mindful.
        </p>

        <div className=" rounded-xl shadow-lg p-6 w-full max-w-xl text-left">
          <h2 className="text-2xl font-semibold mb-3 ">✨ Features:</h2>
          <ul className="list-disc pl-6 space-y-2 ">
            <li>Log your mood using emojis and a 1–5 scale</li>
            <li>Write daily journal entries with rich text support</li>
            <li>Visualize your emotional trends with weekly charts</li>
            <li>Get personalized wellness tips using AI</li>
            <li>Set self-care goals like sleep, exercise, and meditation</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Page;
