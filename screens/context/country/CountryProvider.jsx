import React, { useState } from 'react';
import { loadCountries } from '../../services/CountryService'; // Importa la función para cargar los países desde los servicios
import CountryContext from './CountryContext';

const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);

  // Método para cargar los países desde la API
  const fetchCountries = async () => {
    try {
      const countriesData = await loadCountries(); // Utiliza la función de los servicios
      setCountries(countriesData);
    } catch (error) {
      console.error('Error al cargar los países:', error);
    }
  }

  return (
    <CountryContext.Provider value={{ countries, fetchCountries }}>
      {children}
    </CountryContext.Provider>
  )
}
export default CountryProvider