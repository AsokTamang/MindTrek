"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Themetoggle from "./themetoggle";

export default function Navbar() {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between shadow-md bg-white dark:bg-black transition-colors duration-300">
      <Link
        href="/"
        className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white hover:opacity-90 transition-all"
      >
        MindTrek
      </Link>

      <div className="flex items-center gap-3 sm:gap-4">
        <Themetoggle />

        {status === "unauthenticated" ? (
          <Button
            onClick={() => signIn("github", { redirectTo: "/dashboard" })}
            className="bg-white text-black dark:bg-zinc-900 dark:text-white font-medium border border-gray-300 dark:border-gray-700 hover:opacity-90"
          >
            Sign In
          </Button>
        ) : (
          <>
            <select
              className="rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-[#fdf6f0] text-[#222222] dark:bg-[#1c1c1c] dark:text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => router.push(`/${e.target.value}`)}
              defaultValue={" "}
            >
              <option value=" " disabled>
                History
              </option>
              <option value={"seven"}>Past 7 Days</option>
              <option value={"month"}>Past Month</option>
              <option value={"twenty"}>Past 20 Days</option>
            </select>

            <Button
              className="bg-white text-black dark:bg-zinc-900 dark:text-white font-medium border border-gray-300 dark:border-gray-700 hover:opacity-90"
              onClick={() => router.push("/inspiration")}
            >
              Suggestion
            </Button>

            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-white text-black dark:bg-zinc-900 dark:text-white font-medium border border-gray-300 dark:border-gray-700 hover:opacity-90"
            >
              Dashboard
            </Button>

            <Button
              onClick={() => signOut()}
              className="bg-white text-black dark:bg-zinc-900 dark:text-white font-medium border border-gray-300 dark:border-gray-700 hover:opacity-90"
            >
              Sign Out
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
