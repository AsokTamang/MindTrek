import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center justify-center">
      <main className="flex flex-col items-center text-center gap-10 max-w-4xl">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Welcome to MindTrek
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Your personal mental wellness companion — track your daily mood, reflect through journaling, and receive AI-powered suggestions to help you stay balanced and mindful.
          </p>
        </div>

        <section className="w-full max-w-xl rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md p-6 text-left space-y-4 transition-shadow hover:shadow-xl">
          <h2 className="text-2xl font-semibold">✨ Features:</h2>
          <ul className="list-disc pl-5 space-y-2 text-base md:text-lg">
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
