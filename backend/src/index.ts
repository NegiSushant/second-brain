import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./routes/routes";

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Second Brain server is running and Up!",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
