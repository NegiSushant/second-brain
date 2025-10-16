import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { content, Tag } from "../db";
import { Types } from "mongoose";

const contentRoute = Router();

contentRoute.post(
  "/content",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { type, link, title, tags } = req.body;
      const id = req.userId;

      if (!type || !link || !title) {
        return res.status(411).json({
          message: "All field are required except tag!",
        });
      }

      let tagIds: Types.ObjectId[] = [];

      if (tags && tags.length > 0) {
        const tagsArray = Array.isArray(tags) ? tags : [tags];
        tagIds = await Promise.all(
          tagsArray.map(async (tagTitle: string) => {
            const tagDoc = await Tag.findOneAndUpdate(
              { title: tagTitle.trim().toLowerCase() },
              { title: tagTitle.trim().toLowerCase() },
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

contentRoute.delete(
  "/content/:contentId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const contentId = req.params.contentId;
      const userId = req.userId;

      if (!contentId) {
        return res.status(401).json({
          message: "contentId required!",
        });
      }

      const userContent = await content.findOne({
        _id: contentId,
        userId: userId,
      });

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

contentRoute.get(
  "/content",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const result = await content
        .find({ userId: userId })
        .populate("tags", "title -_id");

      if (!result || result.length === 0) {
        return res.status(401).json({
          message: "No data available!",
          data: [],
        });
      }
      return res.status(200).json({
        message: "data found successfully!",
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        message: `Internal server error: ${err}`,
      });
    }
  }
);

contentRoute.post(
  "/content/:filter",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const filterType = req.params.filter;

      const result = await content
        .find({ userId: userId, type: filterType })
        .populate("tags", "title -_id");

      if (!result || result.length === 0) {
        return res.status(401).json({
          message: "No data available!",
          data: [],
        });
      }
      return res.status(200).json({
        message: `${filterType} content found successfully!`,
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        message: `Internal server error: ${err}`,
      });
    }
  }
);

export { contentRoute };
