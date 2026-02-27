import { useState } from "react";
import { motion } from "motion/react";
import { Shield, Lock, Bell, Save, Trash2, Database, Info, Settings } from "lucide-react";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import { getAppSettings, updateAppSettings, clearAllScans, getStatistics } from "../utils/storage";
import { toast } from "sonner";

export function MobileSettingsPage() {
  const [settings, setSettings] = useState(getAppSettings());
  const stats = getStatistics();

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    updateAppSettings(newSettings);
    toast.success("Setting updated");
  };

  const handleClearAllData = () => {
    if (confirm("This will delete all scans and configurations. Are you sure?")) {
      clearAllScans();
      localStorage.removeItem("crop_configurations");
      toast.success("All data cleared");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="min-h-screen p-4 pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-1">Settings</h1>
        <p className="text-sm text-slate-400">Manage app preferences and security</p>
      </div>

      {/* Security Section */}
      <div className="mb-6">
        <h2 className="text-sm text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Security
        </h2>
        
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Lock className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <Label className="text-sm">App Lock</Label>
                  <p className="text-xs text-slate-400">Require PIN to open app</p>
                </div>
              </div>
              <Switch
                checked={settings.securityEnabled}
                onCheckedChange={(checked) => handleSettingChange("securityEnabled", checked)}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <Label className="text-sm">Biometric Auth</Label>
                  <p className="text-xs text-slate-400">Use fingerprint/face ID</p>
                </div>
              </div>
              <Switch
                checked={settings.biometricEnabled}
                onCheckedChange={(checked) => handleSettingChange("biometricEnabled", checked)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="mb-6">
        <h2 className="text-sm text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Preferences
        </h2>
        
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Bell className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <Label className="text-sm">Notifications</Label>
                  <p className="text-xs text-slate-400">Get alerts and updates</p>
                </div>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Save className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <Label className="text-sm">Auto-Save Scans</Label>
                  <p className="text-xs text-slate-400">Automatically save results</p>
                </div>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Storage Info */}
      <div className="mb-6">
        <h2 className="text-sm text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Database className="w-4 h-4" />
          Storage
        </h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/10 backdrop-blur-sm"
        >
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Scans</span>
              <span className="text-slate-200">{stats.totalScans}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Configurations</span>
              <span className="text-slate-200">{stats.totalConfigurations}</span>
            </div>
            <div className="pt-3 border-t border-slate-700">
              <Button
                onClick={handleClearAllData}
                variant="outline"
                size="sm"
                className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* App Info */}
      <div className="mb-6">
        <h2 className="text-sm text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Info className="w-4 h-4" />
          About
        </h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/10 backdrop-blur-sm"
        >
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">App Version</span>
              <span className="text-slate-200">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Model Version</span>
              <span className="text-slate-200">v3.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Last Updated</span>
              <span className="text-slate-200">Feb 2026</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm"
      >
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <p className="mb-1 font-medium text-emerald-400">Privacy First</p>
            <p className="text-slate-400">
              All your data is stored locally on your device. We don't collect or send any information to external servers. Your crop analysis data remains completely private.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}