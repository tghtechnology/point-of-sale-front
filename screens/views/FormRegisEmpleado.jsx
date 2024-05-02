import React, { useState, useEffect } from 'react'
import {ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import useWorker from '../hooks/useWorker';
import useCountry from '../hooks/useCountry';
import WorkerProvider from '../context/worker/WorkerProvider';
import CustomAlert from '../componentes/CustomAlert';

const INITIAL_STATE = {
  nombre: '',
  email: '',
  password: '',
  telefono: '',
  cargo: '', // Establecer el valor inicial del cargo aquí
}

//Contante para Seleccionar Cargos
const cargosDisponibles = ['Administrador', 'Gerente', 'Cajero'];
//

const FormRegisEmpleado = () => {
  const [cargo, setCargo] = useState(INITIAL_STATE.cargo); // Inicializar el estado del cargo con el valor predeterminado
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const { countries,fetchCountries } = useCountry();
  const [countrySelect, setCountrySelect] = useState('');
  const [data, setData] = useState(INITIAL_STATE);
  const { handleCreateWorker, worker, setWorker } = useWorker();

  // Función para manejar cambios en la selección del cargo
  const handleCargoChange = (cargoSeleccionado) => {
    setCargo(cargoSeleccionado);

  };
  //

  //para los paises
  useEffect(() => {
    fetchCountries(); // Llama a fetchCountries cuando el componente se monta
  }, []);

  const getValues = (name, value) => {
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = async () => {
    const objectSend = {
      ...data,
      pais:countrySelect,
      cargo: cargo // Incluir el valor del cargo en el objeto a enviar
    }
    //control de errores para el crear un usuario
    try {
      const nuevoEmpleado = await handleCreateWorker(objectSend);
      if (nuevoEmpleado && nuevoEmpleado.id) {
        setData(INITIAL_STATE);
        setWorker([...worker, objectSend]);
        setCountrySelect('');
        setSuccessAlertVisible(true)
      } else {
        throw new Error("La respuesta del servidor no contiene un empleado válido.");
      }
    } catch (error) {
      alert("problema interno del servidor")
      setErrorAlertVisible(true)
    }
    console.log("valor del formulario" + JSON.stringify(objectSend));
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      <Text style={styles.Tittle}>Registro Empleado</Text>
      <Icon name="user-circle" size={100} color="#900" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#546574"
        value={data.nombre}
        onChangeText={text => getValues('nombre', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo Electronico"
        placeholderTextColor="#546574"
        value={data.email}
        onChangeText={text => getValues('email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#546574"
        secureTextEntry={true}
        value={data.password}
        onChangeText={text => getValues('password', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Numero de Telefono"
        placeholderTextColor="#546574"
        value={data.telefono}
        onChangeText={text => getValues('telefono', text)}
      />

      <Text style={styles.label}>Seleccione un cargo:</Text>
      <Picker
        selectedValue={cargo}
        onValueChange={handleCargoChange}
        style={styles.picker}
      >
        <Picker.Item label="Seleccionar cargo" value="" />
        {cargosDisponibles.map((cargo, index) => (
          <Picker.Item label={cargo} value={cargo} key={index} />
        ))}
      </Picker>
      
      <Text>Selecciona un país:</Text>
        <Picker
        selectedValue={countrySelect}
        onValueChange={(itemValue, itemIndex) => setCountrySelect(itemValue)}
        >
        <Picker.Item label="Seleccionar país" value="" />
        {countries && countries.map((country, index) => (
        <Picker.Item key={index} label={country} value={country} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.buttonRegister} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <CustomAlert
        isVisible={successAlertVisible}
        onClose={() => setSuccessAlertVisible(false)}
        title="Registro exitoso"
        message="Registro de Empleado Exitoso."
        buttonColor="green"
        iconName="check"
      />

      <CustomAlert
        isVisible={errorAlertVisible}
        onClose={() => setErrorAlertVisible(false)}
        title="Error"
        message="Error al Registrar"
        buttonColor="red"
        iconName="times-circle"
      />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  container: {
    marginTop: 100, // Puedes ajustar este valor según tus necesidades
    paddingHorizontal: 25, // Añadido para agregar espaciado a los lados
  },
  Tittle: {
    fontSize: 34,
    textAlign: 'center',
    marginBottom: 50,
  },
  pickeContainer: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    height: 40,
    color: "#546574",
    borderRadius: 5,
  },
  input: {
    marginBottom: 25,
    fontSize: 17,
    borderBottomWidth: 1, // Cambiado de borderWidth
    borderBottomColor: 'red', // Cambiado de borderColor
    height: 40,
    color: '#546574',
    padding: 10,
    borderRadius: 5,
  },
  buttonRegister: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedItem: {
    width: '100%',
    marginBottom: 9,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'red',
    height: 30,
    color: '#546574',
    textAlign: 'center',
    padding: 4,
    borderRadius: 5
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',

    padding: 10,
  },
  passwordInput: {
    flex: 1,
    marginBottom: 25,
    fontSize: 17,
    borderBottomWidth: 1, // Cambiado de borderWidth
    borderBottomColor: 'red', // Cambiado de borderColor
    height: 40,
    color: '#546574',
    padding: 10,
    borderRadius: 5,
  },
  showPasswordButton: {
    padding: 5,
    paddingBottom: 25,
  },
  //alerta modal
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 50,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
    paddingLeft: 120
  },
  modalText: {
    fontSize: 25,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 25,
  },
})

export default FormRegisEmpleado