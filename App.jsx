import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Navigation from "./Navigation.jsx"
import UsuarioProvider from './screens/context/usuarios/UsuarioProvider.jsx';
import CategoryProvider from './screens/context/category/CategoryProvider.jsx';
import CountryProvider from './screens/context/country/CountryProvider.jsx';
import AuthProvider from './screens/context/auth/AuthProvider.jsx';
import EmailProvider from './screens/context/email/EmailProvider.jsx';



export default function App() {
  return (
  <EmailProvider>
    <AuthProvider>
    <UsuarioProvider>
      <CountryProvider>
      <CategoryProvider>
      <Navigation/>
      </CategoryProvider>   
      </CountryProvider>
    </UsuarioProvider>
  </AuthProvider>
  </EmailProvider>
  );
} 