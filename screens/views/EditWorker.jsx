import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from "@react-navigation/native";
import useWorker from '../hooks/useWorker';
import useCountry from '../hooks/useCountry';
import WorkerProvider from '../context/worker/WorkerProvider';
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

const EditWorker = () => {
    const route = useRoute();
    const {handleEditWorker, handleUpdateWorker } = useWorker()
    const [editedData, setEditedData] = useState(INITIAL_STATE);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [cargo, setCargo] = useState('');
    const { countries,fetchCountries} = useCountry();
    const [showAlert, setShowAlert] = useState(false);
    const [successEditAlertVisible, setSuccessEditAlertVisible] = useState(false);
    const [errorEditAlertVisible, setErrorEditAlertVisible] = useState(false);

    const handleCargoChange = (cargoSeleccionado) => {
      setCargo(cargoSeleccionado);
      handleChange('cargo', cargoSeleccionado);
  };

    useEffect(() => {
      fetchCountries(); 
    }, []);

    useEffect(() => {
      // Verificamos si existe el parámetro "work" en la ruta.
      const { work } = route.params;
      // Inicializamos el estado editedData con los datos del empleado seleccionado.
      setEditedData(work || INITIAL_STATE);
      // Inicializamos los estados para otros campos si es necesario.
      setSelectedCountry(work ? work.pais : '');
      setCargo(work ? work.cargo : '')
  }, [route.params]);

    const handleChange = (name, value) => {
      setEditedData({
        ...editedData,
        [name]: value,
      });
    };

    const handleSubmit = async () => {
      try {
        await handleEditWorker(editedData.id, editedData);
        await handleUpdateWorker(editedData.id, editedData);
        setShowAlert(true);
        //navigation.goBack();
      } catch (error) {
        console.error('Error al editar el cliente:', error);
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
        placeholder="password"
        value={editedData.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      <Text style={styles.label}>Cargo</Text>
      <Picker
          style={styles.picker}
          selectedValue={cargo}
          onValueChange={handleCargoChange}
          >
          {cargosDisponibles.map((cargo, index) => (
          <Picker.Item label={cargo} value={cargo} key={index} />
        ))}
      </Picker>
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
      <CustomAlert
        isVisible={successEditAlertVisible}
        onClose={() => setSuccessEditAlertVisible(false)}
        title="Actualizacion exitoso"
        message="Empleado Actualizado Exitoso."
        buttonColor="green"
        iconName="check"
      />

      <CustomAlert
        isVisible={errorEditAlertVisible}
        onClose={() => setErrorEditAlertVisible(false)}
        title="Error"
        message="Error al Actualizar Empleado"
        buttonColor="red"
        iconName="times-circle"
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