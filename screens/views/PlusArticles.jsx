import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useArticle from "../hooks/useArticle";



export default function PlusCategory(props) {
  const {listArticle} = useArticle();
  return (
    
    <View style={styles.container}>
      <FlatList
        data={listArticle}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nombre}</Text>
                <Text style={styles.itemText}>{item.precio}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
        </View>
         )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ListEmptyComponent={() => (
        <View>
          
        <MaterialCommunityIcons name="content-copy" size={100} color="#808080" />
        <Text style={styles.text}>Todavía no tiene Categorias</Text>
        <Text style={styles.text_}>Para agregar un artículo pulse (+)</Text>
        </View>
        )}
        />

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
    marginTop: 5,
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
    backgroundColor: '#ff0000', 
    borderRadius: 20,
    padding: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

