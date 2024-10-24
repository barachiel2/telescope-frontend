export interface Property {
  id: number;
  portfolio: number;  // Portfolio id to which this property belongs
  address: string;
  estimated_value: number;
  construction_year: number;
  square_footage: number;
  created_at: string;
  updated_at: string;
}
