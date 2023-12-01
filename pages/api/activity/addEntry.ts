import { Entry } from "@/models/Entry";
import connectMongo from "@/utils/connectMongo";
import { connect } from "http2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addentry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, entryType, entryDescription } = JSON.parse(req.body);

    await connectMongo();

    const entry = await Entry.create({
      userID: userId,
      type: entryType,
      description: entryDescription,
    });

    return res.status(200).json({
      message: "success",
      entry,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
