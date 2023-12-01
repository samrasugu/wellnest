import mongoose from "mongoose";

export type EntryDocument = mongoose.Document & {
  type: string;
  description: string;
  userID: string;
};

const EntrySchema = new mongoose.Schema(
  {
    type: String,
    description: String,
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Entry =
  (mongoose.models.Entry as mongoose.Model<EntryDocument>) ||
  mongoose.model<EntryDocument>("Entry", EntrySchema);
