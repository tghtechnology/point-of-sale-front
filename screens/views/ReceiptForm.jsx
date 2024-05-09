import React from 'react';
import { View, Text, TextInput, TouchableOpacity,FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useRecibos from "../hooks/useRecibos";



 const ReceiptForm = () => {
  const { listRecibo } = useRecibos();
  console.log(listRecibo)
  return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
        <TextInput
        style={styles.searchInput}
        placeholder="Buscar"
        placeholderTextColor="black"/>
        <TouchableOpacity>
        <MaterialCommunityIcons name="magnify" size={20} color="#000" style={styles.magnifies}/>
        </TouchableOpacity>
        </View>
      <FlatList
        data={listRecibo}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View>
            <Text style={styles.itemText}>{item.fecha_creacion}</Text>
            </View>
            <TouchableOpacity>
            <MaterialCommunityIcons name="receipt" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
      },
      searchInput: {
        flex: 1,
        color: 'black',
        paddingHorizontal: 20,
        padding:10,
      },
      itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
      },
      itemText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
       marginLeft:40,
        marginBottom: 5,
        textAlign: 'justify',
      },
      magnifies: {
        marginRight: 5,
        marginLeft:5,
    },
  });
  export default ReceiptForm