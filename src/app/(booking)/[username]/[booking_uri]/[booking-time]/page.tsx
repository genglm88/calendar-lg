"use client"
import axios from "axios"
import { format } from "date-fns"
import { FormEvent, useState } from "react"

type PageProps = {
  params: {
    username: string
    booking_uri: string
    "booking-time": string //Bracket notation is also used here because the property name includes a hyphen (-), which isn't valid for dot notation.
  }
}

const BookingFormPage = (props: PageProps) => {
  const username = props.params.username
  const bookingUri = props.params["booking_uri"]
  const bookingTime = new Date(decodeURIComponent(props.params["booking-time"]))
  const [bookingName, setBookingName] = useState("")
  const [bookingEmail, setBookingEmail] = useState("")
  const [bookingAdditionalInfo, setBookingAdditionalInfo] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()

    const data = {
      bookingName,
      bookingEmail,
      bookingAdditionalInfo,
      bookingTime,
      username,
      bookingUri,
    }
    try {
      await axios.post("/api/booking", data)
      setConfirmed(true)
    } catch (err) {
      console.error("Error saving booking inormation.", err)
    }
  }

  return (
    <div className="text-left">
      <h1 className=" text-indigo-900 font-semibold">{format(bookingTime, "EEE, MMM d, HH:mm")}</h1>
      {confirmed ? (
        <h2 className="mt-4 text-indigo-900 font-semibold">Thank you for booking!</h2>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  bg-indigo-50  space-y-6  rounded-lg shadow-md mt-4 p-2"
        >
          <div className="space-y-6 md:space-y-0 text-indigo-900/80 md:flex md:items-start md:space-x-8 ">
            <div className="flex flex-col space-y-4 w-full">
              <label className="flex flex-col">
                <span>Name</span>
                <input
                  type="text"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  placeholder="First and last name"
                  className="p-2 border w-full block border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <span>Email</span>
                <input
                  type="email"
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                  placeholder="email"
                  className="p-2 border w-full block border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <span>Additional Information</span>
                <textarea
                  value={bookingAdditionalInfo}
                  onChange={(e) => setBookingAdditionalInfo(e.target.value)}
                  placeholder="Any relevant information (optional)"
                  className="p-2 border h-48 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4">
            <button type="submit" className="btn-blue !px-12">
              Confirm
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
export default BookingFormPage
