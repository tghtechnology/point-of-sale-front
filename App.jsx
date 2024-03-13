import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Navigation from "./Navigation.jsx"
import UsuarioProvider from './screens/context/usuarios/UsuarioProvider.jsx';
import CategoryProvider from './screens/context/category/CategoryProvider.jsx';
import CountryProvider from './screens/context/country/CountryProvider.jsx';



export default function App() {
  return (
    <UsuarioProvider>
      <CountryProvider>
      <CategoryProvider>
      <Navigation/>
      </CategoryProvider>   
      </CountryProvider>
    </UsuarioProvider>
    
  );
} 