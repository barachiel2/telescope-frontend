import { Property } from './types';

export const updateProperty = async (propertyId: number, updates: Partial<Property>): Promise<Property | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/update_property/${propertyId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
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
