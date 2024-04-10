// user.model.ts
import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<UserDocument>("User", UserSchema);
