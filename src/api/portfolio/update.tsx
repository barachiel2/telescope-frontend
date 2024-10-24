import { Portfolio } from './types';

export const updatePortfolio = async (portfolioId: number, name: string, description: string): Promise<Portfolio | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/portfolios/${portfolioId}/update_portfolio/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description })
    });

    if (response.ok) {
      const updatedPortfolio = await response.json();
      return updatedPortfolio;
    } else {
      console.error('Failed to update portfolio');
      return null;
    }
  } catch (error) {
    console.error('Error while updating portfolio:', error);
    return null;
  }
};
