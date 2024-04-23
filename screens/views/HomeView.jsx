import React,{useEffect} from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UsuarioProvider from '../context/usuarios/UsuarioProvider';
import { ScrollView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

import {useFonts} from 'expo-font';



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
      <ScrollView style={styles.container}>
      <View style={[ styles.blueSection]}></View>
        <View style={[ styles.redSection]}>
          <Text style={styles.text}>Home Shop</Text>
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
      </ScrollView>
    </UsuarioProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', 
  },
  container2: {
    display:'flex',
    flexDirection: 'column',
    marginTop:'50px'
  },
    section: {
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
    redSection: {
     backgroundColor: '#051EFF', 
     paddingVertical: '40%',
     

     justifyContent: 'center',
     borderRadius:10,
    
  },
  blueSection:{
    backgroundColor: '#0258FE', 
    paddingVertical: '80%',
    paddingHorizontal:'20%',
    justifyContent: 'center',

  },

  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    top:'70%',
    fontFamily: 'Inika',
  },
  textod:{
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  }, 
  button: {
    marginTop:25,
    backgroundColor: '#0258FE',
    borderRadius: 5,
    display:'flex',
    marginBottom:10,
    padding:15,
    justifyContent:'center',
    alignItems:'center',
    textAlign:"center",
    borderColor:'#fff',
    borderWidth:2,
    
    
  },
  buttonText: {
    color: 'white',
    fontWeight:'400',
    fontSize:24
  },
});
export default HomeView;