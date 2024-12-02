"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export default function DashboardNav({
  existingUsername ,
}: {
  existingUsername?: string
}) {
  const pathname = usePathname()
  const isEventTypePage = pathname.includes("event-types")
  const isBookedEventPage = pathname.includes("booked_events")

  return (
    <div className=" flex gap-8 justify-center mt-8 mb-24">
      <Link
        href="/dashboard"
        className={clsx(
          "btn-blue",
          pathname === "/dashboard" ? "!bg-indigo-900" : ""
        )}
      >
        Profile
      </Link>
      {existingUsername && (
        <Link
          href={"/dashboard/booked_events"}
          className={clsx(
            "btn-blue",
            isBookedEventPage ? " !bg-indigo-900 " : ""
          )}
        >
          Booked events
        </Link>
      )}
      {existingUsername && (
        <Link
          href={"/dashboard/event-types"}
          className={clsx(
            "btn-blue" + (isEventTypePage ? " !bg-indigo-900" : "")
          )}
        >
          Event types
        </Link>
      )}
    </div>
  )
}
