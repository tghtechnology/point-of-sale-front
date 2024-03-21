import React, { useState, useEffect } from 'react';
import { createCategory, editCategories, getCategories,updateCategory} from "../../services/CategoryService";
import CategoryContext from "./CategoryContext";


const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    
    const handleCreateCategory = async (newCategory) => {
      const { nombre, color } = newCategory; // Desestructura el objeto newCategory para obtener el nombre y el color
      
      try {
          const response = await createCategory({ nombre, color }); // Envía tanto el nombre como el color al servicio de creación de categorías
          if (response.status === 200 || response.status === 201) {
              // Si la creación es exitosa, devolver el objeto de categoría completo
              return response.data;
          } else {
              return null; // Retorna null si la creación no fue exitosa
          }
      } catch (error) {
          console.error("Error creating category:", error);
          return null; // Retorna null en caso de error
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

    const handleEditCategories = async (id, updatedData) => {
        try {
          const response = await editCategories(id, updatedData);
          if (response && response.status === 200) {
            const updatedDiscounts = discounts.map((discount) =>
              discount.id === id ? { ...discount, ...updatedData } : discount
            );
            setDiscounts(updatedDiscounts);
            console.log('Descuento editado exitosamente');
          } else if (response && response.status === 204) {
            console.log('Descuento editado exitosamente');
          }
        } catch (error) {
          console.error('Error editing discount:', error);
        }
      };

      const handleUpdateCategory = async (id, newData) => {
        try {
            const updatedCategory = await updateCategory(id, newData);
            setCategories(prevCategories => {
                return prevCategories.map(category =>
                    category.id === id ? { ...category, ...updatedCategory } : category
                );
            });
            console.log('Categoría actualizada exitosamente:', updatedCategory);
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
        }
    };

    return (
        <CategoryContext.Provider value={{ handleCreateCategory, categories, handleEditCategories, handleUpdateCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;
