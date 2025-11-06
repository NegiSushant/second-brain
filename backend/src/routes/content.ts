import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { content, Tag } from "../db";
import { Types } from "mongoose";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import { STORAGE_KEY, STORAGE_URL } from "../config";
import { id } from "zod/v4/locales";

const contentRoute = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

const FORBIDDEN_EXTENSIONS = new Set([
  ".exe",
  ".zip",
  ".dll",
  ".bat",
  ".cmd",
  ".sh",
  ".ps1",
  ".scr",
  ".msi",
  ".apk",
  ".jar",
  ".com",
  ".gadget",
  ".cpl",
]);

const supabase = createClient(STORAGE_URL, STORAGE_KEY);

async function uploadFile(file: Express.Multer.File) {
  if (!file) throw new Error("No file provided!");
  try {
    const fileName = `${Date.now()}_${file.originalname}`;
    const { data, error } = await supabase.storage
      .from("Mindvault")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });
    if (error) {
      console.error("Supabase upload error:", error);
      return null;
    }

    const fileUrl = `${STORAGE_URL}/storage/v1/object/public/Mindvault/${fileName}`;
    return fileUrl;
  } catch (uploadErr: any) {
    console.error("Upload fail:", uploadErr);
    return null;
  }
}

async function DeleteFileFromStorage(fileLink: string) {
  try {
    const pathname = new URL(fileLink).pathname;
    const fileName = decodeURIComponent(
      pathname.substring(pathname.lastIndexOf("/") + 1)
    );
    const { data, error } = await supabase.storage
      .from("avatars")
      .remove([`Mindvault/${fileName}`]);

    if (error) {
      console.error("Error deleting from Supabase:", error.message);
      return false;
    }

    console.log("File removed successfully:", fileName);
    return true;
  } catch (err) {
    console.error("Error deleting from Supabase:", err);
    return false;
  }
}
async function removeExistingFileFromStorage(userId: string, id: string) {
  try {
    const existingContent = await content.findOne({
      _id: id,
      userId: userId,
    });
    const ExistingLink = existingContent?.link as string | undefined;
    if (ExistingLink && typeof ExistingLink === "string") {
      const pathname = new URL(ExistingLink).pathname;
      const fileName = decodeURIComponent(
        pathname.substring(pathname.lastIndexOf("/") + 1)
      );
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([`Mindvault/${fileName}`]);

      if (error) {
        console.error("Error deleting from Supabase:", error.message);
        return false;
      }

      console.log("File removed successfully:", fileName);
      return true;
    } else {
      console.warn("No existing link found for this content.");
      return false;
    }
  } catch (err) {
    console.error("Error deleting from Supabase:", err);
    return false;
  }
}

contentRoute.post(
  "/content",
  authMiddleware,
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const { type, title, description, tags: tagsRaw } = req.body;
      const id = req.userId;

      if (!type || !title) {
        return res.status(411).json({
          message: "Type and title are required!",
        });
      }

      const fileTypes = ["document", "code"];
      const isFileType = fileTypes.includes(type);
      let link: string | null;

      if (isFileType) {
        if (!req.file) {
          return res.status(400).json({
            message: "File upload is required for document or code type!",
          });
        }
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (FORBIDDEN_EXTENSIONS.has(ext)) {
          return res.status(400).json({
            message: `${ext} type of file is not allowed to upload.`,
          });
        }
        link = await uploadFile(req.file);
        if (link === null) {
          return res.status(400).json({
            message: "Error While saving file!",
          });
        }
      } else {
        const { link: linkFromBody } = req.body;
        if (!linkFromBody) {
          return res.status(400).json({
            message: "Link is required for non-file types!",
          });
        }
        link = linkFromBody;
      }
      let tagIds: Types.ObjectId[] = [];
      let tagsArray: string[] = [];

      if (tagsRaw) {
        try {
          tagsArray = Array.isArray(tagsRaw) ? tagsRaw : JSON.parse(tagsRaw);
          tagsArray = tagsArray
            .map((t: string) => t.trim())
            .filter((t: string) => t);
        } catch (parseErr) {
          console.error("Failed to parse tags:", parseErr);
          tagsArray = [];
        }
      }

      if (tagsArray.length > 0) {
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
        description: description || "",
        tags: tagIds,
        userId: id,
      });

      return res.status(200).json({
        message: "Content saved successfully!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: `Internal server error: ${err}`,
      });
    }
  }
);

