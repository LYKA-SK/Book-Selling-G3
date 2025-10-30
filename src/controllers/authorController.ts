// controllers/authorController.ts
import { Request, Response } from "express";
import * as authorService from "../services/authorService";

export const createAuthorController = async (req: Request, res: Response) => {
  try {
    const author = await authorService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllAuthorsController = async (req: Request, res: Response) => {
  const authors = await authorService.getAllAuthors();
  res.json(authors);
};

export const getAuthorByIdController = async (req: Request, res: Response) => {
  const author = await authorService.getAuthorById(req.params.id);
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json(author);
};

export const updateAuthorController = async (req: Request, res: Response) => {
  try {
    const author = await authorService.updateAuthor(req.params.id, req.body);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.json(author);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteAuthorController = async (req: Request, res: Response) => {
  const author = await authorService.deleteAuthor(req.params.id);
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json({ message: "Author deleted successfully" });
};
