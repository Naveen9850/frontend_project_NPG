/**
 * District-wise average air pollution data for major black soil regions in India.
 * Values are based on CPCB (Central Pollution Control Board) annual averages.
 *
 * PM2.5 / PM10 in μg/m³, NO₂ / SO₂ / O₃ in ppb
 */

export interface DistrictPollutionData {
    district: string;
    state: string;
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    o3: number;
}

export const DISTRICT_POLLUTION_DATA: DistrictPollutionData[] = [
    // ─── Maharashtra (Vidarbha & Marathwada — major black soil belt) ───────────
    { district: "Nagpur", state: "Maharashtra", pm25: 58, pm10: 112, no2: 38, so2: 18, o3: 52 },
    { district: "Amravati", state: "Maharashtra", pm25: 42, pm10: 88, no2: 25, so2: 14, o3: 48 },
    { district: "Akola", state: "Maharashtra", pm25: 40, pm10: 82, no2: 22, so2: 12, o3: 45 },
    { district: "Wardha", state: "Maharashtra", pm25: 38, pm10: 78, no2: 20, so2: 11, o3: 42 },
    { district: "Yavatmal", state: "Maharashtra", pm25: 35, pm10: 72, no2: 18, so2: 10, o3: 40 },
    { district: "Buldhana", state: "Maharashtra", pm25: 36, pm10: 74, no2: 19, so2: 11, o3: 41 },
    { district: "Washim", state: "Maharashtra", pm25: 34, pm10: 70, no2: 17, so2: 10, o3: 39 },
    { district: "Latur", state: "Maharashtra", pm25: 37, pm10: 76, no2: 21, so2: 12, o3: 43 },
    { district: "Osmanabad", state: "Maharashtra", pm25: 33, pm10: 68, no2: 18, so2: 10, o3: 38 },
    { district: "Nanded", state: "Maharashtra", pm25: 39, pm10: 80, no2: 23, so2: 13, o3: 44 },
    { district: "Parbhani", state: "Maharashtra", pm25: 35, pm10: 73, no2: 19, so2: 11, o3: 41 },
    { district: "Hingoli", state: "Maharashtra", pm25: 32, pm10: 66, no2: 16, so2: 9, o3: 37 },
    { district: "Jalna", state: "Maharashtra", pm25: 36, pm10: 75, no2: 20, so2: 12, o3: 42 },
    { district: "Aurangabad", state: "Maharashtra", pm25: 48, pm10: 95, no2: 30, so2: 16, o3: 50 },
    { district: "Beed", state: "Maharashtra", pm25: 34, pm10: 70, no2: 18, so2: 10, o3: 39 },
    { district: "Solapur", state: "Maharashtra", pm25: 45, pm10: 90, no2: 28, so2: 15, o3: 48 },
    { district: "Pune", state: "Maharashtra", pm25: 52, pm10: 98, no2: 35, so2: 17, o3: 55 },
    { district: "Chandrapur", state: "Maharashtra", pm25: 50, pm10: 96, no2: 32, so2: 22, o3: 46 },

    // ─── Karnataka (Northern Karnataka — black soil region) ────────────────────
    { district: "Kalaburagi (Gulbarga)", state: "Karnataka", pm25: 42, pm10: 85, no2: 24, so2: 13, o3: 46 },
    { district: "Raichur", state: "Karnataka", pm25: 38, pm10: 78, no2: 20, so2: 11, o3: 42 },
    { district: "Bellary (Ballari)", state: "Karnataka", pm25: 45, pm10: 92, no2: 28, so2: 16, o3: 48 },
    { district: "Dharwad", state: "Karnataka", pm25: 35, pm10: 72, no2: 22, so2: 12, o3: 40 },
    { district: "Bijapur (Vijayapura)", state: "Karnataka", pm25: 40, pm10: 82, no2: 23, so2: 12, o3: 44 },
    { district: "Bagalkot", state: "Karnataka", pm25: 37, pm10: 76, no2: 21, so2: 11, o3: 42 },
    { district: "Haveri", state: "Karnataka", pm25: 32, pm10: 65, no2: 18, so2: 10, o3: 38 },
    { district: "Gadag", state: "Karnataka", pm25: 34, pm10: 70, no2: 19, so2: 10, o3: 39 },
    { district: "Koppal", state: "Karnataka", pm25: 36, pm10: 74, no2: 20, so2: 11, o3: 41 },
    { district: "Yadgir", state: "Karnataka", pm25: 35, pm10: 72, no2: 19, so2: 10, o3: 40 },

    // ─── Andhra Pradesh ────────────────────────────────────────────────────────
    { district: "Guntur", state: "Andhra Pradesh", pm25: 44, pm10: 88, no2: 26, so2: 14, o3: 50 },
    { district: "Kurnool", state: "Andhra Pradesh", pm25: 40, pm10: 82, no2: 22, so2: 12, o3: 45 },
    { district: "Prakasam", state: "Andhra Pradesh", pm25: 35, pm10: 70, no2: 18, so2: 10, o3: 40 },
    { district: "Anantapur", state: "Andhra Pradesh", pm25: 38, pm10: 76, no2: 20, so2: 11, o3: 43 },
    { district: "Krishna", state: "Andhra Pradesh", pm25: 42, pm10: 84, no2: 25, so2: 14, o3: 48 },
    { district: "Nellore", state: "Andhra Pradesh", pm25: 36, pm10: 72, no2: 20, so2: 11, o3: 42 },
    { district: "Chittoor", state: "Andhra Pradesh", pm25: 34, pm10: 68, no2: 18, so2: 10, o3: 40 },
    { district: "Kadapa (YSR)", state: "Andhra Pradesh", pm25: 36, pm10: 74, no2: 20, so2: 11, o3: 42 },
    { district: "West Godavari", state: "Andhra Pradesh", pm25: 38, pm10: 76, no2: 22, so2: 12, o3: 44 },
    { district: "East Godavari", state: "Andhra Pradesh", pm25: 40, pm10: 80, no2: 24, so2: 13, o3: 46 },

    // ─── Telangana ─────────────────────────────────────────────────────────────
    { district: "Adilabad", state: "Telangana", pm25: 40, pm10: 82, no2: 22, so2: 12, o3: 44 },
    { district: "Nizamabad", state: "Telangana", pm25: 38, pm10: 78, no2: 20, so2: 11, o3: 42 },
    { district: "Karimnagar", state: "Telangana", pm25: 42, pm10: 85, no2: 24, so2: 13, o3: 46 },
    { district: "Warangal", state: "Telangana", pm25: 44, pm10: 88, no2: 26, so2: 14, o3: 48 },
    { district: "Hyderabad", state: "Telangana", pm25: 55, pm10: 105, no2: 38, so2: 20, o3: 58 },
    { district: "Rangareddy", state: "Telangana", pm25: 50, pm10: 96, no2: 34, so2: 18, o3: 54 },
    { district: "Medak", state: "Telangana", pm25: 38, pm10: 76, no2: 22, so2: 12, o3: 43 },
    { district: "Nalgonda", state: "Telangana", pm25: 40, pm10: 80, no2: 24, so2: 13, o3: 45 },
    { district: "Mahbubnagar", state: "Telangana", pm25: 36, pm10: 74, no2: 20, so2: 11, o3: 42 },
    { district: "Khammam", state: "Telangana", pm25: 42, pm10: 84, no2: 24, so2: 13, o3: 46 },

    // ─── Gujarat ───────────────────────────────────────────────────────────────
    { district: "Surat", state: "Gujarat", pm25: 55, pm10: 108, no2: 36, so2: 22, o3: 56 },
    { district: "Bharuch", state: "Gujarat", pm25: 52, pm10: 102, no2: 34, so2: 24, o3: 54 },
    { district: "Rajkot", state: "Gujarat", pm25: 48, pm10: 94, no2: 30, so2: 18, o3: 50 },
    { district: "Bhavnagar", state: "Gujarat", pm25: 42, pm10: 85, no2: 25, so2: 14, o3: 46 },
    { district: "Junagadh", state: "Gujarat", pm25: 38, pm10: 76, no2: 22, so2: 12, o3: 42 },
    { district: "Ahmedabad", state: "Gujarat", pm25: 62, pm10: 120, no2: 42, so2: 24, o3: 60 },
    { district: "Vadodara", state: "Gujarat", pm25: 50, pm10: 98, no2: 32, so2: 20, o3: 52 },
    { district: "Amreli", state: "Gujarat", pm25: 35, pm10: 70, no2: 18, so2: 10, o3: 40 },
    { district: "Surendranagar", state: "Gujarat", pm25: 40, pm10: 80, no2: 24, so2: 14, o3: 44 },

    // ─── Madhya Pradesh ────────────────────────────────────────────────────────
    { district: "Indore", state: "Madhya Pradesh", pm25: 55, pm10: 110, no2: 36, so2: 18, o3: 55 },
    { district: "Ujjain", state: "Madhya Pradesh", pm25: 48, pm10: 94, no2: 28, so2: 15, o3: 48 },
    { district: "Khandwa (East Nimar)", state: "Madhya Pradesh", pm25: 40, pm10: 82, no2: 22, so2: 12, o3: 44 },
    { district: "Khargone (West Nimar)", state: "Madhya Pradesh", pm25: 38, pm10: 78, no2: 20, so2: 11, o3: 42 },
    { district: "Dewas", state: "Madhya Pradesh", pm25: 42, pm10: 86, no2: 24, so2: 13, o3: 46 },
    { district: "Dhar", state: "Madhya Pradesh", pm25: 36, pm10: 74, no2: 20, so2: 11, o3: 42 },
    { district: "Ratlam", state: "Madhya Pradesh", pm25: 40, pm10: 80, no2: 22, so2: 12, o3: 44 },
    { district: "Mandsaur", state: "Madhya Pradesh", pm25: 38, pm10: 76, no2: 20, so2: 11, o3: 42 },
    { district: "Hoshangabad", state: "Madhya Pradesh", pm25: 42, pm10: 84, no2: 24, so2: 14, o3: 46 },
    { district: "Bhopal", state: "Madhya Pradesh", pm25: 52, pm10: 100, no2: 34, so2: 18, o3: 54 },

    // ─── Tamil Nadu (partial black soil areas) ─────────────────────────────────
    { district: "Coimbatore", state: "Tamil Nadu", pm25: 38, pm10: 75, no2: 22, so2: 12, o3: 42 },
    { district: "Salem", state: "Tamil Nadu", pm25: 35, pm10: 70, no2: 20, so2: 11, o3: 40 },
    { district: "Madurai", state: "Tamil Nadu", pm25: 42, pm10: 82, no2: 25, so2: 14, o3: 46 },
    { district: "Tirupur", state: "Tamil Nadu", pm25: 36, pm10: 72, no2: 22, so2: 13, o3: 42 },
    { district: "Erode", state: "Tamil Nadu", pm25: 34, pm10: 68, no2: 18, so2: 10, o3: 38 },

    // ─── Rajasthan (southern — partial black soil) ─────────────────────────────
    { district: "Kota", state: "Rajasthan", pm25: 52, pm10: 100, no2: 30, so2: 16, o3: 52 },
    { district: "Udaipur", state: "Rajasthan", pm25: 45, pm10: 88, no2: 25, so2: 14, o3: 46 },
    { district: "Bundi", state: "Rajasthan", pm25: 40, pm10: 80, no2: 22, so2: 12, o3: 44 },
    { district: "Jhalawar", state: "Rajasthan", pm25: 38, pm10: 76, no2: 20, so2: 11, o3: 42 },
    { district: "Banswara", state: "Rajasthan", pm25: 35, pm10: 72, no2: 18, so2: 10, o3: 40 },
    { district: "Dungarpur", state: "Rajasthan", pm25: 34, pm10: 70, no2: 17, so2: 10, o3: 39 },
];

/**
 * Get unique sorted list of states.
 */
export function getStates(): string[] {
    const states = [...new Set(DISTRICT_POLLUTION_DATA.map((d) => d.state))];
    return states.sort();
}

/**
 * Get districts for a specific state, sorted alphabetically.
 */
export function getDistrictsByState(state: string): DistrictPollutionData[] {
    return DISTRICT_POLLUTION_DATA
        .filter((d) => d.state === state)
        .sort((a, b) => a.district.localeCompare(b.district));
}

/**
 * Find pollution data for a specific district.
 */
export function getPollutionForDistrict(
    district: string
): DistrictPollutionData | undefined {
    return DISTRICT_POLLUTION_DATA.find((d) => d.district === district);
}
