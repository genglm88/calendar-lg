import mongoose, { model, models, Schema } from "mongoose"

interface BookingProfile extends mongoose.Document {
    bookingName: string
    bookingEmail: string
    bookingAdditionalInfo: string
    bookingTime: Date
    eventTypeId: string
  }

  
const BookingSchema = new Schema(
  {
    bookingName: {type: String, required: true},
    bookingEmail: {type: String, required: true},
    bookingAdditionalInfo: String,
    bookingTime: Date,
    eventTypeId:{type: String, required: true},
  },
  { timestamps: true }
)

export const BookingModel = models?.Booking || model<BookingProfile>('Booking', BookingSchema)