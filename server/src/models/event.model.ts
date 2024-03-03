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
  approval: boolean;
  ticketId: string;
  ticketPrice: number;
  nftIpfsUri: string;
}

const eventSchema: Schema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  organizerWalletAddress: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  approval: {
    type: Boolean,
    default: false,
  },
  ticketId: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  nftIpfsUri: {
    type: String,
    required: true,
  },
});

const EventModel = mongoose.model<Event>("Event", eventSchema);

export default EventModel;
