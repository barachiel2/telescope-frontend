import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { fetchPortfolios } from '../../api/portfolio/fetch';
import { fetchPropertyCount } from '../../api/property/fetchPropertyCount'; // Fetch count of properties
import { Portfolio } from '../../api/portfolio/types';
import CreatePortfolio from './CreatePortfolio';
import DeletePortfolio from './DeletePortfolio';
import UpdatePortfolio from './UpdatePortfolio';
import PropertyListModal from '../property/PropertyListModal';
import CustomButton from '../CustomButton';

const PortfolioList: React.FC = () => {
  // Extracted color variables for easier modification
  const backgroundColor = '#f7f7f7';
  const cardBackgroundColor = '#2d2d2d';
  const borderColor = '#29a745';
  const textColor = '#29a745';

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [propertyCounts, setPropertyCounts] = useState<{ [key: number]: number }>({});
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadPortfolios = async () => {
      setLoading(true);
      setError(null);
      const fetchedPortfolios = await fetchPortfolios();
      if (fetchedPortfolios) {
        setPortfolios(fetchedPortfolios);
        // Fetch property counts for each portfolio
        fetchedPortfolios.forEach(async (portfolio) => {
          const count = await fetchPropertyCount(portfolio.id);
          if (count !== null) {
            setPropertyCounts((prevCounts) => ({ ...prevCounts, [portfolio.id]: count }));
          }
        });
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
    <div style={{ backgroundColor: backgroundColor, padding: '2rem', minHeight: '100vh' }}>
      {/* Center the Create Portfolio button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <CreatePortfolio onPortfolioCreated={reloadPortfolios} />
      </div>

      <Grid container spacing={3}>
        {portfolios.map((portfolio) => (
          <Grid item xs={12} sm={6} md={4} key={portfolio.id}>
            <Card
              style={{
                backgroundColor: cardBackgroundColor,
                borderTop: `4px solid ${borderColor}`,
                transition: 'transform 0.3s',
              }}
              className="hover:scale-105 hover:bg-gray-700 shadow-lg"
            >
              <CardContent className="p-4">
                <Typography variant="h5" style={{ color: textColor, fontWeight: 'bold' }}>
                  {portfolio.name}
                </Typography>
                <UpdatePortfolio portfolio={portfolio} onPortfolioUpdated={reloadPortfolios} />
                <DeletePortfolio portfolioId={portfolio.id} onPortfolioDeleted={reloadPortfolios} />

                {/* Show Properties button and property count */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <CustomButton 
                    onClick={() => handleShowProperties(portfolio.id)} 
                    label="Show Properties" 
                    colorType="primary" 
                  />
                  <Typography variant="body2" style={{ color: textColor, marginLeft: '1rem' }}>
                    Properties: {propertyCounts[portfolio.id] || 0}
                  </Typography>
                </div>
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
