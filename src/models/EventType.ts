import { ScheduledTime } from "@/libs/types"
import mongoose, { model, models, Schema } from "mongoose"

const FromToSchema = new Schema({
  from: String,
  to: String,
  active: Boolean,
})

const EventTypeSchema = new Schema(
  {
    email: String,
    uri:String,
    title: String,
    description: String,
    length:Number,
    bookingTimes: new Schema({
      monday: FromToSchema,
      tuesday: FromToSchema,
      wednesday: FromToSchema,
      thursday: FromToSchema,
      friday: FromToSchema,
      saturday: FromToSchema,
      sunday: FromToSchema,
    }),
  },
  {
    timestamps: true,
  }
)

export interface IEventType extends mongoose.Document {
  email: string
  uri:string
  title: string
  description: string
  length: number
  bookingTimes: ScheduledTime
  createdAt: Date
  updatedAt: Date
}

export const EventTypeModel =
  models?.EventType || model<IEventType>("EventType", EventTypeSchema)
