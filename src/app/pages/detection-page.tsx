import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Loader2, CheckCircle2, AlertTriangle, XCircle, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Input } from "../components/ui/input";
import { DiseaseStressDisplay } from "../components/detection/disease-stress-display";
import { PredictionResult, DetectionDisplayResult } from "../types/detection";

const blackSoilCrops = [
  "Cotton", "Soybean", "Sorghum", "Pigeon Pea", 
  "Groundnut", "Sunflower", "Maize", "Chili"
];

const growthStages = ["Seedling", "Vegetative", "Flowering", "Maturity"];

// Disease examples for biotic stress
const bioticDiseases = [
  "Cotton Leaf Spot", "Powdery Mildew", "Bacterial Blight", 
  "Fusarium Wilt", "Root Rot", "Anthracnose"
];

// Stress causes for abiotic stress
const abioticCauses = [
  "Drought", "Heat Stress", "Waterlogging", 
  "Nutrient Deficiency", "Salinity", "Cold Stress"
];

export function DetectionPage() {
  const [cropCategory, setCropCategory] = useState("blackSoil");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [customCropName, setCustomCropName] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionDisplayResult | null>(null);
  
  const [pollution, setPollution] = useState({
    pm25: 45,
    pm10: 80,
    no2: 35,
    so2: 20,
    o3: 60,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate backend response with new format
    const stressTypes: Array<"Healthy" | "Biotic" | "Abiotic"> = ["Healthy", "Biotic", "Abiotic"];
    const randomStressType = stressTypes[Math.floor(Math.random() * stressTypes.length)];
    
    let mockApiResponse: PredictionResult;
    
    if (randomStressType === "Healthy") {
      mockApiResponse = {
        stress_type: "Healthy",
        disease_name: null,
        stress_cause: null,
        severity: null,
        confidence: 0.92 + Math.random() * 0.06,
        recommendation: "Continue current agricultural practices. Monitor regularly for any changes.",
      };
    } else if (randomStressType === "Biotic") {
      mockApiResponse = {
        stress_type: "Biotic",
        disease_name: bioticDiseases[Math.floor(Math.random() * bioticDiseases.length)],
        stress_cause: null,
        severity: Math.random() > 0.5 ? "Moderate" : "Severe",
        confidence: 0.85 + Math.random() * 0.1,
        recommendation: "Apply targeted fungicide treatment. Monitor humidity levels and ensure proper air circulation. Consider removing severely infected plant parts.",
      };
    } else {
      mockApiResponse = {
        stress_type: "Abiotic",
        disease_name: null,
        stress_cause: abioticCauses[Math.floor(Math.random() * abioticCauses.length)],
        severity: Math.random() > 0.5 ? "Moderate" : "Severe",
        confidence: 0.82 + Math.random() * 0.12,
        recommendation: "Adjust irrigation schedule and soil nutrient management. Consider implementing drip irrigation for water efficiency. Monitor soil moisture levels regularly.",
      };
    }
    
    // Add additional display properties
    const displayResult: DetectionDisplayResult = {
      ...mockApiResponse,
      icon: randomStressType === "Healthy" ? CheckCircle2 : randomStressType === "Biotic" ? AlertTriangle : XCircle,
      color: randomStressType === "Healthy" ? "emerald" : randomStressType === "Biotic" ? "yellow" : "red",
      pollutionImpact: pollution.pm25 > 50 ? "High" : pollution.pm25 > 30 ? "Moderate" : "Low",
      analysisType: cropCategory === "other" ? "General Crop Stress Analysis" : "Black Soil Crop Analysis",
    };
    
    setResult(displayResult);
    setIsAnalyzing(false);
  };

  const canAnalyze = imagePreview && selectedStage && 
    (cropCategory === "blackSoil" ? selectedCrop : customCropName.trim());

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl mb-2">Crop Stress Detection</h1>
          <p className="text-slate-400">Upload crop imagery and configure parameters for AI-powered analysis</p>
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
              <Label className="text-emerald-400 mb-4 block text-lg">Crop Image Upload</Label>
              
              <div className="relative">
                <input
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
                          Click or drag to upload RGB image
                        </p>
                        <p className="text-sm text-slate-500">Supports JPG, PNG formats</p>
                      </div>
                    )}
                  </motion.div>
                </label>
              </div>
            </div>

            {/* Crop Selection Card */}
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-2xl space-y-6">
              <Label className="text-emerald-400 text-lg block">Crop Selection</Label>
              
              {/* Crop Category */}
              <div>
                <Label className="text-slate-300 mb-3 block">Crop Category</Label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCropCategory("blackSoil");
                      setCustomCropName("");
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      cropCategory === "blackSoil"
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <div className="text-sm">Black Soil Crops</div>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCropCategory("other");
                      setSelectedCrop("");
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      cropCategory === "other"
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <div className="text-sm">Other Crops</div>
                  </motion.button>
                </div>
              </div>

              {/* Crop Type Selection */}
              {cropCategory === "blackSoil" ? (
                <div>
                  <Label className="text-slate-300 mb-3 block">Select Crop</Label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger className="bg-slate-900/50 border-emerald-500/30 h-12">
                      <SelectValue placeholder="Choose a black soil crop" />
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
                  <Label className="text-slate-300 mb-3 block">Enter Crop Name</Label>
                  <Input
                    value={customCropName}
                    onChange={(e) => setCustomCropName(e.target.value)}
                    placeholder="Enter custom crop name"
                    className="bg-slate-900/50 border-emerald-500/30 h-12"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Results will be labeled as "General Crop Stress Analysis"
                  </p>
                </div>
              )}

              {/* Growth Stage */}
              <div>
                <Label className="text-slate-300 mb-3 block">Growth Stage</Label>
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="bg-slate-900/50 border-emerald-500/30 h-12">
                    <SelectValue placeholder="Select growth stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {growthStages.map(stage => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pollution Parameters Card */}
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-2xl space-y-6">
              <Label className="text-emerald-400 text-lg">Air Pollution Parameters</Label>
              
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
                    onValueChange={([value]) => setPollution({ ...pollution, [param.key]: value })}
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
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Run AI Analysis
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
                      <h3 className="text-2xl mb-3">Processing Analysis</h3>
                      <p className="text-slate-400 mb-8">Running multimodal AI detection...</p>
                      
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

                {result && !isAnalyzing && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    {/* Main Result Card */}
                    <div className="p-10 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-2xl space-y-6">
                      {/* Analysis Type Badge */}
                      <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
                          <Sparkles className="w-4 h-4" />
                          {result.analysisType}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className={`p-5 rounded-xl bg-gradient-to-br ${
                            result.color === "emerald"
                              ? "from-emerald-500/20 to-lime-500/20"
                              : result.color === "yellow"
                              ? "from-yellow-500/20 to-orange-500/20"
                              : "from-red-500/20 to-pink-500/20"
                          }`}
                        >
                          <result.icon className={`w-10 h-10 ${
                            result.color === "emerald" ? "text-emerald-400" :
                            result.color === "yellow" ? "text-yellow-400" :
                            "text-red-400"
                          }`} />
                        </motion.div>
                        <div>
                          <h3 className="text-3xl mb-1">{result.stress_type} Status</h3>
                          <p className="text-slate-400">Detection Complete</p>
                        </div>
                      </div>

                      {/* Disease/Stress Cause Display - NEW */}
                      <DiseaseStressDisplay
                        stressType={result.stress_type}
                        diseaseName={result.disease_name}
                        stressCause={result.stress_cause}
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
                            className={`${
                              result.color === "emerald" ? "text-emerald-500" :
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
                            <div className="text-xs text-slate-400">Confidence</div>
                          </div>
                        </div>
                      </div>

                      {result.severity && (
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-slate-400">Severity Level</span>
                            <span className={`text-sm font-medium ${
                              result.severity === "Severe" ? "text-red-400" :
                              result.severity === "Moderate" ? "text-yellow-400" :
                              "text-emerald-400"
                            }`}>{result.severity}</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-slate-700 overflow-hidden">
                            <motion.div
                              className={`h-full ${
                                result.severity === "Severe" 
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
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                        result.pollutionImpact === "High"
                          ? "bg-red-500/20 text-red-400"
                          : result.pollutionImpact === "Moderate"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}>
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">Pollution Impact: {result.pollutionImpact}</span>
                      </div>

                      {/* Recommendation */}
                      {result.recommendation && (
                        <div className="p-5 rounded-xl bg-slate-900/50 border border-emerald-500/10">
                          <h4 className="text-sm text-emerald-400 mb-2">AI Recommendation</h4>
                          <p className="text-sm text-slate-300 leading-relaxed">{result.recommendation}</p>
                        </div>
                      )}
                    </div>

                    {/* Additional Insights */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Processing Time", value: "1.8s" },
                        { label: "Model Version", value: "v3.2" },
                        { label: "Data Sources", value: "5" },
                        { label: "Features Analyzed", value: "847" },
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

                {!result && !isAnalyzing && (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-16 rounded-2xl bg-slate-800/30 border border-emerald-500/10 backdrop-blur-sm text-center shadow-2xl"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-emerald-500/50" />
                    </div>
                    <h3 className="text-2xl mb-3 text-slate-400">Ready for Analysis</h3>
                    <p className="text-sm text-slate-500">
                      Configure parameters and run detection to see results
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