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

export default function Seven() {
  const [result, setResult] = React.useState<moodType[]>([]); //inorder to prevent the further typescript errors we must declare the type first.
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/seven");
        const { success, data, message } = res.data;
        if (success) {
          console.log("fetched data is :", data);
          const formattedData = data.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleString(),   //instead of using localedatestring we are using locale string because localestring also includes the time which makes the difference between the createdAt amongh the datas inorder to get the linechart
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
    <div style={{ width: "100%", height: "100vh", padding: "8rem",marginLeft:'5rem' }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Chart Test</h2>
   
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
   
         
          </div>
       ) : (
         <div className="text-lg font-medium animate-pulse">Loading chart...</div>
       )}
   
     
     </div>
  );
}
