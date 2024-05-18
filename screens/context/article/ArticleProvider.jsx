import { useEffect,useState } from "react";
import { createArticle, listArticles, editArticles,deleteArticles } from "../../services/ArticleService";
import ArticleContext from "./ArticleContext";



const ArticleProvider = ({children}) => {
    const [listArticle, setListArticle] = useState([]);

    useEffect(() => {
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
    }, []);

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
        

    const handleEditArticle = async (updateArticle) => {
      const articleId = updateArticle.id; // El ID debería estar aquí
    
      if (!articleId) {
        console.error("El ID del artículo es undefined");
        return false;
      }
    
      const formData = updateArticle.formData;
    
      try {
        const response = await editArticles(articleId, formData);
    
        if (response && (response.status === 200 || 204)) {
          console.log("Artículo editado exitosamente");
          return true;
        } else {
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


    return (
        <ArticleContext.Provider value={{ handleCreateArticle,listArticle,setListArticle,handleEditArticle, handleDeleteArticle }}>
            {children}
        </ArticleContext.Provider>
    )
}

export default ArticleProvider;