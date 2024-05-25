import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from "@react-navigation/native";
import useWorker from '../../hooks/useWorker';
import useCountry from '../../hooks/useCountry';
import WorkerProvider from '../../context/worker/WorkerProvider';
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

const EditWorker = () => {
    const route = useRoute();
    const {handleEditWorker, handleUpdateWorker } = useWorker()
    const [editedData, setEditedData] = useState(INITIAL_STATE);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [cargo, setCargo] = useState('');
    const { countries,fetchCountries} = useCountry();
    const [showAlert, setShowAlert] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
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
        setErrorAlertVisible(true);
        console.error('Error al editar el cliente:', error);
      }
    };
    const handleCloseAlert = () => {
      setShowAlert(false);
    };

return (
    <View style={styles.container}>
      <View style={styles.topBanner}></View>
      <View style={styles.formBackground}>
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
      <Text style={styles.label}>Cargo</Text>
      <View style={styles.pickerContainer}>
      <Picker
          style={styles.picker}
          selectedValue={cargo}
          onValueChange={handleCargoChange}
          >
          {cargosDisponibles.map((cargo, index) => (
          <Picker.Item label={cargo} value={cargo} key={index} />
        ))}
      </Picker>
      </View>
        <Text style={styles.label}>País</Text>
        <View style={styles.pickerContainer}>
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
      </View>
      <CustomAlert isVisible={showAlert} onClose={() => setShowAlert(false)}/>
      <ErrorAlert isVisible={errorAlertVisible} onClose={() => setErrorAlertVisible(false)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F9F7F7'
  },
  topBanner: {
    position: 'absolute',
    width: '100%',
    height: '30%', // Suficiente para dar espacio a elementos como el icono y el título
    backgroundColor: '#0258FE',
    justifyContent: 'center', // Centrar contenido verticalmente
    alignItems: 'center', // Centrar contenido horizontalmente
  },
  formBackground: {
    width: '100%',
    backgroundColor: '#F9F7F7',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    borderBottomLeftRadius : 40,
    borderBottomRightRadius: 40,
    top:100
  },
  label: {
    fontSize: 16,
    color: '#517EF2',
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    padding: 10,
    fontSize: 16,
    color: '#546574',
    marginBottom: 20,
  },
  pickerContainer: {
    justifyContent: 'center', // Centrar contenido verticalmente
    alignItems: 'center',
  },
  picker: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonContainer: {
    backgroundColor: '#0258FE',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
export default EditWorker