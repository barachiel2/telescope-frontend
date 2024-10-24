import { Portfolio } from './types';

export const createPortfolio = async (name: string, description: string): Promise<Portfolio | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/portfolios/create_portfolio/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description })
    });

    if (response.ok) {
      const newPortfolio = await response.json();
      return newPortfolio;
    } else {
      console.error('Failed to create portfolio');
      return null;
    }
  } catch (error) {
    console.error('Error while creating portfolio:', error);
    return null;
  }
};
