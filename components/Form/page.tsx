"use client"; 

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Form() {
  const router=useRouter();
  const [mood, setMood] = React.useState("");
  const [scale, setScale] = React.useState<number | null>(null);
  const [feeling, setFeeling] = React.useState("");
  const [journal, setJournal] = React.useState("");
  const [success,setSuccess]=React.useState(false);
  const [final,setFinal]=React.useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const processingData = { mood, scale, feeling, journal };

    const res = await axios.post(
      "/api/openai", // Here we are sending the request to our OpenAI API with the body of processingData
      processingData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { success, data } =await res.data;
    if(success){
      setSuccess(true);
      setFinal(data);
      router.push(`/result?data=${data}`)
   
    }
   
   
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 shadow-lg rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center">
        Mood Journal
      </h2>

      {/* Mood Dropdown */}
      <div className="space-y-2">
        <label htmlFor="mood" className="text-sm font-medium ">
          Mood
        </label>
        <select
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select your mood</option>
          <option value="🙂">🙂</option>
          <option value="😔">😔</option>
          <option value="😕">😕</option>
          <option value="😄">😄</option>
          <option value="🤕">🤕</option>
        </select>
      </div>

      {/* Scale Dropdown */}
      <div className="space-y-2">
        <label htmlFor="scale" className="text-sm font-medium ">
          Scale (1-5)
        </label>
        <select
          id="scale"
          value={scale ?? ""}
          onChange={(e) => setScale(Number(e.target.value))} // Here we are setting the type as Number
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select the scale</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Feeling Dropdown */}
      <div className="space-y-2 ">
        <label htmlFor="feeling" className="text-sm font-medium ">
          Feeling
        </label>
        <select
          id="feeling"
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select your feeling</option>
          <option value="Anxious">Anxious</option>
          <option value="Depressed">Depressed</option>
          <option value="Overwhelmed">Overwhelmed</option>
          <option value="BurnOut">BurnOut</option>
          <option value="Stuck">Stuck</option>
          <option value="Overthinking">Overthinking</option>
        </select>
      </div>

    
      <div className="space-y-2">
        <label htmlFor="journal" className="text-sm font-medium ">
          Journal
        </label>
        <Textarea
          id="journal"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          className="w-full h-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your thoughts here..." 
          typeof="text"
          required
        />
      </div>

      <Button type="submit"   className="w-full bg-white text-black dark:bg-black dark:text-white font-medium">
        Submit
      </Button>
    </form>


   
    
    </>
  );
}
