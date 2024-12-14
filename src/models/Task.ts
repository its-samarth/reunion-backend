import mongoose, { Document, Schema } from "mongoose";

// Define an interface for TypeScript
interface ITask extends Document {
  title: string;
  priority: number;
  status: "pending" | "finished";
  startTime: Date;
  endTime: Date;
  totalTime: number; // Total time in hours
  userId: mongoose.Types.ObjectId; // Link to user
}

// Create the Task schema
const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "finished"],
      default: "pending",
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    totalTime: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to user
  },
  { timestamps: true }
);

// Middleware to calculate the total time before saving
taskSchema.pre<ITask>("save", function (next) {
  // Calculate the total time in hours
  if (this.startTime && this.endTime) {
    const start = new Date(this.startTime).getTime();
    const end = new Date(this.endTime).getTime();
    this.totalTime = (end - start) / (1000 * 60 * 60); // Convert ms to hours
  }
  next();
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
