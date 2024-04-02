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
        const {nombre, tipo_venta, precio, ref, representacion, id_categoria} = newArticle; 
        try {
            const { status } = await createArticle({nombre, tipo_venta, precio, ref, representacion, id_categoria}); 
            if(status === 200 || status === 201){
              return true;
            } else {
              return false;
            }
        } catch (error) {
            console.error("Error creating article:", error);
            return false; 
        }
    }

    const handleEditArticle = async(updateArticle) => {
        const {nombre, tipo_venta, precio, ref, representacion, id_categoria} = updateArticle;
        try {
            const response = await editArticles(updateArticle.id, { nombre, tipo_venta, precio, ref, representacion, id_categoria} ); 
            if(response && response.status === 200){
                console.log('Articulo editado exitosamente');
                return true; 
            } else if (response && response.status === 204) {
                console.log('Articulo editado exitosamente');
                return true; 
            } else {
                return false; 
            }
          } catch (error) {
            console.error('Error editing articulo:', error);
            return false; 
          }
      };

        
  

    const handleDeleteArticle = async (text_id) => {
        try {
            const { status } = await deleteArticles(text_id);
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
        <ArticleContext.Provider value={{ handleCreateArticle,listArticle,handleEditArticle, handleDeleteArticle }}>
            {children}
        </ArticleContext.Provider>
    )
}

export default ArticleProvider;