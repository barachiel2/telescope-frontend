import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { fetchPortfolios } from '../api/portfolio/fetch';
import { Portfolio } from '../api/portfolio/types'; 
import CreatePortfolio from './CreatePortfolio';
import DeletePortfolio from './DeletePortfolio';
import UpdatePortfolio from './UpdatePortfolio';

const PortfolioList: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch portfolios
  useEffect(() => {
    const loadPortfolios = async () => {
      setLoading(true);
      setError(null);
      const fetchedPortfolios = await fetchPortfolios();
      if (fetchedPortfolios) {
        setPortfolios(fetchedPortfolios);
      } else {
        setError('Failed to fetch portfolios');
      }
      setLoading(false);
    };

    loadPortfolios();
  }, []);

  const reloadPortfolios = () => {
    const loadPortfolios = async () => {
      setLoading(true);
      setError(null);
      const fetchedPortfolios = await fetchPortfolios();
      if (fetchedPortfolios) {
        setPortfolios(fetchedPortfolios);
      } else {
        setError('Failed to fetch portfolios');
      }
      setLoading(false);
    };

    loadPortfolios();
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <CreatePortfolio onPortfolioCreated={reloadPortfolios} />
      <Grid container spacing={3}>
        {portfolios.map((portfolio) => (
          <Grid item xs={12} sm={6} md={4} key={portfolio.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{portfolio.name}</Typography>
                <Typography variant="body2">{portfolio.description}</Typography>
                <UpdatePortfolio portfolio={portfolio} onPortfolioUpdated={reloadPortfolios} />
                <DeletePortfolio portfolioId={portfolio.id} onPortfolioDeleted={reloadPortfolios} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PortfolioList;
