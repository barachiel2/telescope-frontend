import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { createPortfolio } from '../../api/portfolio/create';
import CustomButton from '../CustomButton';

interface CreatePortfolioProps {
  onPortfolioCreated: () => void;
}

const CreatePortfolio: React.FC<CreatePortfolioProps> = ({ onPortfolioCreated }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [geographicRegion, setGeographicRegion] = useState('');

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = async () => {
    const newPortfolio = await createPortfolio(name, description, geographicRegion, '');
    if (newPortfolio) {
      onPortfolioCreated();
      handleClose();
    } else {
      alert('Failed to create portfolio');
    }
  };

  return (
    <>
      <CustomButton onClick={handleClickOpen} label="Create Portfolio" />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Portfolio</DialogTitle>
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
          <TextField
            margin="dense"
            label="Geographic Region"
            fullWidth
            value={geographicRegion}
            onChange={(e) => setGeographicRegion(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose} label="Cancel" colorType="secondary" />
          <CustomButton onClick={handleCreate} label="Create" />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePortfolio;
