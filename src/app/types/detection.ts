export interface PredictionResult {
  stress_type: "Healthy" | "Biotic" | "Abiotic";
  disease_name?: string | null;
  stress_cause?: string | null;
  severity?: string | null;
  confidence: number;
  recommendation?: string | null;
  pollutionImpact?: string;
  analysisType?: string;
}

export interface DetectionDisplayResult extends PredictionResult {
  icon: any;
  color: string;
}
