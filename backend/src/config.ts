if (!process.env.JWT_PASSWORD) throw new Error("JWT_PASSWORD is not set");
if (!process.env.DB_URL) throw new Error("DB_URL is not set");
if(!process.env.SUPABASE_KEY) throw new Error("Supabase key required!");
if(!process.env.SUPABASE_URL) throw new Error("Supabase url required!");


export const JWT_PASSWORD: string = process.env.JWT_PASSWORD;
export const DB_URL: string = process.env.DB_URL;
export const STORAGE_KEY: string = process.env.SUPABASE_KEY;
export const STORAGE_URL: string = process.env.SUPABASE_URL;
