"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Result() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data") as string;
  const router = useRouter();

  return (
    <div className="min-h-screen px-6 py-16 flex flex-col items-center justify-center space-y-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        Here is your suggestion
      </h1>

      <p className="max-w-2xl text-base md:text-lg leading-relaxed border rounded-xl p-6 shadow-md border-gray-300 dark:border-gray-700">
        {data}
      </p>

      <Button
        onClick={() => router.push("/linechart")}
        className="mt-4 px-6 py-3 text-base font-medium rounded-xl"
      >
        See your graph
      </Button>
    </div>
  );
}
