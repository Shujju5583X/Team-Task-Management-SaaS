import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats,
} from '../controllers/taskController.js';

const router = express.Router();

// All routes are protected
router.use(authenticateToken);

// Validation rules
const taskValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim(),
    body('status').optional().isIn(['TODO', 'IN_PROGRESS', 'DONE']).withMessage('Invalid status'),
    body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH']).withMessage('Invalid priority'),
];

// Routes
router.get('/', getAllTasks);
router.get('/stats', getTaskStats);
router.post('/', taskValidation, validate, createTask);
router.put('/:id', taskValidation, validate, updateTask);
router.delete('/:id', deleteTask);

export default router;
