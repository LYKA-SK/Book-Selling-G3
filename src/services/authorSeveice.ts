// src/services/author.service.ts
import { Model, Types } from "mongoose";
import { IAuthor } from "../models/authormodel"; // Your Author Mongoose model
import { CreateAuthorInput, UpdateAuthorInput } from "../types/author";

export class AuthorService {
  private authorModel: Model<IAuthor>;

  constructor(authorModel: Model<IAuthor>) {
    this.authorModel = authorModel;
  }

  // Create new author
  async createAuthor(input: CreateAuthorInput): Promise<IAuthor> {
    const author = new this.authorModel({
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await author.save();
  }

  // Update  author by ID
  async updateAuthor(
    authorId: string | Types.ObjectId,
    input: UpdateAuthorInput
  ): Promise<IAuthor | null> {
    return await this.authorModel.findByIdAndUpdate(
      authorId,
      { ...input, updatedAt: new Date() },
      { new: true } // return the updated document
    );
  }

  // Get author by ID
  async getAuthorById(authorId: string | Types.ObjectId): Promise<IAuthor | null> {
    return await this.authorModel.findById(authorId);
  }

  // Get all authors
  async getAllAuthors(): Promise<IAuthor[]> {
    return await this.authorModel.find();
  }

  // Delete an author by ID
  async deleteAuthor(authorId: string | Types.ObjectId): Promise<IAuthor | null> {
    return await this.authorModel.findByIdAndDelete(authorId);
  }
}
