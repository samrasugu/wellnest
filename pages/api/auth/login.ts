import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcrypt";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connectMongo();
    const user = await User.findOne({
      email: req.body.email,
    });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else if (!(await bcrypt.compare(user.password, hashedPassword))) {
      return res.status(401).json({
        message: "Password does not match",
      });
    } else {
      return res.status(200).json({
        message: "Login successful",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
