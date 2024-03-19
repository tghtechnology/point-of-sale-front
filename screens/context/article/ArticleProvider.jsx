import { useEffect,useState } from "react";
import { createArticle, listArticles, listArticlesById, updateArticles } from "../../services/ArticleService";
import ArticleContext from "./ArticleContext";
const ArticleProvider = ({children}) => {
    const [listArticle, setListArticle] = useState([]);
    const [listArticlesById, setListArticleById] = useState([]);
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

    useEffect(() => {
        const getArticleById = async () => {
            try {
                const { data, status } = await listArticlesById();
                if (status === 200) {
                    setListArticleById(data); 
                    
                } else {
                    console.log("Error al cargar articulos:", status);
                }
            } catch (error) {
                console.error("Error al cargar articulos:", error);
            }
        }
        getArticleById();
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

    const handleUpdateArticle = async(update) => {
        const {nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria} = update; 
        try {
            const { status } = await updateArticles({nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria}); 
            if(status === 200 || status === 201){
              return true;
            } else {
              return false;
            }
        } catch (error) {
            console.error("Error actualizando article:", error);
            return false; 
        }
    }

    return (
        <ArticleContext.Provider value={{ handleCreateArticle,listArticle,listArticlesById,handleUpdateArticle }}>
            {children}
        </ArticleContext.Provider>
    )
}

export default ArticleProvider;