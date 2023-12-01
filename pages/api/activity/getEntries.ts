import { Entry } from "@/models/Entry";
import connectMongo from "@/utils/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getEntries(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userID } = JSON.parse(req.body);
    await connectMongo();
    const entries = await Entry.find({
      userID: userID,
    });
    return res.status(200).json({
      message: "success",
      entries,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
