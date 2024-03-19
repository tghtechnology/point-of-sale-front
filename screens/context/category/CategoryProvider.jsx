import React, { useState, useEffect } from 'react';
import { createCategory, getCategories } from "../../services/CategoryService";
import CategoryContext from "./CategoryContext";


const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    
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


    return (
        <CategoryContext.Provider value={{ handleCreateCategory, categories}}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;
