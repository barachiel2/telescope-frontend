import { Property } from './types';

export const updateProperty = async (propertyId: number, address: string, estimated_value: number, construction_year: number, square_footage: number): Promise<Property | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${propertyId}/update_property/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, estimated_value, construction_year, square_footage })
    });

    if (response.ok) {
      const updatedProperty = await response.json();
      return updatedProperty;
    } else {
      console.error('Failed to update property');
      return null;
    }
  } catch (error) {
    console.error('Error while updating property:', error);
    return null;
  }
};
