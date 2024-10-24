import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { fetchPortfolios } from '../api/portfolio/fetch';
import { Portfolio } from '../api/portfolio/types'; // Import the Portfolio type

const PortfolioList: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolios = async () => {
      setLoading(true);
      setError(null);
      const fetchedPortfolios = await fetchPortfolios(); // No token required
      if (fetchedPortfolios) {
        setPortfolios(fetchedPortfolios);
      } else {
        setError('Failed to fetch portfolios');
      }
      setLoading(false);
    };

    loadPortfolios();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {portfolios.map((portfolio) => (
        <Grid item xs={12} sm={6} md={4} key={portfolio.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{portfolio.name}</Typography>
              <Typography variant="body2">{portfolio.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PortfolioList;
