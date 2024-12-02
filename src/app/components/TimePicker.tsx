"use client"
import { WeekdayShortNames } from "@/libs/shared"
import { ScheduledTime, WeekdayName } from "@/libs/types"
import Spinner from "@/utlis/spinner"
import axios from "axios"
import clsx from "clsx"
import {
  getDay,
  format,
  addDays,
  isLastDayOfMonth,
  subMonths,
  addMonths,
  isFuture,
  isToday,
  isEqual,
  addMinutes,
  isBefore,
  startOfDay,
  endOfDay,
  isAfter,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { TimeSlot } from "nylas"

import { useEffect, useState } from "react"

const TimePicker = ({
  bookingTimes,
  length,
  username,
  meetingUri,
}: {
  bookingTimes: ScheduledTime
  length: number
  username: string
  meetingUri: string
}) => {
  const currentDate = new Date()
  const [activeCurrentDate, setActiveCurrentDate] = useState(currentDate)
  const [activeMonthIndex, setActiveMonthIndex] = useState(
    activeCurrentDate.getMonth()
  )
  const [activeYear, setActiveYear] = useState(activeCurrentDate.getFullYear())
  const [selectedDay, setSelectedDay] = useState<null | Date>(null)
  const [busySlots, setBusySlots] = useState<TimeSlot[]>([])
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    const fecthBusyTimes = async (day: Date) => {
      const params = new URLSearchParams()
      params.set("username", username)
      params.set("bookingTimeFrom", startOfDay(day).toISOString())
      params.set("bookingTimeTo", endOfDay(day).toISOString())
      try {
        const response = await axios.get(`/api/busy?` + params.toString())
        setBusySlots(response.data)
        setIsChecking(false)
      } catch (err) {
        console.error("Error reading busy backend", err)
      }
    }
    if (selectedDay) {
      setBusySlots([])
      setIsChecking(true)
      fecthBusyTimes(selectedDay)
    }
  }, [selectedDay])

  function preMonth() {
    setActiveCurrentDate((prev) => {
      const newD = subMonths(prev, 1)
      setActiveMonthIndex(newD.getMonth())
      setActiveYear(newD.getFullYear())
      return newD
    })
  }

  function nextMonth() {
    setActiveCurrentDate((prev) => {
      const newD = addMonths(prev, 1)
      setActiveMonthIndex(newD.getMonth())
      setActiveYear(newD.getFullYear())
      return newD
    })
  }

  function handleDayClick(day: Date) {
    setSelectedDay(day)
  }

  const firstDayofCurrentMonth = new Date(activeYear, activeMonthIndex, 1) // day 1

  const firstDayofCurrentMonthWeekdayIndex = getDay(firstDayofCurrentMonth)

  const lastMonthDaysInActiveMonth =
    firstDayofCurrentMonthWeekdayIndex === 0
      ? 6
      : firstDayofCurrentMonthWeekdayIndex - 1 // what day is the frist day of month - monday 0 ... sunday 6

  const lastMonthDaysInActiveMonthArray = new Array(
    lastMonthDaysInActiveMonth
  ).fill("  ", 0, lastMonthDaysInActiveMonth)

  const daysInActiveMonth = [firstDayofCurrentMonth]
  do {
    const lastAddedDay = daysInActiveMonth[daysInActiveMonth.length - 1]
    daysInActiveMonth.push(addDays(lastAddedDay, 1))
  } while (!isLastDayOfMonth(daysInActiveMonth[daysInActiveMonth.length - 1]))

  const bookingHours: { day: Date; isBusy: boolean }[] = []

  function checkIsSlotBusy(slotFrom: Date): boolean {
    const slotTo = addMinutes(slotFrom, 30)
    for (const busySlot of busySlots) {
      const busyFrom = new Date(parseInt(busySlot.startTime) * 1000)
      const busyTo = new Date(parseInt(busySlot.endTime) * 1000)
      if (isEqual(busyFrom, slotFrom)) return true
      if (isAfter(busyFrom, slotFrom) && isBefore(busyFrom, slotTo)) return true
      if (isBefore(busyFrom, slotFrom) && isAfter(busyTo, slotFrom)) return true
      if (
        isBefore(slotFrom, busyFrom) &&
        isAfter(addMinutes(slotFrom, length), busyFrom)
      )
        return true
    }
    return false
  }

  if (selectedDay) {
    const selectedWeekDay = format(
      selectedDay,
      "EEEE"
    ).toLowerCase() as WeekdayName
    const selectedDayFrom = new Date(selectedDay) // make a copy of selected day
    const selectedDayTo = new Date(selectedDay)
    const selectedDayConfig = bookingTimes?.[selectedWeekDay]
    if (selectedDayConfig) {
      const [hours, minutes] = selectedDayConfig.from.split(":")
      selectedDayFrom.setHours(parseInt(hours))
      selectedDayFrom.setMinutes(parseInt(minutes))
      const [hoursM, minutesM] = selectedDayConfig.to.split(":")
      selectedDayTo.setHours(parseInt(hoursM))
      selectedDayTo.setMinutes(parseInt(minutesM))
    }
    let activeDateHorMin = selectedDayFrom

    do {
      const isSlotBusy = checkIsSlotBusy(activeDateHorMin)
      bookingHours.push({ day: new Date(activeDateHorMin), isBusy: isSlotBusy })
      activeDateHorMin = addMinutes(activeDateHorMin, 30)
    } while (isBefore(addMinutes(activeDateHorMin, length), selectedDayTo))
  }

  return (
    <div className="flex flex-col text-indigo-900 grow">
      <div className="flex space-x-4">
        <div className="flex flex-col ">
          <div className="flex items-center">
            <span className="grow font-semibold">
              {format(new Date(activeYear, activeMonthIndex, 1), "MMMM")}{" "}
              {activeYear}
            </span>
            <button onClick={preMonth}>
              <ChevronLeft />
            </button>
            <button onClick={nextMonth}>
              <ChevronRight />
            </button>
          </div>
          <div className="inline-grid grid-cols-7 gap-x-1 gap-y-2 mt-2 uppercase text-sm font-semibold">
            {WeekdayShortNames.map((day) => (
              <span key={day}>{day}</span>
            ))}

            {lastMonthDaysInActiveMonthArray.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
            {daysInActiveMonth.map((day, index) => {
              const isActiveInBookingTimes: boolean =
                bookingTimes[format(day, "EEEE").toLowerCase() as WeekdayName]
                  ?.active
              const canBeBooked = isFuture(day) && isActiveInBookingTimes
              return (
                <div key={index} className="text-center text-sm font-semibold">
                  <button
                    disabled={!canBeBooked}
                    onClick={() => handleDayClick(day)}
                    className={clsx(
                      "inline-flex items-center justify-center w-8 h-8 rounded-full",
                      canBeBooked ? " bg-indigo-200 " : " bg-indigo-50 ",
                      selectedDay && isEqual(day, selectedDay)
                        ? "bg-indigo-400 text-indigo-50 transition duration-300"
                        : "",
                      isToday(day)
                        ? " border-4 border-indigo-300 border-dashed font-bold text-blue-800"
                        : ""
                    )}
                  >
                    {format(day, "d")}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col grow items-center">
          <span className=" font-semibold text-center">
            {selectedDay && format(selectedDay, "EEE, MMM d")}
          </span>
          <div className="grid gap-1 mt-1 max-h-56 overflow-auto w-full">
            {isChecking ? (
              <div className="flex justify-center"><Spinner /></div>
            ) : (
              bookingHours.map((bookingHour, index) => {
                const { day, isBusy } = bookingHour
                if (!isBusy) {
                  return (
                    <Link
                      href={`/${username}/${meetingUri}/${day.toISOString()}`}
                      key={index}
                      className="border-4 border-indigo-200 rounded-lg  text-indigo-700 text-center"
                    >
                      {format(day, "HH:mm")}
                    </Link>
                  )
                } else {
                  return (
                    <p
                      className="border-4 border-indigo-200 rounded-lg bg-indigo-500 text-indigo-100 text-center"
                      key={index}
                    >
                      {" "}
                      {format(day, "HH:mm")}
                    </p>
                  )
                }
              })
            )}
          </div>
        </div>
      </div>

      <pre>
        {/* <pre>{JSON.stringify(bookingTimes, null, 2)}</pre> */}

        {/* {WeekdayNames.map((day) => {
          if (
            bookingTimes[day]?.active &&
            selectedDay &&
            format(selectedDay, "EEEE").toLowerCase() === day
          )
            return (
              <div key={day}>
                {day} from {bookingTimes?.[day].from} to {bookingTimes[day].to}
              </div>
            )
        })} */}
      </pre>
    </div>
  )
}

export default TimePicker
