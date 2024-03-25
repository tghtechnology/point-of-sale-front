import { View, Text, TextInput,StyleSheet,TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

export default function ImpuestoForm() {
    const [selectedValue, setSelectedValue] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#546574"
        // value={datos.nombre}
        // onChangeText={(text) => getValues("nombre", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tasa de impuestos %"
        placeholderTextColor="#546574"
       
      />
      <View>
        <Text style={styles.label}>Tipo</Text>
      </View>
      <View style={styles.pickeContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Incluido en el precio" value="incluido" />
            <Picker.Item label="Añadido al precio" value="añadido" />
          </Picker>
      </View>
      <View style={{ height: 20 }} />
      <TouchableOpacity  style={styles.buttonContainer}>
        <Text style={styles.buttonText}>CREAR ARTICULO</Text>
      </TouchableOpacity>
    </View>
  )
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
    pickeContainer: {
      marginBottom: 25,
      borderBottomWidth: 1,
      borderBottomColor: "red",
      height: 40,
      color: "#546574",
      borderRadius: 5,
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