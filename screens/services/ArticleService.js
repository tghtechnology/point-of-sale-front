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

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    const { data, status } = await apiClient.post(
      `/articulo/crear`,
      newArticle,
      {
        headers,
      }
    );

    if (status === 200 || status === 201) {
      return { data, status };
    } else {
      console.error("Respuesta inesperada:", status);
      return { status, data: null };
    }
  } catch (error) {
    console.error("Error creando artículo:", error);
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    } else {
      return { status: 500, data: null };
    }
  }
};
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
    const token = await getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const { data, status } = await apiClient.put(`/articulo/actualizar/${id}`, updateArticle,
      {
        headers,
      }
    );
    return {
      data,
      status
    };
  } catch (error) {
    throw new Error('Error al editar el articulo');
  }
};

const deleteArticles = async (id) => {
  try {
    const token = await getToken();
    const { data, status } = await apiClient.delete(`/articulo/eliminar/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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