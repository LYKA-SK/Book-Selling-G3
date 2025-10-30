import { Request, Response } from "express";
import { AuthorService } from "../services/authorSeveice";
import { Author } from "../models/authormodel";

const authorService = new AuthorService(Author);

export class AuthorController {
  static async createAuthor(req: Request, res: Response) {
    try {
      const author = await authorService.createAuthor(req.body);
      res.status(201).json(author);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllAuthors(req: Request, res: Response) {
    try {
      const authors = await authorService.getAllAuthors();
      res.json(authors);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAuthorById(req: Request, res: Response) {
    try {
      const author = await authorService.getAuthorById(req.params.id);
      if (!author) return res.status(404).json({ message: "Author not found" });
      res.json(author);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateAuthor(req: Request, res: Response) {
    try {
      const author = await authorService.updateAuthor(req.params.id, req.body);
      if (!author) return res.status(404).json({ message: "Author not found" });
      res.json(author);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteAuthor(req: Request, res: Response) {
    try {
      const author = await authorService.deleteAuthor(req.params.id);
      if (!author) return res.status(404).json({ message: "Author not found" });
      res.json({ message: "Author deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
