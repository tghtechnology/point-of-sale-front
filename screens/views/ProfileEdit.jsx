import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useAuth from '../hooks/useAuth';
import useCountry from '../hooks/useCountry';
import CustomAlert from '../componentes/CustomAlert';

const INITIAL_STATE = {
  nombre: '',
  email: '',
  password: '',
  telefono: '',
  cargo: '',
  pais:'', // Establecer el valor inicial del cargo aquí
};
const cargosDisponibles = ['Administrador', 'Gerente', 'Cajero'];

const ProfileEdit = ({ route }) => {
  const { user } = route.params;
  const { editarUsuario, setUser } = useAuth();
  const { countries, fetchCountries } = useCountry();
  const [editedData, setEditedData] = useState(INITIAL_STATE);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (user) {
      setEditedData({
        ...user,
        id: user.id,
      });
      setSelectedCountry(user.pais);
    }
  }, [user]);

  const handleInputChange = (name, value) => {
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleCountryChange = (itemValue) => {
    setSelectedCountry(itemValue);
    handleInputChange('pais', itemValue);
  };

  const handleSubmit = async () => {
    try {
      await editarUsuario(editedData.id, editedData);
      setShowAlert(true);
      setUser(editedData);
    } catch (error) {
      console.error('Error al editar el usuario:', error);
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
        value={editedData.nombre || ''}
        onChangeText={(text) => handleInputChange('nombre', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={editedData.email || ''}
        onChangeText={(text) => handleInputChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={editedData.telefono || ''}
        onChangeText={(text) => handleInputChange('telefono', text)}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>País</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedCountry}
          onValueChange={handleCountryChange}
        >
          {countries.map((country, index) => (
            <Picker.Item key={index} label={country} value={country} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Edición Exitosa"
        message="El usuario se ha editado correctamente."
        buttonColor="#2196F3"
        iconName="check-circle" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#374151',
  },
  picker: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
  },
  pickerContainer: {
    marginBottom: 20,
  },
});

export default ProfileEdit;
