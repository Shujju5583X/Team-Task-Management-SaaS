const StatsCard = ({ title, value, icon: Icon, color }) => {
    const colorClasses = {
        blue: 'from-blue-600 to-blue-700',
        yellow: 'from-yellow-600 to-yellow-700',
        purple: 'from-purple-600 to-purple-700',
        green: 'from-green-600 to-green-700',
    };

    const iconColorClasses = {
        blue: 'bg-blue-500/20 text-blue-400',
        yellow: 'bg-yellow-500/20 text-yellow-400',
        purple: 'bg-purple-500/20 text-purple-400',
        green: 'bg-green-500/20 text-green-400',
    };

    return (
        <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${iconColorClasses[color]}`}>
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
            </div>
            <p className="text-white/80 text-xs sm:text-sm font-medium mb-1">{title}</p>
            <p className="text-2xl sm:text-4xl font-bold text-white">{value}</p>
        </div>
    );
};

export default StatsCard;
