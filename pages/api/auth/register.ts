import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcrypt";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);
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
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
