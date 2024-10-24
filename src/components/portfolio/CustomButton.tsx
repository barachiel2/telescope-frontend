import React from 'react';

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  colorType?: 'primary' | 'secondary';
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, label, colorType = 'primary' }) => {
  const borderColor = colorType === 'primary' ? '#29a745' : '#d9534f'; // Green or red outline
  const hoverBgColor = colorType === 'primary' ? '#29a745' : '#d9534f'; // Fill color on hover
  const hoverTextColor = '#fff'; // White text on hover

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#1C1C1C', // Black background
        color: borderColor, // Text color matches the border color
        padding: '10px 20px',
        borderRadius: '4px',
        border: `2px solid ${borderColor}`, // Border outline
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s, transform 0.3s ease-in-out',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
      }}
      onMouseOver={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = hoverBgColor;
        (e.target as HTMLButtonElement).style.color = hoverTextColor; // Text becomes white on hover
      }}
      onMouseOut={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = '#1C1C1C'; // Reset to black
        (e.target as HTMLButtonElement).style.color = borderColor; // Text color matches the border again
      }}
    >
      {label}
    </button>
  );
};

export default CustomButton;
