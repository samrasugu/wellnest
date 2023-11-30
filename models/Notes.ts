import mongoose, { model } from "mongoose";

export type NoteDocument = mongoose.Document & {
  title: string;
  description: string;
};

const NoteSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

export const Note =
  (mongoose.models.Note as mongoose.Model<NoteDocument>) ||
  model<NoteDocument>("Note", NoteSchema);
