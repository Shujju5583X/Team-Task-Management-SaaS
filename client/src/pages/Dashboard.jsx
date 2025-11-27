import { LayoutDashboard, CheckCircle2, Clock, AlertCircle, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTaskContext } from '../context/TaskContext';
import StatsCard from '../components/StatsCard';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';
import TaskChart from '../components/TaskChart';
import { useState } from 'react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { stats } = useTaskContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-8 h-8 text-primary-500" />
                        TaskFlow
                    </h1>
                </div>

                <nav className="flex-1 p-4">
                    <div className="space-y-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary-600 text-white rounded-lg transition">
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="font-medium">Dashboard</span>
                        </button>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-400 mb-1">Logged in as</p>
                        <p className="text-white font-medium truncate">{user?.fullName}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Welcome back, {user?.fullName?.split(' ')[0]}!
                        </h2>
                        <p className="text-gray-400">
                            Here's an overview of your tasks
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatsCard
                            title="Total Tasks"
                            value={stats.total}
                            icon={LayoutDashboard}
                            color="blue"
                        />
                        <StatsCard
                            title="To Do"
                            value={stats.todo}
                            icon={AlertCircle}
                            color="yellow"
                        />
                        <StatsCard
                            title="In Progress"
                            value={stats.inProgress}
                            icon={Clock}
                            color="purple"
                        />
                        <StatsCard
                            title="Completed"
                            value={stats.done}
                            icon={CheckCircle2}
                            color="green"
                        />
                    </div>

                    {/* Chart Section */}
                    <div className="mb-8">
                        <TaskChart />
                    </div>

                    {/* Task List */}
                    <div className="bg-gray-800 rounded-2xl border border-gray-700">
                        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-white">Your Tasks</h3>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition"
                            >
                                <Plus className="w-5 h-5" />
                                Add Task
                            </button>
                        </div>
                        <TaskList />
                    </div>
                </div>
            </main>

            {/* Add Task Modal */}
            <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Dashboard;
