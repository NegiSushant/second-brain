import mongoose, { model, Schema, Types } from "mongoose";
import { DB_URL } from "./config";
import { string } from "zod";

let cached = (global as any).mongooseConnection;

if (!cached) {
  cached = (global as any).mongooseConnection = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(DB_URL, {
        // options here if needed
      })
      .then((mongooseInstance) => {
        console.log("Database connected successfully!");
        return mongooseInstance;
      })
      .catch((err) => {
        console.log("Database connection error:", err);
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

connectToDatabase();

// Schemas (keep them as you had)
const UserSchema = new Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: String,
});

const contentTypes = [
  "tweets",
  "video",
  "document",
  "links",
  "code",
  "texts",
  "notion",
];

const ContentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  description: { type: string },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "UserSchema", required: true },
});

const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

const LinkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "UserSchema",
    required: true,
    unique: true,
  },
});

// Models
export const user = model("UserSchema", UserSchema);
export const content = model("Content", ContentSchema);
export const Tag = mongoose.model("Tag", tagSchema);
export const LinkModel = model("Links", LinkSchema);
