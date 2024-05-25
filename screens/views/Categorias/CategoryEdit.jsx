import React, { useState, useEffect } from "react";
import {  View, Text ,TextInput ,StyleSheet, TouchableOpacity} from 'react-native';
import { useRoute } from "@react-navigation/native";
import useCategory from '../../hooks/useCategory';
import CustomAlert from "../../componentes/Alertas/CustomAlert"


const INITIAL_STATE = {
  nombre:'',
  color:'',
}
const colorMapping = {
  'Rojo': '#FF0000',
  'Verde_limon': '#00FF00',
  'Azul': '#0000FF',
  'Amarillo': '#FFFF00',
  'Turquesa': '#00FFFF',
  'Fucsia': '#FF00FF',
  'Gris_claro': '#C0C0C0',
  'Gris_oscuro': '#808080',
};

const ColorBox = ({ color, setEditedData, selectedColor }) => (
  <TouchableOpacity 
    style={{ 
      backgroundColor: color, 
      width: 70, 
      height: 70, 
      margin: 5,
      borderWidth: selectedColor === color ? 3 : 0, 
      borderColor: 'black', 
    }} 
    onPress={() => setEditedData(prevDatos => ({ ...prevDatos, color: color }))} 
  />
);

const CategoryForm = () => {
  const route = useRoute();
  const { handleEditCategories, listCategoria, setListCategoria } = useCategory();
  const [showAlert, setShowAlert] = useState(false);
  const [editedData, setEditedData] = useState(INITIAL_STATE);

  useEffect(() => {
    const { categorias } = route.params;
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
      console.log("Categoría editada exitosamente");
      // Actualizar la lista de categorías después de la edición
      setListCategoria(prevLista => prevLista.map(categoria => {
        if (categoria.id === editedData.id) {
          return { ...categoria, ...editedData };
        } else {
          return categoria;
        }
      }));
    } catch (error) {
      console.error("Error al editar la categoría:", error);
    }
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
        value={editedData.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />

      <Text style={styles.label}>Color</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
        {Object.values(colorMapping).map((color) => (
          <ColorBox key={color} color={color} setEditedData={setEditedData} selectedColor={editedData.color} />
        ))}
      </View>
      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Edición Exitosa"
        message="La categoría se ha editado correctamente."
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
    borderBottomColor: '#0258FE',
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
    height: 45,
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