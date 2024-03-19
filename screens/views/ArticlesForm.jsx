import {View,Text,TextInput,StyleSheet,TouchableOpacity} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import React, { useState } from "react";
import useArticle from "../hooks/useArticle";
import useCategory from "../hooks/useCategory";

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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [datos, setDatos] = useState(INITIAL_STATE);
  const { handleCreateArticle } = useArticle();
  const {listCategory} = useCategory();
  

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
      nombre_categoria: value,
    });
  };



  const SubmitArticle = async () => {
    try {
      const response = await handleCreateArticle(datos);
      if (response) {
        alert("El articulo ha sido creado con exito");
        setDatos(INITIAL_STATE);
        setSelectedCategory('');
      } else {
        alert("El articulo no se pudo crear");
      }
    } catch (error) {
      alert("problema interno del servidor");
    }
    console.log("valor del formulario" + JSON.stringify(datos));
  };

  return (
    <View style={styles.container}>
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
          value={datos.nombre_categoria}

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
        value={datos.tipo_venta}
      >
        <View style={styles.radioContainer}>
          <RadioButton value="Unidad" />
          <Text>Unidad</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="Pesos" />
          <Text>Pesos</Text>
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
      {/* Input Coste*/}
      <View>
        <Text style={styles.label}>Coste</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="S/0.00"
        placeholderTextColor="black"
        value={datos.coste}
        onChangeText={(text) => getValues("coste", text)}
      />
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
        <Text style={styles.buttonText}>CREAR ARTICULO</Text>
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
