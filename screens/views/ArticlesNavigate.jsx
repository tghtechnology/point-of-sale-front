import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ArticlesNavigate() {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Art")}
        style={styles.container}
      >
        <MaterialCommunityIcons name="audio-video" size={24} color="#708090" />
        <Text style={styles.text}>Artículos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Categorias")}
        style={styles.container}
      >
        <MaterialCommunityIcons name="content-copy" size={24} color="#708090" />
        <Text style={styles.text}>Categorias</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Descuento")}
        style={styles.container}
      >
        <MaterialCommunityIcons name="tag-outline" size={24} color="#708090" />
        <Text style={styles.text}>Descuento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Impuestos")}
        style={styles.container}
      >
        <FontAwesome5 name="percentage" size={24} color="#708090" />
        <Text style={styles.text}>Impuestos</Text>
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
