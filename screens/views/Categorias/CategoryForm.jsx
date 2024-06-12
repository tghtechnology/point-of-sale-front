import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import useCategory from '../../hooks/useCategory';
import CustomAlert from "../../componentes/Alertas/CustomAlert";

const INITIAL_STATE = {
  nombre: '',
  color: '',
};

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#808080'];

const ColorBox = ({ color, selectedColor, setDatos }) => (
  <TouchableOpacity 
    style={{ 
      backgroundColor: color, 
      width: 70, 
      height: 70, 
      margin: 5, 
      borderWidth: color === selectedColor ? 3 : 0, 
      borderColor: 'black' 
    }} 
    onPress={() => setDatos(prevDatos => ({ ...prevDatos, color }))} 
  />
);

const CategoryForm = () => {
  const [datos, setDatos] = useState(INITIAL_STATE);
  const [showAlert, setShowAlert] = useState(false);
  const { handleCreateCategory, setListCategoria, listCategoria } = useCategory();

  const getValues = (name, value) => {
    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const SubmitCategory = async () => {
    try {
      console.log("Datos a enviar al servidor:", datos);
      const nuevaCategoria = await handleCreateCategory(datos);
      if (nuevaCategoria && nuevaCategoria.id) {
        console.log('Una categoria', nuevaCategoria.id);
        setListCategoria([...listCategoria, nuevaCategoria]);
        setShowAlert(true);
        setDatos(INITIAL_STATE);
      } else {
        alert("La categoría no se pudo crear");
      }
    } catch (error) {
      alert("Problema interno del servidor");
    }
    console.log("Valor del formulario: " + JSON.stringify(datos));
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Nombre'
        placeholderTextColor="#546574"
        value={datos.nombre}
        onChangeText={(text) => getValues('nombre', text)}
      />
      <Text style={styles.label}>Color</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
        {colors.map((color, index) => (
          <ColorBox key={index} color={color} selectedColor={datos.color} setDatos={setDatos} />
        ))}
      </View>
      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={SubmitCategory} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        message="La categoría se ha creado correctamente."
        buttonColor="#2196F3"
        iconName="check-circle"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  input: {
    marginBottom: 10,
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#0258FE",
    height: 40,
    color: '#546574',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    overflow: "hidden",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0258FE',
    backgroundColor: '#0258FE',
    width: 237,
    height: 48,
    marginLeft: 55,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  label: {
    marginTop: 30,
    color: "#546574",
    fontSize: 18,
  },
});

export default CategoryForm;
