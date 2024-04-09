import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import useWorker from '../hooks/useWorker';
import WorkerProvider from '../context/worker/WorkerProvider';

const INITIAL_STATE = {
  nombre: '',
  correo: '',
  telefono: '',
  cargo: '', 
}

//Contante para Seleccionar Cargos
const cargosDisponibles = ['Administrador', 'Gerente', 'Cajero'];
//

const FormRegisEmpleado = () => {
  const [cargo, setCargo] = useState(INITIAL_STATE.cargo); 
  

  const handleCargoChange = (cargoSeleccionado) => {
    setCargo(cargoSeleccionado);
   
  };
  

  const [data, setData] = useState(INITIAL_STATE);
  const { handleCreateWorker,worker,setWorker } = useWorker();

  const getValues = (name, value) => {
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = async () => {
    const objectSend = {
      ...data,
      cargo: cargo 
    }
   
    try {
      const response = await handleCreateWorker(objectSend);
      if (response) {
        alert("Empleado creado con exito")
        setData(INITIAL_STATE);
        setWorker([...worker,objectSend]);
      } else {
        alert("El Empleado no se pudo crear");
      }
    } catch (error) {
      alert("problema interno del servidor")
    }
    console.log("valor del formulario" + JSON.stringify(objectSend));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Tittle}>Registro Empleado</Text>
      <Icon name="user-circle" size={100} color="#900" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#546574"
        onChangeText={text => getValues('nombre', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo Electronico"
        placeholderTextColor="#546574"
        onChangeText={text => getValues('correo', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Numero de Telefono"
        placeholderTextColor="#546574"
        onChangeText={text => getValues('telefono', text)}
      />

      <Text style={styles.label}>Seleccione un cargo:</Text>
      <Picker
        selectedValue={cargo}
        onValueChange={handleCargoChange}
        style={styles.picker}
      >
        <Picker.Item label="" value="" />
        {cargosDisponibles.map((cargo, index) => (
          <Picker.Item label={cargo} value={cargo} key={index} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.buttonRegister} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    marginTop: 100, 
    paddingHorizontal: 25, 
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
    borderBottomWidth: 1,
    borderBottomColor: 'red', 
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
    borderBottomWidth: 1, 
    borderBottomColor: 'red', 
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