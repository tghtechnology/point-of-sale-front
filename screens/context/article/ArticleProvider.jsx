import { useEffect,useState } from "react";
import { createArticle, listArticles, editArticles,updateArticle,deleteArticles } from "../../services/ArticleService";
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
        const {nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria} = newArticle; 
        try {
            const { status } = await createArticle({nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria}); 
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

    const handleEditArticle = async(text_id, updateArticle) => {
        console.log(text_id)
        try {
            const response = await editArticles(text_id, updateArticle); 
            if(response && response.status === 200){
                const updateData = listArticle.map((article) => 
                article.text_id === text_id? {...article, ...updateArticle} : article);
                setListArticle(updateData);
                console.log('Articulo editado exitosamente');
            } else if (response && response.status === 204) {
              console.log('Articulos editado exitosamente');
            }
          } catch (error) {
            console.error('Error editing articulo:', error);
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