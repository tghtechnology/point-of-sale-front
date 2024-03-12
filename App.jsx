import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Navigation from "./Navigation.jsx"
import UsuarioProvider from './screens/context/usuarios/UsuarioProvider.jsx';
import CategoryProvider from './screens/context/category/CategoryProvider.jsx';


export default function App() {
  return (
    <UsuarioProvider>
      <CategoryProvider>
      <Navigation/>
      </CategoryProvider>
    </UsuarioProvider>
    
  );
} 