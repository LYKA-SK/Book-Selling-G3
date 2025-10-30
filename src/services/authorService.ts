import { AuthorModel, IAuthor } from "../models/authorModels";

// Create a new author
export const createAuthor = async (data: IAuthor) => {
  // Prevent duplicate name or phone
  const exists = await AuthorModel.findOne({
    $or: [{ name: data.name }, { phone: data.phone }],
  });
  if (exists) throw new Error("Author with this name or phone already exists");

  const author = new AuthorModel(data);
  return await author.save();
};

// Get all authors
export const getAllAuthors = async () => {
  return await AuthorModel.find();
};

// Get author by ID
export const getAuthorById = async (id: string) => {
  const author = await AuthorModel.findById(id);
  if (!author) throw new Error("Author not found");
  return author;
};

// Update author by ID
export const updateAuthor = async (id: string, data: Partial<IAuthor>) => {
  // Prevent duplicate name or phone on update
  const exists = await AuthorModel.findOne({
    _id: { $ne: id },
    $or: [{ name: data.name }, { phone: data.phone }],
  });
  if (exists)
    throw new Error("Another author with this name or phone already exists");

  const updated = await AuthorModel.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Author not found");
  return updated;
};

// Delete author by ID
export const deleteAuthor = async (id: string) => {
  const deleted = await AuthorModel.findByIdAndDelete(id);
  if (!deleted) throw new Error("Author not found");
  return deleted;
};
