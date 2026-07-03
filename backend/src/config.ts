if (!process.env.JWT_PASSWORD) throw new Error("JWT_PASSWORD is not set");
if (!process.env.DB_URL) throw new Error("DB_URL is not set");
if (!process.env.SUPABASE_KEY) throw new Error("Supabase key required!");
if (!process.env.SUPABASE_URL) throw new Error("Supabase url required!");


if (!process.env.OPENAI_API_KEY) throw new Error("Open AI API_KEY required!");
if (!process.env.OPENAI_ENDPOINT) throw new Error("open AI ENDPOINT required!");
if (!process.env.EMBEDDING_MODEL) throw new Error("EMBEDDING DEPLOYMENT required!");
if (!process.env.MODEL_NAME) throw new Error("OPENAI Model Name required!");



export const JWT_PASSWORD: string = process.env.JWT_PASSWORD;
export const DB_URL: string = process.env.DB_URL;
export const STORAGE_KEY: string = process.env.SUPABASE_KEY;
// export const STORAGE_URL: string = process.env.STORAGE_URL;

// ----------------openAI Cred -------------------------
export const API_KEY: string = process.env.OPENAI_API_KEY;
export const ENDPOINT = process.env.OPENAI_ENDPOINT;
export const EMBEDDING_MODEL: string = process.env.EMBEDDING_MODEL;
export const MODELNAME: string = process.env.MODEL_NAME;
