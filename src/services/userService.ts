import { Types } from "mongoose";
import User, { IUser } from "../models/UserModel";

export class UserService {
  // Create new user
  async createUser(userData: {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    role?: "admin" | "customer";
    phone?: string;
    age?: number;
  }): Promise<IUser> {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new Error(`${field} already exists`);
      }
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Find user by email
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  // Find user by ID
  async findUserById(id: string): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }
    return await User.findById(id);
  }

  // Find user by username
  async findUserByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }

  // Get all users
  async getAllUsers(): Promise<IUser[]> {
    return await User.find().select('-password');
  }

  // Update user
  async updateUser(
    id: string, 
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    const { password, ...safeUpdateData } = updateData as any;
    
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      safeUpdateData, 
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  // Delete user
  async deleteUser(id: string): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      throw new Error('User not found');
    }

    return deletedUser;
  }

  // Change password
  async changePassword(
    id: string, 
    currentPassword: string, 
    newPassword: string
  ): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();
    return true;
  }
}

export default new UserService();