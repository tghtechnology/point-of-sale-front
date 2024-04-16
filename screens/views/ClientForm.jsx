import { useState,useEffect   } from 'react'
import {  View, Text ,TextInput ,StyleSheet, TouchableOpacity} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import useCountry from '../hooks/useCountry';
import useClient from '../hooks/useClient';
import ClientProvider from '../context/cliente/ClientProvider';
import CountryProvider from '../context/country/CountryProvider';
import CustomAlert from '../componentes/CustomAlert';

const INITIAL_STATE = {
    nombre:'',
    email:'',
    telefono:'',
    direccion:'',
    ciudad:'',
    region:'',
    codigo_postal:'',
  }
  const ClientForm = () => {
    const [ data, setData] = useState(INITIAL_STATE);
    const [countrySelect, setCountrySelect] = useState('');
    const { countries,fetchCountries } = useCountry();
    const {handleCreateClient,client, setClient} = useClient();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetchCountries(); // Llama a fetchCountries cuando el componente se monta
      }, []);
    
    const getValues = (name,value) => {
        setData({
          ...data,
          [name]:value
        })
      }

    const handleSubmit = async () => {
        const objectSend = {
          ...data,
          pais:countrySelect
        }   
        //control de errores para el crear un usuario
        try {
          const nuevoCliente = await handleCreateClient(objectSend);
          if(nuevoCliente && nuevoCliente.id){
            setData(INITIAL_STATE);
            setCountrySelect('');
            setClient([...client, nuevoCliente]);
            setShowAlert(true);
          }else{
            throw new Error("La respuesta del servidor no contiene un impuesto válido.");
          }
        } catch (error) {
          alert("problema interno del servidor")
        }
        console.log("valor del formulario"  + JSON.stringify(objectSend));
      }

      const handleCloseAlert = () => {
        setShowAlert(false);
    };
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Nuevo Cliente</Text>
          {/* Contenido del formulario */}
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre Cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del cliente"
            value={data.nombre}
            onChangeText={text => getValues('nombre', text)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={data.email}
            onChangeText={text => getValues('email', text)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefono</Text>
          <TextInput
            style={styles.input}
            placeholder="Numero de telefono"
            value={data.telefono}
            onChangeText={number => getValues('telefono', number)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Direccion</Text>
          <TextInput
            style={styles.input}
            placeholder="Direccion"
            value={data.direccion}
            onChangeText={text => getValues('direccion', text)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder="ciudad"
            value={data.ciudad}
            onChangeText={text => getValues('ciudad', text)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Region</Text>
          <TextInput
            style={styles.input}
            placeholder="Region"
            value={data.region}
            onChangeText={text => getValues('region', text)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Codigo Postal</Text>
          <TextInput
              style={styles.input}
              placeholder="Codigo Postal"
              value={data.codigo_postal}
              onChangeText={text => getValues('codigo_postal', text)}
              keyboardType="numeric"
          />
          </View>
          {/* INPUT PARA SELECCIONAR PAIS */}
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Selecciona un país:</Text>
        {console.log("countries:", countries)}
        <Picker
        selectedValue={countrySelect}
        onValueChange={(itemValue, itemIndex) => setCountrySelect(itemValue)}
        >
        <Picker.Item label="Seleccionar país" value="" />
        {countries && countries.map((country, index) => (
        <Picker.Item key={index} label={country} value={country} />
        ))}
        </Picker>
        <Text>País seleccionado: {countrySelect}</Text>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Crear Cliente</Text>
            </TouchableOpacity>
          </View>
          <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Cliente Creado"
        message="El cliente se ha creado correctamente."
        buttonColor="#2196F3"
        iconName="check-circle" // Puedes cambiar el icono según lo desees
        />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ClientForm