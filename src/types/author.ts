import { Types } from "mongoose";

// Input type when creating an author
export interface CreateAuthorInput {
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  userId: Types.ObjectId; // the user who creates the author entry
}

// Input type when updating an author
export interface UpdateAuthorInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  bio?: string;
  userId?: Types.ObjectId; // optional if you want to allow changing the owner
}
