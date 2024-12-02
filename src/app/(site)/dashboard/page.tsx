
import ProfileForm from "@/app/components/ProfileForm"
import dbConnect from "@/libs/dbConnect"
import { ProfileModel } from "@/models/Profile"

const DashboardPage = async () => {
  const email = await dbConnect()
  const profileDoc = await ProfileModel.findOne({email})
  return (
    <div className="card-container">
    
      <ProfileForm  existingUsername= {profileDoc?.username || ""} />
    </div>
  )
}

export default DashboardPage
