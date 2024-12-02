"use client"

import { Play } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export const Hero = () => {
  const [showLine, setShowLine] = useState(false)
  useEffect(() => {
    setShowLine(true)
  }, [])

  return (
    <section className="bg-indigo-50 py-32">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-indigo-800 mb-6 leading-tight">
          Effortless{" "}
          <span
            className={
              "text-blue-600 cool-underline " +
              (showLine ? "show-underline" : "")
            }
          >
            Scheduling
          </span>
          <br />
          Seamless Productivity
        </h1>

        <p className="text-md text-gray-600/70 mb-8">
          Stay on top of your day with CalendarLG, the smart scheduling app
          designed to make planning simple. Whether its meetings, tasks, or
          events, manage your time like never before. Sync across all your
          devices and keep your calendar in perfect order with just a few
          clicks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="#"
            className="bg-indigo-600 text-indigo-50 py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-800 transition duration-300 whitespace-nowrap"
          >
            Get started for free
          </Link>
          <Link
            href="#"
            className="bg-indigo-600 text-indigo-50 inline-flex items-center gap-1 py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-800 transition duration-300 whitespace-nowrap"
          >
           <Play size={18}/> Watch video
          </Link>
        </div>

        
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="bg-indigo-500 text-indigo-50 p-4 rounded-full">
              📅
            </span>
          </div>
          <h3 className="text-xl font-semibold text-indigo-800">
            Smart Scheduling
          </h3>
          <p className="text-gray-600/70 mt-2 text-md">
            AI-powered suggestions to optimize your day.
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="bg-indigo-500 text-indigo-50 p-4 rounded-full">
              ⏰
            </span>
          </div>
          <h3 className="text-xl font-semibold text-indigo-800">
            Reminders & Alerts
          </h3>
          <p className="text-gray-600/70 mt-2 text-md">
            Never miss an important event.
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="bg-indigo-500 text-indigo-50 p-4 rounded-full">
              🔄
            </span>
          </div>
          <h3 className="text-xl font-semibold text-indigo-800">
            Sync Across Devices
          </h3>
          <p className="text-gray-600/70 mt-2 text-md">
            Seamless integration with your calendar apps.
          </p>
        </div>
      </div>
    </section>
  )
}
