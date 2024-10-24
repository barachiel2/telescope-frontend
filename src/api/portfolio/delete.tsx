export const deletePortfolio = async (portfolioId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/portfolios/${portfolioId}/delete_portfolio/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.ok;
  } catch (error) {
    console.error('Error while deleting portfolio:', error);
    return false;
  }
};
