import React, { useState } from 'react';
import { loadCountries } from '../../services/CountryService'; // Importa la función para cargar los países desde los servicios
import CountryContext from './CountryContext';

/**
 * Componente CountryProvider
 *
 * Este componente proporciona funcionalidades relacionadas con países y gestión del estado
 * a sus componentes hijos. Utiliza la API de Contexto de React para gestionar los países.
 *
 * @param {Object} props - El objeto de propiedades.
 * @param {React.ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto.
 *
 * @returns {JSX.Element} El componente CountryProvider.
 */

const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);

  /**
   * Método para cargar los países desde la API.
   * @returns {void}
   * @throws {Error} - Devuelve un error si hay un problema al cargar los países.
   */
  
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