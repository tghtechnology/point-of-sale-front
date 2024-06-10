import React, { useState } from 'react';
import TotalContext from './TotalContext';

export const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [articleNames, setArticleNames] = useState([]);
  const [articleQuantities, setArticleQuantities] = useState([]); 
  const [articleIds, setArticleIds] = useState([]); 
  const [ventaId, setVentaId] = useState(null);
  const [articleQuantitiesReembolsadas, setarticleQuantitiesReembolsadas] = useState([]);
  return (
    <TotalContext.Provider value={{ 
      total, 
      setTotal, 
      articleNames, 
      setArticleNames, 
      articleQuantities, 
      setArticleQuantities,
      articleQuantitiesReembolsadas,
      setarticleQuantitiesReembolsadas,
      articleIds,
      setArticleIds,
      ventaId, 
      setVentaId
    }}>
      {children}
    </TotalContext.Provider>
  );
};
