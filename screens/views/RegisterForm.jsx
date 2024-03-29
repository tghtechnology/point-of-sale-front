import { useState,useEffect   } from 'react'
import {  View, Text ,TextInput ,StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import useUser from '../hooks/useUser';
import useCountry from '../hooks/useCountry';
import UsuarioProvider from '../context/usuarios/UsuarioProvider';
import CountryProvider from '../context/country/CountryProvider';


const INITIAL_STATE = {
  nombre:'',
  email:'',
  password:'',
}

const RegisterForm = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [ dataForm, setDataForm] = useState(INITIAL_STATE);
  const [countrySelect, setCountrySelect] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {handleCreateUser} = useUser();
  const { countries,fetchCountries } = useCountry();
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  //para los paises
  useEffect(() => {
    fetchCountries(); // Llama a fetchCountries cuando el componente se monta
  }, []);


  const getValues = (name,value) => {
    setDataForm({
      ...dataForm,
      [name]:value
    })
  }

  const handleSubmit = async () => {
    
    const objectSend = {
      ...dataForm,
      pais:countrySelect
    }
    
    //control de errores para el crear un usuario
    try {
      const response = await handleCreateUser(objectSend);
      if(response){
        alert("Usuario creado con exito")
        setDataForm(INITIAL_STATE);
        setCountrySelect('');
      }else{
        alert("El usuarios no se pudo crear");
      }
    } catch (error) {
      alert("problema interno del servidor")
    }
    console.log("valor del formulario"  + JSON.stringify(objectSend));
  }
  return (
    
      <View style={styles.container}>
        {/* IMPUT DE CORREO ELECTRONICO */}
        <Text style={styles.Tittle}>Registro</Text>
        <TextInput
          style={styles.input} 
          placeholder="Correo Electrónico"
          placeholderTextColor="#546574"
          keyboardType='email-address'
          value={dataForm.email}
          onChangeText={text => getValues('email', text)}
        />

        {/* INPUT PARA ENTRADA DE PASSWORD */}
        <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder=" Contraseña"
          placeholderTextColor="#546574"
          secureTextEntry={!showPassword} // Utiliza SecureTextEntry para ocultar la contraseña
          value={dataForm.password}
          keyboardType=''
          onChangeText={text => getValues('password', text)}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)} // Cambia la visibilidad de la contraseña al tocar el botón
          style={styles.showPasswordButton}
        >
          <Icon
          name={showPassword ? 'eye' : 'eye-slash'}
          size={20}
          color="#546574"
          />
        </TouchableOpacity>
        </View>

        {/* IMPUT PARA ENTRADA DE NOMBRE DE NEGOCIO */}
        <TextInput
        style={styles.input} 
          placeholder="Nombre del Negocio"
          placeholderTextColor="#546574"
          value={dataForm.nombreNegocio}
          onChangeText={text => getValues('nombre', text)}
        />
        
        {/* INPUT PARA SELECCIONAR PAIS */}
        <Text>Selecciona un país:</Text>
        {console.log("countries:", countries)}
        <Picker
  selectedValue={countrySelect}
  onValueChange={(itemValue, itemIndex) => setCountrySelect(itemValue)}
>
  {countries && countries.map((country, index) => (
    <Picker.Item key={index} label={country} value={country} />
  ))}
</Picker>
      <Text>País seleccionado: {countrySelect}</Text>

        {/* BOTON DE ACCION DE REGISTRO */}
        <TouchableOpacity style={styles.buttonRegister} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* MODAL DE ALERTA EN CASO SE HIZO CORRECTO */}
        <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
          <View style={styles.modalContainer}>
            <Icon name="check-circle" size={80} color="green" style={styles.icon} />
            <Text style={styles.modalText}>Registro Exitoso</Text>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    
  )
}

const styles = StyleSheet.create({

  container: {
    marginTop: 100, // Puedes ajustar este valor según tus necesidades
    paddingHorizontal: 25, // Añadido para agregar espaciado a los lados
  },
    Tittle: {
      fontSize: 34,
      textAlign: 'center',
      marginBottom: 50,
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
        flex:1,
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

export default RegisterForm;