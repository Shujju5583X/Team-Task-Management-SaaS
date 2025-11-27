const StatsCard = ({ title, value, icon: Icon, color }) => {
    const colorClasses = {
        blue: 'from-indigo-600 via-blue-600 to-cyan-600',
        yellow: 'from-amber-500 via-yellow-500 to-orange-500',
        purple: 'from-purple-600 via-violet-600 to-fuchsia-600',
        green: 'from-emerald-600 via-green-600 to-teal-600',
    };

    const iconColorClasses = {
        blue: 'bg-indigo-500/20 text-indigo-300',
        yellow: 'bg-amber-500/20 text-amber-300',
        purple: 'bg-purple-500/20 text-purple-300',
        green: 'bg-emerald-500/20 text-emerald-300',
    };

    const shadowClasses = {
        blue: 'hover:shadow-indigo-500/50',
        yellow: 'hover:shadow-amber-500/50',
        purple: 'hover:shadow-purple-500/50',
        green: 'hover:shadow-emerald-500/50',
    };

    return (
        <div className={`
            relative overflow-hidden
            bg-gradient-to-br ${colorClasses[color]} 
            rounded-2xl p-6 
            border border-white/10 
            shadow-lg ${shadowClasses[color]}
            card-hover
            group
        `}>
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${iconColorClasses[color]} backdrop-blur-sm`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    {/* Floating animation */}
                    <div className="w-12 h-12 bg-white/10 rounded-full blur-xl animate-float" />
                </div>
                <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
                <p className="text-4xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
};

export default StatsCard;
