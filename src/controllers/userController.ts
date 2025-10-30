import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userService from "../services/userService";
import { IUser } from "../models/UserModel";

// JWT interface
interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

class UserController {
  // Generate JWT token as arrow function to bind 'this'
  private generateToken = (user: IUser): string => {
    const payload: JwtPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const secret = process.env.JWT_SECRET || "change_me";
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

    return jwt.sign(
      payload, 
      secret as jwt.Secret, 
      { expiresIn } as jwt.SignOptions
    );
  }

  // Register new user as arrow function
  register = async (req: Request, res: Response) => {
    try {
      const { firstname, lastname, username, email, password, role, phone, age } = req.body;

      // Check if user already exists
      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email"
        });
      }

      const existingUsername = await userService.findUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "Username already taken"
        });
      }

      // Set default role to 'customer' if not provided or invalid
      const userRole = role === 'admin' ? 'admin' : 'customer';

      const user = await userService.createUser({
        firstname,
        lastname,
        username,
        email,
        password,
        phone,
        age,
        role: userRole // Use the determined role
      });

      // Generate JWT token
      const token = this.generateToken(user);

      // Remove password from response
      const userResponse = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        age: user.age
      };

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: userResponse,
          token
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: `Error registering user: ${error}`
      });
    }
  }

  // Rest of your methods remain the same...
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      // Generate JWT token
      const token = this.generateToken(user);

      // Remove password from response
      const userResponse = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        age: user.age
      };

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: userResponse,
          token
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error during login: ${error}`
      });
    }
  }

  // Get current user profile (requires token) as arrow function
  getProfile = async (req: Request, res: Response) => {
    try {
      // The user should be attached to req by authMiddleware
      const user = (req as any).user;
    
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated"
        });
      }

      const userProfile = await userService.findUserById(user._id);
      
      if (!userProfile) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      // Remove password from response
      const userResponse = {
        _id: userProfile._id,
        firstname: userProfile.firstname,
        lastname: userProfile.lastname,
        username: userProfile.username,
        email: userProfile.email,
        role: userProfile.role,
        phone: userProfile.phone,
        age: userProfile.age
      };

      res.status(200).json({
        success: true,
        data: userResponse
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error fetching profile: ${error}`
      });
    }
  }

  // Refresh token as arrow function
  refreshToken = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated"
        });
      }

      const userData = await userService.findUserById(user._id);
      
      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      // Generate new token
      const newToken = this.generateToken(userData);

      res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        data: {
          token: newToken
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error refreshing token: ${error}`
      });
    }
  }

  // Logout user (client-side token removal) as arrow function
  logout = async (req: Request, res: Response) => {
    try {
      // Since JWT is stateless, we just inform the client to remove the token
      res.status(200).json({
        success: true,
        message: "Logout successful"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error during logout: ${error}`
      });
    }
  }

  // Get all users (admin only) as arrow function
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error fetching users: ${error}`
      });
    }
  }

  // Get user by ID as arrow function
  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userService.findUserById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      // Remove password from response
      const userResponse = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        age: user.age
      };

      res.status(200).json({
        success: true,
        data: userResponse
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error fetching user: ${error}`
      });
    }
  }

  // Update user as arrow function
  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Prevent role escalation through regular update
      if (updateData.role) {
        const currentUser = (req as any).user;
        // Only allow admins to change roles, and prevent self-role change
        if (currentUser.role !== 'admin' || currentUser._id === id) {
          delete updateData.role;
        }
      }

      const updatedUser = await userService.updateUser(id, updateData);
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error updating user: ${error}`
      });
    }
  }

  // Delete user as arrow function
  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteUser(id);
      
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error deleting user: ${error}`
      });
    }
  }

  // Change password as arrow function
  changePassword = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      await userService.changePassword(id, currentPassword, newPassword);

      res.status(200).json({
        success: true,
        message: "Password changed successfully"
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: `Error changing password: ${error}`
      });
    }
  }
}

export default new UserController();