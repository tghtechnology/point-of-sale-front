import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ArticlesNavigate() {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Miem")}
        style={styles.container}
      >
      <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#708090" />
        <Text style={styles.text}>Empleado</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Cliente")}
        style={styles.container}
      >
        <MaterialCommunityIcons name="content-copy" size={24} color="#708090" />
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
