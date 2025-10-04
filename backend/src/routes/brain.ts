import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware";
import { content, LinkModel, user } from "../db";
import RandomLinkGenerator from "../utils";
const brainRoute = Router();

brainRoute.post(
  "/share",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const share = req.body.share;
      const id = req.userId;

      if (share) {
        const existingUrl = await LinkModel.findOne({
          userId: id,
        });
        if (existingUrl) {
          return res.status(200).json({
            message: "link get successfully!",
            hash: existingUrl.hash,
          });
        }
        const hash = RandomLinkGenerator(10);
        await LinkModel.create({
          userId: id,
          hash: hash,
        });
        return res.status(200).json({
          message: "link get successfully!",
          hash: hash,
        });
      } else {
        await LinkModel.deleteOne({
          userId: id,
        });
        return res.status(200).json({
          message: "Link remove successfully!",
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: `Internal server error:${err}!`,
      });
    }
  }
);

brainRoute.get(
  "/:shareLink",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const hash = req.params.shareLink;

      const link = await LinkModel.findOne({ hash });
      if (!link) {
        return res.status(411).json({
          message: "Invalid input!",
        });
      }
      const userContent = await content
        .find({ userId: link.userId })
        .populate("tags", "title -_id");

      const userInfo = await user.findOne({ _id: link.userId });

      if (!userInfo) {
        return res.status(411).json({
          message: "User not found!",
        });
      }

      return res.status(200).json({
        message: "User brain is generated!",
        username: userInfo.username,
        brain: userContent,
      });
    } catch (err) {
      return res.status(500).json({
        message: `Internal server error: ${err}!`,
      });
    }
  }
);

export { brainRoute };
