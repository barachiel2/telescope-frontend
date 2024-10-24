import React from 'react';
import { Button } from '@mui/material';

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  colorType?: 'primary' | 'secondary';
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, label, colorType = 'primary' }) => {
  const bgColor = colorType === 'primary' ? 'bg-green-600' : 'bg-red-600';
  const hoverColor = colorType === 'primary' ? 'hover:bg-green-700' : 'hover:bg-red-700';

  return (
    <Button
      onClick={onClick}
      className={`text-white font-bold py-2 px-4 rounded ${bgColor} ${hoverColor} transition-opacity hover:opacity-80`}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
