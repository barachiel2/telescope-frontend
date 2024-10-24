import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { fetchPortfolios } from '../../api/portfolio/fetch';
import { Portfolio } from '../../api/portfolio/types';
import CreatePortfolio from './CreatePortfolio';
import DeletePortfolio from './DeletePortfolio';
import UpdatePortfolio from './UpdatePortfolio';
import PropertyListModal from '../property/PropertyListModal';

const PortfolioList: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleShowProperties = (portfolioId: number) => {
    setSelectedPortfolioId(portfolioId);
    setIsModalOpen(true);
  };

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
    <div className="bg-blue-50 p-8 min-h-screen">
      <CreatePortfolio onPortfolioCreated={reloadPortfolios} />
      <Grid container spacing={3}>
        {portfolios.map((portfolio) => (
          <Grid item xs={12} sm={6} md={4} key={portfolio.id}>
            <Card className="transition duration-300 transform hover:scale-105 bg-white shadow-lg hover:bg-blue-100 border-t-4 border-blue-700">
              <CardContent className="p-4">
                <Typography variant="h5" className="text-blue-900 font-bold">{portfolio.name}</Typography>
                <UpdatePortfolio portfolio={portfolio} onPortfolioUpdated={reloadPortfolios} />
                <DeletePortfolio portfolioId={portfolio.id} onPortfolioDeleted={reloadPortfolios} />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleShowProperties(portfolio.id)}
                  className="mt-4"
                >
                  Show Properties
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
