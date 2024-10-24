import React from 'react';
import CustomButton from '../CustomButton';
import { deleteProperty } from '../../api/property/delete';

interface DeletePropertyProps {
  propertyId: number;
  onPropertyDeleted: () => void;
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
    <CustomButton onClick={handleDelete} label="Delete Property" colorType="secondary" />
  );
};

export default DeleteProperty;
