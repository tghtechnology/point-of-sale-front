import { createCategory } from "../../services/CategoryService";
import CategoryContext from "./CategoryContext";

const CategoryProvider = ({children}) => {
    const handleCreateCategory = async (newCategory) => {
        const { status } = await createCategory(newCategory);
        if(status === 200 || status === 201){
          return true;
        }else {
          return false;
        }
    }
    return (
        <CategoryContext.Provider value={{
          handleCreateCategory
        }}> 
          {children}
        </CategoryContext.Provider>
      )
    }

export default CategoryProvider
