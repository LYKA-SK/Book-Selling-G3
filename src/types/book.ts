export interface CreateBookInput {
  title: string;
  author: string;
  price: number;
  description?: string;
}

export interface BookResult {
  success: boolean;
  data: any;
  message: string;
}
