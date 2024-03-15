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
  const {handleCreateCategory} = useCategory();

  const getValues = (name,value) => {
    setDatos({
      ...datos,
      [name]:value
    })
  }
  const SubmitCategory= async() =>{
    try {
      const response = await handleCreateCategory(datos);
      if(response){
        alert("La categoria ha sido creado con exito")
        setDatos(INITIAL_STATE);
      }else{
        alert("La categoria no se pudo crear");
      }
    } catch (error) {
      alert("problema interno del servidor")
    }
    console.log("valor del formulario"  + JSON.stringify(datos));
}
  return (
<View style={styles.container}>
  {/* IMPUT DEL NOMBRE DE LA CATEGORIA */}
      <TextInput
        style={styles.input}
        placeholder='Nombre'
        placeholderTextColor="#546574"
        value={datos.nombre}
        onChangeText={(text) => getValues('nombre', text)}  
      />
      {/* Input del color de la categoría */}
      <TextInput
        style={styles.input}
        placeholder='Color'
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
    overflow: 'hidden', // Para que no haya desbordamiento del botón
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