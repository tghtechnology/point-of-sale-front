import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa los iconos de FontAwesome

const CustomAlert = ({ isVisible, onClose, title, message, iconName }) => {
  return (
    <Modal
  animationType="fade"
  transparent={true}
  visible={isVisible}
  onRequestClose={onClose}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      {/* Icono de éxito */}
      <View style={styles.iconWrapper}>
        <Icon name={iconName || "check-circle"} size={40} color="#fff" />
      </View>
      {/* Título */}
      <Text style={styles.title}>{title ||"¡Éxito!"}</Text>
      {/* Mensaje */}
      <Text style={styles.message}>{message || "Solicitud hecha con exito"}</Text>
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
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  iconWrapper: {
    backgroundColor: '#4CAF50', // Fondo verde para el icono de éxito
    borderRadius: 50,
    padding: 5,
    marginBottom: 20,
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
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

export default CustomAlert;