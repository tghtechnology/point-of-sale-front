import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Navigation from "./Navigation.jsx"
import UsuarioProvider from './screens/context/usuarios/UsuarioProvider.jsx';
import CategoryProvider from './screens/context/category/CategoryProvider.jsx';
import CountryProvider from './screens/context/country/CountryProvider.jsx';
import DiscountProvider from './screens/context/discount/DiscountProvider.jsx';



export default function App() {
  return (
    <UsuarioProvider>
      <CountryProvider>
      <DiscountProvider>
      <CategoryProvider>
<<<<<<< Updated upstream
      <Navigation/>
      </CategoryProvider>  
      </DiscountProvider> 
      </CountryProvider>
=======
        <Navigation/>
      </CategoryProvider>
>>>>>>> Stashed changes
    </UsuarioProvider>
    
  );
} 