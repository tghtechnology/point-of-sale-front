import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import useWorker from '../../hooks/useWorker';
import useCountry from '../../hooks/useCountry';
import CustomAlert from '../../componentes/Alertas/CustomAlert';
import ErrorAlert from '../../componentes/Alertas/ErrorAlert';

const INITIAL_STATE = {
  nombre: '',
  email: '',
  password: '',
  telefono: '',
  cargo: '',
};

// Constante para seleccionar cargos
const cargosDisponibles = ['Administrador', 'Gerente', 'Cajero'];

const FormRegisEmpleado = () => {
  const [cargo, setCargo] = useState(INITIAL_STATE.cargo);
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const { countries, fetchCountries } = useCountry();
  const [countrySelect, setCountrySelect] = useState('');
  const [data, setData] = useState(INITIAL_STATE);
  const { handleCreateWorker, worker, setWorker } = useWorker();

  const handleCargoChange = (cargoSeleccionado) => {
    setCargo(cargoSeleccionado);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const getValues = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const objectSend = {
      ...data,
      pais: countrySelect,
      cargo,
    };

    try {
      const nuevoEmpleado = await handleCreateWorker(objectSend);
      if (nuevoEmpleado && nuevoEmpleado.id) {
        setData(INITIAL_STATE);
        setWorker([...worker, nuevoEmpleado]);
        setCountrySelect('');
        setShowAlert(true);
      } else {
        setErrorAlertVisible(true);
        throw new Error("La respuesta del servidor no contiene un empleado válido.");
      }
    } catch (error) {
      setErrorAlertVisible(true);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.topBanner}>
        </View>
        <View style={styles.formBackground}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#546574"
          value={data.nombre}
          onChangeText={(text) => getValues('nombre', text)}
        />

        <Text style={styles.label}>Correo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#546574"
          value={data.email}
          onChangeText={(text) => getValues('email', text)}
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={data.password}
          onChangeText={(text) => getValues('password', text)}
        />

        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          keyboardType='numeric'
          value={data.telefono}
          onChangeText={(text) => getValues('telefono', text)}
        />
        <Text style={styles.label}>Seleccione un cargo:</Text>
        <View style= {styles.pickerContainer}>
        <Picker
          selectedValue={cargo}
          onValueChange={handleCargoChange}
          style={styles.picker}
        >
          <Picker.Item label="Cargo:" value="" />
          {cargosDisponibles.map((cargo, index) => (
            <Picker.Item label={cargo} value={cargo} key={index} />
          ))}
        </Picker>
        </View>
        <Text style={styles.label}>Seleccione un país:</Text>
        <View style= {styles.pickerContainer}>
        <Picker
          selectedValue={countrySelect}
          onValueChange={(itemValue) => setCountrySelect(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="País:" value="" />
          {countries && countries.map((country, index) => (
            <Picker.Item key={index} label={country} value={country} />
          ))}
        </Picker>
        </View>
        <TouchableOpacity style={styles.buttonRegister} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        </View>
        <CustomAlert isVisible={showAlert} onClose={() => setShowAlert(false)}/>
        <ErrorAlert isVisible={errorAlertVisible} onClose={() => setErrorAlertVisible(false)}/>
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    
    paddingBottom: 50, // Asegura que el contenido no esté cortado
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F7F7',
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
    margin:'auto',
    top:'10%',
    marginBottom:'30%'
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
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#517EF2',
    fontWeight: '600',
  },
  buttonRegister: {
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

export default FormRegisEmpleado;