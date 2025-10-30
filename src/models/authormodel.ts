// src/models/author.model.ts
import { Schema, model, Document, Types } from "mongoose";

// 1. Define the TypeScript interface
export interface IAuthor extends Document {
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  dob: Date;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    dob: { type: Date},
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } 
);

export const Author = model<IAuthor>("Author", AuthorSchema);
