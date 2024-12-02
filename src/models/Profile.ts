import mongoose, { model, models, Schema } from "mongoose"

interface IProfile extends mongoose.Document{
email:string
username:string
grantId:string
}

const ProfileSchema = new Schema({
  email: { type: String, required: true, unique:true },
  username: { type: String, unique:true },
  grantId:String,
})

export  const ProfileModel = models?.Profile || model<IProfile>('Profile', ProfileSchema)