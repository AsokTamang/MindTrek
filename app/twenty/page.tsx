"use client";
import React from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface moodType {
  userid: string;
  mood: string;
  scale: number;
  feeling: string;
  journal: string;
  createdAt: string;
}

export default function Twenty() {
  const [result, setResult] = React.useState<moodType[]>([]); //inorder to prevent the further typescript errors we must declare the type first.

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/twenty");
        const { success, data, message } = res.data;
        if (success) {
          console.log("fetched data is :", data);
          const formattedData = data.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleString(),
          })); //here we are converting the createdAt of each data into localedatestring.
          setResult(formattedData);
          return;
        }
        console.log(message);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
          return;
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full px-6 py-14 flex flex-col items-center gap-8 bg-gradient-to-b from-[#e0e7ff] via-white to-[#fffaf0] dark:from-[#111827] dark:via-black dark:to-[#1f1f1f] transition-colors duration-300">
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
        Mood Chart – Past 20 Days
      </h2>

      {result.length > 0 ? (
        <div className="w-full max-w-5xl shadow-lg rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] p-4">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={result}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="createdAt"
                tick={{ fontSize: 10 }}
                angle={-45}
                interval={0}
              />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="scale"
                stroke="#7c3aed" // Tailwind indigo-violet color
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-lg font-medium text-gray-500 dark:text-gray-300 animate-pulse">
          Loading chart...
        </div>
      )}
    </div>
  );
}
