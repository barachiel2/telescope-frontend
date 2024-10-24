import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { createPortfolio } from '../api/portfolio/create'; // Your API call

interface CreatePortfolioProps {
  onPortfolioCreated: () => void; // Callback function to reload the portfolio list after creating
}

const CreatePortfolio: React.FC<CreatePortfolioProps> = ({ onPortfolioCreated }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Event Handlers
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    // Call backend API to create a portfolio
    const newPortfolio = await createPortfolio(name, description);
    if (newPortfolio) {
      onPortfolioCreated();
      handleClose();
    } else {
      alert('Failed to create portfolio');
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create Portfolio
      </Button>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePortfolio;
