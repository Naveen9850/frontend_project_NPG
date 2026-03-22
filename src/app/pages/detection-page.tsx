import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Loader2, CheckCircle2, AlertTriangle, XCircle, Sparkles, TrendingUp, MapPin, Wifi, WifiOff, Cpu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Input } from "../components/ui/input";
import { DiseaseStressDisplay } from "../components/detection/disease-stress-display";
import { DetectionDisplayResult } from "../types/detection";
import { predictCropStress, checkApiHealth } from "../services/api";
import type { ApiPredictionResult } from "../services/api";
import { saveScan } from "../utils/storage";
import { toast } from "sonner";
import { useLanguage } from "../../i18n/LanguageContext";
import { translateText } from "../utils/translator";
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

export function DetectionPage() {
  const { t, language } = useLanguage();
  const [cropCategory, setCropCategory] = useState("blackSoil");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [customCropName, setCustomCropName] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionDisplayResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<"unknown" | "online" | "offline">("unknown");
  const [processingTime, setProcessingTime] = useState<number | null>(null);
  const [predictedClass, setPredictedClass] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [pollutionSource, setPollutionSource] = useState<"manual" | "district">("manual");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [translatedRecommendation, setTranslatedRecommendation] = useState<string | null>(null);

  // Translate recommendation when result or language changes
  useEffect(() => {
    if (result?.recommendation && language !== "en") {
      translateText(result.recommendation, language).then(setTranslatedRecommendation);
    } else {
      setTranslatedRecommendation(null);
    }
  }, [result?.recommendation, language]);

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

  // ── Check API health ────────────────────────────────────────────────────────
  const checkBackend = async () => {
    try {
      const health = await checkApiHealth();
      setApiStatus(health.model_loaded ? "online" : "offline");
    } catch {
      setApiStatus("offline");
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

      // Auto-check backend when image is selected
      if (apiStatus === "unknown") {
        checkBackend();
      }
    }
  };

  const handleAnalysis = async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    setResult(null);
    setApiError(null);
    setProcessingTime(null);
    setPredictedClass(null);

    try {
      const cropName =
        cropCategory === "blackSoil" ? selectedCrop : customCropName.trim();

      const apiResult: ApiPredictionResult = await predictCropStress({
        imageFile,
        cropType: cropName,
        growthStage: selectedStage,
        pollution,
      });

      setApiStatus("online");
      setProcessingTime(apiResult.processing_time_ms);
      setPredictedClass(apiResult.predicted_class);

      // Map the API response into the display-friendly format
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

      // Auto-save scan to history
      if (imagePreview) {
        saveScan({
          cropName: cropCategory === "blackSoil" ? selectedCrop : customCropName,
          cropCategory,
          growthStage: selectedStage,
          imageData: imagePreview,
          result: displayResult,
          pollution,
        });
        toast.success(t("detection.scanSaved"));
      }
    } catch (err: any) {
      console.error("Prediction error:", err);
      setApiError(
        err.message || "Failed to connect to the AI backend. Is the server running?"
      );
      setApiStatus("offline");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canAnalyze = imageFile && selectedStage &&
    (cropCategory === "blackSoil" ? selectedCrop : customCropName.trim());

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <h1 className="text-4xl mb-2">{t("detection.pageTitle")}</h1>
            <p className="text-slate-400">{t("detection.pageSubtitle")}</p>
          </div>

          {/* API Status Badge */}
          <motion.button
            onClick={checkBackend}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm transition-all cursor-pointer ${apiStatus === "online"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : apiStatus === "offline"
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-slate-800/50 border-slate-700 text-slate-400"
              }`}
          >
            {apiStatus === "online" ? (
              <Wifi className="w-4 h-4" />
            ) : apiStatus === "offline" ? (
              <WifiOff className="w-4 h-4" />
            ) : (
              <Wifi className="w-4 h-4 opacity-50" />
            )}
            <span className="text-sm">
              {apiStatus === "online"
                ? t("detection.apiModelOnline")
                : apiStatus === "offline"
                  ? t("detection.apiModelOffline")
                  : t("detection.apiModelChecking")}
            </span>
            {apiStatus === "online" && (
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </motion.button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Image Upload Card */}
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-2xl">
              <Label className="text-emerald-400 mb-4 block text-lg">{t("detection.cropImageUpload")}</Label>

              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="block cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative h-72 rounded-xl border-2 border-dashed border-emerald-500/30 bg-slate-900/50 flex items-center justify-center overflow-hidden group transition-all duration-300 hover:border-emerald-500/50"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-6">
                        <Upload className="w-16 h-16 text-emerald-500/50 mx-auto mb-4 group-hover:text-emerald-400 transition-colors" />
                        <p className="text-slate-300 group-hover:text-slate-200 transition-colors text-lg mb-2">
                          {t("detection.dragDrop")}
                        </p>
                        <p className="text-sm text-slate-500">{t("detection.supportedFormats")}</p>
                      </div>
                    )}
                  </motion.div>
                </label>
              </div>
            </div>

            {/* Crop Selection Card */}
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-2xl space-y-6">
              <Label className="text-emerald-400 text-lg block">{t("detection.cropSelection")}</Label>

              {/* Crop Category */}
              <div>
                <Label className="text-slate-300 mb-3 block">{t("detection.cropCategory")}</Label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCropCategory("blackSoil");
                      setCustomCropName("");
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${cropCategory === "blackSoil"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
                      }`}
                  >
                    <div className="text-sm">{t("detection.blackSoilCrops")}</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCropCategory("other");
                      setSelectedCrop("");
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${cropCategory === "other"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
                      }`}
                  >
                    <div className="text-sm">{t("detection.otherCrops")}</div>
                  </motion.button>
                </div>
              </div>

              {/* Crop Type Selection */}
              {cropCategory === "blackSoil" ? (
                <div>
                  <Label className="text-slate-300 mb-3 block">{t("detection.selectCrop")}</Label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger className="bg-slate-900/50 border-emerald-500/30 h-12">
                      <SelectValue placeholder={t("detection.chooseCrop")} />
                    </SelectTrigger>
                    <SelectContent>
                      {blackSoilCrops.map(crop => (
                        <SelectItem key={crop} value={crop}>{t(`cropNames.${crop}`)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <Label className="text-slate-300 mb-3 block">{t("detection.cropName")}</Label>
                  <Input
                    value={customCropName}
                    onChange={(e) => setCustomCropName(e.target.value)}
                    placeholder={t("detection.enterCropName")}
                    className="bg-slate-900/50 border-emerald-500/30 h-12"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    {t("detection.generalAnalysis")}
                  </p>
                </div>
              )}

              {/* Growth Stage */}
              <div>
                <Label className="text-slate-300 mb-3 block">{t("detection.growthStage")}</Label>
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="bg-slate-900/50 border-emerald-500/30 h-12">
                    <SelectValue placeholder={t("detection.selectStage")} />
                  </SelectTrigger>
                  <SelectContent>
                    {growthStages.map(stage => (
                      <SelectItem key={stage} value={stage}>{t(`growthStages.${stage}`)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location (State/District) Selection Card */}
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-2xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <Label className="text-emerald-400 text-lg block">{t("detection.location")}</Label>
                  <p className="text-xs text-slate-500">{t("detection.autoFilled")}</p>
                </div>
              </div>

              {/* State Selector */}
              <div>
                <Label className="text-slate-300 mb-3 block">{t("detection.state")}</Label>
                <Select value={selectedState} onValueChange={handleStateChange}>
                  <SelectTrigger className="bg-slate-900/50 border-emerald-500/30 h-12">
                    <SelectValue placeholder={t("detection.selectState")} />
                  </SelectTrigger>
                  <SelectContent>
                    {getStates().map((state) => (
                      <SelectItem key={state} value={state}>
                        {t(`states.${state}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* District Selector (cascaded from state) */}
              {selectedState && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <Label className="text-slate-300 mb-3 block">{t("detection.district")}</Label>
                  <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
                    <SelectTrigger className="bg-slate-900/50 border-emerald-500/30 h-12">
                      <SelectValue placeholder={t("detection.selectDistrict")} />
                    </SelectTrigger>
                    <SelectContent>
                      {getDistrictsByState(selectedState).map((d) => (
                        <SelectItem key={d.district} value={d.district}>
                          {t(`districts.${d.district}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}

              {/* Auto-fill confirmation */}
              {pollutionSource === "district" && selectedDistrict && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-emerald-300">
                    Air quality values auto-filled for <strong>{selectedDistrict}</strong>, {selectedState}.
                    You can still adjust manually below.
                  </span>
                </motion.div>
              )}
            </div>

            {/* Pollution Parameters Card */}
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-emerald-400 text-lg">{t("detection.pollutionParams")}</Label>
                {pollutionSource === "district" && (
                  <span className="text-xs text-emerald-500/60 bg-emerald-500/10 px-2 py-1 rounded-md">
                    Auto-filled from {selectedDistrict}
                  </span>
                )}
              </div>

              {[
                { key: "pm25", label: "PM2.5", unit: "μg/m³", max: 150 },
                { key: "pm10", label: "PM10", unit: "μg/m³", max: 200 },
                { key: "no2", label: "NO₂", unit: "ppb", max: 100 },
                { key: "so2", label: "SO₂", unit: "ppb", max: 75 },
                { key: "o3", label: "O₃", unit: "ppb", max: 120 },
              ].map(param => (
                <div key={param.key}>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-slate-300">{param.label}</span>
                    <span className="text-sm text-emerald-400 font-medium">
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
              className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-900 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 py-7 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t("detection.analyzing")}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t("detection.runAnalysis")}
                </>
              )}
            </Button>
          </motion.div>

          {/* Right Panel - Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="sticky top-8">
              <AnimatePresence mode="wait">
                {isAnalyzing && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-10 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-2xl"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 mx-auto mb-8 rounded-full border-4 border-emerald-500/20 border-t-emerald-500"
                      />
                      <h3 className="text-2xl mb-3">{t("detection.processing")}</h3>
                      <p className="text-slate-400 mb-8">{t("detection.runningAI")}</p>

                      <div className="space-y-4">
                        {["Extracting RGB features", "Processing multispectral data", "Analyzing pollution impact", "Computing stress indicators"].map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.5 }}
                            className="flex items-center gap-3 text-sm text-slate-400"
                          >
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            {step}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error */}
                {apiError && !isAnalyzing && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-10 rounded-2xl bg-slate-800/50 border border-red-500/30 backdrop-blur-sm shadow-2xl"
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                        <WifiOff className="w-10 h-10 text-red-400" />
                      </div>
                      <h3 className="text-2xl mb-3 text-red-400">
                        Connection Error
                      </h3>
                      <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
                        {apiError}
                      </p>
                      <div className="p-4 rounded-xl bg-slate-900/50 border border-red-500/10 text-left">
                        <p className="text-xs text-slate-500 mb-2">
                          Make sure the backend is running:
                        </p>
                        <code className="text-xs text-emerald-400 block bg-slate-950/50 p-3 rounded-lg">
                          cd backend && python main.py
                        </code>
                      </div>
                      <Button
                        onClick={handleAnalysis}
                        className="mt-6 bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                      >
                        Retry Analysis
                      </Button>
                    </div>
                  </motion.div>
                )}

                {result && !isAnalyzing && !apiError && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    {/* Main Result Card */}
                    <div className="p-10 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-2xl space-y-6">
                      {/* Analysis Type & Live Badge */}
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
                          <Sparkles className="w-4 h-4" />
                          {result.analysisType}
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {t("detection.liveAIResult")}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className={`p-5 rounded-xl bg-gradient-to-br ${result.color === "emerald"
                            ? "from-emerald-500/20 to-lime-500/20"
                            : result.color === "yellow"
                              ? "from-yellow-500/20 to-orange-500/20"
                              : "from-red-500/20 to-pink-500/20"
                            }`}
                        >
                          <result.icon className={`w-10 h-10 ${result.color === "emerald" ? "text-emerald-400" :
                            result.color === "yellow" ? "text-yellow-400" :
                              "text-red-400"
                            }`} />
                        </motion.div>
                        <div>
                          <h3 className="text-3xl mb-1">
                            {result.stress_type === "Healthy" ? t("detection.healthyStatus") : result.stress_type === "Biotic" ? t("detection.bioticStatus") : t("detection.abioticStatus")}
                          </h3>
                          <p className="text-slate-400">{t("detection.detectionComplete")}</p>
                        </div>
                      </div>

                      {/* Predicted Class */}
                      {predictedClass && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-emerald-500/10 text-sm">
                          <Cpu className="w-4 h-4 text-emerald-400" />
                          <span className="text-slate-400">{t("detection.modelOutput")}:</span>
                          <span className="text-emerald-300 font-medium">{predictedClass}</span>
                        </div>
                      )}

                      {/* Disease/Stress Cause Display */}
                      <DiseaseStressDisplay
                        stressType={result.stress_type}
                        diseaseName={result.disease_name}
                        stressCause={result.stress_cause}
                        possibleDiseases={result.possible_diseases}
                      />

                      {/* Confidence Ring */}
                      <div className="relative w-36 h-36 mx-auto">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="72"
                            cy="72"
                            r="64"
                            stroke="currentColor"
                            strokeWidth="10"
                            fill="none"
                            className="text-slate-700"
                          />
                          <motion.circle
                            cx="72"
                            cy="72"
                            r="64"
                            stroke="currentColor"
                            strokeWidth="10"
                            fill="none"
                            strokeLinecap="round"
                            className={`${result.color === "emerald" ? "text-emerald-500" :
                              result.color === "yellow" ? "text-yellow-500" :
                                "text-red-500"
                              }`}
                            initial={{ strokeDasharray: "0 402" }}
                            animate={{ strokeDasharray: `${(result.confidence * 100) / 100 * 402} 402` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-1">{(result.confidence * 100).toFixed(1)}%</div>
                            <div className="text-xs text-slate-400">{t("detection.confidence")}</div>
                          </div>
                        </div>
                      </div>

                      {result.severity && (
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-slate-400">Severity Level</span>
                            <span className={`text-sm font-medium ${result.severity === "Severe" ? "text-red-400" :
                              result.severity === "Moderate" ? "text-yellow-400" :
                                "text-emerald-400"
                              }`}>{result.severity}</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-slate-700 overflow-hidden">
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

                      {/* Pollution Impact Badge */}
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${result.pollutionImpact === "High"
                        ? "bg-red-500/20 text-red-400"
                        : result.pollutionImpact === "Moderate"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-emerald-500/20 text-emerald-400"
                        }`}>
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">{t("detection.pollutionImpact")}: {result.pollutionImpact}</span>
                      </div>

                      {/* Recommendation */}
                      {result.recommendation && (
                        <div className="p-5 rounded-xl bg-slate-900/50 border border-emerald-500/10">
                          <h4 className="text-sm text-emerald-400 mb-2">{t("detection.aiRecommendation")}</h4>
                          <p className="text-sm text-slate-300 leading-relaxed">{translatedRecommendation || result.recommendation}</p>
                        </div>
                      )}
                    </div>

                    {/* Additional Insights */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: t("detection.processingTime"), value: processingTime ? `${(processingTime / 1000).toFixed(1)}s` : "—" },
                        { label: t("detection.analysisEngine"), value: "ResNet50" },
                        { label: t("detection.modelOutput"), value: predictedClass || "—" },
                        { label: t("detection.confidence"), value: result ? `${(result.confidence * 100).toFixed(1)}%` : "—" },
                      ].map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-5 rounded-xl bg-slate-800/50 border border-emerald-500/10 backdrop-blur-sm"
                        >
                          <div className="text-2xl text-emerald-400 mb-1">{stat.value}</div>
                          <div className="text-xs text-slate-400">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {!result && !isAnalyzing && !apiError && (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-16 rounded-2xl bg-slate-800/30 border border-emerald-500/10 backdrop-blur-sm text-center shadow-2xl"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-emerald-500/50" />
                    </div>
                    <h3 className="text-2xl mb-3 text-slate-400">{t("detection.newScan")}</h3>
                    <p className="text-sm text-slate-500">
                      {t("detection.pageSubtitle")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}