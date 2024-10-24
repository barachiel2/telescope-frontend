import React from 'react';
import '.././App.css'
import Header from './Header';
import Footer from './Footer';
import { Container, Typography } from '@mui/material';
import PortfolioList from './portfolio/PortfolioList';
// @ts-ignore
import BackgroundVideoPlayer from 'react-background-video-player';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* Background Video */}
      <BackgroundVideoPlayer
        className="video-background"
        src="/videos/city-timelapse.mp4"
        autoPlay
        muted
        loop
      />
      <Header />
      <Container component="main" sx={{ padding: '16px', zIndex: 2, position: 'relative' }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black with 50% transparency
          padding: '20px',
          borderRadius: '8px'
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'white' }}>
            Welcome to Telescope Portfolio Manager
          </Typography>
        </div>
        <PortfolioList />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
