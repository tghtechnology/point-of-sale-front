import apiClient from "../apiss/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Obtiene el token de autenticación desde el almacenamiento local.
 *
 * @returns {Promise<string>} - El token de autenticación.
 * @throws {Error} - Si ocurre un error al obtener el token.
 *
 * @example
 * getToken()
 *   .then(token => console.log('Token obtenido:', token))
 *   .catch(error => console.error(error));
 */
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    throw new Error('Error al obtener el token');
  }
};

/**
 * Crea un nuevo artículo.
 *
 * @param {FormData} newArticle - Los datos del nuevo artículo.
 * @returns {Promise<Object>} - Un objeto que contiene los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error durante la creación del artículo.
 *
 * @example
 * const formData = new FormData();
 * formData.append('title', 'Nuevo Artículo');
 * createArticle(formData)
 *   .then(response => console.log('Artículo creado:', response))
 *   .catch(error => console.error('Error:', error));
 */

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

/**
 * Obtiene la lista de artículos.
 *
 * @returns {Promise<Object>} - Un objeto que contiene los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al cargar los artículos.
 *
 * @example
 * listArticles()
 *   .then(response => console.log('Artículos:', response))
 *   .catch(error => console.error('Error:', error));
 */
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
};

/**
 * Edita un artículo por su ID.
 *
 * @param {string} id - El ID del artículo a editar.
 * @param {FormData} updateArticle - Los nuevos datos del artículo.
 * @returns {Promise<Object>} - Un objeto que contiene los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al editar el artículo.
 *
 * @example
 * const formData = new FormData();
 * formData.append('title', 'Artículo Actualizado');
 * editArticles('123', formData)
 *   .then(response => console.log('Artículo editado:', response))
 *   .catch(error => console.error('Error:', error));
 */

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
/**
 * Elimina un artículo por su ID.
 *
 * @param {string} id - El ID del artículo a eliminar.
 * @returns {Promise<Object>} - Un objeto que contiene los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al eliminar el artículo.
 *
 * @example
 * deleteArticles('123')
 *   .then(response => console.log('Artículo eliminado:', response))
 *   .catch(error => console.error('Error:', error));
 */
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
};
/**
 * Obtiene un artículo por su ID.
 *
 * @param {string} id - El ID del artículo a obtener.
 * @returns {Promise<Object>} - Un objeto que contiene los datos y el estado de la respuesta.
 * @throws {Error} - Si ocurre un error al obtener el artículo.
 *
 * @example
 * ArticleById('123')
 *   .then(response => console.log('Artículo:', response))
 *   .catch(error => console.error('Error:', error));
 */
const ArticleById=async(id)=>{
  try {
      const token = await getToken();
      const { data, status } = await apiClient.get(`/articulo/listar/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      return {
          data,
          status,
      };
  } catch (error) {
      console.log(error);
      throw error;
  }
};


export {
  createArticle,
  listArticles,
  editArticles,
  deleteArticles,
  ArticleById
}