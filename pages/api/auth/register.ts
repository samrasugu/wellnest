import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcrypt";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { firstName, lastName, email, password } = JSON.parse(req.body);

    await connectMongo();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "success",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
