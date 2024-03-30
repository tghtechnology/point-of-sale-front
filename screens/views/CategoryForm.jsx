import React, { useState } from 'react';
import {  View, Text ,TextInput ,StyleSheet, TouchableOpacity} from 'react-native'
import useCategory from '../hooks/useCategory';
import CategoryProvider from '../context/category/CategoryProvider';

const INITIAL_STATE = {
  nombre:'',
  color:'',
}
const CategoryForm = () => {
  const [datos, setDatos] = useState(INITIAL_STATE);
  const {handleCreateCategory,handleUpdateCategory, handleDeleteCategory} = useCategory();

  const getValues = (name,value) => {
    setDatos({
      ...datos,
      [name]:value
    })
  }
  const SubmitCategory = async () => {
    try {
      const response = await handleCreateCategory(datos);
      if(response){
        alert("La categoría ha sido creada con éxito");
        setDatos(INITIAL_STATE);
      } else {
        alert("La categoría no se pudo crear");
      }
    } catch (error) {
      alert("Problema interno del servidor");
    }
    console.log("Valor del formulario: " + JSON.stringify(datos));
  }
  return (
<View style={styles.container}>
  {/* IMPUT DEL NOMBRE DE LA CATEGORIA */}
      <TextInput
        style={styles.input}
        placeholder='El nombre de la categoría'
        placeholderTextColor="#546574"
        value={datos.nombre}
        onChangeText={(text) => getValues('nombre', text)}  
      />
      {/* Input del color de la categoría */}
      <TextInput
        style={styles.input}
        placeholder='Color de la categoría'
        placeholderTextColor="#546574"
        value={datos.color}
        onChangeText={(text) => getValues('color', text)}
      />
      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={SubmitCategory} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>CREAR CATEGORÍA</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>ASIGNAR ARTÍCULOS</Text>
      </TouchableOpacity>
      <View style={{ height: 30 }} />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>CREAR ARTÍCULO</Text>
      </TouchableOpacity>
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