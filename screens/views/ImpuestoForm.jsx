import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import useImpuesto from "../hooks/useImpuesto";

const INITIAL_STATE = {
  nombre: "",
  tasa: "",
  tipo_impuesto: "", 
};

export default function ImpuestoForm() {
  const [datos, setDatos] = useState(INITIAL_STATE);
  const { handleCreateImp } = useImpuesto();
  const getValues = (name, value) => {
    const newValue = name === 'tasa' ? parseFloat(value) : value;
    setDatos({
      ...datos,
      [name]: newValue,
    });
  };
  

  const handleChange = (value) => {
    setDatos({
      ...datos,
      tipo_impuesto: value,
    });
  };
  
  const SubmitImpuesto = async () => {
    try {
      console.log("Datos a enviar al servidor:", datos);
      const response = await handleCreateImp(datos);
      if (response) {
        alert("El impuesto ha sido creado con éxito");
        setDatos(INITIAL_STATE);
      } else {
        alert("El impuesto no se pudo crear");
      }
    } catch (error) {
      console.log("Problema interno del servidor", error);
    }
    console.log("Valor del formulario: " + JSON.stringify(datos));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#546574"
        value={datos.nombre}
        onChangeText={(text) => getValues("nombre", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tasa de impuestos %"
        placeholderTextColor="#546574"
        value={datos.tasa}
        onChangeText={(text) => getValues("tasa", text)}
      />
      <View>
        <Text style={styles.label}>Tipo</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={datos.tipo_impuesto}
          onValueChange={(value) => handleChange(value)}
        >
          <Picker.Item label="" value="" />
          <Picker.Item label="Incluido en el precio" value="Incluido_en_el_precio" />
          <Picker.Item label="Añadido al precio" value="Anadido_al_precio" />
        </Picker>
      </View>
      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={SubmitImpuesto} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Crear Impuesto</Text>
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
    overflow: 'hidden',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
  },
  label: {
    marginTop: 4,
    color: "#546574",
  },
  pickerContainer: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    height: 40,
    color: "#546574",
    borderRadius: 5,
  },
  buttonText: {
    color: "red",
    textAlign: "center",
    fontSize: 15,
  },
});
