import mongoose, { Schema, Document } from "mongoose";

export interface NFTDocument extends Document {
  nfts: Map<string, string>;
}

const NFTSchema: Schema = new Schema({
  nfts: {
    type: Map,
    of: String,
    required: true,
  },
});

export default mongoose.model<NFTDocument>("NFT", NFTSchema);
