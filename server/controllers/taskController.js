import prisma from '../config/db.js';

/**
 * Get all tasks for the authenticated user
 */
export const getAllTasks = async (req, res) => {
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
};

/**
 * Create a new task
 */
export const createTask = async (req, res) => {
    try {
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
};

/**
 * Update an existing task
 */
export const updateTask = async (req, res) => {
    try {
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
};

/**
 * Delete a task
 */
export const deleteTask = async (req, res) => {
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
};

/**
 * Get task statistics for the authenticated user
 */
export const getTaskStats = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Get counts for each status
        const [total, todo, inProgress, done] = await Promise.all([
            prisma.task.count({ where: { userId } }),
            prisma.task.count({ where: { userId, status: 'TODO' } }),
            prisma.task.count({ where: { userId, status: 'IN_PROGRESS' } }),
            prisma.task.count({ where: { userId, status: 'DONE' } }),
        ]);

        res.json({
            stats: {
                total,
                todo,
                inProgress,
                done,
            },
        });
    } catch (error) {
        console.error('Get task stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
