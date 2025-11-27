import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Trash2, Clock, AlertCircle, Filter, Edit3, Check, X } from 'lucide-react';

const TaskList = () => {
    const { tasks, loading, filter, setFilter, updateTask, deleteTask } = useTaskContext();
    const [editingId, setEditingId] = useState(null);

    const statusColors = {
        TODO: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
        IN_PROGRESS: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        DONE: 'bg-green-500/20 text-green-300 border-green-500/40',
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
            <div className="p-6 border-b border-gray-700/50 glass-effect-dark">
                <div className="flex items-center gap-3 flex-wrap">
                    <Filter className="w-5 h-5 text-primary-400" />
                    {['ALL', 'TODO', 'IN_PROGRESS', 'DONE'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${filter === status
                                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30 scale-105'
                                    : 'glass-effect text-gray-300 hover:bg-white/10'
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
                    <div className="text-center py-16 glass-effect rounded-2xl">
                        <div className="animate-float inline-block">
                            <AlertCircle className="w-16 h-16 text-primary-500/50 mx-auto mb-4" />
                        </div>
                        <p className="text-gray-300 text-lg font-semibold mb-2">No tasks found</p>
                        <p className="text-gray-500 text-sm">Create a new task to get started</p>
                    </div>
                ) : (
                    tasks.map((task, index) => (
                        <div
                            key={task.id}
                            className="glass-effect-dark rounded-xl p-5 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 card-hover group animate-slide-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-lg font-bold text-white mb-2 break-words group-hover:text-primary-300 transition-colors">
                                        {task.title}
                                    </h4>
                                    {task.description && (
                                        <p className="text-gray-400 text-sm mb-4 break-words leading-relaxed">
                                            {task.description}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap items-center gap-3">
                                        {editingId === task.id ? (
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={task.status}
                                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                                    className="px-3 py-2 glass-effect border border-primary-500/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-dark-400"
                                                    autoFocus
                                                >
                                                    <option value="TODO">To Do</option>
                                                    <option value="IN_PROGRESS">In Progress</option>
                                                    <option value="DONE">Done</option>
                                                </select>
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="p-2 glass-effect hover:bg-white/10 text-gray-400 rounded-lg transition"
                                                    aria-label="Cancel"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border backdrop-blur-sm ${statusColors[task.status]}`}
                                                >
                                                    {task.status.replace('_', ' ')}
                                                </span>
                                                <button
                                                    onClick={() => setEditingId(task.id)}
                                                    className="p-1.5 glass-effect hover:bg-white/10 text-primary-400 rounded-lg transition opacity-0 group-hover:opacity-100"
                                                    aria-label="Edit status"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        )}
                                        <span className={`text-xs font-bold ${priorityColors[task.priority]} px-2 py-1 rounded glass-effect`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="p-2 glass-effect hover:bg-red-600/20 text-red-400 rounded-lg transition group/delete"
                                        aria-label="Delete task"
                                    >
                                        <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-4 pt-4 border-t border-gray-700/50">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Created {new Date(task.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;
