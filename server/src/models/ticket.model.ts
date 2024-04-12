// ticket.model.ts

import mongoose, { Schema, Document } from "mongoose";

export interface Ticket extends Document {
  eventId: string;
  ticketId: string;
  nftAddress: string;
  walletAddress: string;
}

const TicketSchema = new Schema<Ticket>({
  eventId: { type: String, required: true },
  ticketId: { type: String, required: true },
  nftAddress: { type: String, required: true },
  walletAddress: { type: String, required: true },
});

const TicketModel = mongoose.model<Ticket>("Ticket", TicketSchema);

export default TicketModel;
