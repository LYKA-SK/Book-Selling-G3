export interface ICart {
  userId: string; // references User _id

  bookId: string; // references Book _id
}

// Optional: for creation
export interface CreateCartInput extends ICart {}
