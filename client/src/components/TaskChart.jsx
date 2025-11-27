import { useTaskContext } from '../context/TaskContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const TaskChart = () => {
    const { stats } = useTaskContext();

    const data = [
        { name: 'To Do', value: stats.todo, color: '#eab308' },
        { name: 'In Progress', value: stats.inProgress, color: '#9333ea' },
        { name: 'Completed', value: stats.done, color: '#22c55e' },
    ];

    // Calculate completion rate
    const completionRate = stats.total > 0
        ? Math.round((stats.done / stats.total) * 100)
        : 0;

    return (
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Task Overview</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart */}
                <div className="h-64">
                    {stats.total > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            No tasks to display
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="flex flex-col justify-center space-y-4">
                    <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                        <p className="text-sm text-gray-400 mb-1">Completion Rate</p>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-600 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
                                    style={{ width: `${completionRate}%` }}
                                />
                            </div>
                            <span className="text-2xl font-bold text-white">{completionRate}%</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold text-yellow-400">{stats.todo}</p>
                            <p className="text-xs text-yellow-400/80">To Do</p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold text-purple-400">{stats.inProgress}</p>
                            <p className="text-xs text-purple-400/80">In Progress</p>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">
                            <p className="text-2xl font-bold text-green-400">{stats.done}</p>
                            <p className="text-xs text-green-400/80">Completed</p>
                        </div>
                    </div>

                    <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-primary-400">{stats.total}</p>
                        <p className="text-sm text-primary-400/80">Total Tasks</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskChart;
