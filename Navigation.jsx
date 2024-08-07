import 'react-native-gesture-handler';
import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './screens/views/Cuenta/HomeScreen';
import DeleteAccount from './screens/views/Cuenta/DeleteAccount';
import ArticlesNavigate from './screens/views/ArticlesNavigate';
import PlusArticles from './screens/views/Articulos/PlusArticles';
import ArticlesForm from './screens/views/Articulos/ArticlesForm';
import ArticlesEdit from './screens/views/Articulos/ArticlesEdit';
import MiembNavigate from './screens/views/MiembNavigate'
import PlusCategory from './screens/views/Categorias/PlusCategory';
import Icon from "react-native-vector-icons/Entypo";
import CategoryForm from './screens/views/Categorias/CategoryForm';
import { Ionicons, MaterialCommunityIcons,FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import HomeView from './screens/views/Inicio/HomeView';
import LoginForm from "./screens/views/Login/LoginForm"
import RegisterForm from './screens/views/Login/RegisterForm';
import EnvioCorreoForm from './screens/views/Login/EnvioCorreoForm';
import DiscountForm from './screens/views/Descuentos/DiscountForm';
import FormRegisEmpleado from './screens/views/Empleados/FormRegisEmpleado';
import PlusDiscount from './screens/views/Descuentos/PlusDiscount';
import PlusFalseDiscount from './screens/views/Descuentos/PlusFalseDiscount';
import PlusImpuesto from './screens/views/Impuestos/PlusImpuesto';
import ImpuestoForm from './screens/views/Impuestos/ImpuestoForm';
import ImpuestoEdit from './screens/views/Impuestos/ImpuestoEdit';
import CategoryEdit from './screens/views/Categorias/CategoryEdit';
import ClientForm from './screens/views/Clientes/ClientForm';
import PlusClients from './screens/views/Clientes/PlusClients';
import ClientEdit from './screens/views/Clientes/ClientEdit'
import PlusWorkers from './screens/views/Empleados/PlusWorkers';
import ReceiptForm from './screens/views/Recibos/ReceiptForm';
import EditWorker from './screens/views/Empleados/EditWorker';
import TicketFormHome from './screens/views/Ventas/TicketFormHome';
import TicketListForm from './screens/views/Ventas/TicketListForm';
import TicketSaleForm from './screens/views/Ventas/TicketSaleForm';
import ProfileEdit from './screens/views/Usuario/ProfileEdit';
import DataUser from './screens/views/Usuario/DataUser';
import ResetPassword from './screens/views/Usuario/ResetPassword';
import Rembolsar from './screens/views/Recibos/Rembolsar'
import ReceiptDetails from './screens/views/Recibos/ReceiptDetails';
import AuthContext from "./screens/context/auth/AuthContext"

function StackNavigation() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
return (
    <Stack.Navigator  initialRouteName="Main" screenOptions={{ statusBarColor: "blue",headerStyle: { backgroundColor: "blue" },headerTintColor: "#fff",headerTitleStyle: {color: "#fff",},}} >
      <Stack.Screen name="Main" component={HomeView}  options={{headerShown:false}} />
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Register" component={RegisterForm} />
      <Stack.Screen name="Envio" component={EnvioCorreoForm} />
      <Stack.Screen name="Home" component={TicketFormHome}
        options={{title: "Venta",
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                size={24}
                color="#fff"
              />
            );
          },
        }}
      ></Stack.Screen> 
      <Stack.Screen name="Ticket" component={TicketListForm} />
      <Stack.Screen name="Finalizar venta" component={TicketSaleForm} />
      <Stack.Screen name="Crear Cliente" component={ClientForm}/>
      <Stack.Screen name="Crear Articulo" component={ArticlesForm}></Stack.Screen>
      
    </Stack.Navigator>
  );
};

