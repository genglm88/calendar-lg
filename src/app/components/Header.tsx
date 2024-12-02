"use server"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import React from "react"
import { session } from "@/libs/session"
import RightNav from "./RightNav"

export const Header = async () => {
  const email = await session().get("email")
  return (
    <header className="flex flex-col md:flex-row gap-4 justify-center md:justify-between items-center py-6 text-gray-900/60">
      <div className="flex flex-col md:flex-row  gap-1 md:gap-6 items-center">
        <Link
          href="/"
          className="text-indigo-800 font-bold text-xl flex gap-1 items-center"
        >
          <CalendarDays size={24} />
          CalendarLG
        </Link>

        <nav className="flex flex-col md:flex-row  md:gap-4">
          <Link href="/features">Features</Link>
          <Link href="/about">About</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
      </div>

      <RightNav email={email}/>
    </header>
  )
}
