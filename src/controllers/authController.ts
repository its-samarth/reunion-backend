import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils";

// Mock user data
const users = [
  {
    id: 1,
    email: "admin@mail.com",
    password: bcrypt.hashSync("password123", 10), // Hash for 'password123'
  },
];

// Login Controller
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction // Include NextFunction for compatibility
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    // Find user
    const user = users.find((u) => u.email === email);
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Generate token
    const token = generateToken({ id: user.id, email: user.email });
    res.status(200).json({ token });
  } catch (error) {
    next(error); // Pass the error to the next middleware (optional)
  }
};


// Register Controller
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }
  
      // Check if user already exists
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = {
        id: users.length + 1, // Auto-increment ID
        email,
        password: hashedPassword,
      };
  
      // Add user to the database (mock here)
      users.push(newUser);
  
      // Generate token
      const token = generateToken({ id: newUser.id, email: newUser.email });
  
      // Respond with the created user and token
      res.status(201).json({
        message: "User created successfully",
        user: { id: newUser.id, email: newUser.email },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };
