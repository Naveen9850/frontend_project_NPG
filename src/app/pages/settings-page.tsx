import { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Layers, Zap, Bell, Database, Shield, Save } from "lucide-react";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";

export function SettingsPage() {
  const [settings, setSettings] = useState({
    featureExtractor: "ResNet-101",
    attentionHeads: 8,
    fusionStrategy: "Late Fusion",
    pollutionAware: true,
    autoScan: false,
    notifications: true,
    dataRetention: 90,
    confidenceThreshold: 75,
  });

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl mb-2">Advanced Settings</h1>
        <p className="text-slate-400">Configure AI model parameters and system preferences</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Settings Panels */}
        <div className="lg:col-span-2 space-y-6">
          {/* Model Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-lime-500/20">
                <Cpu className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl">Model Configuration</h3>
                <p className="text-sm text-slate-400">Deep learning architecture settings</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-emerald-400 mb-3 block">Feature Extractor</Label>
                <Select 
                  value={settings.featureExtractor} 
                  onValueChange={(value) => setSettings({...settings, featureExtractor: value})}
                >
                  <SelectTrigger className="bg-slate-900/50 border-emerald-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ResNet-50">ResNet-50</SelectItem>
                    <SelectItem value="ResNet-101">ResNet-101 (Recommended)</SelectItem>
                    <SelectItem value="EfficientNet-B7">EfficientNet-B7</SelectItem>
                    <SelectItem value="Vision Transformer">Vision Transformer</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-2">
                  Backbone architecture for RGB and multispectral feature extraction
                </p>
              </div>

              <div>
                <Label className="text-emerald-400 mb-3 block">Attention Heads</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[settings.attentionHeads]}
                    onValueChange={([value]) => setSettings({...settings, attentionHeads: value})}
                    min={4}
                    max={16}
                    step={2}
                    className="flex-1 [&_[role=slider]]:bg-emerald-500"
                  />
                  <div className="w-16 text-center p-2 rounded-lg bg-slate-900/50 border border-emerald-500/20">
                    {settings.attentionHeads}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Number of attention heads in multi-head attention mechanism
                </p>
              </div>

              <div>
                <Label className="text-emerald-400 mb-3 block">Fusion Strategy</Label>
                <Select 
                  value={settings.fusionStrategy} 
                  onValueChange={(value) => setSettings({...settings, fusionStrategy: value})}
                >
                  <SelectTrigger className="bg-slate-900/50 border-emerald-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Early Fusion">Early Fusion</SelectItem>
                    <SelectItem value="Late Fusion">Late Fusion (Recommended)</SelectItem>
                    <SelectItem value="Hybrid Fusion">Hybrid Fusion</SelectItem>
                    <SelectItem value="Attention Fusion">Attention Fusion</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-2">
                  How multimodal data sources are combined in the network
                </p>
              </div>

              <div>
                <Label className="text-emerald-400 mb-3 block">Confidence Threshold</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[settings.confidenceThreshold]}
                    onValueChange={([value]) => setSettings({...settings, confidenceThreshold: value})}
                    min={50}
                    max={95}
                    step={5}
                    className="flex-1 [&_[role=slider]]:bg-emerald-500"
                  />
                  <div className="w-16 text-center p-2 rounded-lg bg-slate-900/50 border border-emerald-500/20">
                    {settings.confidenceThreshold}%
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Minimum confidence score required for detection results
                </p>
              </div>
            </div>
          </motion.div>

          {/* Inference Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl">Inference Settings</h3>
                <p className="text-sm text-slate-400">Runtime and detection behavior</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50">
                <div className="flex-1">
                  <Label className="text-emerald-400">Pollution-Aware Inference</Label>
                  <p className="text-xs text-slate-500 mt-1">
                    Include air quality parameters in stress detection
                  </p>
                </div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Switch
                    checked={settings.pollutionAware}
                    onCheckedChange={(checked) => setSettings({...settings, pollutionAware: checked})}
                  />
                </motion.div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50">
                <div className="flex-1">
                  <Label className="text-emerald-400">Automated Scanning</Label>
                  <p className="text-xs text-slate-500 mt-1">
                    Automatically scan uploaded images
                  </p>
                </div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Switch
                    checked={settings.autoScan}
                    onCheckedChange={(checked) => setSettings({...settings, autoScan: checked})}
                  />
                </motion.div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50">
                <div className="flex-1">
                  <Label className="text-emerald-400">Push Notifications</Label>
                  <p className="text-xs text-slate-500 mt-1">
                    Alert for critical stress detections
                  </p>
                </div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl">Data Management</h3>
                <p className="text-sm text-slate-400">Storage and retention policies</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-emerald-400 mb-3 block">Data Retention Period</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[settings.dataRetention]}
                    onValueChange={([value]) => setSettings({...settings, dataRetention: value})}
                    min={30}
                    max={365}
                    step={30}
                    className="flex-1 [&_[role=slider]]:bg-emerald-500"
                  />
                  <div className="w-24 text-center p-2 rounded-lg bg-slate-900/50 border border-emerald-500/20">
                    {settings.dataRetention} days
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  How long to keep scan history and analytics data
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/10">
                  <div className="text-sm text-slate-400 mb-1">Storage Used</div>
                  <div className="text-2xl mb-2">2.4 GB</div>
                  <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <div className="h-full w-[24%] bg-emerald-500" />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">24% of 10 GB</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/10">
                  <div className="text-sm text-slate-400 mb-1">Total Scans</div>
                  <div className="text-2xl mb-2">2,847</div>
                  <div className="text-xs text-emerald-400 mt-1">↑ 12.5% this month</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-900 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 py-6 text-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Configuration
            </Button>
          </motion.div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg">System Status</h3>
            </div>

            <div className="space-y-4">
              {[
                { label: "API Status", value: "Online", status: "success" },
                { label: "Model Version", value: "v3.2.1", status: "success" },
                { label: "GPU Utilization", value: "34%", status: "success" },
                { label: "Uptime", value: "99.8%", status: "success" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.value}</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Architecture Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-lime-500/10 border border-emerald-500/20 backdrop-blur-sm shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg">Architecture</h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-slate-300">Multimodal Fusion Network</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-lime-500" />
                <span className="text-slate-300">Attention-Based Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-slate-300">Pollution-Aware Inference</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-slate-300">Real-time Processing</span>
              </div>
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg">Performance</h3>
            </div>

            <div className="space-y-4">
              {[
                { metric: "Accuracy", value: "94.8%" },
                { metric: "Precision", value: "92.3%" },
                { metric: "Recall", value: "91.7%" },
                { metric: "F1 Score", value: "92.0%" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">{item.metric}</span>
                    <span className="text-emerald-400">{item.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-lime-500"
                      initial={{ width: 0 }}
                      animate={{ width: item.value }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
}