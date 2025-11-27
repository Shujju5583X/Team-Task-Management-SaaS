import { createContext, useContext, useState, useEffect } from 'react';
import { tasksAPI } from '../api/api';
import toast from 'react-hot-toast';

const TaskContext = createContext(null);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within TaskProvider');
    }
    return context;
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL'); // ALL, TODO, IN_PROGRESS, DONE

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await tasksAPI.getAll();
            setTasks(response.data.tasks);
        } catch (error) {
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (taskData) => {
        try {
            // Optimistic UI update
            const tempId = `temp-${Date.now()}`;
            const tempTask = {
                ...taskData,
                id: tempId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setTasks([tempTask, ...tasks]);

            const response = await tasksAPI.create(taskData);

            // Replace temp task with real one
            setTasks(prevTasks =>
                prevTasks.map(t => (t.id === tempId ? response.data.task : t))
            );

            toast.success('Task created successfully!');
            return { success: true };
        } catch (error) {
            // Rollback optimistic update
            setTasks(prevTasks => prevTasks.filter(t => !t.id.startsWith('temp-')));
            toast.error('Failed to create task');
            return { success: false };
        }
    };

    const updateTask = async (id, taskData) => {
        try {
            // Optimistic UI update
            const previousTasks = [...tasks];
            setTasks(prevTasks =>
                prevTasks.map(t => (t.id === id ? { ...t, ...taskData } : t))
            );

            const response = await tasksAPI.update(id, taskData);

            // Update with server response
            setTasks(prevTasks =>
                prevTasks.map(t => (t.id === id ? response.data.task : t))
            );

            toast.success('Task updated successfully!');
            return { success: true };
        } catch (error) {
            // Rollback
            setTasks(previousTasks);
            toast.error('Failed to update task');
            return { success: false };
        }
    };

    const deleteTask = async (id) => {
        try {
            // Optimistic UI update
            const previousTasks = [...tasks];
            setTasks(prevTasks => prevTasks.filter(t => t.id !== id));

            await tasksAPI.delete(id);

            toast.success('Task deleted successfully!');
            return { success: true };
        } catch (error) {
            // Rollback
            setTasks(previousTasks);
            toast.error('Failed to delete task');
            return { success: false };
        }
    };

    const filteredTasks = filter === 'ALL'
        ? tasks
        : tasks.filter(task => task.status === filter);

    const stats = {
        total: tasks.length,
        todo: tasks.filter(t => t.status === 'TODO').length,
        inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
        done: tasks.filter(t => t.status === 'DONE').length,
    };

    const value = {
        tasks: filteredTasks,
        allTasks: tasks,
        loading,
        filter,
        setFilter,
        stats,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
