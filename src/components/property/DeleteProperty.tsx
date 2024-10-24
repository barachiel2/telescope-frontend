import React from 'react';
import { Button } from '@mui/material';
import { deleteProperty } from '../../api/property/delete';

interface DeletePropertyProps {
  propertyId: number;
  onPropertyDeleted: () => void; // Callback to refresh the property list after deletion
}

const DeleteProperty: React.FC<DeletePropertyProps> = ({ propertyId, onPropertyDeleted }) => {
  const handleDelete = async () => {
    const success = await deleteProperty(propertyId);
    if (success) {
      onPropertyDeleted();
    } else {
      console.error('Failed to delete property');
    }
  };

  return (
    <Button variant="outlined" color="secondary" onClick={handleDelete}>
      Delete Property
    </Button>
  );
};

export default DeleteProperty;
