import React,{useEffect} from 'react'
import { View, Text, StyleSheet,TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UsuarioProvider from '../context/usuarios/UsuarioProvider';
import { ScrollView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import Icono from '../img/Icono.png'


 function HomeView() {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    'Inika': require('../../assets/fonts/Inika-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      console.log('Fuente cargada'); 
    } else {
      console.log('Cargando fuente...');
    }
  }, [fontsLoaded]);

  /**Metodo para navegar hacia la vista de Login */
  const showLoginView = () => {
    navigation.navigate('Login');
  };

  /**Metodo para navegar hacia la vista de registro de usuario */
  const showViewRegister = () => {
    navigation.navigate('Register');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
<UsuarioProvider>
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.blueSection}>
        <View style={styles.redSection}>
          <Image source={Icono} style={styles.logo} />
          <Text style={styles.mainText}>Home Shop</Text>
          <Text style={styles.subText}>Tu Sitio Ideal</Text>
        </View>  
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button} onPress={showLoginView}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={showViewRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </UsuarioProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '80px' // Esto centra horizontalmente todo el contenido
  },
  blueSection: {
    position: 'absolute',
    backgroundColor: '#0258FE',
    height: '90%',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  redSection: {
    backgroundColor: '#051EFF',
    height: '90%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    
  },
  mainText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Inika',
    textAlign: 'center', // Para centrar el texto
  },
  subText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', // Para centrar el texto
  },
  buttonSection: {
    alignItems: 'center',
    marginBottom: '50px',
    
  },
  button: {
    backgroundColor: '#0258FE',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    width: 275,
    height: 71,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center', // Asegura que el texto esté centrado en el botón
  },
  logo: {
    alignSelf: 'center', // Centra la imagen horizontalmente
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: '50%',
    borderRadius: 8,
  },
});
export default HomeView;