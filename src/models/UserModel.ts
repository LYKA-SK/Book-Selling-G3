import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin'
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId | string;
  firstname: string;
  lastname: string; 
  username: string;
  email: string;
  password: string;
  role: "admin" | "customer";
  phone?: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
  phone: { type: String },
  age: { type: Number }
}, {
  timestamps: true
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;