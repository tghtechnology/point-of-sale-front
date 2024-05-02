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
        const { nombre, tipo_venta, precio, representacion, color,imagen, id_categoria} = newArticle; 
        try {
            const res= await createArticle({ nombre, tipo_venta, precio, representacion, color,imagen, id_categoria}); 
            if(res.status === 200 || res.status === 201){
              return res.data;
            } else {
              return null;
            }
        } catch (error) {
            console.error("Error creating article:", error);
            return null; 
        }
    }

    const handleEditArticle = async (updateArticle) => {
        const { nombre, tipo_venta, precio, ref, representacion, id_categoria } = updateArticle;
        try {
          const response = await editArticles(updateArticle.id, { nombre, tipo_venta, precio, ref, representacion, id_categoria });
          if (response && (response.status === 200 || response.status === 204)) {
            console.log('Artículo editado exitosamente');
            const updatedList = listArticle.map(article => {
              if (article.id === updateArticle.id) {
                return { ...article, ...updateArticle };
              } else {
                return article;
              }
            });
            setListArticle(updatedList);
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error('Error editing artículo:', error);
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