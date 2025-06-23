"use client";
import React from "react";
import Suggestion from "@/components/consolation/page";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface moodType {
  userid:string;
  mood:string;
  scale:number;
  feeling:string;
  journal:string;
  createdAt:string;

}

export default function Consolation() {
  const [result, setResult] =React.useState<moodType[]>([]);   //inorder to prevent the further typescript errors we must declare the type first.
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/pastdata");
        const { success, data, message } = res.data;
        if (success) {
          console.log("fetched data is :", data);
          const formattedData=data.map((item:any)=>({...item,createdAt:new Date(item.createdAt).toLocaleDateString()}));  //here we are converting the createdAt of each data into localedatestring.
          setResult(formattedData);
        }
        console.log(message);
      } catch (error:unknown) {
        if(error instanceof Error){
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, []);

 return (
  <div className="min-h-screen px-4 py-8 flex flex-col items-center gap-6">
    <h2 className="text-2xl font-semibold tracking-tight">Mood History</h2>

    {result.length > 0 ? (
      <div className="flex flex-col gap-0">
      <div className="w-full max-w-4xl shadow-lg rounded-2xl  border border-gray-300 dark:border-gray-700">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={result}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis domain={[1, 5]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="scale"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

       <Suggestion data={result.map((item)=>item.feeling)}/>
       </div>
    ) : (
      <div className="text-lg font-medium animate-pulse">Loading chart...</div>
    )}

  
  </div>
);

}
