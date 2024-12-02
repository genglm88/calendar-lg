"use server"

import dbConnect from "@/libs/dbConnect"

import { EventTypeModel } from "@/models/EventType"
import { ProfileModel } from "@/models/Profile"

import { Plus } from "lucide-react"

import Link from "next/link"

export default async function EventTypesPage() {
  const email = await dbConnect()
  const eventTypes = await EventTypeModel.find({ email })
  const {username} = await ProfileModel.findOne({email})

  return (
    <div className="card-container  !text-indigo-900">
      
      <h1 className="text-2xl font-bold mb-4">Scheduled events</h1>

      {/* Render the client component */}
      <div className="space-y-6 w-full">
        {eventTypes?.map((evt) => {
          const { id, title, uri, description } = evt
          const eventTypeLink = process.env.NEXT_PUBLIC_URL+(username?username:'')+'/'+uri
          return (
            <div
              key={id}
              className="flex flex-col  border bg-gray-50  border-gray-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
            >
              <div className="space-x-2">
                <Link
                  href={"/dashboard/event-types/edit/" + id}
                  className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  {title}
                </Link>
                <Link
                  href={eventTypeLink}
                  className="tex-lg  text-gray-400 semi-bold hover:text-gray-800 transition-colors duration-200"
                >
                  {eventTypeLink}
                </Link>
              </div>
              <p className="text-gray-700 mt-2 leading-relaxed">
                {description}
              </p>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center mt-6">
        <Link
          href="/dashboard/event-types/new/"
          className="btn-blue flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          <Plus size={16} />
          Add new event type
        </Link>
      </div>
    </div>
  )
}
