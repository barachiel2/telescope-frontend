import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'gray',
        color: 'white',
        padding: '16px',
        textAlign: 'center',
        mt: 'auto',
      }}
    >
      <Typography variant="body2">&copy; 2024 Telescope Manager</Typography>
    </Box>
  );
};

export default Footer;
