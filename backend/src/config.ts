if (!process.env.JWT_PASSWORD) throw new Error("JWT_PASSWORD is not set");
if (!process.env.DB_URL) throw new Error("DB_URL is not set");
if (!process.env.SUPABASE_KEY) throw new Error("Supabase key required!");
if (!process.env.SUPABASE_URL) throw new Error("Supabase url required!");
// if (!process.env.API_KEY) throw new Error("Gemini APIKEY required!");
// if (!process.env.EM_MODEL) throw new Error("Gemini Embedding model required!");
if (!process.env.AZURE_OPENAI_API_KEY)
  throw new Error("Open AI API_KEY required!");
if (!process.env.AZURE_OPENAI_ENDPOINT)
  throw new Error("open AI ENDPOINT required!");
if (!process.env.AZURE_OPENAI_API_VERSION)
  throw new Error("OPENAI API VERSION required!");
if (!process.env.MODELNAME) throw new Error("OPENAI Model Name required!");
if (!process.env.EMBEDDING_MODEL)
  throw new Error("EMBEDDING DEPLOYMENT required!");
if (!process.env.AZURE_OPENAI_CHAT_DEPLOYMENT)
  throw new Error("OPENAI_CHAT DEPLOYMENT required!");
if (!process.env.EMBEDDING_DEPLOYMENT)
  throw new Error("OPENAI_CHAT DEPLOYMENT required!");

export const JWT_PASSWORD: string = process.env.JWT_PASSWORD;
export const DB_URL: string = process.env.DB_URL;
export const STORAGE_KEY: string = process.env.SUPABASE_KEY;
export const STORAGE_URL: string = process.env.SUPABASE_URL;
// export const APIKEY: string = process.env.API_KEY;
// export const EMBDMODEL: string = process.env.EM_MODEL;
export const API_KEY: string = process.env.AZURE_OPENAI_API_KEY;
export const ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
export const API_VERSION: string = process.env.AZURE_OPENAI_API_VERSION;
export const EMBEDDING_MODEL: string = process.env.EMBEDDING_MODEL;
export const AZURE_OPENAI_CHAT_DEPLOYMENT: string =
  process.env.AZURE_OPENAI_CHAT_DEPLOYMENT;

export const MODELNAME: string = process.env.MODELNAME;
export const EMBEDDING_DEPLOYMENT: string = process.env.EMBEDDING_DEPLOYMENT;
