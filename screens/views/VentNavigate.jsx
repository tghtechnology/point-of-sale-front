import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VentNavigate =() => {
    const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Ticket")}
        style={styles.container}
      >
      <MaterialCommunityIcons name="ticket-confirmation" size={24} color="#708090" />
        <Text style={styles.text}>Ticket</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Recibos")}
        style={styles.container}
      >
      <MaterialCommunityIcons name="receipt" size={24} color="#708090" />
        <Text style={styles.text}>Recibos</Text>
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


export default VentNavigate