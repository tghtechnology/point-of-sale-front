import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useRecibos from "../hooks/useRecibos";
import { useTotal } from '../Global State/TotalContext';
import useSale from '../hooks/useSale';
import { useNavigation } from '@react-navigation/native';

const ReceiptForm = () => {
  const navigation = useNavigation();
  const { listRecibo } = useRecibos();
  const { listSale } = useSale();
  const { total, setTotal } = useTotal();

  const getTipoPago = (idVenta) => {
    const venta = listSale.find(venta => venta.id === idVenta);
    return venta ? venta.tipoPago : 'No disponible';
  };
  const getTotal = (idVenta) => {
    const venta = listSale.find(venta => venta.id === idVenta);
    return venta ? venta.total : 'No disponible';
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor="black" />
        <TouchableOpacity>
          <MaterialCommunityIcons name="magnify" size={20} color="#000" style={styles.magnifies} />
        </TouchableOpacity>
      </View>
      <FlatList
  data={listRecibo}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ReceiptDetail', { item })}>
      <View style={styles.itemContainer}>
        <MaterialCommunityIcons name="receipt" size={24} color="black" />
        <Text style={styles.itemText}>{`${new Date(item.fecha_creacion).toLocaleDateString('es-ES')} ${new Date(item.fecha_creacion).toLocaleTimeString('es-ES')}`}</Text>
        <View>
          <Text style={styles.itemText}>{`${item.ref}`}</Text>
          <Text style={styles.itemText}>{getTipoPago(item.id_venta)}</Text>
          <Text style={styles.itemText}>S/. {getTotal(item.id_venta)}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    padding: 10,
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
    marginLeft: 40,
    marginBottom: 5,
    textAlign: 'justify',
  },
  magnifies: {
    marginRight: 5,
    marginLeft: 5,
  },
});

export default ReceiptForm;