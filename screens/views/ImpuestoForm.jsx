import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import useImpuesto from "../hooks/useImpuesto";
import CustomAlert from "../componentes/Alertas/CustomAlert";

const INITIAL_STATE = {
  nombre: "",
  tasa: "",
  tipo_impuesto: "", 
};

export default function ImpuestoForm() {
  const [datos, setDatos] = useState(INITIAL_STATE);
  const { handleCreateImp,listImpuesto,setListImpuesto } = useImpuesto();
  const [showAlert, setShowAlert] = useState(false);


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
      const nuevoImpuesto = await handleCreateImp(datos);
      if (nuevoImpuesto && nuevoImpuesto.id) {
        setListImpuesto([...listImpuesto, nuevoImpuesto]);
        setShowAlert(true);
        setDatos(INITIAL_STATE);
      } else {
        throw new Error("La respuesta del servidor no contiene un impuesto válido.");
      }
    } catch (error) {
      console.log("Error al crear el impuesto:", error.message);
    
    }
  };
  
  

  const handleCloseAlert = () => {
    setShowAlert(false);
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
      <View style={styles.pickerContainer} >
        <Picker
          style={styles.picker}
          selectedValue={datos.tipo_impuesto}
          onValueChange={(value) => handleChange(value)}
        >
          <Picker.Item label="Seleccione el tipo de impuesto" value="" />
          <Picker.Item label="Incluido en el precio" value="Incluido_en_el_precio" />
          <Picker.Item label="Añadido al precio" value="Anadido_al_precio" />
        </Picker>
      </View>
      <View style={{ height: 20 }} />
      <TouchableOpacity onPress={SubmitImpuesto} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Impuesto Creado"
        message="El impuesto se ha creado correctamente."
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
    alignContent: "center",
  },
  input: {
    marginBottom: 10,
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#0258FE',
    height: 40,
    color: '#546574',
    padding: 10,
  },
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor:'#0258FE',
    borderColor:'#0258FE',
    padding: 10,
  },
  label: {
    marginTop: 4,
    color: "#546574",
  },
  pickerContainer: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#0258FE",
    height: 40,
    color: "#546574",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  picker: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    textColor: '#0258FE',
  },
  pickerContainer: {
    justifyContent: 'center', // Centrar contenido verticalmente
    alignItems: 'center',
  },
});