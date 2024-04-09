import React, { useState, useEffect } from "react";
import {  View, Text ,TextInput ,StyleSheet, TouchableOpacity} from 'react-native';
import { useRoute } from "@react-navigation/native";
import useCategory from '../hooks/useCategory';
import CustomAlert from "../componentes/CustomAlert";


const INITIAL_STATE = {
  nombre:'',
  color:'',
}
const CategoryForm = () => {
  const route = useRoute();
  const {handleEditCategories} = useCategory();
  const [showAlert, setShowAlert] = useState(false);
  const [editedData, setEditedData] = useState(INITIAL_STATE);
 

  useEffect(() => {
    const {categorias} = route.params;
    setEditedData(categorias || INITIAL_STATE);
  }, [route.params]);


  const handleChange = (name, value) => {
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };


  const handleSubmit = async () => {
    try {
      await handleEditCategories(editedData);
      setShowAlert(true);
      console.log("Articulo editado exitosamente");
    } catch (error) {
      console.error("Error al editar el descuento:", error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
<View style={styles.container}>
  {/* IMPUT DEL NOMBRE DE LA CATEGORIA */}
      <TextInput
        style={styles.input}
        placeholder='El nombre de la categoría'
        placeholderTextColor="#546574"
        value={editedData.nombre}
        onChangeText={(text) => handleChange('nombre', text)}  
      />
      {/* Input del color de la categoría */}
      <TextInput
        style={styles.input}
        placeholder='Color de la categoría'
        placeholderTextColor="#546574"
        value={editedData.color}
        onChangeText={(text) => handleChange('color', text)}
      />
      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Edición Exitosa"
        message="La categoria se ha editado correctamente."
        buttonColor="#2196F3"
        iconName="check-circle" 
      />
      </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  input: {
    marginBottom: 10,
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    height: 40,
    color: '#546574',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    overflow: 'hidden', 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
  },
  buttonText: {
    color: 'red',
    textAlign: 'center',
    fontSize:15,
  },
});
export default CategoryForm;