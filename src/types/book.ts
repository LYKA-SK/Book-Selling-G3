export interface IBook {
  _id?: string;
  title: string;
  description?: string;
  author: string;
  publisher?: string;
  price: number;
  discountPrice?: number;
  category?: string;
  stock: number;
  image?: string;
  pages?: number;
  language?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBookInput {
  title: string;
  isbn?: string;
  description?: string;
  author: string;
  publisher?: string;
  price: number;
  discountPrice?: number;
  category?: string;
  stock?: number;
  image?: string;
  pages?: number;
  language?: string;
  isFeatured?: boolean;
}

export interface BookResult {
  success: boolean;
  data: IBook;
  message?: string;
}
