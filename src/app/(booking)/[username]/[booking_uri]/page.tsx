import TimePicker from "@/app/components/TimePicker"
import dbConnect from "@/libs/dbConnect"
import { EventTypeModel } from "@/models/EventType"

type PageProps = {
  params: {
    username: string
    booking_uri: string
  }
}

const BookingPage = async ({ params }: PageProps) => {
  const email = await dbConnect()
  const eventTypeDoc = await EventTypeModel.findOne({
    email,
    uri: params.booking_uri,
  })
  
  if (!eventTypeDoc) return "404"

  const { length, bookingTimes } = eventTypeDoc

  return (
    <TimePicker
      bookingTimes={JSON.parse(JSON.stringify(bookingTimes))}
      length={length}
      username={params.username}
      meetingUri={params.booking_uri}
    />
  )
}

export default BookingPage
