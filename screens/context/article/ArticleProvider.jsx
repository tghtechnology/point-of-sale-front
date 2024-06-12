import React, { useState, useEffect, useContext } from 'react';
import { createArticle, listArticles, editArticles,deleteArticles,ArticleById } from "../../services/ArticleService";
import ArticleContext from "./ArticleContext";
import AuthContext from '../auth/AuthContext';
import CategoryContext from '../category/CategoryContext';


/**
 * Componente ArticleProvider
 *
 * Este componente proporciona funcionalidades relacionadas con artículos y gestión del estado
 * a sus componentes hijos. Utiliza la API de Contexto de React para gestionar artículos y
 * manejar operaciones CRUD.
 *
 * @param {Object} props - El objeto de propiedades.
 * @param {React.ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto.
 *
 * @returns {JSX.Element} El componente ArticleProvider.
 */

const ArticleProvider = ({children}) => {
    const [listArticle, setListArticle] = useState([]);
    const { isAuth } = useContext(AuthContext);
    const { getCategories } = useContext(CategoryContext);

    useEffect(() => {
      if (isAuth) {
        const getArticle = async () => {
            try {
              
                const { data, status } = await listArticles();
                if (status === 200) {
                    setListArticle(data); 
                } else {
                    console.log("Error al cargar articulos:", status);
                }
            } catch (error) {
                console.error("Error al cargar articulos:", error);
            }
        }
        getArticle();
      }
    }, [isAuth, getCategories]);


    /**
     * Crea un nuevo artículo.
     * @param {Object} newArticle - El artículo a crear.
     * @param {string} newArticle.nombre - El nombre del artículo.
     * @param {string} newArticle.tipo_venta - El tipo de venta del artículo.
     * @param {number} newArticle.precio - El precio del artículo.
     * @param {string} newArticle.color - El color del artículo.
     * @param {number} newArticle.id_categoria - El ID de la categoría del artículo.
     * @param {string} newArticle.imagen - La URL de la imagen del artículo.
     * @returns {Object|null} El artículo creado o null si la creación falló.
     * @throws {Error} - Devuelve un error si hay un problema al crear el artículo.
     */

    const handleCreateArticle = async (newArticle) => {
      try {
        const res = await createArticle(newArticle);
        if (res.status === 200 || res.status === 201) {
          setListArticle((prevList) => [...prevList, res.data]);
          await getCategories()
          return res.data;
        } else {
          console.error("Error al crear el artículo:", res.status);
          return null;
        }
      } catch (error) {
        console.error("Error creando el artículo:", error);
        return null;
      }
    };
        

    /**
     * Edita un artículo existente.
     * @param {number|string} id - El ID del artículo a editar.
     * @param {Object} updateArticle - Los datos actualizados del artículo.
     * @param {string} updateArticle.nombre - El nombre del artículo.
     * @param {string} updateArticle.tipo_venta - El tipo de venta del artículo.
     * @param {number} updateArticle.precio - El precio del artículo.
     * @param {string} updateArticle.color - El color del artículo.
     * @param {number} updateArticle.id_categoria - El ID de la categoría del artículo.
     * @param {string} updateArticle.imagen - La URL de la imagen del artículo.
     * @returns {Object|boolean} El artículo actualizado o false si la actualización falló.
     * @throws {Error} - Devuelve un error si hay un problema al editar el artículo.
     */

    const handleEditArticle = async (id, updateArticle) => {
      try {
          const response = await editArticles(id, updateArticle);
          if (response.status === 200) {
              console.log("Artículo editado exitosamente");
              const updatedArticle = response.data;
              const updatedList = listArticle.map((article) =>
                  article.id === id ? updatedArticle : article
              );
              setListArticle(updatedList); 
              return updatedArticle;
          } else {
              console.error("La edición no fue exitosa:", response.status);
              return false;
          }
      } catch (error) {
          console.error("Error al editar el artículo:", error);
          return false;
      }
    };
    

    /**
     * Elimina un artículo.
     * @param {number|string} id - El ID del artículo a eliminar.
     * @returns {boolean} True si la eliminación fue exitosa, false en caso contrario.
     * @throws {Error} - Devuelve un error si hay un problema al eliminar el artículo.
     */

    const handleDeleteArticle = async (id) => {
        try {
            const { status } = await deleteArticles(id);
            if (status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error deleting article:", error);
            return false;
        }
    }

    /**
     * Obtiene un artículo por su ID.
     * @param {number|string} id - El ID del artículo a obtener.
     * @returns {Object|null} El artículo obtenido o null si la obtención falló.
     * @throws {Error} - Devuelve un error si hay un problema al obtener el artículo.
     */
    
    const handleArticleById = async (id) => {
      try {
        const res = await ArticleById(id);
        if (res.status === 200 || res.status === 201) {
          return res.data;
        } else {
          console.error("Failed to get article:", res.status);
          return null;
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        return null;
      }
    }

    return (
        <ArticleContext.Provider value={{ handleCreateArticle,listArticle,setListArticle,handleEditArticle, handleDeleteArticle,handleArticleById }}>
            {children}
        </ArticleContext.Provider>
    )
}

export default ArticleProvider;