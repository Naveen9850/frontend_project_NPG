/**
 * API service for communicating with the Crop Stress Detection backend.
 * In production, set VITE_API_URL to your Railway backend URL.
 * Defaults to localhost:8000 for local development.
 */

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:8000";

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface ApiPredictionResult {
  stress_type: "Healthy" | "Biotic" | "Abiotic";
  disease_name: string | null;
  stress_cause: string | null;
  severity: string | null;
  confidence: number;
  recommendation: string | null;
  predicted_class: string;
  processing_time_ms: number;
  possible_diseases: string[] | null;
}

export interface ApiHealthResponse {
  status: string;
  model_loaded: boolean;
  device: string;
  num_classes: number;
  class_names: string[];
}

// ─── Health check ───────────────────────────────────────────────────────────────

export async function checkApiHealth(): Promise<ApiHealthResponse> {
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// ─── Predict ────────────────────────────────────────────────────────────────────

export interface PredictParams {
  imageFile: File;
  cropType: string;
  growthStage: string;
  pollution: {
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    o3: number;
  };
}

export async function predictCropStress(
  params: PredictParams
): Promise<ApiPredictionResult> {
  const formData = new FormData();

  formData.append("image", params.imageFile);
  formData.append("crop_type", params.cropType);
  formData.append("growth_stage", params.growthStage);
  formData.append("pm25", params.pollution.pm25.toString());
  formData.append("pm10", params.pollution.pm10.toString());
  formData.append("no2", params.pollution.no2.toString());
  formData.append("so2", params.pollution.so2.toString());
  formData.append("o3", params.pollution.o3.toString());

  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `Prediction failed (${res.status}): ${errorBody}`
    );
  }

  return res.json();
}
