import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import React, { useState } from "react";
import useArticle from "../hooks/useArticle";
import useCategory from "../hooks/useCategory";
import CustomAlert from "../componentes/Alertas/CustomAlert";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const INITIAL_STATE = {
  nombre: "",
  tipo_venta: "",
  precio: "",
  representacion: "",
  color: "",
  imagen: "",
  id_categoria: "",
};

const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
  "#C0C0C0",
  "#808080",
];

const ColorBox = ({ color, selectedColor, setDatos }) => (
  <TouchableOpacity 
    style={{ 
      backgroundColor: color, 
      width: 70, 
      height: 70, 
      margin: 5, 
      borderWidth: color === selectedColor ? 3  : 0, 
      borderColor: 'black' 
    }} 
    onPress={() => setDatos(prevDatos => ({ ...prevDatos, color }))} 
  />
);


const buildFormData = (datos, selectedImage, categoriaSelect) => {
  const formData = new FormData();

  formData.append("nombre", datos.nombre);
  formData.append("tipo_venta", datos.tipo_venta);
  formData.append("precio", parseFloat(datos.precio));
  formData.append("id_categoria", categoriaSelect);

  // Ajustar según la representación elegida
  if (datos.representacion === "imagen") {
    formData.append("representacion", "imagen");
    if (selectedImage) {
      const fileName = selectedImage.split("/").pop();
      formData.append("imagen", {
        uri: selectedImage,
        name: fileName,
        type: "image/jpeg",
      });
    }
    formData.append("color", null); // Establecer `color` como null cuando se representa por imagen
  } else if (datos.representacion === "color" && datos.color) {
    formData.append("representacion", "color");
    formData.append("color", datos.color);
    formData.append("imagen", null); // Establecer `imagen` como null cuando se representa por color
  }

  return formData;
};



const ArticlesForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [datos, setDatos] = useState(INITIAL_STATE);
  const [categoriaSelect, setCategoriaSelect] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { handleCreateArticle } = useArticle();
  const { listCategoria } = useCategory();

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (pickerResult.canceled) {
      return;
    }

    setSelectedImage(pickerResult.assets[0].uri);
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const getValues = (name, value) => {
    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const SubmitArticle = async () => {
    try {
      const formData = buildFormData(datos, selectedImage, categoriaSelect);
  
      console.log("Datos a enviar al servidor:", formData); // Verificar el contenido del FormData
  
      const newArticle = await handleCreateArticle(formData);
  
      if (newArticle && newArticle.id) {
        setShowAlert(true);
        setDatos(INITIAL_STATE);
        setCategoriaSelect("");
        setSelectedImage(null);
      } else {
        alert("El artículo no se pudo crear.");
      }
    } catch (error) {
      console.error("Error al crear el artículo:", error); // Registro detallado
      if (error.response) {
        console.error("Error del servidor:", error.response.status, error.response.data);
        alert(`Error del servidor: ${error.response.data?.message || "Error desconocido"}`);
      } else {
        console.error("Error general:", error.message);
        alert("Problema interno del servidor.");
      }
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#546574"
        value={datos.nombre}
        onChangeText={(text) => getValues("nombre", text)}
      />
      <View>
        <Text style={styles.label}>Categoría</Text>
      </View>
      <View style={styles.pickeContainer}>
        <Picker
          onValueChange={(itemValue) =>
            setCategoriaSelect(itemValue)
          }
          selectedValue={categoriaSelect}
          style={styles.picker}
        >
          <Picker.Item label="Sin categoría" value="" />
          {listCategoria?.map((item, index) => (
            <Picker.Item key={index} label={item.nombre} value={item.id} />
          ))}
        </Picker>
      </View>
      <View>
        <Text>Vendido por</Text>
      </View>
      <RadioButton.Group
        onValueChange={(value) => getValues("tipo_venta", value)}
        value={datos.tipo_venta}
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
      <TextInput
        style={styles.input}
        placeholder="Precio"
        placeholderTextColor="#546574"
        a
        value={datos.precio.toString()}
        onChangeText={(text) => getValues("precio", text)}
      />
      <View>
        <Text style={styles.info}>
          Deje el campo en blanco para indicar el precio durante la venta.
        </Text>
      </View>
      <View>
        <Text style={styles.label}>Representación</Text>
      </View>

      <RadioButton.Group
        onValueChange={(value) => getValues("representacion", value)}
        value={datos.representacion}
      >
        <View style={styles.radioContainer}>
          <RadioButton value="color" />
          <Text>Color</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="imagen" />
          <Text>Imagen</Text>
        </View>
      </RadioButton.Group>

      {datos.representacion === "imagen" && (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <TouchableOpacity
            style={styles.uploadImagen}
            onPress={openImagePickerAsync}
          >
            {selectedImage ? (
              <Image
                style={{ width: 190, height: 190, borderRadius: 8 }}
                source={{ uri: selectedImage }}
              />
            ) : (
              <Text style={styles.text}>Subir Imagen</Text>
            )}
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                backgroundColor: "white",
                borderRadius: 50,
                padding: 2,
                zIndex: 1,
              }}
              onPress={removeSelectedImage}
            >
              <MaterialIcons name="close" size={24} color="#696969" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}

      {datos.representacion === "color" && (
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}
        >
          {colors.map((color, index) => (
            <ColorBox key={index}  selectedColor={datos.color} color={color} setDatos={setDatos} />
          ))}
        </View>
      )}

      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={SubmitArticle} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Artículo creado"
        message="El artículo se ha creado correctamente."
        buttonColor="#2196F3"
        iconName="check-circle"
      />
    </ScrollView>
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
    color: "#546574",
    padding: 10,
   
  },
  info: {
    color: "#546574",
  },
  pickeContainer: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#0258FE",
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
    borderColor:'#0258FE',
    backgroundColor:'#0258FE',
    width:237,
    height:39,
    marginLeft:55,
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  uploadImagen: {
    backgroundColor: "#fcfcfc",
    width: 200,
    height: 200,
    alignItems: "center",
    padding: 10,
  },
  text: {
    marginTop: 80,
    fontWeight: "bold",
    color: "#dcdcdc",
    textAlign: "center",
    alignItems: "center",
    fontSize: 20,
  },
});
export default ArticlesForm;