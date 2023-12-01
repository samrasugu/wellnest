import { Note } from "@/models/Notes";
import connectMongo from "@/utils/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { title, description, userId } = JSON.parse(req.body);

    console.log(title);
    console.log(description);
    console.log(userId);

    await connectMongo();

    const note = await Note.create({
      title: title,
      description: description,
      userID: userId,
    });

    console.log(note);

    return res.status(200).json({
      message: "success",
    });
  } catch (error) {}
}
