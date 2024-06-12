import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginAlert = ({ isVisible, onClose, title, message, iconName }) => {
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <Animated.View style={[styles.modalView, { opacity: fadeAnim }]}>
          <View style={styles.iconWrapper}>
            <Icon name={iconName || "exclamation-circle"} size={30} color="#fff" />
          </View>
          <Text style={styles.title}>{title || "Datos incorrectos"}</Text>
          <Text style={styles.message}>{message || "Verifique su email o contraseña"}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </Animated.View>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#E5C814',
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
    backgroundColor: '#E5C814',
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

export default LoginAlert;
