import React from 'react';

const Skeleton = ({ width = "100%", height = "1rem", className = "" }) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse skeleton rounded ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
