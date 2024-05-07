import { View, Text } from 'react-native'
import { TextInput, StyleSheet, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
//Importaciones 
import { useState,useEffect   } from 'react'
import useEmail from '../hooks/useEmail';
import EmailProvider from '../context/email/EmailProvider';
//
//import CustomAlert from '../componentes/CustomAlert';

//Valores Iniciales
const INITIAL_STATE = {
  email:'',
}
//

const EnvioCorreoForm = () => {
  const navigation = useNavigation();
  const [ dataForm, setDataForm] = useState(INITIAL_STATE);
  const {handleSendEmail} = useEmail();
  //const [email, setEmail] = useState('');
  //const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  //const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  //const [campoAlertVisible, setCampoAlertVisible] = useState(false);
  //const [formatAlertVisible, setFormatAlertVisible] = useState(false);

  //Logica de Enviar Correo
  const getValues = (name,value) => {
    setDataForm({
      ...dataForm,
      [name]:value
    })
  }

  const handleSend = async () => {
    const objectSend = {
      ...dataForm,
    }
    
    //control de errores para el crear un usuario
    try {
      const response = await handleSendEmail(objectSend);
      if(response){
        alert("Mensaje Enviado Correctamente")
        setDataForm(INITIAL_STATE);
      }else{
        alert("No se envio Correctmente el Mensaje");
      }
    } catch (error) {
      alert("problema interno del servidor")
      console.log(Error)
    }
    console.log("valor del formulario"  + JSON.stringify(objectSend));
  };
  //Aqui Termina


  return (
    <View style={styles.container}>
      <Text>
        Introduzca su correo electronico para recibir
        un mensaje para reestablecer su contraseña.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Direccion de Correo Electronico"
        placeholderTextColor="#546574"
        onChangeText={text => getValues('email', text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100, // Puedes ajustar este valor según tus necesidades
    paddingHorizontal: 25, // Añadido para agregar espaciado a los lados
  },
  input: {
    marginBottom: 25,
    fontSize: 17,
    borderBottomWidth: 1, // Cambiado de borderWidth
    borderBottomColor: 'blue', // Cambiado de borderColor
    height: 40,
    color: '#546574',
    padding: 10,
    
  },
  button: {
    backgroundColor: '#0258FE',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default EnvioCorreoForm