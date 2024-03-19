import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useArticle from "../hooks/useArticle";

export default function PlusArticles(props) {
  const {listArticle} = useArticle();
  return (
    <View style={styles.container}>
      
      <FlatList
            data={listArticle}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>{item.nombre}</Text>
                <Text style={styles.itemText}>{item.precio}</Text>
              </View>
          </View>
            )}
            keyExtractor={(item) => item.id.toString()} 
        />

        {listArticle.length === 0 ? (
        <>
          <View style={styles.circle}>
            <MaterialCommunityIcons name="format-list-bulleted" size={100} color="#808080" />
          </View>
          <Text style={styles.text}>Todavía no tiene artículos</Text>
          <Text style={styles.text_}>Para agregar un artículo pulse (+)</Text>
        </>
        ) : null}

      <TouchableOpacity style={styles.addButton} onPress= {() => props.navigation.navigate("Crear Articulo")}>
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'row',
    
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
  itemText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemContainer: {
    marginTop:10,
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    shadowColor: '#000',
    paddingLeft: 100, 
    paddingRight: 100,
    shadowOpacity: 0.8,
    
  },
  itemTextContainer: {
    flexDirection: 'row',
  },
});

