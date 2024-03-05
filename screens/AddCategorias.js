import { View, TextInput, StyleSheet, TouchableOpacity,Text } from 'react-native';


export default function AddCategorias() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='El nombre de la categoría'
        placeholderTextColor="#546574"
      />
      <View style={{ height: 20 }} />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>ASIGNAR ARTÍCULOS</Text>
      </TouchableOpacity>
      <View style={{ height: 30 }} />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>CREAR ARTÍCULO</Text>
      </TouchableOpacity>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  input: {
    marginBottom: 10,
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    height: 40,
    color: '#546574',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    overflow: 'hidden', // Para que no haya desbordamiento del botón
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
  },
  buttonText: {
    color: 'red',
    textAlign: 'center',
    fontSize:15,
  },
 
});
