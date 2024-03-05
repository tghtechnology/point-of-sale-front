import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Arti(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <MaterialCommunityIcons name="format-list-bulleted" size={100} color="#808080" />
      </View>
      <Text style={styles.text}>Todavía no tiene artículos</Text>
      <Text style={styles.text_}>Para agregar un artículo pulse (+)</Text>

      <TouchableOpacity style={styles.addButton} onPress= {() => props.navigation.navigate("Crear Articulo")}>
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 170,
    height: 170,
    borderRadius: 170,
    backgroundColor: '#E7E7E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    color: '#808080',
  },
  text_: {
    marginTop: 5,
    fontSize: 16,
    color: '#808080',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ff0000', // Color del botón
    borderRadius: 20,
    padding: 10,
  },
});

