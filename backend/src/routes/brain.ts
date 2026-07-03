import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware";
import { content, LinkModel, user } from "../db";
import RandomLinkGenerator from "../utils";
import { GoogleGenAI } from "@google/genai";
// import { ChatModel, Embedings } from "./azureOpenAi";
import { OpenAIChatModel } from "./OpenAIModel";
import { supabase } from "../clients/supabase.client";

const brainRoute = Router();
// const ai = new GoogleGenAI({ apiKey: APIKEY });
// const embeddingService = new Embedings();
const openAIService = new OpenAIChatModel();

// Interface for the cleaned output
interface CleanResource {
  title: string;
  description: string;
  source: string;
}

interface MatchDocument {
  id: string;
  title: string;
  description: string;
  source: string;
  similarity: number;
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
  },
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
  },
);

// Function to extract only the fields we want
function extractResources(data: any[]): CleanResource[] {
  return data.map((item) => ({
    title: item.title ?? "Untitled",
    description: item.description ?? "",
    source: item.link ?? "",
  }));
}

const createEmbeding = async (userId: string, data: CleanResource[]) => {
  try {
    const texts = data.map((item) => `${item.title}\n${item.description}`);

    // const vectors = await embeddingService.embedDocuments(texts);
    const vectors = await openAIService.embedDocuments(texts);

    // 3️⃣ Merge embeddings with metadata
    const embeddingData = data.map((item, index) => ({
      user_id: userId,
      title: item.title,
      description: item.description,
      source: item.source,
      embedding: vectors[index], // match by index
    }));

    console.log(`Embedding generation Successfully!`);

    const { error } = await supabase.from("documents").insert(embeddingData);

    if (error) {
      console.error("Supabase insert error:", error);
      return false;
    }
    console.log("Embeddings stored successfully!");
    return true;
  } catch (e) {
    console.error(`embeding error: ${e}`);
    // return e as string;
    return false;
  }
};

const searchSimilar = async (userId: string, query: number[]) => {
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: query,
    match_user_id: userId,
    match_count: 3,
  });

  if (error) {
    console.error("Similarity search error:", error);
    throw error;
  }

  return data;
};

brainRoute.post(
  "/DataReady",
  authMiddleware,
  async (req: Request, res: Response) => {
    const user_id = req.userId as string;
    try {
      //extracting the data from the user
      const userContent = await content.find({ userId: user_id });
      const cleanedResources: CleanResource[] = extractResources(userContent);

      const embedding = await createEmbeding(user_id, cleanedResources);
      if (!embedding) {
        return res.status(500).json({ message: "Embedding failed" });
      }
      return res
        .status(200)
        .json({ message: "Embedding created successfully!" });
    } catch (e) {
      console.log(e);
      return res.json({ message: e });
    }
  },
);

brainRoute.post("/ask", authMiddleware, async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    const user_id = req.userId as string;

    //create query embeding
    const embedUserQuery = await openAIService.embedQuery(query);

    //search for the similarities
    const matches: MatchDocument[] = await searchSimilar(
      user_id,
      embedUserQuery,
    );

    console.log("Simiarity matches successfully!");

    const context = matches
      .map((doc) => `${doc.title}\n${doc.description}`)
      .join("\n\n");

    // const chatModel = new ChatModel();
    const answer = await openAIService.generateResponse(context, query);

    return res.json({
      query,
      answer,
      sources: matches.map((m) => m.source),
    });
  } catch (e) {
    console.log(req);
    console.log(e);
    return res.json({ message: e });
  }
});

export { brainRoute };
