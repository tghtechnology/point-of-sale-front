
import React, { useState } from 'react';
import TotalContext from './TotalContext';

export const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0);

  return (
    <TotalContext.Provider value={{ total, setTotal }}>
      {children}
    </TotalContext.Provider>
  );
};
