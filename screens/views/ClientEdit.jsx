import {useState, useEffect} from "react";
import {  View, Text ,TextInput ,StyleSheet, TouchableOpacity} from 'react-native'
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import useClient from '../hooks/useClient';
import useCountry from "../hooks/useCountry";
import CustomAlert from "../componentes/CustomAlert";
import ErrorAlert from "../componentes/ErrorAlert";
import { ScrollView } from "react-native-gesture-handler";


const INITIAL_STATE = {
  nombre: "",
  email: "",
  telefono: "", 
  direccion: "",
  ciudad: "",
  region: "",
  codigo_postal: "",
  pais: "",
};

const ClientEdit = () => {
  const { handleEditClient,handleUpdateClient} = useClient();
  const route = useRoute();
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [editedData, setEditedData] = useState(INITIAL_STATE);
  const [selectedCountry, setSelectedCountry] = useState('');
  const { countries,fetchCountries} = useCountry();

  useEffect(() => {
    fetchCountries(); 
  }, []);

  useEffect(() => {
    const { client } = route.params;
    setEditedData(client || INITIAL_STATE);
    setSelectedCountry(client ? client.pais : '');
  }, [route.params]);

  const handleChange = (name, value) => {
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await handleEditClient(editedData.id, editedData);
      await handleUpdateClient(editedData.id, editedData);
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
    <ScrollView>
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
          <Picker.Item label="Seleccionar país" value="" />
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
    </ScrollView>
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
    top:100,
    marginBottom:'40%'
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
export default ClientEdit