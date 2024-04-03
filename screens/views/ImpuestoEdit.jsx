import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import useImpuesto from "../hooks/useImpuesto";

const INITIAL_STATE = {
  nombre: "",
  tasa: "",
  tipo_impuesto: "", 
};

export default function ImpuestoForm() {
  const {handleEditImp} = useImpuesto();
  const route = useRoute();
  const [editedData, setEditedData] = useState(INITIAL_STATE);
 

  useEffect(() => {
    const { impuesto } = route.params;
    setEditedData(impuesto || INITIAL_STATE);
  }, [route.params]);


  const handleChange = (name, value) => {
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };
  

  const handleTip = (value) => {
    setEditedData({
      ...editedData,
      tipo_impuesto: value,
    });
  };
  
  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...editedData,
        tasa: parseFloat(editedData.tasa),
      };
      console.log("Datos a enviar al servidor:", dataToSend);
      await handleEditImp(dataToSend);
      console.log("Impuesto ha sido editado exitosamente");
    } catch (error) {
      console.error("Error al editar el impuesto:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#546574" 
        value={editedData.nombre}
        onChangeText={(text) => handleChange("nombre", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tasa de impuestos %"
        placeholderTextColor="#546574"
        value={editedData.tasa}
        onChangeText={(text) => handleChange("tasa", text)}
      />
      <View>
        <Text style={styles.label}>Tipo</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={editedData.tipo_impuesto}
          onValueChange={(value) => handleTip(value)}
        >
          <Picker.Item label="" value="" />
          <Picker.Item label="Incluido en el precio" value="Incluido_en_el_precio" />
          <Picker.Item label="Añadido al precio" value="Anadido_al_precio" />
        </Picker>
      </View>
      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={handleSubmit } style={styles.buttonContainer}>
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
