
import EventTypeForm from "@/app/components/EventTypeForm"
import dbConnect from "@/libs/dbConnect"
import { EventTypeModel } from "@/models/EventType"
import { ProfileModel } from "@/models/Profile"

type PageProps = {
  params: {
    id: string
  }
}
const EditEventTypePage = async ({ params }: PageProps) => {
  const id = params.id
  const email = await dbConnect()
  const eventTypeDoc = await EventTypeModel.findOne({ _id: id })
  const {username} = await ProfileModel.findOne({email})

  return (
    <div>
    { eventTypeDoc && <EventTypeForm doc={JSON.parse(JSON.stringify(eventTypeDoc))} username={username?username:''} />}  
    </div>
  )
}

export default EditEventTypePage
