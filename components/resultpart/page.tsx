"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
export default function Resultpart() {


  const searchParams = useSearchParams();
  const data = searchParams.get("data") as string;
  const router = useRouter();

  return (
    <div className="min-h-screen px-6 py-16 flex flex-col items-center justify-center space-y-8 text-center bg-gradient-to-b from-[#f5f8ff] via-white to-[#fff7f0] dark:from-[#0f0f0f] dark:via-black dark:to-[#1a1a1a] transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Here is your suggestion
      </h1>

      <p className="max-w-2xl w-full bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 text-base md:text-lg leading-relaxed border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-md whitespace-pre-wrap">
        {data}
      </p>

      <Button
        onClick={() => router.push("/linechart")}
        className="mt-2 px-6 py-3 text-base font-medium rounded-xl border border-gray-300 dark:border-gray-700 bg-white text-black dark:bg-black dark:text-white hover:opacity-90 transition"
      >
        Your mood graph
      </Button>
    </div>
  );
}
