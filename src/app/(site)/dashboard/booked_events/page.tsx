import dbConnect from "@/libs/dbConnect"
import { BookingModel } from "@/models/Booking"
import { EventTypeModel } from "@/models/EventType"
import { format } from "date-fns"
import { CircleUserRound, Clock, Info, Mail } from "lucide-react"

export default async function BookedEventsPage() {
  const email = await dbConnect()

  const evtTyepDoc = await EventTypeModel.find({ email })
  const bookedEvents = await BookingModel.find({
    eventTypeId: evtTyepDoc.map((evt) => evt._id),
  }, {}, {sort:'bookingTimes'})

  return (
<div className="card-container-row p-6 bg-gray-100 rounded-lg">
  {bookedEvents.map((evt) => {
    const evtDocOne = evtTyepDoc.find((evtD) => evtD._id.toString() === evt.eventTypeId);

    return (
      <div
        key={evt.createdAt}
        className="p-4 bg-white w-full md:w-64 rounded-lg shadow hover:shadow-lg transition-shadow"
      >
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">{evtDocOne?.title}</h3>
        <div className="text-sm text-indigo-900/70">
          <div className="mb-2 flex gap-1 items-center">
            <span className="font-medium text-indigo-900/80"> <CircleUserRound size={18}/> </span>
            {evt.bookingName}
          </div>
          <div className="mb-2 flex gap-1 items-center">
            <span className="font-medium text-indigo-900/80"><Mail size={18}/> </span>
            {evt.bookingEmail}
          </div>
          <div className="mb-2 flex gap-1 items-center">
            <span className="font-medium text-indigo-900/80"><Info size={18} /> </span>
            {evt.bookingAdditionalInfo}
          </div>
          <div className="mb-2 flex gap-1 items-center">
            <span className="font-medium text-indigo-900/80"><Clock size={18} /> </span>
            {format(evt.bookingTime, "EEE, MMM d")}
          </div>
        </div>
      </div>
    );
  })}
</div>

  )
}
