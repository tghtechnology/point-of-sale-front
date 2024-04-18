import React, { useState } from 'react';
import { View, TextInput, Text,TouchableOpacity, StyleSheet } from 'react-native';

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Aquí puedes manejar la lógica para cambiar la contraseña
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
