export interface CreateBookInput {
  id?: string;
  title: string;
  description?: string;
  author: string;
  price: number;
  categoryID: string;
  stock: number;
  orderID?: string;
  imageURL?: string;
  pages?: number;
  
}

export interface BookResult {
  success: boolean;
  data: any;
  message: string;
}
