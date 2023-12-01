import mongoose, { model } from "mongoose";

export type NoteDocument = mongoose.Document & {
  title: string;
  description: string;
  userID: string;
};

const NoteSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Note =
  (mongoose.models.Note as mongoose.Model<NoteDocument>) ||
  model<NoteDocument>("Note", NoteSchema);
