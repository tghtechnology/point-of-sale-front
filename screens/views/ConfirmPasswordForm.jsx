import { View, Text } from 'react-native'
import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../componentes/CustomAlert';
//Importaciones 
import { useState, useEffect } from 'react'
import useEmail from '../hooks/useEmail';
import EmailProvider from '../context/email/EmailProvider';
//

//Valores Iniciales
const INITIAL_STATE = {
    newPassword: '',
}
//

const ConfirmPasswordForm = () => {
    const navigation = useNavigation();
    const [dataForm, setDataForm] = useState(INITIAL_STATE);
    const { handleSendNewPassword } = useEmail();
    
    //Logica para Cambiar la Contraseña
    const getValues = (name,value) => {
        setDataForm({
          ...dataForm,
          [name]:value
        })
      }

      const handleSendPassword = async () => {
        const objectSend = {
          ...dataForm,
        }
    
        //control de errores para el crear un usuario
        try {
          const response = await handleSendNewPassword(objectSend, token);
          if(response){
            alert("Contraseña Cambiada Correctamente")
            setDataForm(INITIAL_STATE);
          }else{
            alert("No se cambio Correctamente la Contraseña");
          }
        } catch (error) {
          alert("problema interno del servidor")
        }
        console.log("valor del formulario"  + JSON.stringify(objectSend));
      };
      //Aqui Termina


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Ingresar Nueva Contraseña"
                placeholderTextColor="#546574"
                onChangeText={text => getValues('newPassword', text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSendPassword}>
                <Text style={styles.buttonText}>Cambiar Contraseña</Text>
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
        borderBottomColor: 'red', // Cambiado de borderColor
        height: 40,
        color: '#546574',
        padding: 10,
        borderRadius: 5,
    },
    button: {
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
})


export default ConfirmPasswordForm