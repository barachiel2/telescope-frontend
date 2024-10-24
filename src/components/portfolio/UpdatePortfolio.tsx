import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { updatePortfolio } from '../../api/portfolio/update';
import { Portfolio } from '../../api/portfolio/types';
import CustomButton from '../CustomButton';

interface UpdatePortfolioProps {
  portfolio: Portfolio;
  onPortfolioUpdated: () => void; 
}

const UpdatePortfolio: React.FC<UpdatePortfolioProps> = ({ portfolio, onPortfolioUpdated }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(portfolio.name);
  const [description, setDescription] = useState(portfolio.description);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    const success = await updatePortfolio(portfolio.id, name, description);
    if (success) {
      onPortfolioUpdated();
      handleClose();
    } else {
      alert('Failed to update portfolio');
    }
  };

  return (
    <>
      <CustomButton onClick={handleClickOpen} label="Update Portfolio" />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Portfolio</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Portfolio Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose} label="Cancel" colorType="secondary" />
          <CustomButton onClick={handleUpdate} label="Update" />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdatePortfolio;
