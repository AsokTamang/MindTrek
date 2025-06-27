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
  Legend,
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

export default function Month() {
  const [result, setResult] = React.useState<moodType[]>([]); //inorder to prevent the further typescript errors we must declare the type first.

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/month");
        const { success, data, message } = res.data;
        if (success) {
          console.log("fetched data is :", data);
          const formattedData = data.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleDateString(), //here we are converting the createdAt into localedateString
          })); //here we are converting the createdAt of each data into localedatestring.
          setResult(formattedData);
        }
        console.log(message);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full px-6 py-14 flex flex-col items-center gap-8 bg-gradient-to-b from-[#f3f4f6] via-white to-[#fef7f0] dark:from-[#111827] dark:via-black dark:to-[#1f1f1f] transition-colors duration-300">
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Mood Chart – Past Month
      </h2>

      {result.length > 0 ? (
        <div className="w-full max-w-5xl">
          <div className="shadow-lg rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] p-4">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart
                data={result}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
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
                <Legend />
                <Line
                  type="monotone"
                  dataKey="scale" // and the line depends upon the value of scale
                  stroke="#6366f1"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="text-lg font-medium text-gray-500 dark:text-gray-300 animate-pulse">
          Loading chart...
        </div>
      )}
    </div>
  );
}
