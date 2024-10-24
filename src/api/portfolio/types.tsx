export interface Portfolio {
  id: number;
  name: string;
  description: string;
  geographic_region: string;  // New field for geographic region
  location?: {                // Optional field for location as a point (latitude and longitude)
    type: string;
    coordinates: [number, number]; // Array containing [longitude, latitude]
  };
  created_at: string;
  updated_at: string;
}
