import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AuthContext from "../context/auth/AuthContext"

export default function MiembNavigate() {
  const navigation = useNavigation();
  const { isAuth, user, role } = useContext(AuthContext)

  if (isAuth === true) {
    if (role === "Empleado") {
      return (
        <View>
          <TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cliente")}
            style={styles.container}
          >
            <MaterialCommunityIcons name="account" size={24} color="#708090" />
            <Text style={styles.text}>Cliente</Text>
          </TouchableOpacity>
    
        </View>
      );
    } else if (role === "Propietario") {
      return (
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Empleados")}
            style={styles.container}
          >
          <MaterialCommunityIcons name="account-hard-hat" size={24} color="#708090" />
            <Text style={styles.text}>Empleado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cliente")}
            style={styles.container}
          >
            <MaterialCommunityIcons name="account" size={24} color="#708090" />
            <Text style={styles.text}>Cliente</Text>
          </TouchableOpacity>
    
        </View>
      );
    }
  } else if (user === null) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Empleados")}
          style={styles.container}
        >
        <MaterialCommunityIcons name="account-hard-hat" size={24} color="#708090" />
          <Text style={styles.text}>Empleado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Cliente")}
          style={styles.container}
        >
          <MaterialCommunityIcons name="account" size={24} color="#708090" />
          <Text style={styles.text}>Cliente</Text>
        </TouchableOpacity>
  
      </View>
    );
  }

  /*return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Empleados")}
        style={styles.container}
      >
      <MaterialCommunityIcons name="account-hard-hat" size={24} color="#708090" />
        <Text style={styles.text}>Empleado</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Cliente")}
        style={styles.container}
      >
        <MaterialCommunityIcons name="account" size={24} color="#708090" />
        <Text style={styles.text}>Cliente</Text>
      </TouchableOpacity>

    </View>
  );*/
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
