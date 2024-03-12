import React, { useState } from 'react';
import {  View, Text ,TextInput ,StyleSheet, TouchableOpacity} from 'react-native'
import useCategory from '../hooks/useCategory';
import CategoryProvider from '../context/category/CategoryProvider';


const INITIAL_STATE = {
  nombre:'',
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

  const EnviarCat= async() =>{
    try {
      const response = await handleCreateCategory(objectSend);
      if(response){
        alert("La categoria ha sido creado con exito")
        setDatos(INITIAL_STATE);
      }else{
        alert("La categoria no se pudo crear");
      }
    } catch (error) {
      alert("problema interno del servidor")
    }
    console.log("valor del formulario"  + JSON.stringify(objectSend));
}
  return (
<View style={styles.container}>
  {/* IMPUT DEL NOMBRE DE LA CATEGORIA */}
      <TextInput
        style={styles.input}
        placeholder='El nombre de la categoría'
        placeholderTextColor="#546574"
        value={datos.nombre}
        onChangeText={text => getValues('nombre', text)}   
      />
      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={EnviarCat} style={styles.buttonContainer}>
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