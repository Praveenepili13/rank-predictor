/**
 * RANK COMPANION DATA
 * College Database, JoSAA Cutoff Constants, and Scoring Interpolation
 */

const COLLEGE_DATABASE = [
  // ─────────────────────────────────────────────────────────────────────
  // 31 NITs (All India Institutes of Technology)
  // ─────────────────────────────────────────────────────────────────────
  { name: "NIT Trichy", branch: "Computer Science (CSE)", cutoff: 2400, tier: 1 },
  { name: "NIT Trichy", branch: "Electronics & Comm (ECE)", cutoff: 4500, tier: 1 },
  { name: "NIT Trichy", branch: "Mechanical Engineering", cutoff: 10500, tier: 2 },
  { name: "NIT Trichy", branch: "Electrical Engineering", cutoff: 8900, tier: 2 },
  { name: "NIT Trichy", branch: "AI & Data Science", cutoff: 3200, tier: 1 },

  { name: "NIT Karnataka (Surathkal)", branch: "Computer Science (CSE)", cutoff: 3200, tier: 1 },
  { name: "NIT Karnataka (Surathkal)", branch: "Electronics & Comm (ECE)", cutoff: 6000, tier: 1 },
  { name: "NIT Karnataka (Surathkal)", branch: "Mechanical Engineering", cutoff: 13000, tier: 2 },
  { name: "NIT Karnataka (Surathkal)", branch: "IT", cutoff: 3800, tier: 1 },

  { name: "NIT Warangal", branch: "Computer Science (CSE)", cutoff: 3500, tier: 1 },
  { name: "NIT Warangal", branch: "Electronics & Comm (ECE)", cutoff: 6500, tier: 1 },
  { name: "NIT Warangal", branch: "Mechanical Engineering", cutoff: 14500, tier: 2 },

  { name: "MNNIT Allahabad", branch: "Computer Science (CSE)", cutoff: 5000, tier: 1 },
  { name: "MNNIT Allahabad", branch: "Electronics & Comm (ECE)", cutoff: 9000, tier: 2 },
  { name: "MNNIT Allahabad", branch: "Mechanical Engineering", cutoff: 19500, tier: 2 },

  { name: "NIT Calicut", branch: "Computer Science (CSE)", cutoff: 5500, tier: 1 },
  { name: "NIT Calicut", branch: "Electronics & Comm (ECE)", cutoff: 10500, tier: 2 },
  { name: "NIT Calicut", branch: "Mechanical Engineering", cutoff: 21000, tier: 3 },

  { name: "MNIT Jaipur", branch: "Computer Science (CSE)", cutoff: 6000, tier: 1 },
  { name: "MNIT Jaipur", branch: "Electronics & Comm (ECE)", cutoff: 11500, tier: 2 },
  { name: "MNIT Jaipur", branch: "Mechanical Engineering", cutoff: 23000, tier: 3 },

  { name: "VNIT Nagpur", branch: "Computer Science (CSE)", cutoff: 7000, tier: 1 },
  { name: "VNIT Nagpur", branch: "Electronics & Comm (ECE)", cutoff: 12500, tier: 2 },
  { name: "VNIT Nagpur", branch: "Mechanical Engineering", cutoff: 24000, tier: 3 },

  { name: "NIT Delhi", branch: "Computer Science (CSE)", cutoff: 7500, tier: 1 },
  { name: "NIT Delhi", branch: "Electronics & Comm (ECE)", cutoff: 13500, tier: 2 },
  { name: "NIT Delhi", branch: "Mechanical Engineering", cutoff: 27000, tier: 3 },

  { name: "NIT Rourkela", branch: "Computer Science (CSE)", cutoff: 8000, tier: 1 },
  { name: "NIT Rourkela", branch: "Electronics & Comm (ECE)", cutoff: 14000, tier: 2 },
  { name: "NIT Rourkela", branch: "Mechanical Engineering", cutoff: 25000, tier: 3 },

  { name: "NIT Kurukshetra", branch: "Computer Science (CSE)", cutoff: 8500, tier: 1 },
  { name: "NIT Kurukshetra", branch: "Electronics & Comm (ECE)", cutoff: 15000, tier: 2 },
  { name: "NIT Kurukshetra", branch: "Mechanical Engineering", cutoff: 28000, tier: 3 },

  { name: "NIT Durgapur", branch: "Computer Science (CSE)", cutoff: 9000, tier: 2 },
  { name: "NIT Durgapur", branch: "Electronics & Comm (ECE)", cutoff: 16000, tier: 2 },
  { name: "NIT Durgapur", branch: "Mechanical Engineering", cutoff: 32000, tier: 3 },

  { name: "NIT Jamshedpur", branch: "Computer Science (CSE)", cutoff: 9500, tier: 2 },
  { name: "NIT Jamshedpur", branch: "Electronics & Comm (ECE)", cutoff: 17000, tier: 2 },
  { name: "NIT Jamshedpur", branch: "Mechanical Engineering", cutoff: 34000, tier: 3 },

  { name: "NIT Jalandhar", branch: "Computer Science (CSE)", cutoff: 10000, tier: 2 },
  { name: "NIT Jalandhar", branch: "Electronics & Comm (ECE)", cutoff: 17500, tier: 2 },
  { name: "NIT Jalandhar", branch: "Mechanical Engineering", cutoff: 33000, tier: 3 },

  { name: "NIT Goa", branch: "Computer Science (CSE)", cutoff: 11000, tier: 2 },
  { name: "NIT Goa", branch: "Electronics & Comm (ECE)", cutoff: 18000, tier: 2 },
  { name: "NIT Goa", branch: "Mechanical Engineering", cutoff: 35000, tier: 3 },

  { name: "NIT Hamirpur", branch: "Computer Science (CSE)", cutoff: 11500, tier: 2 },
  { name: "NIT Hamirpur", branch: "Electronics & Comm (ECE)", cutoff: 20000, tier: 2 },
  { name: "NIT Hamirpur", branch: "Mechanical Engineering", cutoff: 36000, tier: 3 },

  { name: "NIT Silchar", branch: "Computer Science (CSE)", cutoff: 12500, tier: 2 },
  { name: "NIT Silchar", branch: "Electronics & Comm (ECE)", cutoff: 21000, tier: 2 },
  { name: "NIT Silchar", branch: "Mechanical Engineering", cutoff: 38000, tier: 3 },

  { name: "NIT Raipur", branch: "Computer Science (CSE)", cutoff: 13500, tier: 2 },
  { name: "NIT Raipur", branch: "Electronics & Comm (ECE)", cutoff: 22000, tier: 2 },
  { name: "NIT Raipur", branch: "Mechanical Engineering", cutoff: 40000, tier: 3 },

  { name: "NIT Patna", branch: "Computer Science (CSE)", cutoff: 14000, tier: 2 },
  { name: "NIT Patna", branch: "Electronics & Comm (ECE)", cutoff: 23000, tier: 2 },
  { name: "NIT Patna", branch: "Mechanical Engineering", cutoff: 42000, tier: 3 },

  { name: "NIT Puducherry", branch: "Computer Science (CSE)", cutoff: 16500, tier: 2 },
  { name: "NIT Puducherry", branch: "Electronics & Comm (ECE)", cutoff: 25000, tier: 2 },
  { name: "NIT Puducherry", branch: "Mechanical Engineering", cutoff: 43000, tier: 3 },

  { name: "NIT Andhra Pradesh", branch: "Computer Science (CSE)", cutoff: 17500, tier: 2 },
  { name: "NIT Andhra Pradesh", branch: "Electronics & Comm (ECE)", cutoff: 26500, tier: 2 },
  { name: "NIT Andhra Pradesh", branch: "Mechanical Engineering", cutoff: 44000, tier: 3 },

  { name: "NIT Uttarakhand", branch: "Computer Science (CSE)", cutoff: 18000, tier: 2 },
  { name: "NIT Uttarakhand", branch: "Electronics & Comm (ECE)", cutoff: 28000, tier: 2 },
  { name: "NIT Uttarakhand", branch: "Mechanical Engineering", cutoff: 46000, tier: 3 },

  { name: "NIT Agartala", branch: "Computer Science (CSE)", cutoff: 19000, tier: 2 },
  { name: "NIT Agartala", branch: "Electronics & Comm (ECE)", cutoff: 29000, tier: 2 },
  { name: "NIT Agartala", branch: "Mechanical Engineering", cutoff: 50000, tier: 3 },

  { name: "NIT Meghalaya", branch: "Computer Science (CSE)", cutoff: 19500, tier: 2 },
  { name: "NIT Meghalaya", branch: "Electronics & Comm (ECE)", cutoff: 28500, tier: 2 },
  { name: "NIT Meghalaya", branch: "Mechanical Engineering", cutoff: 47000, tier: 3 },

  { name: "NIT Srinagar", branch: "Computer Science (CSE)", cutoff: 25000, tier: 3 },
  { name: "NIT Srinagar", branch: "Electronics & Comm (ECE)", cutoff: 37000, tier: 3 },
  { name: "NIT Srinagar", branch: "Mechanical Engineering", cutoff: 58000, tier: 3 },

  { name: "NIT Sikkim", branch: "Computer Science (CSE)", cutoff: 26000, tier: 3 },
  { name: "NIT Sikkim", branch: "Electronics & Comm (ECE)", cutoff: 36000, tier: 3 },
  { name: "NIT Sikkim", branch: "Mechanical Engineering", cutoff: 53000, tier: 3 },

  { name: "NIT Manipur", branch: "Computer Science (CSE)", cutoff: 27000, tier: 3 },
  { name: "NIT Manipur", branch: "Electronics & Comm (ECE)", cutoff: 39000, tier: 3 },
  { name: "NIT Manipur", branch: "Mechanical Engineering", cutoff: 56000, tier: 3 },

  { name: "NIT Arunachal Pradesh", branch: "Computer Science (CSE)", cutoff: 28000, tier: 3 },
  { name: "NIT Arunachal Pradesh", branch: "Electronics & Comm (ECE)", cutoff: 40000, tier: 3 },
  { name: "NIT Arunachal Pradesh", branch: "Mechanical Engineering", cutoff: 59000, tier: 3 },

  { name: "NIT Nagaland", branch: "Computer Science (CSE)", cutoff: 31000, tier: 3 },
  { name: "NIT Nagaland", branch: "Electronics & Comm (ECE)", cutoff: 43000, tier: 3 },
  { name: "NIT Nagaland", branch: "Mechanical Engineering", cutoff: 62000, tier: 3 },

  { name: "NIT Mizoram", branch: "Computer Science (CSE)", cutoff: 33000, tier: 3 },
  { name: "NIT Mizoram", branch: "Electronics & Comm (ECE)", cutoff: 45000, tier: 3 },
  { name: "NIT Mizoram", branch: "Mechanical Engineering", cutoff: 65000, tier: 3 },

  // ─────────────────────────────────────────────────────────────────────
  // Premier IIITs (36 entries)
  // ─────────────────────────────────────────────────────────────────────
  { name: "IIIT Hyderabad", branch: "Computer Science (CSE)", cutoff: 1800, tier: 1 },
  { name: "IIIT Hyderabad", branch: "Electronics & Comm (ECE)", cutoff: 3400, tier: 1 },
  { name: "IIIT Hyderabad", branch: "AI & Data Science", cutoff: 2100, tier: 1 },

  { name: "IIIT Bangalore", branch: "Computer Science (CSE)", cutoff: 6500, tier: 1 },
  { name: "IIIT Bangalore", branch: "Data Science & AI", cutoff: 8200, tier: 1 },

  { name: "IIIT Allahabad", branch: "Information Technology (IT)", cutoff: 5800, tier: 1 },
  { name: "IIIT Allahabad", branch: "Electronics & Comm (ECE)", cutoff: 9500, tier: 1 },
  { name: "IIIT Allahabad", branch: "IT in Business (IT-BI)", cutoff: 6300, tier: 1 },

  { name: "IIIT Lucknow", branch: "Computer Science (CSE)", cutoff: 9800, tier: 2 },
  { name: "IIIT Lucknow", branch: "Artificial Intelligence (AI)", cutoff: 10500, tier: 2 },
  { name: "IIIT Lucknow", branch: "Information Technology (IT)", cutoff: 11200, tier: 2 },

  { name: "IIIT Delhi (JAC)", branch: "Computer Science (CSE)", cutoff: 4200, tier: 1 },
  { name: "IIIT Delhi (JAC)", branch: "CS & Artificial Intelligence", cutoff: 3800, tier: 1 },

  { name: "IIIT Jabalpur", branch: "Computer Science (CSE)", cutoff: 13500, tier: 2 },
  { name: "IIIT Jabalpur", branch: "Electronics & Comm (ECE)", cutoff: 21500, tier: 2 },
  { name: "IIIT Jabalpur", branch: "Smart Manufacturing", cutoff: 48000, tier: 3 },

  { name: "IIIT Gwalior", branch: "Computer Science (CSE)", cutoff: 7200, tier: 1 },
  { name: "IIIT Gwalior", branch: "IT + MBA (5 Year Dual)", cutoff: 14000, tier: 2 },

  { name: "IIIT Kancheepuram", branch: "Computer Science (CSE)", cutoff: 16000, tier: 2 },
  { name: "IIIT Kancheepuram", branch: "Electronics & Comm (ECE)", cutoff: 26000, tier: 2 },

  { name: "IIIT Pune", branch: "Computer Science (CSE)", cutoff: 15500, tier: 2 },
  { name: "IIIT Pune", branch: "Electronics & Comm (ECE)", cutoff: 24000, tier: 2 },

  { name: "IIIT Kota", branch: "Computer Science (CSE)", cutoff: 21000, tier: 2 },
  { name: "IIIT Kota", branch: "Electronics & Comm (ECE)", cutoff: 31000, tier: 3 },

  { name: "IIIT Vadodara", branch: "Computer Science (CSE)", cutoff: 20000, tier: 2 },
  { name: "IIIT Vadodara", branch: "Information Technology (IT)", cutoff: 22500, tier: 2 },

  { name: "IIIT Sri City", branch: "Computer Science (CSE)", cutoff: 24000, tier: 2 },
  { name: "IIIT Sri City", branch: "Electronics & Comm (ECE)", cutoff: 37000, tier: 3 },

  { name: "IIIT Guwahati", branch: "Computer Science (CSE)", cutoff: 22000, tier: 2 },
  { name: "IIIT Guwahati", branch: "Electronics & Comm (ECE)", cutoff: 34000, tier: 3 },

  { name: "IIIT Surat", branch: "Computer Science (CSE)", cutoff: 23500, tier: 2 },
  { name: "IIIT Surat", branch: "Electronics & Comm (ECE)", cutoff: 35000, tier: 3 },

  { name: "IIIT Bhopal", branch: "Computer Science (CSE)", cutoff: 25000, tier: 3 },
  { name: "IIIT Bhopal", branch: "Information Technology (IT)", cutoff: 28000, tier: 3 },

  { name: "IIIT Nagpur", branch: "Computer Science (CSE)", cutoff: 26500, tier: 3 },
  { name: "IIIT Nagpur", branch: "Computer Science (AI/ML)", cutoff: 24500, tier: 3 },

  { name: "IIIT Bhagalpur", branch: "Computer Science (CSE)", cutoff: 38000, tier: 3 },

  // ─────────────────────────────────────────────────────────────────────
  // Premier GFTIs (21 entries)
  // ─────────────────────────────────────────────────────────────────────
  { name: "BIT Mesra (Ranchi)", branch: "Computer Science (CSE)", cutoff: 16500, tier: 2 },
  { name: "BIT Mesra (Ranchi)", branch: "Electronics & Comm (ECE)", cutoff: 28500, tier: 2 },
  { name: "BIT Mesra (Ranchi)", branch: "Mechanical Engineering", cutoff: 45000, tier: 3 },

  { name: "PEC Chandigarh", branch: "Computer Science (CSE)", cutoff: 12000, tier: 2 },
  { name: "PEC Chandigarh", branch: "Electronics & Comm (ECE)", cutoff: 19000, tier: 2 },
  { name: "PEC Chandigarh", branch: "Mechanical Engineering", cutoff: 38000, tier: 3 },

  { name: "Jawaharlal Nehru University (JNU)", branch: "Computer Science (CSE)", cutoff: 28000, tier: 3 },
  { name: "Jawaharlal Nehru University (JNU)", branch: "Electronics & Comm (ECE)", cutoff: 39000, tier: 3 },

  { name: "University of Hyderabad (UoH)", branch: "Computer Science (CSE)", cutoff: 22000, tier: 2 },

  { name: "Assam University (Silchar)", branch: "Computer Science (CSE)", cutoff: 49000, tier: 3 },
  { name: "Assam University (Silchar)", branch: "Agricultural Engineering", cutoff: 78000, tier: 3 },

  { name: "JK Institute of Applied Physics (Allahabad)", branch: "Computer Science (CSE)", cutoff: 43000, tier: 3 },
  { name: "JK Institute of Applied Physics (Allahabad)", branch: "Electronics & Comm (ECE)", cutoff: 57000, tier: 3 },

  { name: "National Institute of Electronics (NIELIT)", branch: "Electronics System Engineering", cutoff: 54000, tier: 3 },

  { name: "CIT Kokrajhar", branch: "Computer Science (CSE)", cutoff: 52000, tier: 3 },

  { name: "GIFT Guwahati", branch: "Computer Science (CSE)", cutoff: 55000, tier: 3 },
  { name: "GIFT Guwahati", branch: "Electrical Engineering", cutoff: 68000, tier: 3 },

  { name: "NIFTEM Thanjavur", branch: "Food Processing Tech", cutoff: 82000, tier: 3 },
  { name: "NIFTEM Kundli", branch: "Food Tech & Management", cutoff: 79000, tier: 3 },

  { name: "Tezpur University", branch: "Computer Science (CSE)", cutoff: 46000, tier: 3 },
  { name: "Tezpur University", branch: "Mechanical Engineering", cutoff: 69000, tier: 3 }
];

