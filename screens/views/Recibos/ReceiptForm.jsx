import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useRecibos from "../../hooks/useRecibos";
import { useTotal } from '../../Global State/TotalContext';
import useSale from '../../hooks/useSale';
import { useNavigation } from '@react-navigation/native';

const ReceiptForm = () => {
  const navigation = useNavigation();
  const { listRecibo, setListRecibo } = useRecibos();
  const { listSale } = useSale();
  const { total, setTotal } = useTotal();
  const { setVentaId } = useTotal();



  const getTotal = (idVenta) => {
    const venta = listSale.find(venta => venta.id === idVenta);
    return venta ? venta.total : 'No disponible';
  };

  const getMontoReembolsado = (recibo) => {
    if (recibo.monto_reembolsado !== null) {
      const reciboReembolsado = listRecibo.find(item => item.id_venta === recibo.id_venta);
      return `Reembolsado: ${reciboReembolsado ? reciboReembolsado.ref : 'No disponible'}`;
    }
    return '';
  };
  function padLeft(number) {
    return number < 10 ? `0${number}` : number;
  }

  const renderItem = ({ item }) => {
    const isReembolsado = item.monto_reembolsado !== null;
    const fecha = new Date(item.fecha_creacion);
    const formattedDate = `${padLeft(fecha.getUTCDate())}-${padLeft(fecha.getUTCMonth() + 1)}-${fecha.getUTCFullYear()} ${padLeft(fecha.getUTCHours())}:${padLeft(fecha.getUTCMinutes())}:${padLeft(fecha.getUTCSeconds())}`;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ReceiptDetail', { idRecibo: item.id })}>
        <View style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="receipt" size={24} color="black" />
          </View>
          <View style={styles.totalDateContainer}>
            <Text style={styles.itemText}>
              {isReembolsado ? `S/. ${item.monto_reembolsado}` : `S/. ${getTotal(item.id_venta)}`}
            </Text>
            <Text style={styles.itemText}>
              {formattedDate}
            </Text>
          </View>
          <View style={styles.refContainer}>
            <Text style={styles.itemText1}>{`${item.ref}`}</Text>
            {isReembolsado && <Text style={styles.reembolsadoText}>{getMontoReembolsado(item)}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor="black"
        />
        <TouchableOpacity>
          <MaterialCommunityIcons name="magnify" size={20} color="#000" style={styles.magnifies} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={listRecibo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

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
    marginLeft: 28,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 5,
  },
  itemText1: {
    marginLeft: 70,
  },
  reembolsadoText: {
    fontSize: 13,
    color: '#d9534f',
    textAlign: 'justify',
    marginLeft: 28,
    marginBottom: 5,
  },
  magnifies: {
    marginRight: 5,
    marginLeft: 5,
  },
});

export default ReceiptForm;