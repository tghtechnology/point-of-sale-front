import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa los iconos de FontAwesome

const ErrorAlert = ({ isVisible, onClose, title, message, iconName }) => {
  return (
    <Modal
  animationType="fade"
  transparent={true}
  visible={isVisible}
  onRequestClose={onClose}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      {/* Icono */}
      <View style={styles.iconWrapper}>
        <Icon name={iconName || "warning"} size={30} color="#fff" />
      </View>
      {/* Título */}
      <Text style={styles.title}>{title || "¡Error!"}</Text>
      {/* Mensaje */}
      <Text style={styles.message}>{message || "No se pudo hacer la solicitud"}</Text>
      {/* Botón de cierre */}
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
);
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconWrapper: {
    backgroundColor: 'red', // Fondo naranja para el icono
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#555',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 12,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ErrorAlert;