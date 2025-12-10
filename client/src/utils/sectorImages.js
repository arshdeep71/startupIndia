// Sector-specific images mapping
// Using curated images that represent each sector

const sectorImages = {
  // E-commerce & Retail
  "E-commerce": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
  "B2B Commerce": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=200&fit=crop",
  "Quick Commerce": "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=200&fit=crop",
  
  // Finance & Banking
  "Fintech": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=200&fit=crop",
  "Insurance": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop",
  
  // Transportation & Logistics
  "Transportation": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=200&fit=crop",
  
  // Food & Delivery
  "Food Delivery": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=200&fit=crop",
  
  // Entertainment & Media
  "Entertainment": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=200&fit=crop",
  "Fantasy Sports": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop",
  "Social Media": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop",
  
  // Travel & Hospitality
  "Travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop",
  "Hospitality": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop",
  
  // Education
  "Edtech": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=200&fit=crop",
  
  // Technology & Software
  "SaaS": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
  
  // Health & Wellness
  "Healthcare": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
  "Health & Fitness": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop",
  
  // Retail & Fashion
  "Eyewear": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=200&fit=crop",
};

// Default image for sectors not in the mapping
const defaultSectorImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop";

/**
 * Get the image URL for a given sector
 * @param {string} sector - The sector name
 * @returns {string} The image URL for the sector
 */
export const getSectorImage = (sector) => {
  if (!sector) return defaultSectorImage;
  
  // Try exact match first
  if (sectorImages[sector]) {
    return sectorImages[sector];
  }
  
  // Try case-insensitive match
  const normalizedSector = sector.trim().toLowerCase();
  const matchedKey = Object.keys(sectorImages).find(
    key => key.toLowerCase() === normalizedSector
  );
  
  if (matchedKey) {
    return sectorImages[matchedKey];
  }
  
  // Try partial match
  const partialMatchKey = Object.keys(sectorImages).find(
    key => normalizedSector.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedSector)
  );
  
  if (partialMatchKey) {
    return sectorImages[partialMatchKey];
  }
  
  return defaultSectorImage;
};

/**
 * Get sector icon/emoji for visual representation
 * @param {string} sector - The sector name
 * @returns {string} An emoji representing the sector
 */
export const getSectorIcon = (sector) => {
  const sectorIcons = {
    "E-commerce": "🛒",
    "B2B Commerce": "🏭",
    "Quick Commerce": "⚡",
    "Fintech": "💳",
    "Insurance": "🛡️",
    "Transportation": "🚗",
    "Food Delivery": "🍔",
    "Entertainment": "🎬",
    "Fantasy Sports": "🏏",
    "Social Media": "📱",
    "Travel": "✈️",
    "Hospitality": "🏨",
    "Edtech": "📚",
    "SaaS": "☁️",
    "Healthcare": "🏥",
    "Health & Fitness": "💪",
    "Eyewear": "👓",
  };

  if (!sector) return "🚀";
  
  const normalizedSector = sector.trim();
  return sectorIcons[normalizedSector] || "🚀";
};

export default sectorImages;
