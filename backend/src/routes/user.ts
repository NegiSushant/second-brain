import { Request, Response, Router } from "express";
import { user } from "../db";
import { email, z, ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const userRoute = Router();

const UserSchema = z.object({
  username: z.string().min(3, { message: "Username must contain 3 letters!" }),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
});

userRoute.post("/signUp", async (req: Request, res: Response) => {
  try {
    const userdata = UserSchema.parse(req.body);

    const isUserExist = await user.findOne({ email: userdata.email });
    if (isUserExist)
      return res.status(403).json({ message: "user already exist!" });
    const hashPassword = await bcrypt.hash(userdata.password, 10);
    await user.create({
      username: userdata.username,
      email: userdata.email,
      password: hashPassword,
    });

    return res.status(200).json({ message: "User created successfully!" });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(411).json({
        message: "Error input format!",
      });
    }
    return res.status(500).json({
      message: `Internal server error!`,
    });
  }
});

userRoute.post("/signIn", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(411)
      .json({ message: "username and password both required!" });
  }
  try {
    const isUserExist = await user.findOne({ email });
    if (!isUserExist) {
      return res.status(403).json({
        message: "Wrong credential!",
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password as string
    );
    if (!isPasswordMatch) {
      return res.status(403).json({ message: "wrong password!" });
    }
    const token = jwt.sign({ id: isUserExist._id }, JWT_PASSWORD);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });
    return res.status(200).json({ message: "Login successful!" });
    //   return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}!`,
    });
  }
});

export { userRoute };
