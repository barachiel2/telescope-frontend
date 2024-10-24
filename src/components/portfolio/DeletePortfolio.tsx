import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { deletePortfolio } from '../../api/portfolio/delete';
import CustomButton from '../CustomButton';

interface DeletePortfolioProps {
  portfolioId: number;
  onPortfolioDeleted: () => void; 
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
      <CustomButton onClick={handleClickOpen} label="Delete Portfolio" colorType="secondary" />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this portfolio?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose} label="Cancel" />
          <CustomButton onClick={handleDelete} label="Delete" colorType="secondary" />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePortfolio;
