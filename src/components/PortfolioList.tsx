import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { fetchPortfolios } from '../api/portfolio/fetch';
import { Portfolio } from '../api/portfolio/types';
import CreatePortfolio from './CreatePortfolio';
import DeletePortfolio from './DeletePortfolio';
import UpdatePortfolio from './UpdatePortfolio';
import PropertyListModal from './PropertyListModal'; // Import the PropertyListModal

const PortfolioList: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null); // Track the selected portfolio for property modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Track modal visibility

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

  const reloadPortfolios = async () => {
    const fetchedPortfolios = await fetchPortfolios();
    if (fetchedPortfolios) {
      setPortfolios(fetchedPortfolios);
    }
  };

  // Open the properties modal for a specific portfolio
  const handleShowProperties = (portfolioId: number) => {
    setSelectedPortfolioId(portfolioId);
    setIsModalOpen(true);
  };

  // Close the properties modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolioId(null);
  };

  if (loading) {
    return <Typography>Loading portfolios...</Typography>;
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

                {/* Show Properties Button */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleShowProperties(portfolio.id)}
                >
                  Show Properties
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for displaying properties */}
      {selectedPortfolioId !== null && (
        <PropertyListModal
          portfolioId={selectedPortfolioId}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PortfolioList;
