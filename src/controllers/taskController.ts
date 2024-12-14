// src/controllers/taskController.ts
import { Request, Response, NextFunction } from 'express';

import mongoose, { Types } from 'mongoose';
import Task from '../models/Task';

// Create Task
export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, priority, status, startTime, endTime, totalTime } = req.body;
    const userId = (req as Request & { userId: string }).userId; // Ge t userId from decoded JWT


     // Log the type of userId  here as well
     

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
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
    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    next(error);
  }
};

// Get Tasks for a User
export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as Request & { userId: string }).userId;// Get userId from decoded JWT

     // Log the type of userId here as well
     

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    console.log("User ID in createTask:", userId);
     console.log("Type of userId in createTask:", typeof userId);

    const tasks = await Task.find({ userId: userObjectId  });
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

// Update Task
export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as Request & { userId: string }).userId;
    const { taskId } = req.params;

    if (!userId || !taskId) {
      res.status(400).json({ message: 'User ID and task ID are required' });
      return;
    }

    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Update task details
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    res.status(200).json({ message: 'Task updated', task: updatedTask });
  } catch (error) {
    next(error);
  }
};

// Delete Task
export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as Request & { userId: string }).userId;
    const { taskId } = req.params;

    if (!userId || !taskId) {
      res.status(400).json({ message: 'User ID and task ID are required' });
      return;
    }

    const task = await Task.findOneAndDelete({ _id: taskId, userId });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};
