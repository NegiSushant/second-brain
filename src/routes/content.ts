import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
const router = Router();

export const addNewContent = router.post(
  "/addNewContent",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      console.log(req.userId);
      return res.status(200).json({
        message: "middleware work!",
      });
    } catch (err) {
      return res.status(500).json({
        message: `middleware error: ${err}`,
      });
    }
  }
);
