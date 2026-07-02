import { AzureChatOpenAI, AzureOpenAIEmbeddings } from "@langchain/openai";
import {
  API_KEY,
  API_VERSION,
  EMBEDDING_DEPLOYMENT,
  ENDPOINT,
  AZURE_OPENAI_CHAT_DEPLOYMENT,
} from "../config";

export class ChatModel {
  private chatModel: AzureChatOpenAI;

  private ApiKey: string;
  private ApiVersion: string;
  private Endpoint: string;
  private DeploymentName: string;
  private ModelName: string;

  constructor() {
    this.ApiKey = API_KEY;
    this.ApiVersion = API_VERSION;
    this.Endpoint = ENDPOINT;
    this.DeploymentName = AZURE_OPENAI_CHAT_DEPLOYMENT;
    this.ModelName = "gpt-5-mini";

    this.chatModel = new AzureChatOpenAI({
      azureOpenAIApiKey: API_KEY,
      azureOpenAIApiVersion: API_VERSION,
      azureOpenAIApiInstanceName: "aimc-openai-26-wus",
      azureOpenAIApiDeploymentName: this.ModelName,
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

    const response = await this.chatModel.invoke(prompt);
    console.log(response);
    return response.content as string;
  }
}

export class Embedings {
  private embeddings: AzureOpenAIEmbeddings;

  private ApiKey: string;
  private ApiVersion: string;
  private ApiDeploymentName: string;
  private EndPoint: string;

  constructor() {
    this.ApiDeploymentName = EMBEDDING_DEPLOYMENT;
    this.ApiKey = API_KEY;
    this.ApiVersion = API_VERSION;
    this.EndPoint = ENDPOINT;

    console.log(
      `ApiDeploymentName = ${EMBEDDING_DEPLOYMENT}; ApiKey = ${API_KEY}; ApiVersion = ${API_VERSION}; EndPoint = ${ENDPOINT};`,
    );

    this.embeddings = new AzureOpenAIEmbeddings({
      azureOpenAIApiKey: this.ApiKey,
      azureOpenAIApiVersion: this.ApiVersion,
      // azureOpenAIEndpoint: this.EndPoint,
      azureOpenAIApiInstanceName: "aimc-openai-26-wus",
      azureOpenAIApiDeploymentName: this.ApiDeploymentName,
    });
  }

  /** Create embedding for single query */
  async embedQuery(text: string): Promise<number[]> {
    return await this.embeddings.embedQuery(text);
  }

  /** Create embeddings for multiple documents */
  async embedDocuments(texts: string[]): Promise<number[][]> {
    return await this.embeddings.embedDocuments(texts);
  }
}
