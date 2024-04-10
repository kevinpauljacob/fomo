import mongoose, { Schema, Document } from "mongoose";

export interface Event extends Document {
  eventName: string;
  organizer: string;
  organizerWalletAddress: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: number;
  eventId: string;
  ticketPrice: number;
  eventBanner: Buffer;
}

const EventSchema = new Schema<Event>({
  eventName: { type: String, required: true },
  organizer: { type: String, required: true },
  organizerWalletAddress: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  eventId: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  eventBanner: { type: Buffer, required: true },
});

const EventModel = mongoose.model<Event>("Event", EventSchema);

export default EventModel;
