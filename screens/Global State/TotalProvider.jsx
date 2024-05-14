
import React, { useState } from 'react';
import TotalContext from './TotalContext';

export const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [tipoPago, setTipoPago] = useState('');

  return (
    <TotalContext.Provider value={{ total, setTotal, tipoPago, setTipoPago}}>
      {children}
    </TotalContext.Provider>
  );
};