import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authenticateToken);

// Validation middleware
const taskValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim(),
    body('status').optional().isIn(['TODO', 'IN_PROGRESS', 'DONE']).withMessage('Invalid status'),
    body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH']).withMessage('Invalid priority'),
];

// GET /api/tasks - Get all tasks for logged-in user
router.get('/', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
        });

        res.json({ tasks });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/tasks - Create a new task
router.post('/', taskValidation, async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, status, priority } = req.body;

        const task = await prisma.task.create({
            data: {
                title,
                description: description || null,
                status: status || 'TODO',
                priority: priority || 'MEDIUM',
                userId: req.user.userId,
            },
        });

        res.status(201).json({
            message: 'Task created successfully',
            task,
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/tasks/:id - Update a task
router.put('/:id', taskValidation, async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { title, description, status, priority } = req.body;

        // Check if task exists and belongs to user
        const existingTask = await prisma.task.findUnique({
            where: { id },
        });

        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (existingTask.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized to update this task' });
        }

        // Update task
        const task = await prisma.task.update({
            where: { id },
            data: {
                title,
                description: description !== undefined ? description : existingTask.description,
                status: status || existingTask.status,
                priority: priority || existingTask.priority,
            },
        });

        res.json({
            message: 'Task updated successfully',
            task,
        });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if task exists and belongs to user
        const existingTask = await prisma.task.findUnique({
            where: { id },
        });

        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (existingTask.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized to delete this task' });
        }

        // Delete task
        await prisma.task.delete({
            where: { id },
        });

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
