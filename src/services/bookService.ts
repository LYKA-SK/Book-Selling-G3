import bookModel from "../models/bookModels";
import { BookResult, CreateBookInput } from "../types/book";

export const createBookService = async (
  bookData: CreateBookInput
): Promise<BookResult> => {
  try {
    const newBook = new bookModel(bookData);
    const savedBook = await newBook.save();
    return {
      success: true,
      data: savedBook,
      message: "Book created successfully.",
    };
  } catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      data: null as any,
      message: "Failed to create book.",
    };
  }
};

export const getAllBooksService = async (): Promise<BookResult> => {
  try {
    const books = await bookModel.find();
    return {
      success: true,
      data: books,
      message: "Books retrieved successfully.",
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return {
      success: false,
      data: null as any,
      message: "Failed to fetch books.",
    };
  }
};

export const getBookByIdService = async (id: string): Promise<BookResult> => {
  try {
    const book = await bookModel.findById(id);
    if (!book)
      return { success: false, data: null as any, message: "Book not found." };
    return {
      success: true,
      data: book,
      message: "Book retrieved successfully.",
    };
  } catch (error) {
    console.error("Error fetching book:", error);
    return {
      success: false,
      data: null as any,
      message: "Failed to fetch book.",
    };
  }
};

export const updateBookService = async (
  id: string,
  updateData: Partial<CreateBookInput>
): Promise<BookResult> => {
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedBook)
      return { success: false, data: null as any, message: "Book not found." };
    return {
      success: true,
      data: updatedBook,
      message: "Book updated successfully.",
    };
  } catch (error) {
    console.error("Error updating book:", error);
    return {
      success: false,
      data: null as any,
      message: "Failed to update book.",
    };
  }
};

export const deleteBookService = async (id: string): Promise<BookResult> => {
  try {
    const deletedBook = await bookModel.findByIdAndDelete(id);
    if (!deletedBook)
      return { success: false, data: null as any, message: "Book not found." };
    return {
      success: true,
      data: deletedBook,
      message: "Book deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting book:", error);
    return {
      success: false,
      data: null as any,
      message: "Failed to delete book.",
    };
  }
};
