import React, { useState, useEffect } from 'react';
import { createCategory, editCategories, getCategories,updateCategory,deleteCategory} from "../../services/CategoryService";
import CategoryContext from "./CategoryContext";


const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
   
    const handleCreateCategory = async (newCategory) => {
      const { nombre, color } = newCategory; 
      
      try {
          const response = await createCategory({ nombre, color });
          if (response.status === 200 || response.status === 201) {
             
              return response.data;
          } else {
              return null;
          }
      } catch (error) {
          console.error("Error creating category:", error);
          return null;
      }
  }

  const fetchMyCategories = async () => {
    try {
        const categories = await getCategories();
        console.log("categorias obtenidos:", categories);
        setCategories(categories);
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
    }
};

useEffect(() => {
    fetchMyCategories();
}, []);

    useEffect(() => {
        fetchMyCategories();
    }, []);

    const handleEditCategories = async (text_id, updatedData) => {
        console.log(text_id)
        try {
          const response = await editCategories(text_id, updatedData);
          if (response && response.status === 200) {
            const updatedCategories = categories.map((categorie) =>
            categorie.text_id === text_id ? { ...categorie, ...updatedData } : categorie
            );
            setCategories(updatedCategories);
            console.log('Categoria editado exitosamente');
          } else if (response && response.status === 204) {
            console.log('Categoria editado exitosamente');
          }
        } catch (error) {
          console.error('Error editing category:', error);
        }
      };

      const handleUpdateCategory = async (text_id, newData) => {
        console.log("..")
        try {
            const updatedCategory = await updateCategory(text_id, newData);
            setCategories(prevCategories => {
                return prevCategories.map(category =>
                    category.text_id === text_id ? { ...category, ...updatedCategory } : category
                );
            });
            console.log('Categoría actualizada exitosamente:', updatedCategory);
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
        }
    };

    const handleDeleteCategory = async (text_id) => {
        try {
            const { status } = await deleteCategory(text_id);
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
        <CategoryContext.Provider value={{ handleCreateCategory, categories, handleEditCategories, handleUpdateCategory, handleDeleteCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;