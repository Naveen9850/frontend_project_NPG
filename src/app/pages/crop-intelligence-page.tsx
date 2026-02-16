import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Droplet, Sun, Wind, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

const crops = [
  {
    name: "Cotton",
    icon: "🌱",
    status: "healthy",
    healthScore: 85,
    scans: 342,
    stressLevel: 15,
    lastScan: "2 hours ago",
    alerts: 2,
    metrics: { humidity: 65, temp: 28, wind: 12 },
  },
  {
    name: "Soybean",
    icon: "🫘",
    status: "healthy",
    healthScore: 92,
    scans: 287,
    stressLevel: 8,
    lastScan: "4 hours ago",
    alerts: 0,
    metrics: { humidity: 70, temp: 26, wind: 10 },
  },
  {
    name: "Sorghum",
    icon: "🌾",
    status: "warning",
    healthScore: 68,
    scans: 198,
    stressLevel: 32,
    lastScan: "1 hour ago",
    alerts: 5,
    metrics: { humidity: 55, temp: 32, wind: 18 },
  },
  {
    name: "Pigeon Pea",
    icon: "🫛",
    status: "healthy",
    healthScore: 88,
    scans: 256,
    stressLevel: 12,
    lastScan: "3 hours ago",
    alerts: 1,
    metrics: { humidity: 68, temp: 27, wind: 11 },
  },
  {
    name: "Groundnut",
    icon: "🥜",
    status: "warning",
    healthScore: 72,
    scans: 223,
    stressLevel: 28,
    lastScan: "5 hours ago",
    alerts: 4,
    metrics: { humidity: 60, temp: 30, wind: 15 },
  },
  {
    name: "Sunflower",
    icon: "🌻",
    status: "healthy",
    healthScore: 90,
    scans: 312,
    stressLevel: 10,
    lastScan: "1 hour ago",
    alerts: 1,
    metrics: { humidity: 62, temp: 29, wind: 13 },
  },
  {
    name: "Maize",
    icon: "🌽",
    status: "alert",
    healthScore: 58,
    scans: 289,
    stressLevel: 42,
    lastScan: "30 mins ago",
    alerts: 8,
    metrics: { humidity: 50, temp: 35, wind: 20 },
  },
  {
    name: "Chili",
    icon: "🌶️",
    status: "healthy",
    healthScore: 82,
    scans: 265,
    stressLevel: 18,
    lastScan: "2 hours ago",
    alerts: 2,
    metrics: { humidity: 58, temp: 31, wind: 16 },
  },
];

export function CropIntelligencePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl mb-2">Crop Intelligence</h1>
          <p className="text-slate-400">Real-time monitoring and performance insights for black soil crops</p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Active Crops", value: "8", trend: "+2" },
            { label: "Total Scans", value: "2.2K", trend: "+12%" },
            { label: "Avg Health", value: "79%", trend: "+5%" },
            { label: "Active Alerts", value: "23", trend: "-3" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">{stat.label}</span>
                <span className={`text-xs ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-2xl">{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Crop Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {crops.map((crop, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              whileHover={{
                scale: 1.03,
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${crop.status === 'healthy' ? 'bg-emerald-500' :
                  crop.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                }`} />

              {/* Card */}
              <div className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 shadow-xl ${crop.status === 'healthy'
                  ? 'bg-slate-800/50 border-emerald-500/20 group-hover:border-emerald-500/40' :
                  crop.status === 'warning'
                    ? 'bg-slate-800/50 border-yellow-500/20 group-hover:border-yellow-500/40' :
                    'bg-slate-800/50 border-red-500/20 group-hover:border-red-500/40'
                }`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{crop.icon}</div>
                    <div>
                      <h3 className="text-lg">{crop.name}</h3>
                      <p className="text-xs text-slate-400">{crop.scans} scans</p>
                    </div>
                  </div>

                  {crop.alerts > 0 && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 text-red-400"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span className="text-xs">{crop.alerts}</span>
                    </motion.div>
                  )}
                </div>

                {/* Health Score Ring */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-slate-700"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      className={
                        crop.status === 'healthy' ? 'text-emerald-500' :
                          crop.status === 'warning' ? 'text-yellow-500' :
                            'text-red-500'
                      }
                      initial={{ strokeDasharray: "0 251.2" }}
                      animate={{ strokeDasharray: `${(crop.healthScore / 100) * 251.2} 251.2` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xl">{crop.healthScore}%</div>
                    <div className="text-xs text-slate-400">Health</div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`text-center mb-4 px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 ${crop.status === 'healthy'
                    ? 'bg-emerald-500/20 text-emerald-400' :
                    crop.status === 'warning'
                      ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                  }`}>
                  {crop.status === 'healthy' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {crop.status === 'healthy' ? 'Healthy' : crop.status === 'warning' ? 'Needs Attention' : 'Critical'}
                </div>

                {/* Stress Level */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Stress Level</span>
                    <span className={
                      crop.stressLevel < 20 ? 'text-emerald-400' :
                        crop.stressLevel < 35 ? 'text-yellow-400' :
                          'text-red-400'
                    }>{crop.stressLevel}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <motion.div
                      className={`h-full ${crop.stressLevel < 20 ? 'bg-emerald-500' :
                          crop.stressLevel < 35 ? 'bg-yellow-500' :
                            'bg-red-500'
                        }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${crop.stressLevel}%` }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                    />
                  </div>
                </div>

                {/* Environmental Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900/50">
                    <Droplet className="w-4 h-4 text-blue-400 mb-1" />
                    <span className="text-xs text-slate-400">{crop.metrics.humidity}%</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900/50">
                    <Sun className="w-4 h-4 text-yellow-400 mb-1" />
                    <span className="text-xs text-slate-400">{crop.metrics.temp}°C</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900/50">
                    <Wind className="w-4 h-4 text-cyan-400 mb-1" />
                    <span className="text-xs text-slate-400">{crop.metrics.wind}km/h</span>
                  </div>
                </div>

                {/* Last Scan */}
                <div className="text-center text-xs text-slate-500 border-t border-slate-700/50 pt-3">
                  Last scan: {crop.lastScan}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-lime-500/10 border border-emerald-500/20 backdrop-blur-sm shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg mb-1">Ready to Scan More Crops?</h3>
              <p className="text-sm text-slate-400">Run new detections or schedule automated monitoring</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/detection")}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-900 text-sm cursor-pointer"
              >
                New Scan
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg border border-emerald-500/30 text-emerald-400 text-sm"
              >
                Schedule
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}