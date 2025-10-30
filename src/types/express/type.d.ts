// src/types/express.d.ts
import { AuthUser } from "../interfaces/auth"; // adjust path

declare namespace Express {
  export interface Request {
    user?: AuthUser;
  }
}
