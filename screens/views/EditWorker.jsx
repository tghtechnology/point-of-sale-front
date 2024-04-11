import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Picker, Modal, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useWorker from '../hooks/useWorker';
import WorkerProvider from '../context/worker/WorkerProvider';
import CustomAlert from '../componentes/CustomAlert';

const INITIAL_STATE = {
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    cargo: '', // Establecer el valor inicial del cargo aquí
  }

const EditWorker = () => {
    const {handleEditWorker, handleUpdateWorker } = useWorker()
    const [editedData, setEditedData] = useState(INITIAL_STATE);
    const [selectedWorker, setselectedWorker] = useState({});


return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={editedData.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={editedData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={editedData.telefono}
        onChangeText={(text) => handleChange('telefono', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={editedData.direccion}
        onChangeText={(text) => handleChange('direccion', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={editedData.ciudad}
        onChangeText={(text) => handleChange('ciudad', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Región"
        value={editedData.region}
        onChangeText={(text) => handleChange('region', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Código Postal"
        value={editedData.codigo_postal}
        onChangeText={(text) => handleChange('codigo_postal', text)}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>País</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => {
            setSelectedCountry(itemValue);
            handleChange('pais', itemValue); 
          }}
        >
          <Picker.Item label="Seleccionar país" value="" />
          {countries.map((country, index) => (
            <Picker.Item key={index} label={country} value={country} /> 
          ))}
        </Picker>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Edición Exitosa"
        message="El cliente se ha editado correctamente."
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
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    marginBottom: 10,
  },
  picker: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#546574',
  },
});
export default EditWorker