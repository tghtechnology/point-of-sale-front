import { createArticle, listCategory } from "../../services/ArticleService";
import ArticleContext from "./ArticleContext";

const ArticleProvider = ({children}) => {
    const handleCreateArticle = async (newArticle) => {
        const {nombre, tipo_venta, precio, coste,ref, representacion} = newArticle; 
        try {
            const { status } = await createArticle({ nombre, tipo_venta, precio, coste,ref, representacion }); 
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

    
    return (
        <ArticleContext.Provider value={{ handleCreateArticle }}>
            {children}
        </ArticleContext.Provider>
    )
}

export default ArticleProvider;