function SoporteScreen(){
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return(
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#0258FE",
        headerStyle: { backgroundColor: "#0258FE" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen}
        options={{title: "Soporte",
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                size={24}
                color="#fff"
              />
            );
          },
        }}
      ></Stack.Screen> 
      <Stack.Screen name="Profile" component={DeleteAccount}></Stack.Screen>
      <Stack.Screen name="perfil" component={DataUser}></Stack.Screen>
      <Stack.Screen name="Contraseña" component={ResetPassword}></Stack.Screen>
      <Stack.Screen name="Editar usuario" component={ProfileEdit}></Stack.Screen>
    </Stack.Navigator>
  );
};
function ArticulosScreen() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#0258FE",
        headerStyle: { backgroundColor: "#0258FE" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
    <Stack.Screen name="Articulos" component={ArticlesNavigate} options={{ headerLeft: () => {
        return (
            <Icon
              name="menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={24}
              color="#fff"
            />
          );
        },
      }}></Stack.Screen>

      <Stack.Screen name="Art" component={PlusArticles} options={{ title: "Todos los artículos"}}
      />
      <Stack.Screen name="Crear Articulo" component={ArticlesForm}></Stack.Screen>
      <Stack.Screen name="Editar Articulo" component={ArticlesEdit}></Stack.Screen>
      <Stack.Screen name="Categorias" component={PlusCategory}></Stack.Screen>
      
      <Stack.Screen name="Crear Descuento" component={DiscountForm}  ></Stack.Screen>
      <Stack.Screen name="Editar Categoria" component={CategoryEdit}  ></Stack.Screen>
      <Stack.Screen name="Crear Categoria" component={CategoryForm} ></Stack.Screen>
      <Stack.Screen name="Descuento" component={PlusDiscount} ></Stack.Screen>
      <Stack.Screen name="Impuestos" component={PlusImpuesto}  ></Stack.Screen>
      <Stack.Screen name="Creación de un impuesto" component={ImpuestoForm}  ></Stack.Screen>
      <Stack.Screen name="Editar Impuestos" component={ImpuestoEdit}  ></Stack.Screen>
    
      <Stack.Screen name="Descuentos Desactivados" component={PlusFalseDiscount}></Stack.Screen>
    </Stack.Navigator>
  );
};

function Recibos(){
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#0258FE",
        headerStyle: { backgroundColor: "#0258FE" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen name="Recibos" component={ReceiptForm} options={{ headerLeft: () => {
        return (
            <Icon
              name="menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={24}
              color="#fff"
            />
          );
        },
      }}></Stack.Screen>
     <Stack.Screen name="Detalles" component={ReceiptDetails} />
     <Stack.Screen name="Reembolsar" component={Rembolsar} />
    </Stack.Navigator>
  

    )
}

function MiembrosScreen() {
  const Stack = createNativeStackNavigator();
  
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#0258FE",
        headerStyle: { backgroundColor: "#0258FE" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
    <Stack.Screen name="Miembros" component={MiembNavigate} options={{ headerLeft: () => {
        return (
            <Icon
              name="menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={24}
              color="#fff"
            />
          );
        },
      }}></Stack.Screen>

      <Stack.Screen name="Empleados" component={PlusWorkers}></Stack.Screen>
      <Stack.Screen name="Editar empleado" component={EditWorker}></Stack.Screen>
      <Stack.Screen name="Registrar Empleado" component={FormRegisEmpleado} options={{ title: "Crear Empleado"}}
      />
      <Stack.Screen name="Cliente" component={PlusClients}></Stack.Screen>
      <Stack.Screen name="Crear Cliente" component={ClientForm}></Stack.Screen>
      <Stack.Screen name="Editar Cliente" component={ClientEdit}></Stack.Screen>

    </Stack.Navigator>
  );
};


const DrawerNav =()=> {
  const Drawer = createDrawerNavigator();
  const {role } = useContext(AuthContext)

    return (
      <Drawer.Navigator 
        screenOptions={{headerShown: false}}
      >
        <>
          <Drawer.Screen name="Ventas" component={StackNavigation} options={{ drawerIcon: ({ focused, size }) => (<MaterialCommunityIcons name="cash-multiple" size={size} color={focused ? '#0258FE' : '#778899'} />) }} />
          <Drawer.Screen name="Recibos" component={Recibos} options={{ drawerIcon: ({ focused, size }) => (<MaterialCommunityIcons name="receipt" size={size} color={focused ? '#0258FE' : '#778899'} />) }} />
          {role === "Propietario" && (
            <Drawer.Screen name="Articulos" component={ArticulosScreen} options={{ drawerIcon: ({ focused, size }) => (<MaterialCommunityIcons name="cart" size={size} color={focused ? '#0258FE' : '#778899'} />) }} />
          )}
          <Drawer.Screen name="Miembros" component={MiembrosScreen} options={{ drawerIcon: ({ focused, size }) => (<MaterialCommunityIcons name="account-group" size={size} color={focused ? '#0258FE' : '#778899'} />) }} />
          <Drawer.Screen name="Soporte" component={SoporteScreen} options={{ drawerIcon: ({ focused, size }) => (<MaterialCommunityIcons name="information-outline" size={size} color={focused ? '#0258FE' : '#778899'} />) }} />
        </>
      </Drawer.Navigator>
    );
  }


export default function Navigation() {
  return (
    <NavigationContainer>
      <DrawerNav/>
    </NavigationContainer>
  );
};