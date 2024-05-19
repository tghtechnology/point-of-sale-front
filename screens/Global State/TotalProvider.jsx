
import React, { useState } from 'react';
import TotalContext from './TotalContext';

export const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [articleNames, setArticleNames] = useState([]);

  return (
    <TotalContext.Provider value={{ total, setTotal, articleNames, setArticleNames}}>
      {children}
    </TotalContext.Provider>
  );
};
