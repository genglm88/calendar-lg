
import EventTypeForm from "@/app/components/EventTypeForm"

export default function EnterNewEventPage() {
  return (
    <div className="space-y-6 ">
       
      <h2 className="text-2xl text-indigo-800 font-semibold mb-2">
        Create new event type:
      </h2>
      <EventTypeForm />
    </div>
  )
}
