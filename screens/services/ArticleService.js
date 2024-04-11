import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error getting token:', error);
        throw new Error('Error al obtener el token');
    }
};

const createArticle = async (newArticle) => {
    try {
        const token = await getToken();
        const { data, status } = await apiClient.post(`/articulo/crear`, newArticle, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            data,
            status
        }
    } catch (error) {
        console.error("Error creating article:", error);
        return { status: 500, error: error.message };
    }
}

const listArticles = async () => {
    try {
        const token = await getToken();
        const { data, status } = await apiClient.get(`/articulo/listar`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            data,
            status
        };
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar articulos');
    }
}

const editArticles = async (id, updateArticle) => {
    try {
        const { data, status } = await apiClient.put(`/articulo/actualizar/${id}`, updateArticle);
        return {
            data,
            status
        };
    } catch (error) {
        throw new Error('Error al editar el articulo');
    }
};

const deleteArticles = async (text_id) => {
    try {
        const { data, status } = await apiClient.delete(`/articulo/eliminar/${text_id}`);
        return {
            data,
            status
        };
    } catch (error) {
        console.log('Error:', error.response.data);
    }
}


export {
    createArticle,
    listArticles,
    editArticles,
    deleteArticles
}