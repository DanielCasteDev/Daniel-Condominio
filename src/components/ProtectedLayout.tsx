import React from 'react';
import Token from '../middleware/token'; 
const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Token /> 
      {children} 
    </>
  );
};

export default ProtectedLayout;