// Local storage utility for mobile app data persistence

export interface SavedConfiguration {
  id: string;
  name: string;
  cropCategory: string;
  selectedCrop: string;
  customCropName: string;
  growthStage: string;
  pollution: {
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    o3: number;
  };
  createdAt: string;
}

export interface SavedScan {
  id: string;
  timestamp: string;
  cropName: string;
  cropCategory: string;
  growthStage: string;
  imageData: string;
  result: {
    stress_type: "Healthy" | "Biotic" | "Abiotic";
    disease_name?: string | null;
    stress_cause?: string | null;
    severity?: string | null;
    confidence: number;
    recommendation?: string | null;
    pollutionImpact?: string;
    analysisType?: string;
  };
  pollution: {
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    o3: number;
  };
}

// Configuration Management
export const saveConfiguration = (config: Omit<SavedConfiguration, "id" | "createdAt">) => {
  const configurations = getConfigurations();
  const newConfig: SavedConfiguration = {
    ...config,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  configurations.push(newConfig);
  localStorage.setItem("crop_configurations", JSON.stringify(configurations));
  return newConfig;
};

export const getConfigurations = (): SavedConfiguration[] => {
  const data = localStorage.getItem("crop_configurations");
  return data ? JSON.parse(data) : [];
};

export const deleteConfiguration = (id: string) => {
  const configurations = getConfigurations().filter((c) => c.id !== id);
  localStorage.setItem("crop_configurations", JSON.stringify(configurations));
};

export const updateConfiguration = (id: string, updates: Partial<SavedConfiguration>) => {
  const configurations = getConfigurations();
  const index = configurations.findIndex((c) => c.id === id);
  if (index !== -1) {
    configurations[index] = { ...configurations[index], ...updates };
    localStorage.setItem("crop_configurations", JSON.stringify(configurations));
  }
};

// Scan History Management
export const saveScan = (scan: Omit<SavedScan, "id" | "timestamp">) => {
  const scans = getScans();
  const newScan: SavedScan = {
    ...scan,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  scans.unshift(newScan); // Add to beginning
  
  // Keep only last 50 scans
  const limitedScans = scans.slice(0, 50);
  localStorage.setItem("crop_scans", JSON.stringify(limitedScans));
  return newScan;
};

export const getScans = (): SavedScan[] => {
  const data = localStorage.getItem("crop_scans");
  return data ? JSON.parse(data) : [];
};

export const deleteScan = (id: string) => {
  const scans = getScans().filter((s) => s.id !== id);
  localStorage.setItem("crop_scans", JSON.stringify(scans));
};

export const clearAllScans = () => {
  localStorage.setItem("crop_scans", JSON.stringify([]));
};

// App Settings
export interface AppSettings {
  securityEnabled: boolean;
  biometricEnabled: boolean;
  notifications: boolean;
  autoSave: boolean;
  theme: "dark" | "light";
}

export const getAppSettings = (): AppSettings => {
  const data = localStorage.getItem("app_settings");
  return data
    ? JSON.parse(data)
    : {
        securityEnabled: true,
        biometricEnabled: false,
        notifications: true,
        autoSave: true,
        theme: "dark",
      };
};

export const updateAppSettings = (settings: Partial<AppSettings>) => {
  const current = getAppSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem("app_settings", JSON.stringify(updated));
  return updated;
};

// Statistics
export const getStatistics = () => {
  const scans = getScans();
  const configs = getConfigurations();
  
  const healthyCount = scans.filter((s) => s.result.stress_type === "Healthy").length;
  const bioticCount = scans.filter((s) => s.result.stress_type === "Biotic").length;
  const abioticCount = scans.filter((s) => s.result.stress_type === "Abiotic").length;
  
  return {
    totalScans: scans.length,
    totalConfigurations: configs.length,
    healthyCount,
    bioticCount,
    abioticCount,
    lastScanDate: scans.length > 0 ? scans[0].timestamp : null,
  };
};
