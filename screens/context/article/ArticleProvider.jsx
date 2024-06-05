import React, { useState, useEffect, useContext } from 'react';
import { createArticle, listArticles, editArticles,deleteArticles,ArticleById } from "../../services/ArticleService";
import ArticleContext from "./ArticleContext";
import AuthContext from '../auth/AuthContext';



const ArticleProvider = ({children}) => {
    const [listArticle, setListArticle] = useState([]);
    const { isAuth } = useContext(AuthContext);

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
    }, [isAuth]);

    const handleCreateArticle = async (newArticle) => {
      try {
        const res = await createArticle(newArticle);
        if (res.status === 200 || res.status === 201) {
          setListArticle((prevList) => [...prevList, res.data]);
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