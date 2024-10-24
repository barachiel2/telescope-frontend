import { Property } from './types';

export const fetchPropertyCount = async (portfolioId: number): Promise<number | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${portfolioId}/property_count/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.property_count;
    } else {
      console.error('Failed to fetch property count');
      return null;
    }
  } catch (error) {
    console.error('Error while fetching property count:', error);
    return null;
  }
};
