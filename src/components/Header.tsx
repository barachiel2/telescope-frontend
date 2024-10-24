import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      sx={{
        backgroundColor: '#1C1C1C', // Dark background
        boxShadow: 'none',          
        padding: '0.5rem 1rem',
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            color: '#29a745' // Green color (like in the footer)
          }}
        >
          Telescope Portfolio Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
