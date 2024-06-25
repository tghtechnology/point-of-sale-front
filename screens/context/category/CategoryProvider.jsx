import React, { useState, useEffect, useContext } from 'react';
import { createCategory, editCategories, listCategories, deleteCategory } from "../../services/CategoryService";
import CategoryContext from "./CategoryContext";
import AuthContext from '../auth/AuthContext';


/**
 * Componente CategoryProvider
 *
 * Este componente proporciona funcionalidades relacionadas con categorías y gestión del estado
 * a sus componentes hijos. Utiliza la API de Contexto de React para gestionar categorías y
 * manejar operaciones CRUD.
 *
 * @param {Object} props - El objeto de propiedades.
 * @param {React.ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto.
 *
 * @returns {JSX.Element} El componente CategoryProvider.
 */

const CategoryProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const [listCategoria, setListCategoria] = useState([]);


  /**
   * Obtiene todas las categorías.
   * @returns {void}
   * @throws {Error} - Devuelve un error si hay un problema al cargar las categorías.
   */

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
      useEffect(() => {
        if (isAuth) {
          getCategories();
        }
      }, [isAuth]);


      /**
   * Crea una nueva categoría.
   * @param {Object} newCategory - La nueva categoría a crear.
   * @param {string} newCategory.nombre - El nombre de la categoría.
   * @param {string} newCategory.color - El color de la categoría.
   * @returns {Object|null} La categoría creada o null si la creación falló.
   * @throws {Error} - Devuelve un error si hay un problema al crear la categoría.
   */

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

  /**
   * Edita una categoría existente.
   * @param {Object} updateCategorias - Los datos actualizados de la categoría.
   * @param {number|string} updateCategorias.id - El ID de la categoría a editar.
   * @param {string} updateCategorias.nombre - El nombre de la categoría.
   * @param {string} updateCategorias.color - El color de la categoría.
   * @returns {boolean} True si la edición fue exitosa, false en caso contrario.
   * @throws {Error} - Devuelve un error si hay un problema al editar la categoría.
   */

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

  /**
   * Elimina una categoría.
   * @param {number|string} id - El ID de la categoría a eliminar.
   * @returns {boolean} True si la eliminación fue exitosa, false en caso contrario.
   * @throws {Error} - Devuelve un error si hay un problema al eliminar la categoría.
   */
  
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
    <CategoryContext.Provider value={{ handleCreateCategory, listCategoria, setListCategoria, handleEditCategories, handleDeleteCategory, getCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;