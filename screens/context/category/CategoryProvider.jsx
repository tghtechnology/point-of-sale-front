import React, { useState, useEffect } from 'react';
import { createCategory, editCategories,listCategories,deleteCategory} from "../../services/CategoryService";
import CategoryContext from "./CategoryContext";


const CategoryProvider = ({children}) => {
    const [listCategoria, setListCategoria] = useState([]);
    useEffect(() => {
      const getTaxes= async () => {
          try {
              const { data, status } = await listCategories();
              if (status === 200) {
                setListCategoria(data); 
                  
              } else {
                  console.log("Error al cargar categorias:", status);
              }
          } catch (error) {
              console.error("Error al cargar categorias:", error);
          }
      }
      getTaxes();
  }, []);

   
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

  
  const handleEditCategories = async (updateCategorias) => {
    const {nombre, color } = updateCategorias;
    try {
      const response = await  editCategories(updateCategorias.id, {nombre, color} );
      if (response && (response.status === 200 || response.status === 204)) {
        console.log('Categoria editado exitosamente');
        const updatedList = listCategoria.map(category => {
          if (category.id === updateCategorias.id) {
            return { ...category, ...updateCategorias };
          } else {
            return category;
          }
        });
        setListCategoria(updatedList);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error editing categoria:', error);
      return false;
    }
  };
  
  
    const handleDeleteCategory = async (id) => {
        try {
            const { status } = await deleteCategory(id);
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
        <CategoryContext.Provider value={{ handleCreateCategory, listCategoria,setListCategoria, handleEditCategories, handleDeleteCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;