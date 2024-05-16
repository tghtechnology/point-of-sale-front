import React from 'react';
import { View, Text, TextInput, TouchableOpacity,FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DATA = [
  {
    id: '1-1005',
    date: 'sábado, 6 de abril de 2024',
    time: '10:48 a.m.',
    amount: '$1.50',
  },
  // Agrega más datos aquí...
];
 const ReceiptForm = () => {
  console.log('receiptform')
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
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity>
            <MaterialCommunityIcons name="receipt" size={24} color="black" />
            </TouchableOpacity>
            <View>
              <Text style={styles.itemText}>{item.date}</Text>
              <Text style={styles.itemText}>{item.time}</Text>
            </View>
            <View>
              <Text style={styles.itemText}>{item.amount}</Text>
              <Text style={styles.itemText}>#{item.id}</Text>
            </View>
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
        color: 'black',
      },
      magnifies: {
        marginRight: 5,
        marginLeft:5,
    },
  });
  export default ReceiptForm