import dbConnect from "@/libs/dbConnect"
import { EventTypeModel } from "@/models/EventType"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const email = await dbConnect()
  const data = await req.json()

  if (email) {
    const evTypeDoc = await EventTypeModel.create({ email, ...data })
    return Response.json(evTypeDoc)
  } else {
    return Response.json(false)
  }
}

export async function PUT(req: NextRequest) {
  const email = await dbConnect()
  const data = await req.json()
  const id = data.id

  if (email && id) {
    const { id, ...newData } = data
    const evTypeDoc = await EventTypeModel.updateOne(
      { email, _id: id },
      newData
    )
    return Response.json(evTypeDoc)
  } else {
    return Response.json(false)
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.searchParams.get("id")
  await dbConnect()
  await EventTypeModel.deleteOne({ _id: id })
  return Response.json(true)
}
