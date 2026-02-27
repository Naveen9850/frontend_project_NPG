import { motion } from "motion/react";
import { Bug, CloudRain, Leaf, AlertTriangle } from "lucide-react";

interface DiseaseStressDisplayProps {
  stressType: "Healthy" | "Biotic" | "Abiotic";
  diseaseName?: string | null;
  stressCause?: string | null;
}

export function DiseaseStressDisplay({ stressType, diseaseName, stressCause }: DiseaseStressDisplayProps) {
  if (stressType === "Healthy") {
    return null; // Don't show disease/cause section for healthy plants
  }

  if (stressType === "Biotic" && diseaseName) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 backdrop-blur-sm relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 blur-xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <Bug className="w-5 h-5 text-red-400" />
            </div>
            <h4 className="text-sm text-red-300/80 uppercase tracking-wide">Disease Identified</h4>
          </div>
          
          <p className="text-xl text-red-200 font-medium">{diseaseName}</p>
          
          <div className="mt-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs text-red-300/60">Biotic Stress Detected</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (stressType === "Abiotic" && stressCause) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-blue-500/10 border border-yellow-500/20 backdrop-blur-sm relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-blue-500/5 blur-xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <CloudRain className="w-5 h-5 text-yellow-400" />
            </div>
            <h4 className="text-sm text-yellow-300/80 uppercase tracking-wide">Environmental Stress Cause</h4>
          </div>
          
          <p className="text-xl text-yellow-200 font-medium">{stressCause}</p>
          
          <div className="mt-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs text-yellow-300/60">Abiotic Stress Detected</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
