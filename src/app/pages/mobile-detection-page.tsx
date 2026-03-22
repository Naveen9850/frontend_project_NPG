import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Upload, Loader2, CheckCircle2, AlertTriangle, XCircle,
  Sparkles, TrendingUp, Save, RotateCcw, History, Settings2, MapPin
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Input } from "../components/ui/input";
import { DiseaseStressDisplay } from "../components/detection/disease-stress-display";
import { DetectionDisplayResult } from "../types/detection";
import {
  saveConfiguration,
  getConfigurations,
  saveScan,
  SavedConfiguration,
  deleteConfiguration
} from "../utils/storage";
import { toast } from "sonner";
import { predictCropStress } from "../services/api";
import type { ApiPredictionResult } from "../services/api";
import {
  getStates,
  getDistrictsByState,
  getPollutionForDistrict,
} from "../data/district-pollution";

const blackSoilCrops = [
  "Cotton", "Soybean", "Sorghum", "Pigeon Pea",
  "Groundnut", "Sunflower", "Maize", "Chili"
];

const growthStages = ["Seedling", "Vegetative", "Flowering", "Maturity"];

export function MobileDetectionPage() {
  const [cropCategory, setCropCategory] = useState("blackSoil");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [customCropName, setCustomCropName] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionDisplayResult | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showSavedConfigs, setShowSavedConfigs] = useState(false);
  const [configName, setConfigName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [pollutionSource, setPollutionSource] = useState<"manual" | "district">("manual");

  const [pollution, setPollution] = useState({
    pm25: 45,
    pm10: 80,
    no2: 35,
    so2: 20,
    o3: 60,
  });

  // ── Location-based pollution auto-fill ───────────────────────────────────────
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    const data = getPollutionForDistrict(district);
    if (data) {
      setPollution({
        pm25: data.pm25,
        pm10: data.pm10,
        no2: data.no2,
        so2: data.so2,
        o3: data.o3,
      });
      setPollutionSource("district");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const cropName =
        cropCategory === "blackSoil" ? selectedCrop : customCropName.trim();

      const apiResult: ApiPredictionResult = await predictCropStress({
        imageFile,
        cropType: cropName,
        growthStage: selectedStage,
        pollution,
      });

      const displayResult: DetectionDisplayResult = {
        stress_type: apiResult.stress_type,
        disease_name: apiResult.disease_name,
        stress_cause: apiResult.stress_cause,
        severity: apiResult.severity,
        confidence: apiResult.confidence,
        recommendation: apiResult.recommendation,
        possible_diseases: apiResult.possible_diseases,
        pollutionImpact:
          pollution.pm25 > 50
            ? "High"
            : pollution.pm25 > 30
              ? "Moderate"
              : "Low",
        analysisType:
          cropCategory === "other"
            ? "General Crop Stress Analysis"
            : "Black Soil Crop Analysis",
        icon:
          apiResult.stress_type === "Healthy"
            ? CheckCircle2
            : apiResult.stress_type === "Biotic"
              ? AlertTriangle
              : XCircle,
        color:
          apiResult.stress_type === "Healthy"
            ? "emerald"
            : apiResult.stress_type === "Biotic"
              ? "yellow"
              : "red",
      };

      setResult(displayResult);

      // Auto-save scan
      if (imagePreview) {
        saveScan({
          cropName: cropCategory === "blackSoil" ? selectedCrop : customCropName,
          cropCategory,
          growthStage: selectedStage,
          imageData: imagePreview,
          result: displayResult,
          pollution,
        });
        toast.success("Scan saved to history");
      }
    } catch (err: any) {
      console.error("Prediction error:", err);
      toast.error(
        err.message || "Failed to connect to the AI backend. Is the server running?"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveConfiguration = () => {
    if (!configName.trim()) {
      toast.error("Please enter a configuration name");
      return;
    }

    saveConfiguration({
      name: configName,
      cropCategory,
      selectedCrop,
      customCropName,
      growthStage: selectedStage,
      pollution,
    });

    toast.success("Configuration saved successfully");
    setConfigName("");
    setShowConfigModal(false);
  };

  const handleLoadConfiguration = (config: SavedConfiguration) => {
    setCropCategory(config.cropCategory);
    setSelectedCrop(config.selectedCrop);
    setCustomCropName(config.customCropName);
    setSelectedStage(config.growthStage);
    setPollution(config.pollution);
    setShowSavedConfigs(false);
    toast.success(`Loaded configuration: ${config.name}`);
  };

  const handleNewScan = () => {
    setImagePreview(null);
    setResult(null);
    setCropCategory("blackSoil");
    setSelectedCrop("");
    setCustomCropName("");
    setSelectedStage("");
    toast.success("Ready for new scan");
  };

  const savedConfigs = getConfigurations();
  const canAnalyze = imageFile && selectedStage &&
    (cropCategory === "blackSoil" ? selectedCrop : customCropName.trim());

  return (
    <div className="min-h-screen p-4 pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-1">Crop Detection</h1>
        <p className="text-sm text-slate-400">AI-powered stress analysis</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-6">
        <Button
          onClick={() => setShowSavedConfigs(true)}
          variant="outline"
          size="sm"
          className="flex-1 border-emerald-500/30 text-emerald-400"
        >
          <Settings2 className="w-4 h-4 mr-1.5" />
          Load Config
        </Button>

        <Button
          onClick={handleNewScan}
          variant="outline"
          size="sm"
          className="flex-1 border-slate-600 text-slate-400"
        >
          <RotateCcw className="w-4 h-4 mr-1.5" />
          New Scan
        </Button>
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <Label className="text-emerald-400 mb-3 block">Crop Image</Label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="mobile-image-upload"
        />
        <label htmlFor="mobile-image-upload">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="relative h-48 rounded-xl border-2 border-dashed border-emerald-500/30 bg-slate-900/50 flex items-center justify-center overflow-hidden active:border-emerald-500/50 transition-all"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <Upload className="w-12 h-12 text-emerald-500/50 mx-auto mb-3" />
                <p className="text-sm text-slate-300 mb-1">Tap to upload image</p>
                <p className="text-xs text-slate-500">JPG, PNG formats</p>
              </div>
            )}
          </motion.div>
        </label>
      </div>

      {/* Crop Selection */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm mb-6 space-y-4">
        <Label className="text-emerald-400">Crop Selection</Label>

        <div>
          <Label className="text-sm text-slate-300 mb-2 block">Category</Label>
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setCropCategory("blackSoil");
                setCustomCropName("");
              }}
              className={`p-3 rounded-lg border-2 transition-all ${cropCategory === "blackSoil"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-slate-700 bg-slate-900/50 text-slate-400"
                }`}
            >
              <div className="text-xs">Black Soil</div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setCropCategory("other");
                setSelectedCrop("");
              }}
              className={`p-3 rounded-lg border-2 transition-all ${cropCategory === "other"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-slate-700 bg-slate-900/50 text-slate-400"
                }`}
            >
              <div className="text-xs">Other Crops</div>
            </motion.button>
          </div>
        </div>

        {cropCategory === "blackSoil" ? (
          <div>
            <Label className="text-sm text-slate-300 mb-2 block">Crop Type</Label>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="bg-slate-900/50 border-emerald-500/30">
                <SelectValue placeholder="Choose crop" />
              </SelectTrigger>
              <SelectContent>
                {blackSoilCrops.map(crop => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div>
            <Label className="text-sm text-slate-300 mb-2 block">Crop Name</Label>
            <Input
              value={customCropName}
              onChange={(e) => setCustomCropName(e.target.value)}
              placeholder="Enter crop name"
              className="bg-slate-900/50 border-emerald-500/30"
            />
          </div>
        )}

        <div>
          <Label className="text-sm text-slate-300 mb-2 block">Growth Stage</Label>
          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="bg-slate-900/50 border-emerald-500/30">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {growthStages.map(stage => (
                <SelectItem key={stage} value={stage}>{stage}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Location (State/District) Selection */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm mb-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20">
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <Label className="text-emerald-400">Location</Label>
            <p className="text-[10px] text-slate-500">Auto-fills air quality values</p>
          </div>
        </div>

        <div>
          <Label className="text-sm text-slate-300 mb-2 block">State</Label>
          <Select value={selectedState} onValueChange={handleStateChange}>
            <SelectTrigger className="bg-slate-900/50 border-emerald-500/30">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {getStates().map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedState && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <Label className="text-sm text-slate-300 mb-2 block">District</Label>
            <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
              <SelectTrigger className="bg-slate-900/50 border-emerald-500/30">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {getDistrictsByState(selectedState).map((d) => (
                  <SelectItem key={d.district} value={d.district}>
                    {d.district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        )}

        {pollutionSource === "district" && selectedDistrict && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[10px] text-emerald-300">
              Values auto-filled for <strong>{selectedDistrict}</strong>, {selectedState}
            </span>
          </motion.div>
        )}
      </div>

      {/* Pollution Parameters */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-emerald-400">Pollution Parameters</Label>
          <div className="flex items-center gap-2">
            {pollutionSource === "district" && (
              <span className="text-[10px] text-emerald-500/60 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                {selectedDistrict}
              </span>
            )}
            <Button
              onClick={() => setShowConfigModal(true)}
              size="sm"
              variant="ghost"
              className="text-xs text-slate-400"
            >
              <Save className="w-3.5 h-3.5 mr-1" />
              Save Config
            </Button>
          </div>
        </div>

        {[
          { key: "pm25", label: "PM2.5", unit: "μg/m³", max: 150 },
          { key: "pm10", label: "PM10", unit: "μg/m³", max: 200 },
          { key: "no2", label: "NO₂", unit: "ppb", max: 100 },
          { key: "so2", label: "SO₂", unit: "ppb", max: 75 },
          { key: "o3", label: "O₃", unit: "ppb", max: 120 },
        ].map(param => (
          <div key={param.key}>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-slate-300">{param.label}</span>
              <span className="text-xs text-emerald-400 font-medium">
                {pollution[param.key as keyof typeof pollution]} {param.unit}
              </span>
            </div>
            <Slider
              value={[pollution[param.key as keyof typeof pollution]]}
              onValueChange={([value]) => {
                setPollution({ ...pollution, [param.key]: value });
                setPollutionSource("manual");
              }}
              max={param.max}
              step={1}
              className="[&_[role=slider]]:bg-emerald-500 [&_[role=slider]]:border-emerald-400"
            />
          </div>
        ))}
      </div>

      {/* Run Analysis Button */}
      <Button
        onClick={handleAnalysis}
        disabled={!canAnalyze || isAnalyzing}
        size="lg"
        className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-900 hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 disabled:opacity-50 mb-6"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Run AI Analysis
          </>
        )}
      </Button>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {isAnalyzing && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-emerald-500/20 border-t-emerald-500"
              />
              <h3 className="text-lg mb-2">Processing</h3>
              <p className="text-sm text-slate-400">Running multimodal AI detection...</p>
            </div>
          </motion.div>
        )}

        {result && !isAnalyzing && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            {/* Main Result Card */}
            <div className="p-6 rounded-xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                {result.analysisType}
              </div>

              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className={`p-3 rounded-xl bg-gradient-to-br ${result.color === "emerald"
                    ? "from-emerald-500/20 to-lime-500/20"
                    : result.color === "yellow"
                      ? "from-yellow-500/20 to-orange-500/20"
                      : "from-red-500/20 to-pink-500/20"
                    }`}
                >
                  <result.icon className={`w-8 h-8 ${result.color === "emerald" ? "text-emerald-400" :
                    result.color === "yellow" ? "text-yellow-400" :
                      "text-red-400"
                    }`} />
                </motion.div>
                <div>
                  <h3 className="text-xl mb-0.5">{result.stress_type} Status</h3>
                  <p className="text-xs text-slate-400">Detection Complete</p>
                </div>
              </div>

              <DiseaseStressDisplay
                stressType={result.stress_type}
                diseaseName={result.disease_name}
                stressCause={result.stress_cause}
              />

              {/* Confidence */}
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-700"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className={`${result.color === "emerald" ? "text-emerald-500" :
                      result.color === "yellow" ? "text-yellow-500" :
                        "text-red-500"
                      }`}
                    initial={{ strokeDasharray: "0 352" }}
                    animate={{ strokeDasharray: `${(result.confidence * 100) / 100 * 352} 352` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-0.5">{(result.confidence * 100).toFixed(1)}%</div>
                    <div className="text-xs text-slate-400">Confidence</div>
                  </div>
                </div>
              </div>

              {result.severity && (
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-slate-400">Severity</span>
                    <span className={`text-xs font-medium ${result.severity === "Severe" ? "text-red-400" :
                      result.severity === "Moderate" ? "text-yellow-400" :
                        "text-emerald-400"
                      }`}>{result.severity}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                    <motion.div
                      className={`h-full ${result.severity === "Severe"
                        ? "bg-gradient-to-r from-red-500 to-red-600"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500"
                        }`}
                      initial={{ width: 0 }}
                      animate={{ width: result.severity === "Severe" ? "85%" : "55%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${result.pollutionImpact === "High"
                ? "bg-red-500/20 text-red-400"
                : result.pollutionImpact === "Moderate"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-emerald-500/20 text-emerald-400"
                }`}>
                <TrendingUp className="w-3.5 h-3.5" />
                Pollution: {result.pollutionImpact}
              </div>

              {result.recommendation && (
                <div className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/10">
                  <h4 className="text-xs text-emerald-400 mb-2">AI Recommendation</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{result.recommendation}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Configuration Modal */}
      <AnimatePresence>
        {showConfigModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center p-4"
            onClick={() => setShowConfigModal(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-t-2xl bg-slate-800 border-t border-emerald-500/20"
            >
              <h3 className="text-lg mb-4">Save Configuration</h3>
              <Input
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                placeholder="Configuration name"
                className="mb-4 bg-slate-900/50 border-emerald-500/30"
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowConfigModal(false)}
                  variant="outline"
                  className="flex-1 border-slate-600"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveConfiguration}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-900"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Configurations Modal */}
      <AnimatePresence>
        {showSavedConfigs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center"
            onClick={() => setShowSavedConfigs(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-h-[70vh] overflow-y-auto p-6 rounded-t-2xl bg-slate-800 border-t border-emerald-500/20"
            >
              <h3 className="text-lg mb-4">Saved Configurations</h3>
              {savedConfigs.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">
                  No saved configurations yet
                </p>
              ) : (
                <div className="space-y-2">
                  {savedConfigs.map((config) => (
                    <div
                      key={config.id}
                      className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{config.name}</h4>
                        <button
                          onClick={() => deleteConfiguration(config.id)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mb-3">
                        {config.cropCategory === "blackSoil" ? config.selectedCrop : config.customCropName} • {config.growthStage}
                      </p>
                      <Button
                        onClick={() => handleLoadConfiguration(config)}
                        size="sm"
                        className="w-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      >
                        Load Configuration
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
