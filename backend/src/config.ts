// export const JWT_PASSWORD: string | undefined = process.env.JWT_PASSWORD;
// export const DB_URL: string =
//   process.env.DB_URL ??
//   (() => {
//     throw new Error("DB_URL must be set in environment variables");
//   })();

if (!process.env.JWT_PASSWORD) throw new Error("JWT_PASSWORD is not set");
if (!process.env.DB_URL) throw new Error("DB_URL is not set");

export const JWT_PASSWORD: string = process.env.JWT_PASSWORD;
export const DB_URL: string = process.env.DB_URL;
