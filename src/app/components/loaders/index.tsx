import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export function LoadingWave() {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-8 rounded-full bg-gradient-to-t from-emerald-500 to-lime-500"
          animate={{
            scaleY: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function SpinnerLoader({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizes[size]} rounded-full border-4 border-emerald-500/20 border-t-emerald-500`}
    />
  );
}

export function PulseLoader() {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full bg-emerald-500"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export function AIProcessingLoader() {
  return (
    <div className="relative w-20 h-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-lime-500"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 rounded-full border-4 border-transparent border-b-emerald-500 border-l-lime-500"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-emerald-400" />
      </div>
    </div>
  );
}

export function SkeletonLoader({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`bg-slate-700/50 rounded ${className}`}
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
