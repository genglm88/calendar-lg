import dbConnect from "@/libs/dbConnect"
import { nylas } from "@/libs/nylas"
import { BookingModel } from "@/models/Booking"
import { EventTypeModel } from "@/models/EventType"
import { ProfileModel } from "@/models/Profile"
import { addMinutes } from "date-fns"
import { NextRequest } from "next/server"

type JsonData = {
  bookingName: string
  bookingEmail: string
  bookingAdditionalInfo: string
  bookingTime: string
  username: string
  bookingUri: string
}
export async function POST(req: NextRequest) {
  const email = await dbConnect()
  const data: JsonData = await req.json()
  const {
    bookingName,
    bookingEmail,
    bookingAdditionalInfo,
    bookingTime,
    username,
    bookingUri,
  } = data
  //console.log({ bookingUri, email })
  if (email) {
    const profileDoc = await ProfileModel.findOne({
      email,
      username: username,
    })
    if (!profileDoc) {
      return Response.json("invalid url", { status: 404 })
    }
    const evTypeDoc = await EventTypeModel.findOne({ email, uri: bookingUri })
    if (!evTypeDoc) {
      return Response.json("invalid uri", { status: 404 })
    }
    await BookingModel.create({
      bookingName,
      bookingEmail,
      bookingAdditionalInfo,
      bookingTime,
      eventTypeId: evTypeDoc._id,
    })
    const grantId = profileDoc.grantId
    const startDate = new Date(bookingTime)

    try {
      const event = await nylas.events.create({
        identifier: grantId,
        requestBody: {
          title: evTypeDoc.title,
          when: {
            startTime: Math.round(startDate.getTime() / 1000), //The getTime() method of a JavaScript Date object returns the time value in milliseconds since January 1, 1970 (UTC).
            endTime: Math.round(
              addMinutes(startDate, evTypeDoc.length).getTime() / 1000
            ),
          },
          conferencing: {
            autocreate: {},
            provider: "Google Meet",
          },
          participants: [
            {
              name: bookingName,
              email: bookingEmail,
              status: "yes",
            },
          ],
        },
        queryParams: {
          calendarId: evTypeDoc.email,
        },
      })

      console.log("Event:", event)
    } catch (error) {
      console.error("Error creating event:", error)
    }

    return Response.json(true, { status: 201 })
  } else {
    return Response.json(false)
  }
}

// export async function PUT(req: NextRequest) {
//   const email = await dbConnect()
//   const data = await req.json()
//   const id = data.id

//   if (email && id) {
//     const { id, ...newData } = data
//     const evTypeDoc = await EventTypeModel.updateOne(
//       { email, _id: id },
//       newData
//     )
//     return Response.json(evTypeDoc)
//   } else {
//     return Response.json(false)
//   }
// }

// export async function DELETE(req: NextRequest) {
//   const url = new URL(req.url)
//   const id = url.searchParams.get("id")
//   await dbConnect()
//   await EventTypeModel.deleteOne({ _id: id })
//   return Response.json(true)
// }
