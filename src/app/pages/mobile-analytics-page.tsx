import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Activity, AlertTriangle, CheckCircle2, Trash2, Calendar, Clock } from "lucide-react";
import { getScans, getStatistics, deleteScan, clearAllScans } from "../utils/storage";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export function MobileAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<"stats" | "history">("stats");
  const [scans, setScans] = useState(getScans());
  const stats = getStatistics();

  const handleDeleteScan = (id: string) => {
    deleteScan(id);
    setScans(getScans());
    toast.success("Scan deleted");
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete all scans?")) {
      clearAllScans();
      setScans([]);
      toast.success("All scans cleared");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen p-4 pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-1">Analytics</h1>
        <p className="text-sm text-slate-400">View your scan statistics and history</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6 p-1 rounded-xl bg-slate-800/50 border border-emerald-500/10">
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "stats"
              ? "bg-emerald-500/10 text-emerald-400"
              : "text-slate-400"
          }`}
        >
          Statistics
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "history"
              ? "bg-emerald-500/10 text-emerald-400"
              : "text-slate-400"
          }`}
        >
          History ({scans.length})
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "stats" ? (
          <motion.div
            key="stats"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {/* Overview Cards */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20">
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-400">Total Scans</span>
                </div>
                <div className="text-2xl text-emerald-400">{stats.totalScans}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-400">Healthy</span>
                </div>
                <div className="text-2xl text-emerald-400">{stats.healthyCount}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 rounded-xl bg-slate-800/50 border border-yellow-500/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-yellow-500/20">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span className="text-xs text-slate-400">Biotic</span>
                </div>
                <div className="text-2xl text-yellow-400">{stats.bioticCount}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-xl bg-slate-800/50 border border-red-500/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-red-500/20">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-xs text-slate-400">Abiotic</span>
                </div>
                <div className="text-2xl text-red-400">{stats.abioticCount}</div>
              </motion.div>
            </div>

            {/* Detection Rate Chart */}
            {stats.totalScans > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm"
              >
                <h3 className="text-sm text-slate-300 mb-4">Detection Distribution</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-400">Healthy</span>
                      <span className="text-emerald-400">
                        {((stats.healthyCount / stats.totalScans) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 to-lime-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.healthyCount / stats.totalScans) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-400">Biotic Stress</span>
                      <span className="text-yellow-400">
                        {((stats.bioticCount / stats.totalScans) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.bioticCount / stats.totalScans) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-400">Abiotic Stress</span>
                      <span className="text-red-400">
                        {((stats.abioticCount / stats.totalScans) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.abioticCount / stats.totalScans) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {stats.totalScans === 0 && (
              <div className="p-8 rounded-xl bg-slate-800/30 border border-emerald-500/10 text-center">
                <Activity className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-400">No scans yet</p>
                <p className="text-xs text-slate-500 mt-1">Run your first analysis to see statistics</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {scans.length > 0 && (
              <div className="flex justify-end mb-2">
                <Button
                  onClick={handleClearAll}
                  size="sm"
                  variant="ghost"
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Clear All
                </Button>
              </div>
            )}

            {scans.length === 0 ? (
              <div className="p-8 rounded-xl bg-slate-800/30 border border-emerald-500/10 text-center">
                <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-400">No scan history</p>
                <p className="text-xs text-slate-500 mt-1">Your scan history will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {scans.map((scan, index) => (
                  <motion.div
                    key={scan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/10 backdrop-blur-sm"
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                        <img
                          src={scan.imageData}
                          alt="Scan"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-sm font-medium truncate">{scan.cropName}</h4>
                          <button
                            onClick={() => handleDeleteScan(scan.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs ${
                              scan.result.stress_type === "Healthy"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : scan.result.stress_type === "Biotic"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {scan.result.stress_type === "Healthy" && <CheckCircle2 className="w-3 h-3" />}
                            {scan.result.stress_type !== "Healthy" && <AlertTriangle className="w-3 h-3" />}
                            {scan.result.stress_type}
                          </div>
                          
                          {scan.result.disease_name && (
                            <span className="text-xs text-slate-400 truncate">
                              {scan.result.disease_name}
                            </span>
                          )}
                          {scan.result.stress_cause && (
                            <span className="text-xs text-slate-400 truncate">
                              {scan.result.stress_cause}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(scan.timestamp)}
                          </span>
                          <span>{(scan.result.confidence * 100).toFixed(0)}% confidence</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
