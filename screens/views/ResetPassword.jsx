import React, { useState } from 'react';
import { View, TextInput, Text,TouchableOpacity, StyleSheet,Alert } from 'react-native';
import useAuth from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { changePassword } = useAuth(); // Verifica si el usuario está disponible

  const handleSubmit = async () => {

    try {
      await changePassword(currentPassword, newPassword, confirmPassword); // Usamos la función para cambiar la contraseña
      Alert.alert("Éxito", "Contraseña cambiada con éxito");
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      Alert.alert("Error", error.message); // Mostrar errores
    }
  };
  
  return (
    <View style={styles.container}>
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
          <Text style={styles.text}>Guardar Cambios</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  buttom: {
    backgroundColor: 'red',
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
