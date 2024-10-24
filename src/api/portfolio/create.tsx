import { Portfolio } from './types';

export const createPortfolio = async (
  name: string, 
  description: string, 
  geographicRegion: string, 
  location: string
): Promise<Portfolio | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/portfolios/create_portfolio/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, geographic_region: geographicRegion, location }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to create portfolio');
      return null;
    }
  } catch (error) {
    console.error('Error creating portfolio:', error);
    return null;
  }
};
