import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"; 
import cors from "cors";
import authRoutes from "./routes/auth";
import connectDB from "./config/db";

dotenv.config();
const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
