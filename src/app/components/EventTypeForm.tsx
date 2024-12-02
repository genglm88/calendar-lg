"use client"
import axios from "axios"
import { FormEvent, useState } from "react"
import TimeSelect from "./TimeSelect"
import { ScheduledTime, WeekdayName } from "@/libs/types"
import { useRouter } from "next/navigation"
import { IEventType } from "@/models/EventType"
import EventTypeDelete from "./EventTypeDelete"
//import { useRouter } from "next/router"
export const WeekdayNames: WeekdayName[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]

export const uriFromTitle= (title:string):string =>{
//return the title as a lowercase string
return title.toLowerCase().replace(/[^a-z0-9]/g,'-')
}

export default function EventTypeForm({ doc, username }: { doc?: IEventType, username?:string }) {
  const [title, setTitle] = useState(doc?.title || "")
  const [description, setDescription] = useState(doc?.description || "")
  const [length, setLength] = useState(doc?.length || 30)
  const [scheduledTime, setScheduledTime] = useState<ScheduledTime>(
    doc?.bookingTimes || {
      monday: { from: "00:00", to: "00:00", active: false },
      tuesday: { from: "00:00", to: "00:00", active: false },
      wednesday: { from: "00:00", to: "00:00", active: false },
      thursday: { from: "00:00", to: "00:00", active: false },
      friday: { from: "00:00", to: "00:00", active: false },
      saturday: { from: "00:00", to: "00:00", active: false },
      sunday: { from: "00:00", to: "00:00", active: false },
    }
  )
  const router = useRouter()

  function handleScheduledTimeChange(
    day: WeekdayName,
    val: string | boolean,
    type: "from" | "to" | "active"
  ) {
    setScheduledTime((oldTime) => {
      const newSchduledTime = { ...oldTime }
      if (!newSchduledTime[day]) {
        newSchduledTime[day] = { from: "00:00", to: "00:00", active: false }
      }

      if (type === "active") {
        newSchduledTime[day][type] = val as boolean
      } else newSchduledTime[day][type] = val as string

      return newSchduledTime
    })
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    const id = doc?._id
    const request = id ? axios.put : axios.post
    const data = {
      title,
      //uri:process.env.NEXT_PUBLIC_URL+(username?username:'')+'/'+uriFromTitle(title),
      uri:uriFromTitle(title),
      description,
      length,
      bookingTimes: scheduledTime,
    }
    const res = await request("/api/event-types", { ...data, id })
    if (res.data) {
      router.push("/dashboard/event-types")
      router.refresh()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  p-6 bg-indigo-50  space-y-6  rounded-lg shadow-md"
    >
      <div className="space-y-6 md:space-y-0 text-indigo-900/80 md:flex md:items-start md:space-x-8">
        <div className="flex flex-col space-y-4 w-full md:w-1/2">
          <label className="flex flex-col">
            <span>{doc?`http://localhost:3000/${username}/${uriFromTitle(title)}`:'Title'}</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="p-2 border w-full block border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="flex flex-col">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="p-2 border h-48 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </label>
          <div className="flex items-center space-x-2">
            <span>Length:</span>
            <input
              type="text"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              placeholder="30"
              className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span>min</span>
          </div>
        </div>

        <div className="space-y-4 ">
          <div>
            <span className="font-semibold">Availability:</span>
          </div>

          <div className="flex flex-col space-y-2">
            {WeekdayNames.map((weekday) => {
              const isActive = scheduledTime?.[weekday]?.active
              return (
                <div key={weekday} className="flex items-center">
                  <div className="w-24 sm:w-32 flex items-center space-x-1">
                    <input
                      type="checkbox"
                      value={1}
                      checked={scheduledTime?.[weekday]?.active}
                      onChange={(e) =>
                        handleScheduledTimeChange(
                          weekday,
                          e.target.checked,
                          "active"
                        )
                      }
                    />
                    <span className="font-semibold capitalize">
                      {weekday}:{" "}
                    </span>
                  </div>
                  <div
                    className={
                      "flex items-center space-x-4" +
                      (isActive ? "" : " opacity-40")
                    }
                  >
                    <span>from</span>
                    <TimeSelect
                      value={scheduledTime?.[weekday]?.from || "00.00"}
                      onChange={(val) =>
                        handleScheduledTimeChange(weekday, val, "from")
                      }
                      step={30}
                    />
                    <span>to</span>
                    <TimeSelect
                      value={scheduledTime?.[weekday]?.to || "00.000"}
                      onChange={(val) =>
                        handleScheduledTimeChange(weekday, val, "to")
                      }
                      step={30}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4">
        {doc && (
          <EventTypeDelete id= {doc._id as string}/>
        )}
        <button type="submit" className="btn-blue !px-12">
          Save
        </button>
      </div>
    </form>
  )
}
