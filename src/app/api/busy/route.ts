import dbConnect from "@/libs/dbConnect"
import { nylas } from "@/libs/nylas"
import { ProfileModel } from "@/models/Profile"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest)  {
  const url = new URL(req.url)
  const username = url.searchParams.get("username")
  const bookingTimeFrom = new Date(
    url.searchParams.get("bookingTimeFrom") as string
  )
  const bookingTimeTo = new Date(
    url.searchParams.get("bookingTimeTo") as string
  )

  //get GrantId
  const email = await dbConnect()

  const profileDoc = await ProfileModel.findOne({ username })
  if (!profileDoc) {
    return Response.json("invalid username and/or bookinfUri")
  }
  
  const result = await nylas.calendars.getFreeBusy({
    identifier: profileDoc.grantId,
    requestBody: {
      emails: [email],
      startTime: Math.round(bookingTimeFrom.getTime() / 1000),
      endTime: Math.round(bookingTimeTo.getTime() / 1000),
    },
  })
  // @ts-expect-error timeSlots
  const busySlots = result?.data?.[0].timeSlots
  //
  return Response.json(busySlots)
}
