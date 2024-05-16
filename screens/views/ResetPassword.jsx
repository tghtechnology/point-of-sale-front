import React, { useState } from 'react';
import { View, TextInput, Text,TouchableOpacity, StyleSheet,Alert } from 'react-native';
import useAuth from '../hooks/useAuth';
import CustomAlert from "../componentes/Alertas/CustomAlert";
import ErrorAlert from "../componentes/Alertas/ErrorAlert";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { changePassword } = useAuth(); // Verifica si el usuario está disponible
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  const handleSubmit = async () => {

    try {
      await changePassword(currentPassword, newPassword, confirmPassword); // Usamos la función para cambiar la contraseña
      setShowAlert(true);
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      setErrorAlertVisible(true);
      Alert.alert("Error", error.message); // Mostrar errores
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.topBanner}></View>
      <View style={styles.profileCard}>
      <TextInput
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholderTextColor="#546574"
        placeholder="Contraseña actual"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholderTextColor="#546574"
        placeholder="Nueva contraseña"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#546574"
        placeholder="Confirmar nueva contraseña"
        secureTextEntry
        style={styles.input}
      />
        <TouchableOpacity style={styles.buttom} onPress={handleSubmit} >
          <Text style={styles.text}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
      <CustomAlert isVisible={showAlert} onClose={() => setShowAlert(false)}/>
      <ErrorAlert isVisible={errorAlertVisible} onClose={() => setErrorAlertVisible(false)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  topBanner: {
    position:'absolute',
    width: '100%',
    height: '50%',
    backgroundColor: '#0258FE',
    justifyContent: 'center',
    borderBottomLeftRadius : 8,
    borderBottomRightRadius: 8,
  },
  profileCard: {
    backgroundColor: '#F9F7F7',
    borderRadius: 10,
    shadowColor: '#000',
    height: '80%',
    top: 50, 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    margin: 15,
    marginBottom:20
  },
  input: {
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#D9D9D9',
  },
  buttom: {
    backgroundColor: '#0258FE',
      paddingVertical: 12,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 5,
  },
  text:{
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default ResetPassword;
