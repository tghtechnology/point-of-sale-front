import { useEffect,useState } from "react";
import { createArticle, listArticles, updateArticles } from "../../services/ArticleService";
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

    const handleEditArticle = async(id, updateArticle) => {
        try {
            const { status } = await updateArticles(id, updateArticle); 
            if(status === 200 || status === 201){
                const updateData = listArticle.map((article) => 
                article.id === id? {...article, ...updateArticle} : article);
                setListArticle(updateData);
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
        <ArticleContext.Provider value={{ handleCreateArticle,listArticle,handleEditArticle }}>
            {children}
        </ArticleContext.Provider>
    )
}

export default ArticleProvider;