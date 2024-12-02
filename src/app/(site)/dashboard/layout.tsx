import DashboardNav from "@/app/components/DashboardNav"
import dbConnect from "@/libs/dbConnect"
import { ProfileModel } from "@/models/Profile"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const email = await dbConnect()

  const profileDoc = await ProfileModel.findOne({ email })
  
  return (
    <div>
      <DashboardNav existingUsername={profileDoc?.username || ""} />
      {children}
    </div>
  )
}
