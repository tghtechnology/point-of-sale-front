import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useAuth from '../../hooks/useAuth';
import useCountry from '../../hooks/useCountry';
import CustomAlert from '../../componentes/Alertas/CustomAlert';
import ErrorAlert from '../../componentes/Alertas/ErrorAlert';

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
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

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
      setErrorAlertVisible(true);
      console.error('Error al editar el usuario:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
      </View>

      <View style={styles.profileCard}>
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
      </View>
      <CustomAlert isVisible={showAlert} onClose={() => setShowAlert(false)}/>
      <ErrorAlert isVisible={errorAlertVisible} onClose={() => setErrorAlertVisible(false)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  topBanner: {
    position:'absolute',
    width: '100%',
    height: '50%',
    backgroundColor: '#0258FE',
    justifyContent: 'center',
    borderBottomLeftRadius : 8,
    borderBottomRightRadius: 8,
  },
  profileCard: {
    backgroundColor: '#F9F7F7',
    borderRadius: 10,
    shadowColor: '#000',
    height: '80%',
    top: 50, 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    margin: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2
  },
  input: {
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0258FE',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
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
