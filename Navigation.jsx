import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './screens/views/HomeScreen';
import DeleteAccount from './screens/views/DeleteAccount';
import ArticlesNavigate from './screens/views/ArticlesNavigate';
import PlusArticles from './screens/views/PlusArticles';
import PlusCategory from './screens/views/PlusCategory';
import ArticlesForm from './screens/views/ArticlesForm';
import Icon from "react-native-vector-icons/Entypo";
import CategoryForm from './screens/views/CategoryForm';
import { Ionicons, MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import HomeView from './screens/views/HomeView';
import LoginForm from "./screens/views/LoginForm"
import RegisterForm from './screens/views/RegisterForm';
import EnvioCorreoForm from './screens/views/EnvioCorreoForm';
import ConfirmPasswordForm from './screens/views/ConfirmPasswordForm';
import DiscountForm from './screens/views/DiscountForm';
import FormRegisEmpleado from './screens/Empleado/FormRegisEmpleado';


function StackNavigation() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
return (
    <Stack.Navigator  initialRouteName="Main" screenOptions={{ statusBarColor: "#ff0000",headerStyle: { backgroundColor: "#ff0000" },headerTintColor: "#fff",headerTitleStyle: {color: "#fff",},}} >
      <Stack.Screen name="Main" component={HomeView}  options={{headerShown:false}} />
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Register" component={RegisterForm} />
      <Stack.Screen name="Envio" component={EnvioCorreoForm} />
      <Stack.Screen name="Confirmar" component={ConfirmPasswordForm} />
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
    </Stack.Navigator>
  );
};
function ArticulosScreen() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#ff0000",
        headerStyle: { backgroundColor: "#ff0000" },
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
          // onPress={() => navigation.navigate('Arti')}
          size={16}
          color="#fff"
          style={{ marginRight: 119 }}/>
        <Ionicons name="search-outline" size={24} color="#fff" />
      </>
    ),}}
      />
      <Stack.Screen name="Crear Articulo" component={ArticlesForm}  options={{
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Guardar</Text>
            </View>
          ),
        }}></Stack.Screen>
      <Stack.Screen name="Categorias" component={PlusCategory} options={{headerRight: () => (<><Ionicons name="search-outline" size={24} color="#fff" /></>),}}></Stack.Screen>
      <Stack.Screen name="Crear Categoria" component={CategoryForm}  options={{
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Guardar</Text>
            </View>
          ),
        }}></Stack.Screen>
      <Stack.Screen name="Descuento" component={Descuento}  ></Stack.Screen>
    </Stack.Navigator>
  );
};


function DescuentoScreen(){
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
return(
  <Stack.Navigator
      screenOptions={{
        statusBarColor: "#ff0000",
        headerStyle: { backgroundColor: "#ff0000" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
    <Stack.Screen name="Descuento" component={DiscountForm} options={{ headerLeft: () => {
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
      <Drawer.Screen name="Articulos" component={ArticulosScreen}  options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "format-list-bulleted" size={25} color="#778899" />), }}/>
      <Drawer.Screen name="Descuento" component={DiscountForm}  options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "format-list-bulleted" size={25} color="#778899" />), }}/>
      <Drawer.Screen name="Empleado" component={FormRegisEmpleado}  options={{drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name= "format-list-bulleted" size={25} color="#778899" />), }}/>
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