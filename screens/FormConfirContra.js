import { View, Text } from 'react-native'
import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import CustomAlert from './componentes/CustomAlert';

const FormConfirContra = () => {
    const navigation = useNavigation();
    //Alertas
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [campoAlertVisible, setCampoAlertVisible] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    //
    //Logica para Cambiar la Contraseña
    //const [pin, setPin] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const handleChangePassword = (newPassword) => {
        // Asegúrate de que el PIN ha sido confirmado antes de cambiar la contraseña
        const userData = {
            newPassword: newPassword,
        };

        fetch('http://192.168.18.8:3000/cambiarPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cambiar la contraseña');
                }
                return response.json();
            })
            .then(data => {
                setSuccessAlertVisible(true)
                navigation.navigate('Iniciar Sesion')
                // Maneja la respuesta exitosa del servidor, por ejemplo, navega a otra pantalla
            })
            .catch(error => {
                setErrorAlertVisible(true)
                // Maneja los errores, por ejemplo, muestra un mensaje de error al usuario
            });
    };
    //Aqui Termina

    const handleContraPress = () => {
        console.log('Iniciar presionado');
        navigation.navigate('FormSesion');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Ingresar Nueva Contraseña"
                placeholderTextColor="#546574"
                onChangeText={(text) => setNewPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                placeholderTextColor="#546574"
                secureTextEntry={true}
                onChangeText={(text) => setNewPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={() => handleChangePassword(newPassword)}>
                <Text style={styles.buttonText}>Cambiar Contraseña</Text>
            </TouchableOpacity>

            <CustomAlert
                isVisible={campoAlertVisible}
                onClose={() => setCampoAlertVisible(false)}
                title="Campos Incompletos"
                message="Falta ingresar la Contraseña"
                buttonColor="orange"
                iconName="question" // Agrega el nombre del icono aquí
            />
            <CustomAlert
                isVisible={errorAlertVisible}
                onClose={() => setErrorAlertVisible(false)}
                title="Error"
                message="Proceso no Exitoso, inténtalo de nuevo."
                buttonColor="red"
                iconName="times-circle"
            />
            <CustomAlert
                isVisible={successAlertVisible}
                onClose={() => setSuccessAlertVisible(false)}
                title="Exitoso"
                message="Has cambiado la contraseña Correctamente"
                buttonColor="green"
                iconName="check"
            />
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


export default FormConfirContra