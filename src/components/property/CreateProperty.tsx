import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { createProperty } from '../../api/property/create';
import CustomButton from '../CustomButton';

interface CreatePropertyProps {
  portfolioId: number;
  onPropertyCreated: () => void;
}

const CreateProperty: React.FC<CreatePropertyProps> = ({ portfolioId, onPropertyCreated }) => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [estimatedValue, setEstimatedValue] = useState<number | undefined>(undefined);
  const [constructionYear, setConstructionYear] = useState<number | undefined>(undefined);
  const [squareFootage, setSquareFootage] = useState<number | undefined>(undefined);

  const handleCreate = async () => {
    if (address && estimatedValue && constructionYear && squareFootage) {
      const success = await createProperty(portfolioId, address, estimatedValue, constructionYear, squareFootage);
      if (success) {
        onPropertyCreated();
        setOpen(false);
      } else {
        console.error('Failed to create property');
      }
    }
  };

  return (
    <div>
      <CustomButton onClick={() => setOpen(true)} label="Add Property" colorType="primary" />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Property</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Address"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Estimated Value"
            fullWidth
            type="number"
            value={estimatedValue}
            onChange={(e) => setEstimatedValue(Number(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Construction Year"
            fullWidth
            type="number"
            value={constructionYear}
            onChange={(e) => setConstructionYear(Number(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Square Footage"
            fullWidth
            type="number"
            value={squareFootage}
            onChange={(e) => setSquareFootage(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => setOpen(false)} label="Cancel" colorType="secondary" />
          <CustomButton onClick={handleCreate} label="Create" colorType="primary" />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateProperty;
