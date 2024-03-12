import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Navigation from "./Navigation.jsx"
import UsuarioProvider from './screens/context/usuarios/UsuarioProvider.jsx';


export default function App() {
  return (
    <UsuarioProvider>
      <Navigation/>
    </UsuarioProvider>
    
  );
}