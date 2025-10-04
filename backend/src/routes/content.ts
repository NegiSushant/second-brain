import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { content, Tag } from "../db";
import { Types } from "mongoose";
const router = Router();

export const addNewContent = router.post(
  "/content",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { type, link, title, tags } = req.body;
      const id = req.userId;
      console.log(
        `type: ${type}, link: ${link}, title: ${title}, tags: ${tags}`
      );

      if (!type || !link || !title) {
        return res.status(411).json({
          message: "All field are required except tag!",
        });
      }

      let tagIds: Types.ObjectId[] = [];

      if (tags && tags.length > 0) {
        // Ensure tags is always an array
        const tagsArray = Array.isArray(tags) ? tags : [tags];

        // For each tag, either find existing or create new
        tagIds = await Promise.all(
          tagsArray.map(async (tagTitle: string) => {
            const tagDoc = await Tag.findOneAndUpdate(
              { title: tagTitle.trim().toLowerCase() }, // search case-insensitive
              { title: tagTitle.trim().toLowerCase() }, // insert if not found
              { upsert: true, new: true }
            );
            return tagDoc._id;
          })
        );
      }

      await content.create({
        type: type,
        link: link,
        title: title,
        tags: tagIds,
        userId: id,
      });

      return res.status(200).json({
        message: "Content saved successfully!",
      });
    } catch (err) {
      return res.status(500).json({
        message: `Internal server error: ${err}`,
      });
    }
  }
);

export const deleteContent = router.delete(
  "/content/:contentId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const contentId = req.params.contentId;
      const userId = req.userId;
      console.log(`contnetId: ${contentId}, userId: ${userId}`);

      if (!contentId) {
        return res.status(401).json({
          message: "contentId required!",
        });
      }
      const userContent = await content.findOne({
        _id: contentId,
        userId: userId,
      });
      console.log(`content: ${userContent}`);
      if (!userContent) {
        return res.status(401).json({
          message: "No content available!",
        });
      }
      await content.findByIdAndDelete(userContent);
      return res.status(200).json({
        message: "contenct deleted successfully!",
      });
    } catch (err) {
      return res.status(500).json({
        message: `Internal server error: ${err}!`,
      });
    }
  }
);

export const getContent = router.get(
  "/content",
  authMiddleware,
  async (req: Request, res: Response) => {}
);

export const sharableLink = router.post(
  "/brain/share",
  async (req: Request, res: Response) => {}
);

export const userBrain = router.get(
  "brain/:shareLink",
  async (req: Request, res: Response) => {}
);
