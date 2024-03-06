import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa los iconos de FontAwesome

const CustomAlert = ({ isVisible, onClose, title, message, buttonColor, iconName }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Icon name={iconName} size={30} color="#900" />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={{ ...styles.button, backgroundColor: buttonColor }} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // Esto hará que el fondo sea semi-transparente
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomAlert;