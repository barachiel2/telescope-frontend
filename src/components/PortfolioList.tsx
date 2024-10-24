import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { fetchPortfolios } from '../api/portfolio/fetch';
import { fetchProperties } from '../api/property/fetch';
import { Portfolio } from '../api/portfolio/types';
import { Property } from '../api/property/types';
import CreatePortfolio from './CreatePortfolio';
import DeletePortfolio from './DeletePortfolio';
import UpdatePortfolio from './UpdatePortfolio';
import CreateProperty from './CreateProperty';
import DeleteProperty from './DeleteProperty';
import UpdateProperty from './UpdateProperty';

const PortfolioList: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch portfolios and properties
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      const fetchedPortfolios = await fetchPortfolios();
      const fetchedProperties = await fetchProperties();

      if (fetchedPortfolios && fetchedProperties) {
        setPortfolios(fetchedPortfolios);
        setProperties(fetchedProperties);
      } else {
        setError('Failed to fetch portfolios or properties');
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const reloadPortfolios = async () => {
    const fetchedPortfolios = await fetchPortfolios();
    if (fetchedPortfolios) {
      setPortfolios(fetchedPortfolios);
    }
  };

  const reloadProperties = async () => {
    const fetchedProperties = await fetchProperties();
    if (fetchedProperties) {
      setProperties(fetchedProperties);
    }
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
                <UpdatePortfolio portfolio={portfolio} onPortfolioUpdated={reloadPortfolios} />
                <DeletePortfolio portfolioId={portfolio.id} onPortfolioDeleted={reloadPortfolios} />
                <CreateProperty portfolioId={portfolio.id} onPropertyCreated={reloadProperties} />
                <Typography variant="h6">Properties:</Typography>
                <Grid container spacing={2}>
                  {properties
                    .filter((property) => property.portfolio === portfolio.id)
                    .map((property) => (
                      <Grid item key={property.id} xs={12}>
                        <Card>
                          <CardContent>
                            <Typography variant="body1">{property.address}</Typography>
                            <UpdateProperty property={property} onPropertyUpdated={reloadProperties} />
                            <DeleteProperty propertyId={property.id} onPropertyDeleted={reloadProperties} />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PortfolioList;
