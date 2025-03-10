import React from 'react';

export interface TestButtonProps {
  label: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  onClick?: () => void;
}

const TestButton: React.FC<TestButtonProps> = ({
  label,
  primary = false,
  size = 'medium',
  backgroundColor,
  onClick
}) => {
  const baseStyle = 'font-bold py-2 px-4 rounded transition duration-300 ease-in-out';
  const sizeStyle = size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base';
  const colorStyle = primary
    ? 'bg-blue-500 text-white hover:bg-blue-700'
    : 'bg-gray-300 text-gray-800 hover:bg-gray-400';

  return (
    <button
      className={`${baseStyle} ${sizeStyle} ${colorStyle}`}
      // style={{ backgroundColor }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TestButton;
