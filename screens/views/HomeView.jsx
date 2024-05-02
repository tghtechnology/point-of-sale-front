import React,{useEffect} from 'react'
import { View, Text, StyleSheet,TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UsuarioProvider from '../context/usuarios/UsuarioProvider';
import { ScrollView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import Icono from '../img/Icono.png';


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
      <ScrollView >
      <View style={[ styles.blueSection]}></View>
      <View style={[ styles.redSection]}>
        
          <Text style={styles.text}>Home Shop</Text>
          <Text style={[styles.text, styles.textod]}>Tu Sitio Ideal</Text>
        </View>
      
      <Image source={Icono} style={styles.logo} />
      
        
       
        <View style={styles.section}>
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
    marginTop:-45,
  },
    section: {
    
    width: '100%',
    alignItems: 'center',
  },
    redSection: {
     backgroundColor: '#051EFF', 
     paddingVertical: '50%',
     position: 'absolute',
     paddingHorizontal: '21.5%',
     justifyContent: 'center',
  },

  blueSection:{
    backgroundColor: '#0258FE', 
    paddingVertical: '80%',
    paddingHorizontal:'20%',
    justifyContent: 'center',
    borderRadius:8,
  },

  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    top:'200%',
    textAlign: 'center',
    fontFamily: 'Inika',
  },
  textod:{
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  }, 
  button: {
    
    backgroundColor: '#0258FE',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 8,
    width:275,
    height:71,
    textAlign:'center',
    marginBottom:20,
    borderWidth:2,
    borderColor:'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  
     
  },
 
  logo: {
    position: 'absolute',
    
    top: 10,
    left: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight:'400',
    textAlign:'center',
    alignItems:'center',
    fontSize:24
  },
});
export default HomeView;