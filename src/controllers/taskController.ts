// src/controllers/taskController.ts
import { Request, Response, NextFunction } from "express";

import mongoose, { Types } from "mongoose";
import Task from "../models/Task";

// Create Task
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, priority, status, startTime, endTime, totalTime } = req.body;
    const userId = (req as Request & { userId: string }).userId; // Ge t userId from decoded JWT

    // Log the type of userId  here as well

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const task = new Task({
      title,
      priority,
      status,
      startTime,
      endTime,
      totalTime,
      userId: userObjectId, // Ensure the  userId is ObjectId
    });
    console.log("User ID in createTask:", userId);
    console.log("Type of userId  in createTask:", typeof userId);
    console.log(task);

    await task.save();
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    next(error);
  }
};

// Get Tasks for a User
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as Request & { userId: string }).userId; // Get userId from decoded JWT

    // Log the type of userId here as well

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    console.log("User ID in createTask:", userId);
    console.log("Type of userId in createTask:", typeof userId);

    const tasks = await Task.find({ userId: userObjectId });
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

// Update Task
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as Request & { userId: string }).userId;
    const { taskId } = req.params;

    if (!userId || !taskId) {
      res.status(400).json({ message: "User ID and task ID are required" });
      return;
    }

    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Update task details
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    next(error);
  }
};

// Delete Task
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as Request & { userId: string }).userId;
    const { taskId } = req.params;

    if (!userId || !taskId) {
      res.status(400).json({ message: "User ID and task ID are required" });
      return;
    }

    const task = await Task.findOneAndDelete({ _id: taskId, userId });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

// // Helper function to calculate time in hours
// const convertToHours = (ms: number) => Math.max(ms / 3600000, 0);
// export const getDashboard=(req: Request, res: Response, next: NextFunction)  => {
//   try {
//       const currentTime = new Date();

//       const tasks = req.body.tasks; // tasks  data should be passed as an array in the body

//       if (!tasks || tasks.length === 0) {
//         return res.status(400).json({ error: 'No task data provided' });
//       }

//       // 1. Total count of tasks
//       const totalTasks = tasks.length;

//       // 2. Percentage of completed and pending tasks
//       const completedTasks = tasks.filter((task: any) => task.status === 'finished').length;
//       const pendingTasks = totalTasks - completedTasks;
//       const completedPercentage = (completedTasks / totalTasks) * 100;
//       const pendingPercentage = (pendingTasks / totalTasks) * 100;

//       // 3. Time lapsed and estimated time for pending tasks by priority
//       interface PriorityStats {
//         [key: number]: { lapsed: number; left: number };
//       }
//       let priorityStats: PriorityStats = {};
//       tasks.forEach((task: any) => {
//           const { startTime, endTime, status, priority } = task;
//           const start = new Date(startTime);
//           const end = new Date(endTime);

//           if (status === 'pending') {
//               const timeLapsed = convertToHours(currentTime.getTime() - start.getTime()); // Time lapsed in hours
//               const timeLeft = convertToHours(end.getTime() - currentTime.getTime()); // Time left in hours

//               if (!priorityStats[priority]) {
//                   priorityStats[priority] = { lapsed: 0, left: 0 };
//               }
//               priorityStats[priority].lapsed += timeLapsed;
//               priorityStats[priority].left += timeLeft;
//           }
//       });

//       // 4. Average time for completed tasks
//       const completedTimes = tasks.filter((task: any) => task.status === 'finished').map((task: any) => {
//           const start = new Date(task.startTime);
//           const end = new Date(task.endTime);
//           return convertToHours(end.getTime() - start.getTime()); // Time taken for task completion
//       });
//       const averageCompletionTime = completedTimes.length > 0 ? completedTimes.reduce((a: number, b: number) => a + b) / completedTimes.length : 0;

//       // Respond with the statistics
//       res.status(200).json({
//         message: 'Dashboard data retrieved successfully',
//         data: {
//           totalTasks,
//           completedPercentage,
//           pendingPercentage,
//           priorityStats,
//           averageCompletionTime,
//         },
//       });

//   } catch (error) {
//     next(error);
//   }
// };

// Helper function to calculate time in hours
const convertToHours = (ms: number) => Math.max(ms / 3600000, 0);

