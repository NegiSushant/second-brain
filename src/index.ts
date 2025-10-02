import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { signIn, signUp } from "./routes/user";
import { addNewContent } from "./routes/content";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", signUp);
app.use("/api/v1", signIn);
app.use("/api/v1", addNewContent);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Hello from type script server!",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
