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
    <nav className="flex  items-center justify-between px-6 py-4  shadow-md">
      <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-90 transition-all">
        MindTrek
      </Link>

      <div className="flex items-center gap-4">
          <Themetoggle/>
        {status === "unauthenticated" ? (
          <Button
            onClick={() => signIn("github", { redirectTo: "/dashboard" })}
            className=" bg-white text-black dark:bg-black dark:text-white font-medium"
          >
            Sign In
          </Button>
        ) : (
          <>
            <select className="bg-[#fdf6f0] text-[#222222] dark:bg-[#1c1c1c] dark:text-[#e0e0e0]" onChange={(e)=>router.push(`/${e.target.value}`)}>
              <option disabled>History</option>
              <option value={'seven'}>Past seven days</option>
              <option  value={'month'}>Past month</option>
              <option  value={'twenty'}>Past twenty days</option>

            </select>
            <Button
              onClick={() => router.push("/dashboard")}
               className=" bg-white text-black dark:bg-black dark:text-white font-medium"
            >
              Dashboard
            </Button>
            <Button
              onClick={() => signOut()}
               className=" bg-white text-black dark:bg-black dark:text-white font-medium"
            >
              Sign Out
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
