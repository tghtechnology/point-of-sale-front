import "react-native-gesture-handler";
import Navigation from "./screens/componentes/Navigation.jsx";
import UsuarioProvider from "./screens/context/usuarios/UsuarioProvider.jsx";
import CategoryProvider from "./screens/context/category/CategoryProvider.jsx";
import CountryProvider from "./screens/context/country/CountryProvider.jsx";
import DiscountProvider from "./screens/context/discount/DiscountProvider.jsx";
import ArticleProvider from "./screens/context/article/ArticleProvider.jsx";
import EmailProvider from "./screens/context/email/EmailProvider.jsx";
import AuthProvider from "./screens/context/auth/AuthProvider.jsx";
import ImpuestoProvider from "./screens/context/impuesto/ImpuestoProvider.jsx";
import ClientProvider from "./screens/context/cliente/ClientProvider.jsx";
import WorkerProvider from "./screens/context/worker/WorkerProvider.jsx";


export default function App() {
  return (
    <WorkerProvider>
    <ClientProvider>
      <ImpuestoProvider>
        <EmailProvider>
          <AuthProvider>
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
          </AuthProvider>
        </EmailProvider>
      </ImpuestoProvider>
    </ClientProvider>
    </WorkerProvider>
  );
}
