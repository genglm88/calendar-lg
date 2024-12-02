import dbConnect from "@/libs/dbConnect"
import { ProfileModel } from "@/models/Profile"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const email = await dbConnect()
  const { username } = await req.json()

  if (email && username) {
    const profileDoc = await ProfileModel.findOne({ email })
    if (profileDoc) {
      profileDoc.username = username
      await profileDoc.save()
    } else {
      await ProfileModel.create({ email, username })
    }

    return Response.json(profileDoc)
  } else {
    return Response.json(false)
  }
}
