import { OpenAI } from "openai";
import { API_KEY, ENDPOINT, MODELNAME, EMBEDDING_MODEL } from "../config";

export class OpenAIChatModel {
  private client: OpenAI;
  private embedingClient: OpenAI;
  private apiKey: string = API_KEY;
  private endpoint: string = ENDPOINT;
  private model: string = MODELNAME;

  constructor() {
    this.apiKey = this.apiKey;

    this.client = new OpenAI({
      baseURL: this.endpoint,
      apiKey: this.apiKey,
    });

    this.embedingClient = new OpenAI({
      baseURL: this.endpoint,
      apiKey: this.apiKey,
    });
  }

  async generateResponse(context: string, question: string): Promise<string> {
    const prompt = `
      You are a personal AI assistant.
      Answer the question only from the provided context.
      Context:
      ${context}
      Question:
      ${question}
      `;

    const response = await this.client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: this.model,
    });
    return response.choices[0].message.content as string;
    // return response.content as string;
  }

  /** Create embedding for single query */
  async embedQuery(text: string): Promise<number[]> {
    // return await this.embeddings.embedQuery(text);
    const response = await this.embedingClient.embeddings.create({
      input: text,
      model: EMBEDDING_MODEL,
    });

    return response.data[0].embedding;
  }

  /** Create embeddings for multiple documents */
  async embedDocuments(texts: string[]): Promise<number[][]> {
    // return await this.embeddings.embedDocuments(texts);
    const response = await this.embedingClient.embeddings.create({
      input: texts,
      model: EMBEDDING_MODEL,
    });

    return response.data.map((item) => item.embedding);
  }
}
