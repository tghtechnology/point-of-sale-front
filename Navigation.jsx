import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './screens/views/HomeScreen';
import DeleteAccount from './screens/views/DeleteAccount';
import ArticlesNavigate from './screens/views/ArticlesNavigate';
import MiembNavigate from './screens/views/MiembNavigate'
import PlusArticles from './screens/views/PlusArticles';
import PlusCategory from './screens/views/PlusCategory';
import ArticlesForm from './screens/views/ArticlesForm';
import Icon from "react-native-vector-icons/Entypo";
import CategoryForm from './screens/views/CategoryForm';
import { Ionicons, MaterialCommunityIcons,FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import HomeView from './screens/views/HomeView';
import LoginForm from "./screens/views/LoginForm"
import RegisterForm from './screens/views/RegisterForm';
import EnvioCorreoForm from './screens/views/EnvioCorreoForm';
import DiscountForm from './screens/views/DiscountForm';
import FormRegisEmpleado from './screens/views/FormRegisEmpleado';
import ArticlesEdit from './screens/views/ArticlesEdit';
import PlusDiscount from './screens/views/PlusDiscount';
import PlusFalseDiscount from './screens/views/PlusFalseDiscount';
import PlusImpuesto from './screens/views/PlusImpuesto';
import ImpuestoForm from './screens/views/ImpuestoForm';
import ImpuestoEdit from './screens/views/ImpuestoEdit';
import CategoryEdit from './screens/views/CategoryEdit';
import ClientForm from './screens/views/ClientForm';
import PlusClients from './screens/views/PlusClients';
import ClientEdit from './screens/views/ClientEdit'
import PlusWorkers from './screens/views/PlusWorkers';
import TicketFormHome from './screens/views/TicketFormHome';
import ReceiptForm from './screens/views/ReceiptForm';
import EditWorker from './screens/views/EditWorker';
import TicketListForm from './screens/views/TicketListForm';
import TicketSaleForm from './screens/views/TicketSaleForm';
import ProfileEdit from './screens/views/ProfileEdit';
import DataUser from './screens/views/DataUser';
import ResetPassword from './screens/views/ResetPassword';

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
      <Stack.Screen name="Ticket" component={TicketFormHome}></Stack.Screen>
      <Stack.Screen name="ListarTicket" component={TicketListForm} />
      <Stack.Screen name="SaleTicket" component={TicketSaleForm} />
      
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
      <Stack.Screen name="Registrar Empleado" component={FormRegisEmpleado} options={{ title: "Crear Empleado",
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




const DrawerNav =()=> {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator 
     screenOptions={{headerShown:false}}>
      <Drawer.Screen name="Ventas" component={StackNavigation} options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "information-outline" size={25} color="#778899" />), }}/>
      <Drawer.Screen name="Recibos" component={Recibos}  options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "cash-multiple" size={25} color="#778899" />), }}/>
      <Drawer.Screen name="Articulos" component={ArticulosScreen}  options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "cart" size={25} color="#778899" />), }}/>
      <Drawer.Screen name="Miembros" component={MiembrosScreen}  options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "account-group" size={25} color="#778899" />), }}/>
      <Drawer.Screen name="Soporte" component={SoporteScreen}  options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "cash-multiple" size={25} color="#778899" />), }}/>
      
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