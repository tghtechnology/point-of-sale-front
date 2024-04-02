import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ArticlesNavigate() {
  const navigation = useNavigation();

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