contentRoute.put(
  "/update/:id",
  authMiddleware,
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const contentId = req.params.id;
      const {
        type,
        title,
        description,
        tags: tagsRaw,
        link: linkFromBody,
      } = req.body;
      const userId = req.userId as string;

      if (!type || !title) {
        return res.status(411).json({
          message: "Type and title are required!",
        });
      }

      const fileTypes = ["document", "code"];
      const isFileType = fileTypes.includes(type);
      let link: string | null = null;

      if (isFileType) {
        if (req.file) {
          const ext = path.extname(req.file.originalname).toLowerCase();
          if (FORBIDDEN_EXTENSIONS.has(ext)) {
            return res.status(400).json({
              message: `${ext} type of file is not allowed to upload.`,
            });
          }
          const isExistingFileRemove = await removeExistingFileFromStorage(
            userId,
            contentId
          );
          if (isExistingFileRemove) {
            link = await uploadFile(req.file);
          }
        } else {
          const existingContent = await content.findOne({
            _id: contentId,
            userId: userId,
          });
          const ExistingLink = existingContent?.link as string | undefined;
          link = ExistingLink || null;
        }
      } else {
        if (!linkFromBody) {
          return res.status(400).json({
            message: "Link is required for non-file types!",
          });
        }
        link = linkFromBody;
      }
      let tagIds: Types.ObjectId[] = [];
      let tagsArray: string[] = [];

      if (tagsRaw) {
        try {
          tagsArray = Array.isArray(tagsRaw) ? tagsRaw : JSON.parse(tagsRaw);
          tagsArray = tagsArray
            .map((t: string) => t.trim())
            .filter((t: string) => t);
        } catch (parseErr) {
          console.error("Failed to parse tags:", parseErr);
          tagsArray = [];
        }
      }

      if (tagsArray.length > 0) {
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

      await content.findOneAndUpdate(
        { _id: contentId, userId },
        {
          $set: {
            title,
            description,
            link,
            type,
            tags: tagIds,
          },
        },
        { new: false }
      );

      return res.status(200).json({ message: "Content updated successfully!" });
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
      console.log(userContent);

      if (!userContent) {
        return res.status(401).json({
          message: "No content available!",
        });
      }

      await content.findByIdAndDelete(userContent);

      // if (
      //   isDelete &&
      //   (userContent.type == "code" || userContent.type === "document")
      // ) {
      //   const fileLink = userContent?.link as string | undefined
      //   DeleteFileFromStorage(fileLink);
      // }
      if (
        (userContent.type === "code" || userContent.type === "document") &&
        userContent.link // <---- Check link exists before passing
      ) {
        await DeleteFileFromStorage(userContent.link as string);
      }
      console.log("success");
      return res.status(200).json({
        message: "contenct deleted successfully!",
      });
    } catch (err) {
      console.log(err);
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

contentRoute.get(
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
        return res.status(200).json({
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

contentRoute.get(
  "/tags",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const result = await Tag.find();
      const tags = result.map((rs) => rs.title);
      return res.status(200).json({
        message: "data found successfully!",
        data: tags,
      });
    } catch (err) {
      return res.status(500).json({
        message: `Internal server error: ${err}`,
      });
    }
  }
);

export { contentRoute };

// contentRoute.post(
//   "/content",
//   authMiddleware,
//   async (req: Request, res: Response) => {
//     try {
//       const { type, link, title, tags } = req.body;
//       // const imageFile = req.files as Express.Multer.File[];
//       // const imageUrl = await uploadImages(imageFile);
//       const id = req.userId;

//       if (!type || !link || !title) {
//         return res.status(411).json({
//           message: "All field are required except tag!",
//         });
//       }

//       let tagIds: Types.ObjectId[] = [];

//       if (tags && tags.length > 0) {
//         const tagsArray = Array.isArray(tags) ? tags : [tags];
//         tagIds = await Promise.all(
//           tagsArray.map(async (tagTitle: string) => {
//             const tagDoc = await Tag.findOneAndUpdate(
//               { title: tagTitle.trim().toLowerCase() },
//               { title: tagTitle.trim().toLowerCase() },
//               { upsert: true, new: true }
//             );
//             return tagDoc._id;
//           })
//         );
//       }

//       await content.create({
//         type: type,
//         link: link,
//         title: title,
//         tags: tagIds,
//         userId: id,
//       });

//       return res.status(200).json({
//         message: "Content saved successfully!",
//       });
//     } catch (err) {
//       return res.status(500).json({
//         message: `Internal server error: ${err}`,
//       });
//     }
//   }
// );
