import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Navigation from "./Navigation.jsx";
import UsuarioProvider from "./screens/context/usuarios/UsuarioProvider.jsx";
import CategoryProvider from "./screens/context/category/CategoryProvider.jsx";
import CountryProvider from "./screens/context/country/CountryProvider.jsx";
import DiscountProvider from "./screens/context/discount/DiscountProvider.jsx";
import ArticleProvider from "./screens/context/article/ArticleProvider.jsx"

export default function App() {
  return (
    <UsuarioProvider>
      <CountryProvider>
        <DiscountProvider>
          <CategoryProvider>
            <ArticleProvider>
              <Navigation />
            </ArticleProvider>
          </CategoryProvider>
        </DiscountProvider>
      </CountryProvider>
    </UsuarioProvider>
  );
}