// Express Route Handler - Ensure it's async and properly typed
export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentTime = new Date();

    // Assuming task data is passed in the request body as an array
    const tasks = req.body.tasks[0].tasks; // tasks data should be passed as an array in the body

    if (!tasks || tasks.length === 0) {
      res.status(400).json({ error: "No task data provided" });
      return;
    }

    // 1. Total count of tasks
    const totalTasks = tasks.length;

    // 2. Percentage of completed and pending tasks
    const completedTasks = tasks.filter(
      (task: any) => task.status === "finished"
    ).length;

    const pendingTasks = totalTasks - completedTasks;
    const completedPercentage = (completedTasks / totalTasks) * 100;
    const pendingPercentage = (pendingTasks / totalTasks) * 100;

    const calculateTimeToFinish = (endTime: string, currentTime: Date): number => {
      const end = new Date(endTime);
      const timeDifference = end.getTime() - currentTime.getTime();
      return timeDifference > 0 ? convertToHours(timeDifference) : 0;
    };
    

    // 3. Time lapsed and estimated time for pending tasks by priority
    let timeLapsedByPriority: { [key: number]: number } = {}; // Time lapsed for each priority
    let timeLeftByPriority: { [key: number]: number } = {}; // Time left for each priority
    let totalTimeToFinishByPriority: { [key: number]: number } = {}; // Total time to finish for each priority



    tasks.forEach((task: any) => {
      const { startTime, endTime, status, priority } = task;
      const start = new Date(startTime);
      const end = new Date(endTime);

      if (status === "pending") {
        const timeLapsed = convertToHours(
          currentTime.getTime() - start.getTime()
        ); // Time lapsed in hours
        const timeLeft = convertToHours(end.getTime() - currentTime.getTime()); // Time left in hours

        // Accumulate time lapsed and time left for the corresponding priority
        timeLapsedByPriority[priority] =
          (timeLapsedByPriority[priority] || 0) + timeLapsed;
        timeLeftByPriority[priority] =
          (timeLeftByPriority[priority] || 0) + timeLeft;
          const totalTimeToFinish = calculateTimeToFinish(endTime, currentTime);
totalTimeToFinishByPriority[priority] =
  (totalTimeToFinishByPriority[priority] || 0) + totalTimeToFinish;

      }
    });

    // Log the time lapsed and time left for debugging
    console.log("Time Lapsed By Priority:", timeLapsedByPriority);
    console.log("Time Left By Priority:", timeLeftByPriority);

    const completedTimes = tasks
      .filter((task: any) => task.status === "finished") // Only consider finished tasks
      .map((task: any) => {
        const start = new Date(task.startTime);
        const end = new Date(task.endTime);

        // Log task information for debugging
        console.log("Task ID:", task.id);
        console.log("Start Time:", task.startTime);
        console.log("End Time:", task.endTime);

        // Check if startTime and endTime are valid dates
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          console.error("Invalid date(s) for task:", task.id);
          return 0; // If invalid dates, return 0 for this task
        }

        // If end time is before start time, log it as an error and return 0
        if (end < start) {
          console.error(`End Time is before Start Time for Task ID ${task.id}`);
          return 0;
        }

        const timeTaken = convertToHours(end.getTime() - start.getTime()); // Time taken for task completion
        console.log(`Time taken for task ${task.id}: ${timeTaken} hours`); // Log the time taken for the task

        return timeTaken;
      });

    console.log("Completed Times Array:", completedTimes);

    const averageCompletionTime =
      completedTimes.length > 0
        ? completedTimes.reduce((a: number, b: number) => a + b) /
          completedTimes.length
        : 0;

    // Respond with the statistics
    res.status(200).json({
      message: "Dashboard data retrieved successfully",
      data: {
        totalTasks,
        pendingTasks,
        completedPercentage: Math.round(completedPercentage * 100) / 100, // Round to 2 decimal places
        pendingPercentage: Math.round(pendingPercentage * 100) / 100, // Round to 2 decimal places
        timeLapsedByPriority,
        timeLeftByPriority,
        totalTimeToFinishByPriority,
        averageCompletionTime:Math.round(averageCompletionTime),
      },
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};
