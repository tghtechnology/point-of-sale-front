import {View,Text,TextInput,StyleSheet,TouchableOpacity,} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import React, { useState, useEffect } from "react";
import useArticle from "../hooks/useArticle";
import useCategory from "../hooks/useCategory";
import { useRoute } from "@react-navigation/native";


const INITIAL_STATE = {
  nombre: "",
  tipo_venta: "",
  precio: "",
  coste: "",
  ref: "",
  representacion: "",
  nombre_categoria:"",
};
export default function ArticlesForm() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { handleEditArticle } = useArticle();
  const { listCategory } = useCategory();
  const route = useRoute();
  const [editedData, setEditedData] = useState(INITIAL_STATE);
  const [selectedArticles, setSelectedArticles] = useState({});

  useEffect(() => {
    const { article } = route.params;
    setEditedData(article);
  }, []);

  const handleEdit = (article) => {
    setSelectedArticles(article);
    setEditedData({
      ...article,
      nombre: article.nombre,
      tipo_venta: article.tipo_venta,
      precio: article.precio,
      coste: article.coste,
      ref: article.ref,
      representacion: article.representacion,
      nombre_categoria: article.nombre_categoria,
    });
  };

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
    setSelectedCategory(value);
    setEditedData({
      ...editedData,
      nombre_categoria: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await handleEditArticle(selectedArticles.text_id, editedData);
      console.log("Articulo editado exitosamente");
    } catch (error) {
      console.error("Error al editar el descuento:", error);
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
          onValueChange={(value) => handleCategoryChange(value)}
          value={editedData.nombre_categoria}
          style={styles.picker}
        >
          {
            listCategory?.map((item,index)=>(
              <Picker.Item key={index} label={item.nombre} value={item.nombre} />
            ))
          }
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
      {/* Input Coste*/}
      <View>
        <Text style={styles.label}>Coste</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="S/0.00"
        placeholderTextColor="black"
        value={editedData.coste}
        onChangeText={(text) => handleChange("coste", text)}
      />
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
