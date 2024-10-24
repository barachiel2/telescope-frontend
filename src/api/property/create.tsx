import { Property } from './types';

export const createProperty = async (portfolioId: number, address: string, estimatedValue: number, constructionYear: number, squareFootage: number): Promise<Property | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/create_property/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        portfolio: portfolioId,
        address,
        estimated_value: estimatedValue,
        construction_year: constructionYear,
        square_footage: squareFootage
      })
    });

    if (response.ok) {
      const newProperty = await response.json();
      return newProperty;
    } else {
      console.error('Failed to create property');
      return null;
    }
  } catch (error) {
    console.error('Error while creating property:', error);
    return null;
  }
};
