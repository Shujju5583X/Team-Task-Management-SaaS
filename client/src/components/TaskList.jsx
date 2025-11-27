import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Edit2, Trash2, Clock, AlertCircle, CheckCircle2, Filter } from 'lucide-react';

const TaskList = () => {
    const { tasks, loading, filter, setFilter, updateTask, deleteTask } = useTaskContext();
    const [editingId, setEditingId] = useState(null);

    const statusColors = {
        TODO: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        IN_PROGRESS: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        DONE: 'bg-green-500/20 text-green-400 border-green-500/30',
    };

    const priorityColors = {
        LOW: 'text-gray-400',
        MEDIUM: 'text-blue-400',
        HIGH: 'text-red-400',
    };

    const handleStatusChange = async (taskId, newStatus) => {
        await updateTask(taskId, { status: newStatus });
        setEditingId(null);
    };

    const handleDelete = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(taskId);
        }
    };

    if (loading) {
        return (
            <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton h-20 rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        <div>
            {/* Filter Buttons */}
            <div className="p-6 border-b border-gray-700">
                <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-5 h-5 text-gray-400" />
                    {['ALL', 'TODO', 'IN_PROGRESS', 'DONE'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filter === status
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            {status.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tasks */}
            <div className="p-6 space-y-4">
                {tasks.length === 0 ? (
                    <div className="text-center py-12">
                        <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No tasks found</p>
                        <p className="text-gray-500 text-sm">Create a new task to get started</p>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-gray-700/50 rounded-xl p-5 border border-gray-600 hover:border-gray-500 transition-all animate-fade-in"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-white mb-2">{task.title}</h4>
                                    {task.description && (
                                        <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                                    )}
                                    <div className="flex items-center gap-3">
                                        {editingId === task.id ? (
                                            <select
                                                value={task.status}
                                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                                className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="TODO">To Do</option>
                                                <option value="IN_PROGRESS">In Progress</option>
                                                <option value="DONE">Done</option>
                                            </select>
                                        ) : (
                                            <span
                                                onClick={() => setEditingId(task.id)}
                                                className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition hover:opacity-80 ${statusColors[task.status]
                                                    }`}
                                            >
                                                {task.status.replace('_', ' ')}
                                            </span>
                                        )}
                                        <span className={`text-xs font-semibold ${priorityColors[task.priority]}`}>
                                            {task.priority} PRIORITY
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                Created {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;
