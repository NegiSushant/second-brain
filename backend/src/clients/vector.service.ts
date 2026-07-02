import { supabase } from "./supabase.client";
import { Embedings } from "../routes/azureOpenAi";
import {OpenAIChatModel} from "../routes/OpenAIModel"

// Interface for the cleaned output
interface CleanResource {
  title: string;
  description: string;
  source: string;
}

export class VectorService {
  private embeddingService = new OpenAIChatModel();

  async createEmbeding(userId: string, data: CleanResource[]) {
    try {
      //1. Create embeddings
      const texts = data.map((item) => `${item.title}\n${item.description}`);
      const vectors = await this.embeddingService.embedDocuments(texts);

      // 2. prepare insert embedding data
      const embeddingData = data.map((item, index) => ({
        user_id: userId,
        title: item.title,
        description: item.description,
        source: item.source,
        embedding: vectors[index], // match by index
      }));

      console.log(`Embedding generation Successfully!`);

      //3. insert data/embedding in supabase.
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
  }

  async searchSimilar(userId: string, query: number[]) {
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
  }
}
