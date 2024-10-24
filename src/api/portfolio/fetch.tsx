import { Portfolio } from './types';

export const fetchPortfolios = async (): Promise<Portfolio[] | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/portfolios/list_portfolios/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      // Log the response details
      console.error('Failed to fetch portfolios. Status:', response.status);
      console.error('Response body:', await response.text());
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while fetching portfolios:', error);
    return null;
  }
};

