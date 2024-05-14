import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useRecibos from "../hooks/useRecibos";
import { useTotal } from '../Global State/TotalContext';
import useSale from '../hooks/useSale';

const ReceiptForm = () => {
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
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="receipt" size={24} color="black" />
            </View>
            <View style={styles.totalDateContainer}>
              <Text style={styles.itemText}>{`S/. ${getTotal(item.id_venta)}`}</Text>
              <Text style={styles.itemText}>{`${new Date(item.fecha_creacion).toLocaleDateString('es-ES')} ${new Date(item.fecha_creacion).toLocaleTimeString('es-ES')}`}</Text>
            </View>
            <View style={styles.refContainer}>
              <Text style={styles.itemText}>{`${item.ref}`}</Text>
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
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    color: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: '10%',
    alignItems: 'center',
  },
  totalDateContainer: {
    width: '40%',
    marginLeft: 10,
  },
  refContainer: {
    width: '40%',
    marginLeft: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 5,
  },
  magnifies: {
    marginRight: 5,
    marginLeft: 5,
  },
});

export default ReceiptForm;
