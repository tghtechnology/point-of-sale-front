import { useState,useEffect   } from 'react'
import { ScrollView, View, Text ,TextInput ,StyleSheet, TouchableOpacity} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import useCountry from '../hooks/useCountry';
import useClient from '../hooks/useClient';
import ClientProvider from '../context/cliente/ClientProvider';
import CountryProvider from '../context/country/CountryProvider';
import CustomAlert from '../componentes/CustomAlert';
import ErrorAlert from '../componentes/ErrorAlert';

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
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);

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
        //control de errores para el crear un cliente
        try {
          const nuevoCliente = await handleCreateClient(objectSend);
          if(nuevoCliente && nuevoCliente.id){
            setData(INITIAL_STATE);
            setCountrySelect('');
            setClient([...client, nuevoCliente]);
            setShowAlert(true);
          }else{
            setErrorAlertVisible(true);
            throw new Error("La respuesta del servidor no contiene un impuesto válido.");
          }
        } catch (error) {
          setErrorAlertVisible(true);
        }
        console.log("valor del formulario"  + JSON.stringify(objectSend));
      }

      const handleCloseAlert = () => {
        setShowAlert(false);
    };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topBanner}></View>
        <View style={styles.formBackground}>
          <Text style={styles.label}>Nombre Cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del cliente"
            value={data.nombre}
            onChangeText={text => getValues('nombre', text)}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={data.email}
            onChangeText={text => getValues('email', text)}
          />
          <Text style={styles.label}>Telefono</Text>
          <TextInput
            style={styles.input}
            placeholder="Numero de telefono"
            value={data.telefono}
            onChangeText={number => getValues('telefono', number)}
          />
          <Text style={styles.label}>Direccion</Text>
          <TextInput
            style={styles.input}
            placeholder="Direccion"
            value={data.direccion}
            onChangeText={text => getValues('direccion', text)}
          />
          <Text style={styles.label}>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder="ciudad"
            value={data.ciudad}
            onChangeText={text => getValues('ciudad', text)}
          />
          <Text style={styles.label}>Region</Text>
          <TextInput
            style={styles.input}
            placeholder="Region"
            value={data.region}
            onChangeText={text => getValues('region', text)}
          />
          <Text style={styles.label}>Codigo Postal</Text>
          <TextInput
              style={styles.input}
              placeholder="Codigo Postal"
              value={data.codigo_postal}
              onChangeText={text => getValues('codigo_postal', text)}
              keyboardType="numeric"
          />
          {/* INPUT PARA SELECCIONAR PAIS */}
        
        <Text style={styles.label}>Selecciona un país:</Text>
        <View style={styles.pickerContainer}>
        <Picker
        style={styles.picker}
        selectedValue={countrySelect}
        onValueChange={(itemValue, itemIndex) => setCountrySelect(itemValue)}
        >
        <Picker.Item label="País:" value="" />
        {countries && countries.map((country, index) => (
        <Picker.Item key={index} label={country} value={country} />
        ))}
        </Picker>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Crear Cliente</Text>
        </TouchableOpacity>
        </View>
          
        <CustomAlert isVisible={showAlert} onClose={() => setShowAlert(false)}/>
        <ErrorAlert isVisible={errorAlertVisible} onClose={() => setErrorAlertVisible(false)}/>
  </View>
  </ScrollView>
  )
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
    width: '300px',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#517EF2',
    fontWeight: '600',
  },
  button: {
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

export default ClientForm