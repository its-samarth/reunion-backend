import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"; 
import cors from "cors";
import authRoutes from "./routes/auth";
import connectDB from "./config/db";
import taskRoutes from './routes/taskRoutes';

dotenv.config();
const app = express();
app.set('view engine','ejs')


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api', taskRoutes);

// Connect to MongoDB
connectDB().then(() => {
    console.log("Connected to MongoDB successfully!");
  }).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
