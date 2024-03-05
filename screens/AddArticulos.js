import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper'; 
import React, { useState } from 'react';

export default function AddArticulos() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVendidoPor, setSelectedVendidoPor] = useState('unidad');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Nombre'
        placeholderTextColor="#546574"
      />
      <View>
        <Text style={styles.label}>Categoría</Text>
      </View>
      <View style={styles.pickeContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Sin Categoria" value="" />
          <Picker.Item label="Crear Categoria" value="Categoria 2" />
        </Picker>
      </View>
      <View>
        <Text >Vendido por</Text>
      </View>
      <RadioButton.Group
        onValueChange={(value) => setSelectedVendidoPor(value)}
        value={selectedVendidoPor}
      >
        <View style={styles.radioContainer}>
          <RadioButton value="unidad" />
          <Text>Unidad</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="pesos" />
          <Text>Pesos</Text>
        </View>
      </RadioButton.Group>
      <TextInput
        style={styles.input}
        placeholder='Precio'
        placeholderTextColor="#546574"
      />
      <View>
        <Text style={styles.info}>Deje el campo en blanco para indicar el precio durante la venta </Text>
      </View>
      <View>
        <Text style={styles.label}>Coste</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder='S/0.00'
        placeholderTextColor="black"
      />
      <View>
        <Text style={styles.label}>REF</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder='10000'
        placeholderTextColor="black"
      />
      <TextInput
        style={styles.input}
        placeholder='Codigo de barras'
        placeholderTextColor="#546574"
      />
      <View>
        <Text style={styles.inv} >Inventario</Text>
      </View>
      <View style={styles.inventarioContainer}>
      <Text style={styles.text} >Seguir el Inventario</Text>
      <View >
          <Switch
            trackColor={{ false: "#767577", true: "red" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      {isEnabled && <TextInput style={styles.input} placeholder='0' placeholderTextColor="black" />}
    </View>
    <View>
        <Text style={styles.inv} >Impuestos</Text>
      </View>
      <View >
      <Text  >Ig,0.18%</Text>
          <Switch
            trackColor={{ false: "#767577", true: "red" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
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
  info: {
    color: '#546574'
  },
  pickeContainer: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    height: 40,
    color: '#546574',
    borderRadius: 5,
  },

  label: {
    marginTop: 4,
    color: '#546574',
  },
  radioContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  inv: {
    marginTop: 10,
    color: 'red',
  },
  text: {
    color: 'black',
  },
  inventarioContainer: {
    marginTop: 10,
    
  },

  switchContainer: {
    marginLeft: 10, // Puedes ajustar el valor según sea necesario
  },

  
});
