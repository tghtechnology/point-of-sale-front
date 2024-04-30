import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../views/HomeScreen';
import DeleteAccount from '../views/DeleteAccount';
import ArticlesNavigate from '../views/ArticlesNavigate';
import MiembNavigate from '../views/MiembNavigate'
import PlusArticles from '../views/PlusArticles';
import PlusCategory from '../views/PlusCategory';
import ArticlesForm from '../views/ArticlesForm';
import Icon from "react-native-vector-icons/Entypo";
import CategoryForm from '../views/CategoryForm';
import { Ionicons, MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import HomeView from '../views/HomeView';
import LoginForm from "../views/LoginForm"
import RegisterForm from '../views/RegisterForm';
import EnvioCorreoForm from '../views/EnvioCorreoForm';
import DiscountForm from '../views/DiscountForm';
import FormRegisEmpleado from '../views/FormRegisEmpleado';
import ArticlesEdit from '../views/ArticlesEdit';
import PlusDiscount from '../views/PlusDiscount';
import PlusFalseDiscount from '../views/PlusFalseDiscount';
import PlusImpuesto from '../views/PlusImpuesto';
import ImpuestoForm from '../views/ImpuestoForm';
import ImpuestoEdit from '../views/ImpuestoEdit';
import CategoryEdit from '../views/CategoryEdit';
import ClientForm from '../views/ClientForm';
import PlusClients from '../views/PlusClients';
import ClientEdit from '../views/ClientEdit'
import PlusWorkers from '../views/PlusWorkers';
import RecibosScreen from '../views/RecibosScreen';
import VentNavigate from '../views/VentNavigate';
import TicketFormHome from '../views/TicketFormHome';
import ReceiptForm from '../views/ReceiptForm';
import EditWorker from '../views/EditWorker';
import ProfileEdit from '../views/ProfileEdit';
import ResetPassword from '../views/ResetPassword';
import DataUser from '../views/DataUser';


function StackNavigation() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
return (
    <Stack.Navigator  initialRouteName="Main" screenOptions={{ statusBarColor: "#0258FE",headerStyle: { backgroundColor: "#0258FE" },headerTintColor: "#fff",headerTitleStyle: {color: "#fff",},}} >
      <Stack.Screen name="Main" component={HomeView}  options={{headerShown:false}} />
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Register" component={RegisterForm} />
      <Stack.Screen name="Envio" component={EnvioCorreoForm} />
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
        statusBarColor: "#051EFF",
        headerStyle: { backgroundColor: "#051EFF" },
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

      <Stack.Screen name="Art" component={PlusArticles} options={{ title: "Todos los artículos",
     headerRight: () => (
      <><FontAwesome
          name="sort-down"
          size={16}
          color="#fff"
          style={{ marginRight: 119 }}/>
        <Ionicons name="search-outline" size={24} color="#fff" />
      </>
    ),}}
      />
      <Stack.Screen name="Crear Articulo" component={ArticlesForm}></Stack.Screen>
      <Stack.Screen name="Editar Articulo" component={ArticlesEdit}></Stack.Screen>
      <Stack.Screen name="Categorias" component={PlusCategory} options={{headerRight: () => (<><Ionicons name="search-outline" size={24} color="#fff" /></>),}}></Stack.Screen>
      
      <Stack.Screen name="Crear Descuento" component={DiscountForm}  ></Stack.Screen>
      <Stack.Screen name="Editar Categoria" component={CategoryEdit}  ></Stack.Screen>
      <Stack.Screen name="Crear Categoria" component={CategoryForm} ></Stack.Screen>
      <Stack.Screen name="Descuento" component={PlusDiscount}  options={{headerRight: () => (<><Ionicons name="search-outline" size={24} color="#fff" /></>),}}></Stack.Screen>
      <Stack.Screen name="Impuestos" component={PlusImpuesto}  ></Stack.Screen>
      <Stack.Screen name="Creación de un impuesto" component={ImpuestoForm}  ></Stack.Screen>
      <Stack.Screen name="Editar Impuestos" component={ImpuestoEdit}  ></Stack.Screen>
    
      <Stack.Screen name="Descuentos Desactivados" component={PlusFalseDiscount}></Stack.Screen>
    </Stack.Navigator>
  );
};

function VentaScreen() {
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
    <Stack.Screen name="Ventas" component={VentNavigate} options={{ headerLeft: () => {
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
      <Stack.Screen name="Ticket" component={TicketFormHome}></Stack.Screen>
      <Stack.Screen name="Recibos" component={ReceiptForm}></Stack.Screen>
    </Stack.Navigator>
  );
};

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
      <Stack.Screen name="Registrar Empleado" component={FormRegisEmpleado} options={{ title: "Todos los miembros",
     headerRight: () => (
      
        <Ionicons name="search-outline" size={24} color="#fff" />
    
    ),}}
      />
      <Stack.Screen name="Cliente" component={PlusClients}></Stack.Screen>
      <Stack.Screen name="Crear Cliente" component={ClientForm}></Stack.Screen>
      <Stack.Screen name="Editar Cliente" component={ClientEdit}></Stack.Screen>
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
      <Stack.Screen name="Recibos" component={RecibosScreen} options={{ headerLeft: () => {
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
        </Stack.Navigator>
  );

};


const DrawerNav =()=> {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator 
     screenOptions={{headerShown:false}}>
      <Drawer.Screen name="Soporte" component={StackNavigation} options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "information-outline" size={25} color="#778899" />), }}/>
      <Drawer.Screen name="Ventas" component={VentaScreen}  options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "cash-multiple" size={25} color="#778899" />), }}/>
      <Drawer.Screen name="Articulos" component={ArticulosScreen}  options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "cart" size={25} color="#778899" />), }}/>
      <Drawer.Screen name="Miembros" component={MiembrosScreen}  options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "account-group" size={25} color="#778899" />), }}/>
    </Drawer.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <DrawerNav/>
    </NavigationContainer>
  );
};