"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const mongoose_1 = require("mongoose");
const Task_1 = __importDefault(require("../models/Task"));
// Create Task
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, priority, status, startTime, endTime, totalTime } = req.body;
        const userId = req.userId; // Get userId from decoded JWT
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const task = new Task_1.default({
            title,
            priority,
            status,
            startTime,
            endTime,
            totalTime,
            userId: new mongoose_1.Types.ObjectId(userId), // Ensure the userId is ObjectId
        });
        yield task.save();
        res.status(201).json({ message: 'Task created', task });
    }
    catch (error) {
        next(error);
    }
});
exports.createTask = createTask;
// Get Tasks for a User
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; // Get userId from decoded JWT
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const tasks = yield Task_1.default.find({ userId });
        res.status(200).json({ tasks });
    }
    catch (error) {
        next(error);
    }
});
exports.getTasks = getTasks;
// Update Task
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { taskId } = req.params;
        if (!userId || !taskId) {
            res.status(400).json({ message: 'User ID and task ID are required' });
            return;
        }
        const task = yield Task_1.default.findOne({ _id: taskId, userId });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        // Update task details
        const updatedTask = yield Task_1.default.findByIdAndUpdate(taskId, req.body, { new: true });
        res.status(200).json({ message: 'Task updated', task: updatedTask });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = updateTask;
// Delete Task
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { taskId } = req.params;
        if (!userId || !taskId) {
            res.status(400).json({ message: 'User ID and task ID are required' });
            return;
        }
        const task = yield Task_1.default.findOneAndDelete({ _id: taskId, userId });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json({ message: 'Task deleted' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTask = deleteTask;
