"use client";
import Form from "@/components/Form/page";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { status } = useSession(); //here we are destructuring the status from usesession.

  if (status === "unauthenticated")
    //and if the user is unauthenticated then we redirect the user to directly to page home
    redirect("/");

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-indigo-50 via-white to-rose-50 dark:from-neutral-900 dark:via-black dark:to-neutral-800 transition-colors duration-300">
      <section className="max-w-4xl mx-auto flex flex-col justify-center items-center py-20 px-6 gap-10">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-center text-gray-800 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-xl">
          Welcome to your wellness dashboard. You can log your mood, journal your thoughts,
          and receive personalized support below.
        </p>

        <div className="w-full">
          <Form />
        </div>
      </section>
    </main>
  );
}
