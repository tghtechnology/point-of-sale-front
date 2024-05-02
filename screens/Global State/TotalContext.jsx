import React, { createContext, useContext } from 'react';

const TotalContext = createContext();

export const useTotal = () => useContext(TotalContext);

export default TotalContext;
