import mongoose, { model, Schema, Types } from "mongoose";
import { DB_URL } from "./config";

(async () => {
  await mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Database connected successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
})();

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

const contentTypes = ["image", "video", "article", "audio"];
const ContentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
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


export const user = model("UserSchema", UserSchema);
export const content = model("Content", ContentSchema);
export const Tag = mongoose.model("Tag", tagSchema);
export const LinkModel = model("Links", LinkSchema);