/**
 * Marks-to-Percentile Interpolation Anchors
 * Based on historical JEE Main data
 * [marks, percentile]
 */
const MARKS_TO_PERCENTILE_ANCHORS = [
  [-75, 0.01],
  [0, 29],
  [30, 57],
  [60, 78],
  [90, 89],
  [120, 95],
  [150, 98],
  [180, 99.16],
  [210, 99.62],
  [240, 99.86],
  [270, 99.97],
  [300, 99.999]
];

/**
 * Category Relaxation Factors for JoSAA
 * Applied as multipliers on base cutoff ranks
 */
const CATEGORY_RELAXATION_MAP = {
  'OPEN': 1.0,
  'EWS': 1.18,
  'OBC': 1.35,
  'SC': 2.8,
  'ST': 4.5
};

/**
 * Gender-specific quota adjustments
 * Female-only seats: typically 25–30% fewer seats, higher competition
 */
const GENDER_ADJUSTMENT = {
  'neutral': 1.0,
  'female': 1.22 // Adjusted for smaller pool
};

/**
 * Home State vs Other State quota adjustments
 * Home State quotas typically have higher closing ranks
 */
const STATE_QUOTA_ADJUSTMENT = {
  'OS': 1.0, // Other State (default)
  'HS': 1.35 // Home State (higher competition)
};

