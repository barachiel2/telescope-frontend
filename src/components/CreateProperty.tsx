import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { createProperty } from '../api/property/create';

interface CreatePropertyProps {
  portfolioId: number;
  onPropertyCreated: () => void; // Callback to refresh the property list after creation
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
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Property
      </Button>
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
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateProperty;
