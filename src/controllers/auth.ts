import { Request, Response } from "express";

import * as AuthService from "../services/authService";

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, dob } = req.body;

    if (!name || !email) {
      res.status(400);
      throw new Error("Name and email are required");
    }

    const author = await AuthService.createAuthorService({
      name,
      email,
      phone,
      dob,
    });

          res.status(201).json({ success: true, data: author });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(res.statusCode === 200 ? 500 : res.statusCode)
        .json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: "Unknown error" });
  }
};

// Get all authors
export const getAuthors = async (req: Request, res: Response) => {
    try {
        const authors = await AuthService.getAuthorsService();
        res.json({ success: true, data: authors });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

// Get a single author by ID
export const getAuthorById = async (req: Request, res: Response) => {
    try {
        const author = await AuthService.getAuthorByIdService(req.params.id);
        if (!author) return res.status(404).json({ success: false, message: "Author not found" });
        res.json({ success: true, data: author });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

// Update an author by ID
export const updateAuthor = async (req: Request, res: Response) => {
    try {
        const updatedAuthor = await AuthService.updateAuthorService(req.params.id, req.body);
        if (!updatedAuthor) return res.status(404).json({ success: false, message: "Author not found" });
        res.json({ success: true, data: updatedAuthor });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

// Delete an author by ID
export const deleteAuthor = async (req: Request, res: Response) => {
    try {
        const deletedAuthor = await AuthService.deleteAuthorService(req.params.id);
        if (!deletedAuthor) return res.status(404).json({ success: false, message: "Author not found"});
        res.json({ success: true, data: deletedAuthor });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
}