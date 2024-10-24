import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { fetchPortfolios } from '../api/portfolio/fetch'; // Import your fetch function
import { Portfolio } from '../api/portfolio/types'; // Import your Portfolio type
import CreatePortfolio from './CreatePortfolio'; // Import your CreatePortfolio component
import DeletePortfolio from './DeletePortfolio'; // Import your DeletePortfolio component
import UpdatePortfolio from './UpdatePortfolio'; // Import your UpdatePortfolio component

const PortfolioList: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]); // State to store portfolios
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const [error, setError] = useState<string | null>(null); // State for errors

  // Fetch portfolios
  useEffect(() => {
    const loadPortfolios = async () => {
      setLoading(true);
      setError(null);

      const fetchedPortfolios = await fetchPortfolios(); // Fetch portfolios from backend
      if (fetchedPortfolios) {
        setPortfolios(fetchedPortfolios); // Update state with fetched portfolios
      } else {
        setError('Failed to fetch portfolios'); // Handle error
      }

      setLoading(false); // Set loading to false
    };

    loadPortfolios();
  }, []);

  // Function to reload portfolios after any action (create, update, delete)
  const reloadPortfolios = async () => {
    setLoading(true);
    setError(null);

    const fetchedPortfolios = await fetchPortfolios(); // Re-fetch portfolios
    if (fetchedPortfolios) {
      setPortfolios(fetchedPortfolios); // Update state with fetched portfolios
    } else {
      setError('Failed to fetch portfolios'); // Handle error
    }

    setLoading(false); // Set loading to false
  };

  if (loading) {
    return <Typography>Loading...</Typography>; // Show loading state
  }

  if (error) {
    return <Typography color="error">{error}</Typography>; // Show error state
  }

  return (
    <div>
      <CreatePortfolio onPortfolioCreated={reloadPortfolios} /> {/* Create portfolio button */}
      <Grid container spacing={3}>
        {portfolios.map((portfolio) => (
          <Grid item xs={12} sm={6} md={4} key={portfolio.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{portfolio.name}</Typography>
                <Typography variant="body2">{portfolio.description}</Typography>
                <Typography variant="body2">Region: {portfolio.geographic_region}</Typography> {/* Show the geographic region */}
                <UpdatePortfolio portfolio={portfolio} onPortfolioUpdated={reloadPortfolios} /> {/* Update portfolio button */}
                <DeletePortfolio portfolioId={portfolio.id} onPortfolioDeleted={reloadPortfolios} /> {/* Delete portfolio button */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PortfolioList;
