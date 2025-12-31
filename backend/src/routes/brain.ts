import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware";
import { content, LinkModel, user } from "../db";
import RandomLinkGenerator from "../utils";
import { GoogleGenAI } from "@google/genai";
import { APIKEY, EMBDMODEL } from "../config";

const brainRoute = Router();
const ai = new GoogleGenAI({apiKey: APIKEY})

// Interface for the cleaned output
interface CleanResource {
  title: string;
  description: string;
  source: string;
}

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

// Function to extract only the fields we want
function extractResources(data: any[]): CleanResource[] {
  return data.map((item) => ({
    title: item.title ?? "Untitled",
    description: item.description ?? "",
    source: item.link ?? "",
  }));
}

const createEmbeding = async (data: CleanResource[]) => {
  try {
    const embeding = []
    let i = 1;
    for(const item of data){
      i = i+1;
      console.log(i)
      const textToEmbed = `${item.title}\n${item.description}`;

      const embeding_response = await ai.models.embedContent({
        model: EMBDMODEL,
        contents: textToEmbed
      })
      embeding.push({
        title: item.title,
        description: item.description,
        source: item.source,
        embedding: embeding_response.embeddings,
      });
    }
    console.log(`embeding data: ${embeding}`)
    return embeding
    
  } catch (e) {
    console.error(`embeding error: ${e}`)
    return e as string;
  }
};

brainRoute.post("/ask", authMiddleware, async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    const user_id = req.userId;

    const userContent = await content.find({ userId: user_id });

    const cleanedResources: CleanResource[] = extractResources(userContent);
    console.log(`type of cleaneddata: ${typeof cleanedResources}`);

    const embending = await createEmbeding(cleanedResources);

    console.log(`query: ${query}`);
    // console.log(`usercontent: ${userContent}`);
    console.log(`Cleaned user date: ${JSON.stringify(cleanedResources)}`);
    return res.json({ query: query });
  } catch (e) {
    console.log(req);
    console.log(e);
    return res.json({ message: e });
  }
});
export { brainRoute };
