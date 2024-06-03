import React, { useState, useEffect, useContext } from 'react';
import { createCategory, editCategories, listCategories, deleteCategory } from "../../services/CategoryService";
import CategoryContext from "./CategoryContext";
import AuthContext from '../auth/AuthContext';

const CategoryProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const [listCategoria, setListCategoria] = useState([]);

  useEffect(() => {
    if (isAuth) {
      const getCategories = async () => {
        try {
          const { data, status } = await listCategories();
          if (status === 200) {
            setListCategoria(data);
          } else {
            console.log("Error al cargar categorías:", status);
          }
        } catch (error) {
          console.error("Error al cargar categorías:", error);
        }
      };
      getCategories();
    }
  }, [isAuth]);

  const handleCreateCategory = async (newCategory) => {
    const { nombre, color } = newCategory;
    try {
      const response = await createCategory({ nombre, color });
      if (response.status === 200 || response.status === 201) {
        setListCategoria((prevList) => [...prevList, response.data]);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error creating category:", error);
      return null;
    }
  };

  const handleEditCategories = async (updateCategorias) => {
    const { id, nombre, color } = updateCategorias;
    try {
      const response = await editCategories(id, { nombre, color });
      if (response && (response.status === 200 || response.status === 204)) {
        console.log('Categoría editada exitosamente');
        const updatedList = listCategoria.map(category => {
          if (category.id === id) {
            return { ...category, nombre, color };
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
      console.error('Error editing category:', error);
      return false;
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const { status } = await deleteCategory(id);
      if (status === 200) {
        setListCategoria((prevList) => prevList.filter(category => category.id !== id));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      return false;
    }
  };
  

  
  return (
    <CategoryContext.Provider value={{ handleCreateCategory, listCategoria, setListCategoria, handleEditCategories, handleDeleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
