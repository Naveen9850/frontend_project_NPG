import { motion } from "motion/react";
import { Link } from "react-router";
import { Sparkles, ArrowRight, Cpu, Wind, Activity, Grid3x3, History, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { getStatistics } from "../utils/storage";

export function MobileIntroductionPage() {
  const stats = getStatistics();

  const features = [
    {
      icon: Cpu,
      title: "Multimodal Detection",
      description: "RGB imagery & multispectral data analysis",
      gradient: "from-emerald-500/20 to-lime-500/20",
    },
    {
      icon: Wind,
      title: "Pollution-Aware",
      description: "Air quality parameter integration",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Activity,
      title: "Stress Classification",
      description: "Biotic vs Abiotic detection",
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Grid3x3,
      title: "Multi-Crop",
      description: "8 black soil crop models",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
  ];

  return (
    <div className="min-h-screen p-4 pt-6">
      {/* Hero Section */}
      <div className="relative mb-8">
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs text-emerald-300">AI-Powered Detection</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl mb-4 tracking-tight leading-tight px-4"
          >
            <span className="block">Black Soil Crop</span>
            <span className="block mt-1 bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
              Stress Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-sm text-slate-400 px-6 mb-8 leading-relaxed"
          >
            Multimodal AI detection of biotic and abiotic stress in black soil crops
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col gap-3 px-4"
          >
            <Link to="/detection">
              <Button
                size="lg"
                className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-900 hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Detection
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </Button>
            </Link>

            <Link to="/analytics">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 backdrop-blur-sm"
              >
                View Analytics
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Quick Stats */}
        {stats.totalScans > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="grid grid-cols-3 gap-2 px-4 mb-8"
          >
            <div className="p-3 rounded-xl bg-slate-800/50 border border-emerald-500/10 backdrop-blur-sm text-center">
              <div className="text-lg text-emerald-400 mb-0.5">{stats.totalScans}</div>
              <div className="text-xs text-slate-400">Scans</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-emerald-500/10 backdrop-blur-sm text-center">
              <div className="text-lg text-emerald-400 mb-0.5">{stats.healthyCount}</div>
              <div className="text-xs text-slate-400">Healthy</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-emerald-500/10 backdrop-blur-sm text-center">
              <div className="text-lg text-yellow-400 mb-0.5">{stats.bioticCount + stats.abioticCount}</div>
              <div className="text-xs text-slate-400">Issues</div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Features Section */}
      <div className="px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="grid grid-cols-2 gap-3"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                {/* Glow effect on tap */}
                <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-active:opacity-30 transition-opacity duration-300 bg-gradient-to-br ${feature.gradient}`} />
                
                {/* Card */}
                <div className="relative p-4 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm h-full transition-all duration-300 group-active:border-emerald-500/40">
                  <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${feature.gradient} mb-3`}>
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  
                  <h3 className="text-sm mb-1.5 font-medium">{feature.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-lime-500/10 border border-emerald-500/20 backdrop-blur-sm flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-0.5">Secure & Private</h4>
            <p className="text-xs text-slate-400">All data stored locally on your device</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
