import {View,Text,TextInput,StyleSheet,TouchableOpacity,Image,ScrollView, ActivityIndicator} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import useArticle from "../../hooks/useArticle";
import useCategory from "../../hooks/useCategory";
import CustomAlert from "../../componentes/Alertas/CustomAlert"
import {MaterialIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const INITIAL_STATE = {
  nombre: "",
  tipo_venta: "",
  precio: "",
  representacion:"",
  color:"",
  imagen:"",
  ref:"",
  id_categoria: "",
};

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
      borderWidth: colorMapping[selectedColor] === color ? 3 : 0,
      borderColor: 'black',
    }} 
    onPress={() => setEditedData(prevDatos => ({ ...prevDatos, color: Object.keys(colorMapping).find(key => colorMapping[key] === color) }))} 
  />
);

const buildFormData = (editedData, selectedImage, categoriaSelect) => {
  const formData = new FormData();
  formData.append("nombre", editedData.nombre);
  formData.append("tipo_venta", editedData.tipo_venta);
  formData.append("precio", parseFloat(editedData.precio));
  formData.append("id_categoria", editedData.id_categoria);
  formData.append("id", editedData.id);

  if (editedData.representacion === "imagen") {
    formData.append("representacion", "imagen");
    if (selectedImage) {
      const fileName = selectedImage.split("/").pop();
      formData.append("imagen", {
        uri: selectedImage,
        name: fileName,
        type: "image/jpeg",
      });
    } else {
      if (editedData.imagen) {
        formData.append("imagen", editedData.imagen);
      }
    }
    formData.append("color", null);
  } else if (editedData.representacion === "color" && editedData.color) {
    formData.append("representacion", "color");
    const colorHex = colorMapping[editedData.color];
    if (colorHex) {
      formData.append("color", colorHex);
    } else {
      console.error("Color no válido:", editedData.color);
    }
    formData.append("imagen", null);
  }

  console.log("FormData:", formData);

  return formData;
};



export default function ArticlesEdit() {
  const [editedData, setEditedData] = useState(INITIAL_STATE);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoriaSelect, setCategoriaSelect] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loadingCategoria, setLoadingCategoria] = useState(true);

  const route = useRoute();
  const {handleEditArticle, listArticle, setListArticle} = useArticle();
  const {listCategoria} = useCategory();

  useEffect(() => {
    if (listCategoria.length > 0) {
      setLoadingCategoria(false);
    }
  }, [listCategoria]);

  useEffect(() => {
    if (route.params?.article) {
      const { article } = route.params;
      let representacion = "";
  
      if (article.imagen) {
        representacion = "imagen";
      } else if (article.color) {
        representacion = "color";
      }
  
      if (article.id) { 
        console.log("Artículo cargado:", article);
        setEditedData({
          ...INITIAL_STATE,
          ...article,
          representacion,
          id: article.id || "",
        });
  
        if (article.imagen) {
          setSelectedImage(article.imagen);
        }
  
        if (article.categoria && article.categoria.id) {
          setEditedData((prevData) => ({
            ...prevData,
            id_categoria: article.categoria.id.toString(),
          }));
        }
  
        if (article.precio !== undefined) {
          setEditedData((prevData) => ({
            ...prevData,
            precio: article.precio.toString(),
          }));
        } else {
          // Si el precio no está definido, mantener el estado actual
          setEditedData((prevData) => ({
            ...prevData,
            precio: "",
          }));
        }
      } else {
        console.error("ID del artículo no encontrado en los datos cargados:", article);
      }
    }
  }, [route.params]);

  if (loadingCategoria) {
    return <Text>Cargando categorías...</Text>;
  }

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

  const handleRepresentacion = (value) => {
    setEditedData({
      ...editedData,
      representacion: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!editedData.id) {
        console.error("ID del artículo no definido");
        return;
      }

      const formData = buildFormData(editedData, selectedImage, categoriaSelect);
      const updatedArticle = await handleEditArticle(editedData.id, formData);

      if (updatedArticle) {
        const updatedList = listArticle.map((article) =>
          article.id === updatedArticle.id ? updatedArticle : article
        );
        setListArticle(updatedList);
        console.log("Artículo editado exitosamente");
        setShowAlert(true);
      } else {
        console.error("La edición no fue exitosa.");
      }
    } catch (error) {
      console.error("Error al editar el artículo:", error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };


  return (
    <ScrollView style={styles.container}>
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
    selectedValue={editedData.id_categoria ? editedData.id_categoria.toString() : (listCategoria.length > 0 ? listCategoria[0].id.toString() : '')}
    onValueChange={(value) => handleCategoryChange(value)}
    style={styles.picker}
  >
    <Picker.Item label="Sin categoría" value="" />
    {listCategoria.map((item) => (
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
        editable={false}
        onChangeText={(text) => handleChange("ref", text)}
      />
      {/* Input representacion*/}
      <View>
        <Text style={styles.label}>Representacion</Text>
      </View>
      <RadioButton.Group 
      onValueChange={(value) => handleRepresentacion(value)}
      value={editedData.representacion}
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
      {editedData.representacion === 'imagen' && (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
    <TouchableOpacity style={styles.uploadImagen} onPress={openImagePickerAsync}>
      {selectedImage ? 
        (
          <Image style={{ width: 190, height: 190, borderRadius: 8 }} source={{ uri: selectedImage }} />
        ) :
        (
          <Text style={styles.text}>Subir Imagen</Text>
        )
      }
      <TouchableOpacity style={{
          position: 'absolute',
          right: 0,
          top: 0,
          backgroundColor: 'white',
          borderRadius: 50,
          padding: 2,
          zIndex: 1 
        }} onPress={removeSelectedImage}>
        <MaterialIcons name="close" size={24} color="#696969" style={{backgroundColor: 'white', borderRadius: 12}}/>
      </TouchableOpacity> 
    </TouchableOpacity>
  </View>
)}


      {editedData.representacion === 'color' && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'center'}}>
          {Object.values(colorMapping).map((color, index) => (
            <ColorBox key={index} color={color} setEditedData={setEditedData} selectedColor={editedData.color} />
          ))}
        </View>
      )} 


      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Edicion exitosa"
        message="El articulo se ha creado correctamente."
        buttonColor="#2196F3"
        iconName="check-circle" 
        />
    </ScrollView>
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
    borderBottomColor: "#0258FE",
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
    height:48,
    marginLeft:55,
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  uploadImagen:{
    backgroundColor: '#fcfcfc',
    width:200,
    height:200,
    alignItems: 'center',
    padding: 10,
  },
  text: {
    marginTop: 80,
    fontWeight: 'bold',
    color: "#dcdcdc",
    textAlign: "center",
    alignItems:"center",
    fontSize: 20,
  },
});
