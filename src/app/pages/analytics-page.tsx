import { motion } from "motion/react";
import { TrendingUp, Activity, AlertTriangle, CheckCircle2, Calendar, Download } from "lucide-react";
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const stressDistributionData = [
  { name: "Healthy", value: 45, color: "#10B981" },
  { name: "Biotic", value: 32, color: "#FACC15" },
  { name: "Abiotic", value: 23, color: "#EF4444" },
];

const cropPerformanceData = [
  { crop: "Cotton", healthy: 65, biotic: 20, abiotic: 15 },
  { crop: "Soybean", healthy: 72, biotic: 18, abiotic: 10 },
  { crop: "Sorghum", healthy: 58, biotic: 25, abiotic: 17 },
  { crop: "Pigeon Pea", healthy: 68, biotic: 22, abiotic: 10 },
  { crop: "Groundnut", healthy: 55, biotic: 28, abiotic: 17 },
  { crop: "Sunflower", healthy: 70, biotic: 20, abiotic: 10 },
  { crop: "Maize", healthy: 60, biotic: 25, abiotic: 15 },
  { crop: "Chili", healthy: 62, biotic: 23, abiotic: 15 },
];

const timeSeriesData = [
  { month: "Jan", healthy: 42, stress: 18 },
  { month: "Feb", healthy: 45, stress: 20 },
  { month: "Mar", healthy: 48, stress: 22 },
  { month: "Apr", healthy: 52, stress: 25 },
  { month: "May", healthy: 55, stress: 28 },
  { month: "Jun", healthy: 58, stress: 30 },
  { month: "Jul", healthy: 62, stress: 35 },
  { month: "Aug", healthy: 65, stress: 32 },
  { month: "Sep", healthy: 68, stress: 28 },
  { month: "Oct", healthy: 70, stress: 25 },
  { month: "Nov", healthy: 72, stress: 22 },
  { month: "Dec", healthy: 75, stress: 20 },
];

const pollutionCorrelationData = [
  { pm25: 20, stress: 15 },
  { pm25: 35, stress: 25 },
  { pm25: 50, stress: 40 },
  { pm25: 65, stress: 55 },
  { pm25: 80, stress: 70 },
  { pm25: 95, stress: 85 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm border border-emerald-500/20 p-3 rounded-lg shadow-xl">
        <p className="text-sm text-slate-300 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AnalyticsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1800px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-4xl mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Comprehensive insights and performance metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40 bg-slate-800/50 border-emerald-500/30 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="border-emerald-500/30 text-emerald-400 backdrop-blur-sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {[
          { 
            label: "Total Scans", 
            value: "2,847", 
            change: "+12.5%", 
            icon: Activity, 
            color: "emerald",
            gradient: "from-emerald-500/20 to-lime-500/20"
          },
          { 
            label: "Healthy Crops", 
            value: "1,896", 
            change: "+8.2%", 
            icon: CheckCircle2, 
            color: "emerald",
            gradient: "from-emerald-500/20 to-emerald-600/20"
          },
          { 
            label: "Stress Detected", 
            value: "951", 
            change: "-3.1%", 
            icon: AlertTriangle, 
            color: "yellow",
            gradient: "from-yellow-500/20 to-orange-500/20"
          },
          { 
            label: "Avg Confidence", 
            value: "94.8%", 
            change: "+2.4%", 
            icon: TrendingUp, 
            color: "blue",
            gradient: "from-blue-500/20 to-cyan-500/20"
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm relative overflow-hidden group shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                    <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                  </div>
                  <span className={`text-sm ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Stress Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Stress Distribution</h3>
            <div className="text-sm text-slate-400">Current Month</div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stressDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {stressDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="flex justify-center gap-6 mt-4">
            {stressDistributionData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-slate-300">{item.name}</span>
                <span className="text-sm text-slate-500">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pollution vs Stress Correlation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Pollution Impact</h3>
            <div className="text-sm text-emerald-400">PM2.5 Correlation</div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={pollutionCorrelationData}>
              <defs>
                <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FACC15" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.1)" />
              <XAxis 
                dataKey="pm25" 
                stroke="#94A3B8" 
                tick={{ fill: '#94A3B8' }}
                label={{ value: 'PM2.5 (μg/m³)', position: 'insideBottom', offset: -5, fill: '#94A3B8' }}
              />
              <YAxis 
                stroke="#94A3B8" 
                tick={{ fill: '#94A3B8' }}
                label={{ value: 'Stress Level (%)', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="stress" 
                stroke="#FACC15" 
                strokeWidth={2}
                fill="url(#stressGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Crop-wise Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Crop-wise Performance</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-400">Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-slate-400">Biotic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-slate-400">Abiotic</span>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={cropPerformanceData}>
              <defs>
                <linearGradient id="healthyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="bioticGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FACC15" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#FACC15" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="abioticGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.1)" />
              <XAxis dataKey="crop" stroke="#94A3B8" tick={{ fill: '#94A3B8' }} />
              <YAxis stroke="#94A3B8" tick={{ fill: '#94A3B8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="healthy" fill="url(#healthyGrad)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="biotic" fill="url(#bioticGrad)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="abiotic" fill="url(#abioticGrad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Time Series Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Detection Trends</h3>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>12 Month Overview</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <defs>
                <linearGradient id="healthyLineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="stressLineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.1)" />
              <XAxis dataKey="month" stroke="#94A3B8" tick={{ fill: '#94A3B8' }} />
              <YAxis stroke="#94A3B8" tick={{ fill: '#94A3B8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="healthy" stroke="#10B981" fill="url(#healthyLineGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="stress" stroke="#EF4444" fill="url(#stressLineGrad)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Severity Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-xl"
      >
        <h3 className="text-xl mb-6">Regional Severity Heatmap</h3>
        
        <div className="grid grid-cols-8 gap-2">
          {cropPerformanceData.map((crop, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-slate-400 mb-2">{crop.crop}</div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="h-20 rounded-lg cursor-pointer relative group"
                style={{
                  backgroundColor: crop.healthy > 65 ? '#10B981' : crop.healthy > 55 ? '#FACC15' : '#EF4444',
                  opacity: 0.3 + (crop.healthy / 100) * 0.7,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs">{crop.healthy}%</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
      </div>
    </div>
  );
}