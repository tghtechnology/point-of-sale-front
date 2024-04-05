import {View,Text,TextInput,StyleSheet,TouchableOpacity,} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import useArticle from "../hooks/useArticle";
import useCategory from "../hooks/useCategory";

const INITIAL_STATE = {
  nombre: "",
  tipo_venta: "",
  precio: "",
  ref: "",
  representacion: "",
  id_categoria: "",
};
export default function ArticlesEdit() {
  const [editedData, setEditedData] = useState(INITIAL_STATE)
  const route = useRoute();
  const {handleEditArticle} = useArticle();
  const {listCategoria} = useCategory();


  useEffect(() => {
    const { article } = route.params;
    console.log("Objeto del artículo:", article); // Imprime el objeto completo del artículo
    setEditedData({
      ...article,
      id_categoria: article.categoria.id, // Agrega el id_categoria desde la propiedad categoria
    });
  }, [route.params]);

 

  const handleChange = (name, value) => {
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleTipoVentaChange = (value) => {
    setEditedData({
      ...editedData,
      tipo_venta: value,
    });
  };

  const handleCategoryChange = (value) => {
    setEditedData({
      ...editedData,
      id_categoria: value,
    });
  };
  const handleSubmit = async () => {
    try {
      const articleData = {
        ...editedData,
        precio: parseFloat(editedData.precio),
        id_categoria: parseInt(editedData.id_categoria)
      };
      
      console.log("Datos a enviar al servidor:", articleData);
      await handleEditArticle(articleData,editedData.id_categoria);
      console.log("Articulos ha sido editado exitosamente");
    } catch (error) {
      console.error("Error al editar el articulos:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Input nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#546574"
        value={editedData.nombre}
        onChangeText={(text) => handleChange("nombre", text)}
      />
      {/* Opcion de categoria */}
      <View>
        <Text style={styles.label}>Categoría</Text>
      </View>
      <View style={styles.pickeContainer}>
      <Picker
      selectedValue={editedData.id_categoria ? editedData.id_categoria.toString() : ''} // Convertimos a cadena el ID de la categoría si está definido
      onValueChange={(value) => handleCategoryChange(value)}
      style={styles.picker}
      >
  <Picker.Item label="Sin categoría" value="" />
  {listCategoria?.map((item) => (
    <Picker.Item key={item.id} label={item.nombre} value={item.id.toString()} />
  ))}
</Picker>
      </View>
      {/* Opcion vendido*/}
      <View>
        <Text>Vendido por</Text>
      </View>
      <RadioButton.Group
        onValueChange={(value) => handleTipoVentaChange(value)}
        value={editedData.tipo_venta}
      >
        <View style={styles.radioContainer}>
          <RadioButton value="Unidad" />
          <Text>Unidad</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="Peso" />
          <Text>Peso</Text>
        </View>
      </RadioButton.Group>
      {/* Input Precio */}
      <TextInput
        style={styles.input}
        placeholder="Precio"
        placeholderTextColor="#546574"
        value={editedData.precio}
        onChangeText={(text) => handleChange("precio", text)}
      />
      <View>
        <Text style={styles.info}>
          Deje el campo en blanco para indicar el precio durante la venta{" "}
        </Text>
      </View>
      {/* Input REF*/}
      <View>
        <Text style={styles.label}>REF</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="10000"
        placeholderTextColor="black"
        value={editedData.ref}
        onChangeText={(text) => handleChange("ref", text)}
      />
      {/* Input representacion*/}
      <View>
        <Text style={styles.label}>Representacion</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="img"
        placeholderTextColor="black"
        value={editedData.representacion}
        onChangeText={(text) => handleChange("representacion", text)}
      />
      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>ACTUALIZAR ARTICULO</Text>
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
    borderBottomColor: "red",
    height: 40,
    color: "#546574",
    padding: 10,
    borderRadius: 5,
  },
  info: {
    color: "#546574",
  },
  pickeContainer: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    height: 40,
    color: "#546574",
    borderRadius: 5,
  },

  label: {
    marginTop: 4,
    color: "#546574",
  },
  radioContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    overflow: "hidden",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
  },
  buttonText: {
    color: "red",
    textAlign: "center",
    fontSize: 15,
  },
});
