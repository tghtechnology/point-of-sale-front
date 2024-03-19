import { useEffect,useState } from "react";
import { createCategory,listCategories } from "../../services/CategoryService";
import CategoryContext from "./CategoryContext";


const CategoryProvider = ({children}) => {

    const [listCategory, setListCategory] = useState([]);
    
    useEffect(() => {
        const getCategory = async () => {
            try {
                const { data, status } = await listCategories();
                if (status === 200) {
                    setListCategory(data); 
                    
                } else {
                    console.log("Error al cargar categorías:", status);
                }
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        }
        getCategory();
    }, []);

    const handleCreateCategory = async (newCategory) => {
        const { nombre, color } = newCategory; 
        try {
            const { status } = await createCategory({ nombre, color }); 
            if(status === 200 || status === 201){
              return true;
            } else {
              return false;
            }
        } catch (error) {
            console.error("Error creating category:", error);
            return false; 
        }
    }

    

    return (
        <CategoryContext.Provider value={{ handleCreateCategory,listCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;
