import dbConnect from "@/libs/dbConnect"
import { EventTypeModel } from "@/models/EventType"
import { Clock, Info } from "lucide-react"
import React, { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
  params: {
    username: string
    booking_uri: string
  }
}

const BookingBoxLayout = async (props: LayoutProps) => {
  const email = await dbConnect()
  const eventTypeDoc = await EventTypeModel.findOne({
    email,
    uri: props.params.booking_uri,
  })

  if (!eventTypeDoc) return "404"

  const { title, description, length } = eventTypeDoc

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover backdrop-blur-2xl"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className=" flex flex-col sm:flex-row w-full max-w-2xl mx-auto overflow-hidden rounded-xl shadow-lg">
        <div className=" bg-indigo-100 p-8 sm:w-48 ">
          <h1 className="text-md text-indigo-900 font-bold border-b-4 border-indogo-900">
            {title}
          </h1>
          <div className="flex items-center space-x-2 mt-4 text-indigo-700">
            <div>
              <Clock className="text-indigo-600" />{" "}
            </div>
            <span className="text-lg font-medium">{length} min</span>
          </div>
          <div className="flex items-start space-x-2 mt-4 text-indigo-700">
            <div>
              <Info className="text-indigo-600" />
            </div>
            <span className="text-sm text-gray-500 font-medium">
              {description}
            </span>
          </div>
        </div>

        <div className=" bg-indigo-50 p-8 grow">{props.children}</div>
      </div>
    </div>
    // <pre>{JSON.stringify(props, null, 2)}</pre>
  )
}

export default BookingBoxLayout
