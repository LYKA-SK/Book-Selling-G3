import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";

// Mock: Replace with actual Mongoose Book model
const books: any[] = [];

export const createBookController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  const { title, author, price, category, stock } = req.body;

  if (!title || !author || !price || !category || !stock) {
    res.status(400);
    throw new Error("All book fields are required");
  }

  const book = { id: books.length + 1, title, author, price, category, stock };
  books.push(book);

  res.status(201).json({ message: "Book created", book });
});

export const getBooksController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  res.json({ books });
});
