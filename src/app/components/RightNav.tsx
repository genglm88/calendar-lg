'use client'
import Link from "next/link"

export default function RightNav({ email }: { email: string }) {

  if (email) {
    return (
      <nav className="flex flex-col md:flex-row gap-1 md:gap-4 items-center">
        <Link
          href="/dashboard"
          className= "btn-blue !rounded-full"
        >
          Dashboard
        </Link>
        {/* <Link href="/api/logout">Logout</Link> */}
        <a href="/api/logout">Logout</a>
      </nav>
    )
  } else {

    return (
      <nav className="flex flex-col md:flex-row gap-1 md:gap-4 items-center">
        <Link href="/api/auth">Sign in</Link>
        <Link
          href="/dashboard"
          className="btn-blue !rounded-full"
        >
          Get started
        </Link>
      </nav>
    )
  }
}
