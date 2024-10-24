import { Property } from './types';

export const updateProperty = async (propertyId: number, data: Partial<Property>): Promise<Property | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${propertyId}/update_property/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedProperty = await response.json();
      return updatedProperty;
    } else {
      console.error('Failed to update property');
      return null;
    }
  } catch (error) {
    console.error('Error updating property:', error);
    return null;
  }
};
