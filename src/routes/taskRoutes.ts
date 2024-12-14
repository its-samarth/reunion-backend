import express from 'express';

import * as taskController from '../controllers/taskController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply authentication middleware
router.post('/tasks', authenticate, taskController.createTask);
router.get('/tasks', authenticate, taskController.getTasks);
router.put('/tasks/:taskId', authenticate, taskController.updateTask);
router.delete('/tasks/:taskId', authenticate, taskController.deleteTask);

export default router;
