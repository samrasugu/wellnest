import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcrypt";
import { AuthProvider } from "@/utils/authContext";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = JSON.parse(req.body);

    await connectMongo();
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      console.log("Password does not match");
      return res.status(401).json({
        message: "Incorrect password",
      });
    } else {
      return res.status(200).json({
        message: "success",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          _id: user._id,
        },
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
