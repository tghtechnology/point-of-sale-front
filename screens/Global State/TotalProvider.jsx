import React, { useState } from 'react';
import TotalContext from './TotalContext';

export const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [articleNames, setArticleNames] = useState([]);
  const [articleQuantities, setArticleQuantities] = useState([]); 
  const [articleIds, setArticleIds] = useState([]); // Nuevo estado para almacenar los IDs de los artículos
  const [ventaId, setVentaId] = useState(null);

  return (
    <TotalContext.Provider value={{ 
      total, 
      setTotal, 
      articleNames, 
      setArticleNames, 
      articleQuantities, 
      setArticleQuantities, 
      articleIds,
      setArticleIds,
      ventaId, 
      setVentaId
    }}>
      {children}
    </TotalContext.Provider>
  );
};
