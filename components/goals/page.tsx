"use client";
import React from "react";
import axios from "axios";
import { marked } from "marked";
import Clinics from "../../app/clinics/page";
import Link from "next/link";

interface props {
  moodData: string[];
}

export default function Goals({ moodData }: props) {
  const [goals, setGoals] = React.useState("");

  React.useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await axios.post(
          "/api/goals",
          { moodData },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { success, data } = await res.data;
        if (success) {
          setGoals(data);

          console.log("ai goals and inspiration is :", data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    fetchGoals(); //the bug was here as i called fetchGoals inside the fetchGoals which is pretty funny
  }, []); //we used moodData here cause at first when this page loads moodData isnot fetched completely

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-white to-pink-50 dark:from-neutral-900 dark:via-black dark:to-neutral-800 transition-colors duration-300">
      {goals ? (
        <div className="max-w-3xl mx-auto flex flex-col items-center p-8 space-y-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 dark:text-gray-100">
            Goals and Plans Designed for You
          </h1>

          <div
            className="prose prose-lg dark:prose-invert max-w-none text-left"
            dangerouslySetInnerHTML={{ __html: marked.parse(goals) }}
          />
          <div>
           <Link className="hover:text-emerald-500" href={'/clinics'}><h1>Need professional help? Visit trusted mental health professionals </h1></Link> 

          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-xl text-gray-600 dark:text-gray-300">
          Loading...
        </div>
      )}
    </div>
  );
}
