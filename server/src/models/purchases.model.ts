import { Document, Schema } from "mongoose";
import mongoose, { Types } from "mongoose";

// Define interface for ticket purchase document
export interface TicketPurchase extends Document {
  eventId: Types.ObjectId; // ID of the event
  userId: Types.ObjectId; // ID of the user who bought the ticket
  nftAddress: string; // NFT address of the user
  walletAddress: string; // Wallet address of the user
}

// Define schema for ticket purchase collection
const TicketPurchaseSchema = new Schema<TicketPurchase>({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  }, // Reference to the event
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  nftAddress: { type: String, required: true },
  walletAddress: { type: String, required: true },
});

export default TicketPurchaseSchema;
