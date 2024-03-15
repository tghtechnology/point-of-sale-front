import apiClient from "../apiss/AxiosConfig";

const loadCountries = async () => {
    try {
        const { data } = await apiClient.get(`/listaPaises`); // Solo necesitas 'data' aquí
        return data; // Devuelve solo los datos de los países
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar los países'); // Lanza un error para manejarlo más arriba si es necesario
    }
}

export {
    loadCountries
}