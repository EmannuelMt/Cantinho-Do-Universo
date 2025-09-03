import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClass = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  }[size];

  return (
    <div className={`loading-spinner ${sizeClass} ${className}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;