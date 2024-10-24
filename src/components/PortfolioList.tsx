import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface Portfolio {
  id: number;
  name: string;
  description: string;
}

const portfolios: Portfolio[] = [
  { id: 1, name: 'Portfolio 1', description: 'Description of Portfolio 1' },
  { id: 2, name: 'Portfolio 2', description: 'Description of Portfolio 2' },
  { id: 3, name: 'Portfolio 3', description: 'Description of Portfolio 3' },
];

const PortfolioList: React.FC = () => {
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
