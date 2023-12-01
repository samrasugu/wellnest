import { Note } from "@/models/Notes";
import connectMongo from "@/utils/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getNotes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userID } = JSON.parse(req.body);

    await connectMongo();

    const notes = await Note.find({
      userID: userID,
    });
    res.status(200).json({
      message: "success",
      notes,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
