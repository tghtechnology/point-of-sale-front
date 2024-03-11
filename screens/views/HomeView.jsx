import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


 function HomeView() {
  const navigation = useNavigation();

  /**Metodo para navegar hacia la vista de Login */
  const showLoginView = () => {
    navigation.navigate('Login');
  };

  /**Metodo para navegar hacia la vista de registro de usuario */
  const showViewRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <View style={[styles.section, styles.redSection]}>
        <Text style={styles.text}>App de Ventas</Text>
        <Text style={[styles.text, styles.textod]}>Tu Sitio Ideal</Text>
      </View>
      <View style={[styles.section, styles.blackSection]}>
        <View style={[styles.container2]}>
          {/* botón de inicio de sesión */}
          <TouchableOpacity
            style={styles.button}
            onPress={showLoginView}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          {/* botón de registro */}
          <TouchableOpacity
            style={styles.button}
            onPress={showViewRegister}
          >
            <Text style={styles.buttonText}> Registrarse </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Esto asegura que los elementos se coloquen de forma vertical
  },
  container2: {
    display:'flex',
    flexDirection: 'column', // Esto asegura que los elementos se coloquen de forma vertical
    gap:'5px',
    marginTop:'10px'
  },
    section: {
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
    redSection: {
     backgroundColor: 'red', // Fondo rojo para la primera sección
     paddingVertical: '55%',
     justifyContent: 'center',
  },

  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    top:'70%',
  },
  textod:{
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  }, 
  button: {
    backgroundColor: 'green',
    paddingHorizontal:'10px',
    paddingVertical:'10px',
    borderRadius: 8,
    textAlign:"center",
    height:'40px',
    width: 'auto',
    
  },
  buttonText: {
    color: 'white',
    fontWeight:'700',
    fontSize:'1rem'
  },
});
export default HomeView;