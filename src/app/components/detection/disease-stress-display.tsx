import { motion } from "motion/react";
import { Bug, CloudRain, Search, FlaskConical } from "lucide-react";

interface DiseaseStressDisplayProps {
  stressType: "Healthy" | "Biotic" | "Abiotic";
  diseaseName?: string | null;
  stressCause?: string | null;
  possibleDiseases?: string[] | null;
}

export function DiseaseStressDisplay({
  stressType,
  diseaseName,
  stressCause,
  possibleDiseases,
}: DiseaseStressDisplayProps) {
  if (stressType === "Healthy") {
    return null;
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
          {/* Category header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <Bug className="w-5 h-5 text-red-400" />
            </div>
            <h4 className="text-sm text-red-300/80 uppercase tracking-wide">
              Crop Stress Category
            </h4>
          </div>

          <p className="text-xl text-red-200 font-medium mb-1">
            {diseaseName}
          </p>

          <div className="mt-2 flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs text-red-300/60">
              Biotic Stress Detected
            </span>
          </div>

          {/* Possible diseases to investigate */}
          {possibleDiseases && possibleDiseases.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-4 p-4 rounded-lg bg-slate-900/60 border border-red-500/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4 text-orange-400" />
                <h5 className="text-xs text-orange-300 uppercase tracking-wide font-medium">
                  Possible Diseases to Investigate
                </h5>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {possibleDiseases.map((disease, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + idx * 0.08 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400/60 mt-1.5 shrink-0" />
                    <span className="text-slate-300/90">{disease}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-3 italic">
                The model detects crop-level stress. Consult an expert for
                specific disease identification.
              </p>
            </motion.div>
          )}
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
            <h4 className="text-sm text-yellow-300/80 uppercase tracking-wide">
              Environmental Stress Cause
            </h4>
          </div>

          <p className="text-xl text-yellow-200 font-medium">
            {stressCause}
          </p>

          <div className="mt-2 flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs text-yellow-300/60">
              Abiotic Stress Detected
            </span>
          </div>

          {/* Possible stress symptoms */}
          {possibleDiseases && possibleDiseases.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-4 p-4 rounded-lg bg-slate-900/60 border border-yellow-500/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <FlaskConical className="w-4 h-4 text-yellow-400" />
                <h5 className="text-xs text-yellow-300 uppercase tracking-wide font-medium">
                  Possible Stress Symptoms
                </h5>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {possibleDiseases.map((symptom, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + idx * 0.08 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60 mt-1.5 shrink-0" />
                    <span className="text-slate-300/90">{symptom}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-3 italic">
                Environmental stress detected. Monitor conditions and adjust
                management practices.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  return null;
}
