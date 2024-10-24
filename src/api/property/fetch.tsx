import { Property } from './types';

export const fetchProperties = async (): Promise<Property[] | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/list_properties/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch properties');
      return null;
    }
  } catch (error) {
    console.error('Error while fetching properties:', error);
    return null;
  }
};
