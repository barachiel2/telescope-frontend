import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container, Typography } from '@mui/material';
import PortfolioList from './PortfolioList';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Container component="main" sx={{ padding: '16px' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Welcome to Telescope Portfolio Manager
        </Typography>
        {/* Include the PortfolioList component */}
        <PortfolioList />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
