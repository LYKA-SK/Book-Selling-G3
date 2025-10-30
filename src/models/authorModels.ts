import mongoose, { Document, Model } from "mongoose";
import { Types } from "mongoose";


// Interface for Author document
export interface IAuthor extends Document {
  id: string;
  roles: string;
  name: string;
  phone: string;
  dob: Date;
}

// Author Schema
const authorSchema = new mongoose.Schema<IAuthor>(
  {
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    dob: { type: Date, required: false },
  },
  { timestamps: true }
);

export const AuthorModel: Model<IAuthor> = mongoose.model<IAuthor>(
  "Author",
  authorSchema
);
