import { createCategory } from "../../services/CategoryService";
import CategoryContext from "./CategoryContext";

const CategoryProvider = ({children}) => {
    const handleCreateCategory = async (newCategory) => {
        const { nombre, color } = newCategory; // Desestructura el objeto newCategory para obtener el nombre y el color
        try {
            const { status } = await createCategory({ nombre, color }); // Envía tanto el nombre como el color al servicio de creación de categorías
            if(status === 200 || status === 201){
              return true;
            } else {
              return false;
            }
        } catch (error) {
            console.error("Error creating category:", error);
            return false; // Retorna false en caso de error
        }
    }

    return (
        <CategoryContext.Provider value={{ handleCreateCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;
