import apiClient from "../apiss/AxiosConfig";
/**
 * Carga la lista de países desde el servidor.
 *
 * @returns {Promise<Object[]>} - Una promesa que resuelve con los datos de los países.
 * @throws {Error} - Si ocurre un error al cargar los países.
 *
 * @example
 * loadCountries()
 *   .then(countries => console.log('Países cargados:', countries))
 *   .catch(error => console.error('Error:', error));
 */
const loadCountries = async () => {
    try {
        const { data } = await apiClient.get(`/listaPaises`); 
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar los países'); 
    }
}

export {
    loadCountries
}