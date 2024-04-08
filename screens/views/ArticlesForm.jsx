import {View,Text,TextInput,StyleSheet,TouchableOpacity,Pressable,ScrollView} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import React, { useState } from "react";
import useArticle from "../hooks/useArticle";
import useCategory from "../hooks/useCategory";
import CustomAlert from '../componentes/CustomAlert';


const INITIAL_STATE = {
  nombre: "",
  tipo_venta: "",
  precio: "",
  ref: "",
  representacion: "",
  id_categoria: "",
};
const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#808080'];

const ColorBox = ({ color }) => (
  <TouchableOpacity style={{ backgroundColor: color, width: 70, height: 70, margin: 5 }} />
);
export default function ArticlesForm() {
  const [datos, setDatos] = useState(INITIAL_STATE);
  const [showAlert, setShowAlert] = useState(false);
  const [categorySelect, setCategorySelect] = useState('');
  const [value, setValue] = useState('color');
  const { handleCreateArticle,listArticle,setListArticle} = useArticle();
  const { listCategoria } = useCategory();

  const getValues = (name, value) => {
    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const handleTipoVentaChange = (value) => {
    setDatos({
      ...datos,
      tipo_venta: value,
    });
  };

  const handleCategoryChange = (value) => {
    setDatos({
      ...datos,
      id_categoria: value,
    });
  };
  const SubmitArticle = async () => {
    try {
      const articleData = {
        ...datos,
        precio: parseFloat(datos.precio),
      };
      console.log("Datos a enviar al servidor:", articleData);
      const response = await handleCreateArticle(articleData);
      if (response) {
        setShowAlert(true);
        setDatos(INITIAL_STATE);
        setListArticle([...listArticle,datos]);
      } else {
        alert("El articulo no se pudo crear");
      }
    } catch (error) {
      alert("problema interno del servidor");
    }
    console.log("valor del formulario" + JSON.stringify(datos));
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
        value={datos.nombre}
        onChangeText={(text) => getValues("nombre", text)}
      />
      {/* Opcion de categoria */}
      <View>
        <Text style={styles.label}>Categoría</Text>
      </View>
      <View style={styles.pickeContainer}>
        <Picker
          onValueChange={(value) => handleCategoryChange(value)}
          value={datos.id_categoria}
          style={styles.picker}
        >
          
          <Picker.Item label="Sin categoría" value="" />
          {listCategoria?.map((item, index) => (
            <Picker.Item key={index} label={item.nombre} value={item.id} />
          ))}
        </Picker>
      </View>
      {/* Opcion vendido*/}
      <View>
        <Text>Vendido por</Text>
      </View>
      <RadioButton.Group
        onValueChange={(value) => handleTipoVentaChange(value)}
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
      {/* Input Precio */}
      <TextInput
        style={styles.input}
        placeholder="Precio"
        placeholderTextColor="#546574"
        value={datos.precio}
        onChangeText={(text) => getValues("precio", text)}
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
        value={datos.ref}
        onChangeText={(text) => getValues("ref", text)}
      />
      {/* Input representacion*/}
      <View>
        <Text style={styles.label}>Representacion</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="img"
        placeholderTextColor="black"
        value={datos.representacion}
        onChangeText={(text) => getValues("representacion", text)}
      />
      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={SubmitArticle} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
        <View style={styles.radioContainer}>
          <RadioButton value="Color" />
          <Text>Color</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="Imagen" />
          <Text>Imagen</Text>
        </View>
      </RadioButton.Group>
      {value === 'Imagen' && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
         
          <Pressable style={styles.uploadImagen}>
            <Text style={styles.text}>Subir Imagen</Text>
          </Pressable>
        </View>
      )}
      {value === 'Color' && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'center'}}>
          {colors.map((color, index) => (
            <ColorBox key={index} color={color} />
          ))}
        </View>
      )}

      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Articulo Creado"
        message="El articulo se ha creado correctamente."
        buttonColor="#2196F3"
        iconName="check-circle" // Puedes cambiar el icono según lo desees
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
  uploadImagen:{
    backgroundColor: '#fcfcfc',
    width:200,
    height:200,
    alignItems: 'center',
    margin: 50,
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