/**
 * Spread factor for marks-only ranges (account for inter-shift variation)
 */
function getMarksSpreadFactor(marks) {
  if (marks >= 240) return 0.07;
  if (marks >= 180) return 0.28;
  if (marks >= 120) return 0.9;
  if (marks >= 60) return 2.4;
  return 6;
}

/**
 * Linearly interpolate marks to percentile
 */
function marksToPercentile(marks, difficulty = 'normal') {
  const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
  const score = clamp(marks, -75, 300);
  
  // Adjust for difficulty
  const difficultyFactor = difficulty === 'tough' ? 1.15 : difficulty === 'easier' ? 0.85 : 1.0;
  const adjustedScore = score * difficultyFactor;

  // Linear interpolation between anchors
  for (let i = 1; i < MARKS_TO_PERCENTILE_ANCHORS.length; i++) {
    const [x2, y2] = MARKS_TO_PERCENTILE_ANCHORS[i];
    const [x1, y1] = MARKS_TO_PERCENTILE_ANCHORS[i - 1];
    if (adjustedScore <= x2) {
      return y1 + ((adjustedScore - x1) / (x2 - x1)) * (y2 - y1);
    }
  }
  return 99.999;
}

/**
 * Calculate AIR from percentile
 */
function rankFromPercentile(percentile, candidateCount = 1418000) {
  return Math.round(1 + ((100 - percentile) / 100) * (candidateCount - 1));
}

/**
 * Apply category/gender/quota adjustments to base cutoff
 */
function getAdjustedCutoff(baseCutoff, category, gender, stateQuota) {
  let multiplier = 1.0;
  multiplier *= CATEGORY_RELAXATION_MAP[category] || 1.0;
  multiplier *= GENDER_ADJUSTMENT[gender] || 1.0;
  multiplier *= STATE_QUOTA_ADJUSTMENT[stateQuota] || 1.0;
  return Math.round(baseCutoff * multiplier);
}

/**
 * Export for use in app.js
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    COLLEGE_DATABASE,
    MARKS_TO_PERCENTILE_ANCHORS,
    CATEGORY_RELAXATION_MAP,
    GENDER_ADJUSTMENT,
    STATE_QUOTA_ADJUSTMENT,
    getMarksSpreadFactor,
    marksToPercentile,
    rankFromPercentile,
    getAdjustedCutoff
  };
}
