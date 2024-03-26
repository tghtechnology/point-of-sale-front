import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useAuth from "../hooks/useAuth";
import React, { useState } from "react";
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen(props) {
  const navigation = useNavigation();
  const { logautAccess } = useAuth();
  const [credentials] = useState({
    token: AsyncStorage.getItem("token") || "",
  });

  const handleLogout = async () => {
    try {
      const response = await logautAccess(credentials);
      if (response === true) {
        // Realizar cualquier acción adicional después de cerrar sesión
        console.log("Sesión cerrada exitosamente");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate("Profile")} style={styles.container}>
        <MaterialCommunityIcons name="account-circle-outline" size={24} color="#708090" />
        <Text style={styles.text}>Cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.container}>
      <SimpleLineIcons name="logout" size={24} color="black" />
        <Text style={styles.text}>Cerrar Sesion</Text>
      </TouchableOpacity>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  text: {
    marginLeft: 20,
  },
});