import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { deletePortfolio } from '../api/portfolio/delete'; // Your API call

interface DeletePortfolioProps {
  portfolioId: number;
  onPortfolioDeleted: () => void; // Callback function to reload the portfolio list after deleting
}

const DeletePortfolio: React.FC<DeletePortfolioProps> = ({ portfolioId, onPortfolioDeleted }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const success = await deletePortfolio(portfolioId);
    if (success) {
      onPortfolioDeleted();
      handleClose();
    } else {
      alert('Failed to delete portfolio');
    }
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Delete Portfolio
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this portfolio?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePortfolio;
