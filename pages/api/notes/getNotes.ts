import { Note } from "@/models/Notes";
import connectMongo from "@/utils/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "js-cookie";
import mongoose from "mongoose";

export default async function getNotes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userID } = JSON.parse(req.body);

    console.log(userID);

    const objectId = new mongoose.Types.ObjectId(userID); // Convert to ObjectId

    await connectMongo();

    const notes = await Note.find({
      userID: objectId,
    });

    res.status(200).json({
      message: "success",
      notes,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
