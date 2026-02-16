import { motion } from "motion/react";

export function GlassCard({ children, className = "", hover = true }: { 
  children: React.ReactNode; 
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function GradientButton({ 
  children, 
  onClick, 
  className = "",
  variant = "primary" 
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        px-6 py-3 rounded-lg transition-all duration-300
        ${variant === "primary" 
          ? "bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-900 hover:shadow-2xl hover:shadow-emerald-500/50" 
          : "border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
        }
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

export function ProgressRing({ 
  value, 
  size = 120, 
  strokeWidth = 8,
  color = "emerald"
}: { 
  value: number; 
  size?: number;
  strokeWidth?: number;
  color?: "emerald" | "yellow" | "red" | "blue";
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const colors = {
    emerald: "#10B981",
    yellow: "#FACC15",
    red: "#EF4444",
    blue: "#3B82F6",
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-700"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${circumference - offset} ${circumference}` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl">{value}%</div>
      </div>
    </div>
  );
}

export function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  change,
  gradient = "from-emerald-500/20 to-lime-500/20"
}: {
  icon: any;
  label: string;
  value: string;
  change?: string;
  gradient?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm relative overflow-hidden group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
            <Icon className="w-5 h-5 text-emerald-400" />
          </div>
          {change && (
            <span className={`text-sm ${change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
              {change}
            </span>
          )}
        </div>
        <div className="text-3xl mb-1">{value}</div>
        <div className="text-sm text-slate-400">{label}</div>
      </div>
    </motion.div>
  );
}

export function MetricBadge({ 
  label, 
  value, 
  icon: Icon,
  color = "emerald" 
}: {
  label: string;
  value: string | number;
  icon?: any;
  color?: "emerald" | "yellow" | "red" | "blue";
}) {
  const colors = {
    emerald: "bg-emerald-500/20 text-emerald-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    red: "bg-red-500/20 text-red-400",
    blue: "bg-blue-500/20 text-blue-400",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${colors[color]}`}>
      {Icon && <Icon className="w-4 h-4" />}
      <span className="text-sm">{label}: {value}</span>
    </div>
  );
}

export function GlowingDot({ color = "emerald" }: { color?: "emerald" | "yellow" | "red" }) {
  const colors = {
    emerald: "bg-emerald-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
      className={`w-2 h-2 rounded-full ${colors[color]}`}
    />
  );
}
