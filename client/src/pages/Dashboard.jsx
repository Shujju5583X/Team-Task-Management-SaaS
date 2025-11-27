import { LayoutDashboard, CheckCircle2, Clock, AlertCircle, LogOut, Plus, Menu, X, Sparkles } from 'lucide-react';
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300 flex relative">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 glass-effect-dark border-b border-gray-700/50 px-4 py-3 flex items-center justify-between backdrop-blur-xl">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <CheckCircle2 className="w-7 h-7 text-primary-400" />
                        <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                        TaskFlow
                    </h1>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 glass-effect hover:bg-white/10 rounded-lg transition text-white"
                    aria-label="Toggle menu"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 glass-effect-dark border-r border-gray-700/50 flex flex-col
                transform transition-all duration-300 ease-in-out backdrop-blur-xl
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-gray-700/50 lg:block hidden">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <CheckCircle2 className="w-8 h-8 text-primary-400 animate-glow" />
                            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            TaskFlow
                        </h1>
                    </div>
                </div>

                <nav className="flex-1 p-4 mt-16 lg:mt-0">
                    <div className="space-y-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg transition shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50">
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="font-semibold">Dashboard</span>
                        </button>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-700/50">
                    <div className="glass-effect rounded-xl p-4 mb-4 border border-gray-700/50">
                        <p className="text-xs text-gray-400 mb-2 font-medium">Logged in as</p>
                        <p className="text-white font-semibold truncate">{user?.fullName}</p>
                        <p className="text-xs text-gray-400 truncate mt-1">{user?.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition shadow-lg hover:shadow-red-500/30"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto lg:ml-0 relative z-10">
                <div className="p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
                    {/* Header */}
                    <div className="mb-8 animate-slide-down">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Welcome back, <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">{user?.fullName?.split(' ')[0]}</span>! 👋
                        </h2>
                        <p className="text-gray-400">
                            Here's an overview of your tasks
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 animate-fade-in">
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
                    <div className="mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <TaskChart />
                    </div>

                    {/* Task List */}
                    <div className="glass-effect-dark rounded-2xl border border-gray-700/50 overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Your Tasks</h3>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg transition shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 font-semibold"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add Task</span>
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
