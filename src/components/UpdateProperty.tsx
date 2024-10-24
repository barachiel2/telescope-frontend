import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Property } from '../api/property/types';
import { updateProperty } from '../api/property/update';

interface UpdatePropertyProps {
  property: Property;
  onPropertyUpdated: () => void; // Callback to refresh the property list after update
}

const UpdateProperty: React.FC<UpdatePropertyProps> = ({ property, onPropertyUpdated }) => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(property.address);
  const [estimatedValue, setEstimatedValue] = useState(property.estimated_value);
  const [constructionYear, setConstructionYear] = useState(property.construction_year);
  const [squareFootage, setSquareFootage] = useState(property.square_footage);

  const handleUpdate = async () => {
    const updated = await updateProperty(property.id, {
      address,
      estimated_value: estimatedValue,
      construction_year: constructionYear,
      square_footage: squareFootage,
    });

    if (updated) {
      onPropertyUpdated();
      setOpen(false);
    } else {
      console.error('Failed to update property');
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Update Property
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Property</DialogTitle>
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
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateProperty;
